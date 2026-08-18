import { Button, Input, Card, HpBar, MessageBox, ActionMenu, TypeBadge, Text } from '~/client/ui'

export function DesignPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-8 font-mono">
      <div>
        <Text variant="pageTitle" className="mb-2">Design System</Text>
        <Text variant="caption">Retro-inspired primitives based on Gen 1 Pokémon games.</Text>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Buttons</Text>
        <Text variant="caption">Menu-style buttons with thick borders and uppercase text.</Text>
        <div className="flex flex-wrap gap-3">
          <Button>Fight</Button>
          <Button>Pokéball</Button>
          <Button>Run</Button>
          <Button variant="primary">Primary Action</Button>
          <Button disabled>Disabled</Button>
        </div>

        <Text variant="caption" className="mt-4">With cursor indicator (like the original menu):</Text>
        <Card className="inline-flex flex-col gap-2 p-4">
          <Button variant="menu" active>Fight</Button>
          <Button variant="menu">Pokéball</Button>
          <Button variant="menu">Run</Button>
        </Card>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Inputs</Text>
        <div className="max-w-sm space-y-3">
          <Input id="demo-name" label="Trainer Name" placeholder="RED" />
          <Input id="demo-pass" label="Password" type="password" placeholder="••••••" />
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Cards</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <Text variant="subheader" className="mb-2">Default Card</Text>
            <Text variant="bodySmall" className="text-gray-600">Used for dashboard sections and general content.</Text>
          </Card>
          <Card variant="active">
            <Text variant="subheader" className="mb-2">Active Pokémon</Text>
            <Text variant="bodySmall" className="text-red-700">Highlighted state for selected items.</Text>
          </Card>
        </div>
      </section>

      {/* HP Bars */}
      <section className="space-y-4">
        <Text variant="sectionHeader">HP Bars</Text>
        <div className="max-w-sm space-y-4">
          <div>
            <Text variant="label" className="mb-1">Full HP</Text>
            <HpBar current={75} max={75} />
          </div>
          <div>
            <Text variant="label" className="mb-1">Half HP</Text>
            <HpBar current={34} max={75} />
          </div>
          <div>
            <Text variant="label" className="mb-1">Low HP</Text>
            <HpBar current={11} max={75} />
          </div>
        </div>
      </section>

      {/* Battle HP Box */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Battle HP Box</Text>
        <Card className="max-w-[240px] p-4">
          <Text variant="subheader" as="div" className="text-base tracking-wide">PIKACHU</Text>
          <Text variant="label" as="div" className="mt-0.5">Lv25</Text>
          <div className="mt-2">
            <HpBar current={54} max={75} showNumbers />
          </div>
        </Card>
      </section>

      {/* Message Box */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Message Box</Text>
        <MessageBox className="max-w-md">Wild RATTATA appeared!</MessageBox>
        <MessageBox className="max-w-md">Gotcha! RATTATA was caught!</MessageBox>
      </section>

      {/* Action Menu */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Action Menu</Text>
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
        <Text variant="sectionHeader">Badges & Types</Text>
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
        <Text variant="sectionHeader">Typography</Text>
        <div className="space-y-2">
          <Text variant="pageTitle" as="p">Page Title</Text>
          <Text variant="sectionHeader" as="p">Section Header</Text>
          <Text variant="subheader" as="p">Subheader</Text>
          <Text variant="label">Label</Text>
          <Text variant="body">Body text — used for descriptions and battle messages.</Text>
          <Text variant="bodySmall">Body small — dense supporting copy.</Text>
          <Text variant="caption">Caption — secondary/help text.</Text>
          <Text variant="error">Error: Invalid credentials</Text>
          <Text variant="warning">Warning: No active Pokémon!</Text>
          <Text variant="link" as="a" href="#" className="block w-fit">Link style</Text>
          <Text variant="navLink" as="a" href="#" className="block w-fit">Nav link</Text>
        </div>
      </section>

      {/* Full Battle Screen Preview */}
      <section className="space-y-4">
        <Text variant="sectionHeader">Battle Screen (composite)</Text>
        <div className="bg-white border-[6px] border-gray-900 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="bg-gradient-to-b from-gray-100 to-green-100 h-64 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <Card className="p-3 min-w-[180px]">
                <Text variant="subheader" as="div">SQUIRTLE</Text>
                <Text variant="label" as="div" className="text-[10px]">:L5</Text>
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
                <Text variant="subheader" as="div">CHARMANDER</Text>
                <Text variant="label" as="div" className="text-[10px]">:L5</Text>
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
