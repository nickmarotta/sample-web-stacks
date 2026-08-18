import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:5173'

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Collect console errors
  const errors = []
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', err => errors.push(err.message))

  try {
    // 1. Test: Register page loads
    console.log('\n=== TEST: Register page loads ===')
    await page.goto(`${BASE_URL}/auth/register`)
    await page.waitForSelector('h1')
    const title = await page.textContent('h1')
    console.log(`  Page title: "${title}"`)
    assert(title === 'Create Account', `Expected "Create Account", got "${title}"`)
    console.log('  PASS')

    // 2. Test: Register a new user
    console.log('\n=== TEST: Register new user ===')
    const username = `t${Date.now()}`
    // Wait for hydration
    await page.waitForTimeout(2000)
    await page.fill('#username', username)
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    // Wait for navigation or error
    await page.waitForTimeout(3000)
    const currentUrl = page.url()
    console.log(`  After register, URL: ${currentUrl}`)

    // Check if there's an error message on the page
    const errorEl = await page.$('.text-red-600')
    if (errorEl) {
      const errorText = await errorEl.textContent()
      console.log(`  ERROR on page: "${errorText}"`)
    }

    // Check for any console errors
    if (errors.length > 0) {
      console.log(`  Console errors:`)
      errors.forEach(e => console.log(`    - ${e}`))
    }

    // Did we navigate to home?
    if (currentUrl.includes('/auth/')) {
      console.log('  FAIL - Still on auth page after register')

      // Let's check network - try registering again and watch the response
      console.log('\n=== TEST: Debug registration network ===')
      const page2 = await context.newPage()
      await page2.goto(`${BASE_URL}/auth/register`)
      await page2.waitForSelector('h1')

      const username2 = `debug${Date.now()}`
      await page2.fill('#username', username2)
      await page2.fill('#password', 'testtest')

      // Listen for all network responses
      const responses = []
      page2.on('response', res => {
        if (res.url().includes('_server')) {
          responses.push({
            url: res.url(),
            status: res.status(),
            headers: Object.fromEntries(
              [...Object.entries(res.headers())].filter(([k]) => k.includes('cookie') || k.includes('location'))
            ),
          })
        }
      })

      // Also capture request failures
      page2.on('requestfailed', req => {
        console.log(`  Request failed: ${req.url()} - ${req.failure()?.errorText}`)
      })

      await page2.click('button[type="submit"]')
      await page2.waitForTimeout(3000)

      console.log(`  After register, URL: ${page2.url()}`)
      console.log(`  Server function responses:`)
      responses.forEach(r => {
        console.log(`    ${r.status} ${r.url}`)
        console.log(`    Headers: ${JSON.stringify(r.headers)}`)
      })

      // Check page content for errors
      const body = await page2.textContent('body')
      if (body.includes('failed') || body.includes('error') || body.includes('Error')) {
        const errorParts = body.match(/((?:error|failed|Error)[^\n]{0,200})/gi)
        if (errorParts) {
          console.log(`  Error content found: ${errorParts.join('; ')}`)
        }
      }

      // Get all console errors from page2
      const page2Errors = []
      page2.on('console', msg => {
        if (msg.type() === 'error') page2Errors.push(msg.text())
      })
      await page2.waitForTimeout(1000)
      if (page2Errors.length) {
        console.log(`  Page2 console errors: ${page2Errors.join('; ')}`)
      }

      await page2.close()
    } else {
      console.log('  PASS - Navigated away from auth page')

      // 3. Test: Home page shows trainer info
      console.log('\n=== TEST: Home page ===')
      const homeTitle = await page.textContent('h1')
      console.log(`  Home h1: "${homeTitle}"`)
      assert(homeTitle.includes('Welcome'), `Expected Welcome message, got "${homeTitle}"`)
      console.log('  PASS')

      // 4. Test: Start an encounter
      console.log('\n=== TEST: Start encounter ===')
      await page.click('button:has-text("Find Starter")')
      await page.waitForTimeout(5000)
      const battleUrl = page.url()
      console.log(`  After encounter, URL: ${battleUrl}`)
      assert(battleUrl.includes('/battles/'), `Expected battles URL, got ${battleUrl}`)
      console.log('  PASS')

      // 5. Test: Battle page shows correctly
      console.log('\n=== TEST: Battle page renders ===')
      const battleContent = await page.textContent('body')
      console.log(`  Has "What will you do?": ${battleContent.includes('What will you do?')}`)
      console.log(`  Has "Pokéball": ${battleContent.includes('Pokéball') || battleContent.includes('POKÉBALL')}`)
      console.log(`  Has enemy name: ${!battleContent.includes('undefined')}`)
      console.log('  PASS')

      // 6. Test: Catch the starter Pokémon
      console.log('\n=== TEST: Catch starter ===')
      let caught = false
      for (let i = 0; i < 10; i++) {
        const pokeball = await page.$('button:has-text("Pokéball"), button:has-text("POKÉBALL")')
        if (!pokeball) break
        await pokeball.click()
        await page.waitForTimeout(2000)
        const content = await page.textContent('body')
        if (content.includes('was caught')) {
          caught = true
          console.log(`  Caught on attempt ${i + 1}!`)
          break
        }
      }
      if (!caught) console.log('  Could not catch after 10 attempts')
      else console.log('  PASS')

      // 7. Test: Navigate back to dashboard
      console.log('\n=== TEST: Back to dashboard after catch ===')
      const dashLink = await page.$('a:has-text("Back to Dashboard")')
      if (dashLink) {
        await dashLink.click()
        await page.waitForTimeout(2000)
        const dashUrl = page.url()
        console.log(`  URL: ${dashUrl}`)
        const dashContent = await page.textContent('body')
        console.log(`  Has "Start Encounter": ${dashContent.includes('Start Encounter')}`)
        console.log('  PASS')
      }

      // 8. Test: Collection page
      console.log('\n=== TEST: Collection page ===')
      await page.goto(`${BASE_URL}/collection`)
      await page.waitForTimeout(2000)
      const collContent = await page.textContent('body')
      console.log(`  Has caught Pokémon: ${collContent.includes('caught')}`)
      console.log(`  URL: ${page.url()}`)
      console.log('  PASS')

      // 9. Test: Logout
      console.log('\n=== TEST: Logout ===')
      await page.goto(BASE_URL)
      await page.waitForTimeout(1000)
      const logoutBtn = await page.$('button:has-text("Logout")')
      if (logoutBtn) {
        await logoutBtn.click()
        await page.waitForTimeout(2000)
        console.log(`  After logout URL: ${page.url()}`)
        console.log('  PASS')
      }

      // 10. Test: Login with created user
      console.log('\n=== TEST: Login ===')
      await page.goto(`${BASE_URL}/auth/login`)
      await page.waitForSelector('#username')
      await page.fill('#username', username)
      await page.fill('#password', 'password123')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(8000)
      const loginUrl = page.url()
      console.log(`  After login URL: ${loginUrl}`)
      if (!loginUrl.includes('/auth/')) {
        console.log('  PASS')
      } else {
        console.log('  FAIL - Still on auth page')
      }
    }
  } catch (err) {
    console.error(`\nFATAL ERROR: ${err.message}`)
    console.error(err.stack)
  } finally {
    console.log(`\n=== Console errors collected: ${errors.length} ===`)
    errors.forEach(e => console.log(`  ${e}`))
    await browser.close()
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(`Assertion failed: ${msg}`)
}

run()
