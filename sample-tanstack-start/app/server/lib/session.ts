import {
  getRequestHeader,
  setResponseHeader,
} from '@tanstack/react-start/server'

const SESSION_COOKIE = 'poke-session'
const ONE_WEEK = 60 * 60 * 24 * 7

export type SessionData = {
  trainerId: number
  username: string
}

function getSecret(): string {
  return process.env.SESSION_SECRET ?? 'change-me-in-production-min-32-chars!!'
}

async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return Buffer.from(sig).toString('base64url')
}

async function verify(data: string, sig: string, secret: string): Promise<boolean> {
  const expected = await sign(data, secret)
  return expected === sig
}

export async function setSession(session: SessionData): Promise<void> {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url')
  const sig = await sign(payload, getSecret())
  const value = `${payload}.${sig}`
  setResponseHeader(
    'Set-Cookie',
    [
      `${SESSION_COOKIE}=${value}`,
      'HttpOnly',
      'SameSite=Lax',
      'Path=/',
      `Max-Age=${ONE_WEEK}`,
    ].join('; '),
  )
}

export async function clearSession(): Promise<void> {
  setResponseHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`,
  )
}

export async function getSession(): Promise<SessionData | null> {
  const cookieHeader = getRequestHeader('cookie')
  if (!cookieHeader) return null

  let raw: string | null = null
  for (const part of cookieHeader.split(/;\s*/)) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq) === SESSION_COOKIE) {
      raw = part.slice(eq + 1)
      break
    }
  }
  if (!raw) return null

  const dot = raw.lastIndexOf('.')
  if (dot === -1) return null
  const payload = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)

  const valid = await verify(payload, sig, getSecret())
  if (!valid) return null

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()) as SessionData
  } catch {
    return null
  }
}
