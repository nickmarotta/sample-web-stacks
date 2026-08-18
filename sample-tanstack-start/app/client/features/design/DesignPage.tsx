import { Button, Input, Card, HpBar, MessageBox, ActionMenu, TypeBadge } from '~/client/ui'

export function DesignPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-8 font-mono">
      <div>
        <h1 className="text-3xl font-bold mb-2">Design System</h1>
        <p className="text-gray-500 text-sm">Retro-inspired primitives based on Gen 1 Pokémon games.</p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Buttons</h2>
        <p className="text-xs text-gray-500">Menu-style buttons with thick borders and uppercase text.</p>
        <div className="flex flex-wrap gap-3">
          <Button>Fight</Button>
          <Button>Pokéball</Button>
          <Button>Run</Button>
          <Button variant="primary">Primary Action</Button>
          <Button disabled>Disabled</Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">With cursor indicator (like the original menu):</p>
        <Card className="inline-flex flex-col gap-2 p-4">
          <Button variant="menu" active>Fight</Button>
          <Button variant="menu">Pokéball</Button>
          <Button variant="menu">Run</Button>
        </Card>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Inputs</h2>
        <div className="max-w-sm space-y-3">
          <Input id="demo-name" label="Trainer Name" placeholder="RED" />
          <Input id="demo-pass" label="Password" type="password" placeholder="••••••" />
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-bold uppercase mb-2">Default Card</h3>
            <p className="text-xs text-gray-600">Used for dashboard sections and general content.</p>
          </Card>
          <Card variant="active">
            <h3 className="text-sm font-bold uppercase mb-2">Active Pokémon</h3>
            <p className="text-xs text-red-700">Highlighted state for selected items.</p>
          </Card>
        </div>
      </section>

      {/* HP Bars */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">HP Bars</h2>
        <div className="max-w-sm space-y-4">
          <div>
            <p className="text-xs font-bold uppercase mb-1">Full HP</p>
            <HpBar current={75} max={75} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-1">Half HP</p>
            <HpBar current={34} max={75} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-1">Low HP</p>
            <HpBar current={11} max={75} />
          </div>
        </div>
      </section>

      {/* Battle HP Box */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Battle HP Box</h2>
        <Card className="max-w-[240px] p-4">
          <div className="text-base font-bold uppercase tracking-wide">PIKACHU</div>
          <div className="text-xs font-bold mt-0.5">Lv25</div>
          <div className="mt-2">
            <HpBar current={54} max={75} showNumbers />
          </div>
        </Card>
      </section>

      {/* Message Box */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Message Box</h2>
        <MessageBox className="max-w-md">Wild RATTATA appeared!</MessageBox>
        <MessageBox className="max-w-md">Gotcha! RATTATA was caught!</MessageBox>
      </section>

      {/* Action Menu */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Action Menu</h2>
        <div className="border-[6px] border-gray-900 rounded-lg overflow-hidden max-w-lg">
          <ActionMenu message="What will you do?">
            <Button variant="menu" active>Fight</Button>
            <Button variant="menu">Pokéball</Button>
            <Button variant="menu">Item</Button>
            <Button variant="menu">Run</Button>
          </ActionMenu>
        </div>
      </section>

      {/* Badges & Type Tags */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Badges & Types</h2>
        <div className="flex flex-wrap gap-2">
          <TypeBadge type="water" />
          <TypeBadge type="fire" />
          <TypeBadge type="grass" />
          <TypeBadge type="electric" />
          <TypeBadge type="poison" />
          <TypeBadge type="normal" />
          <TypeBadge type="psychic" />
          <TypeBadge type="dragon" />
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Typography</h2>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold uppercase">Page Title</h1>
          <h2 className="text-lg font-bold uppercase">Section Header</h2>
          <p className="text-sm">Body text — used for descriptions and battle messages.</p>
          <p className="text-sm text-red-700 font-bold">Error: Invalid credentials</p>
          <p className="text-sm text-yellow-700 font-bold">Warning: No active Pokémon!</p>
          <a href="#" className="text-sm underline hover:text-gray-600">Link style</a>
        </div>
      </section>

      {/* Full Battle Screen Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b-4 border-gray-900 pb-2">Battle Screen (composite)</h2>
        <div className="bg-white border-[6px] border-gray-900 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="bg-gradient-to-b from-gray-100 to-green-100 h-64 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <Card className="p-3 min-w-[180px]">
                <div className="text-sm font-bold uppercase">SQUIRTLE</div>
                <div className="text-[10px] font-bold">:L5</div>
                <div className="mt-1">
                  <HpBar current={30} max={30} />
                </div>
              </Card>
              <div className="w-20 h-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 border-2 border-gray-400 rounded flex items-center justify-center text-[9px] text-gray-500 uppercase">sprite</div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-24 h-24 flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-300 border-2 border-gray-400 rounded flex items-center justify-center text-[9px] text-gray-500 uppercase">back</div>
              </div>
              <Card className="p-3 min-w-[180px]">
                <div className="text-sm font-bold uppercase">CHARMANDER</div>
                <div className="text-[10px] font-bold">:L5</div>
                <div className="mt-1">
                  <HpBar current={19} max={19} showNumbers />
                </div>
              </Card>
            </div>
          </div>
          <ActionMenu message="What will you do?">
            <Button variant="menu" active>Fight</Button>
            <Button variant="menu">Pokéball</Button>
            <Button variant="menu">Item</Button>
            <Button variant="menu">Run</Button>
          </ActionMenu>
        </div>
      </section>
    </div>
  )
}
