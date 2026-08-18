# Discussion Summary - BattlesRoute & TanStack Start Server Functions

## Date
2026-06-23

## Topics Covered

### 1. BattlesRoute Data Loading
Reviewed how the battles route loads and exposes data via a TanStack Start server function (loader):

```typescript
export const Route = createFileRoute('/battles/$battleId')({
  loader: async ({ params }) => {
    return fetchBattle(params.battleId)
  },
})
```

**Data returned:**
- `battle` - Battle record with joined `species` data
- `trainer` - Authenticated user from session
- `starterMode` - Boolean flag (`!trainer.activePokemonId`)

### 2. Component Usage Patterns
**In the battle route component:**

- `battle.species.*` - Displays Pokémon name, sprite, types
- `battle.wildCurrentHp/wildMaxHp` - HP bar rendering
- `battle.id` - Server function call arguments
- `starterMode` - Controls UI:
  - Shows "Starter Encounter" heading when true
  - Hides Attack/Flee buttons when true (only Pokéball available)

### 3. Type Safety in TanStack Start
**Key Finding:** TanStack Start loaders and server functions are fully type-safe end-to-end.

**Why:**
- Loader return type is inferred and flows into `useLoaderData()`
- Server functions (`createServerFn`) carry typed inputs and outputs
- No string-based template handoff — components consume typed data directly

**Benefits over server-rendered templates:**
1. Full autocomplete in component files consuming loader data
2. Type errors caught at compile time across the client/server boundary
3. No need for JSDoc comments or runtime `inspect()` helpers

## Business Logic Notes
- `starterMode` creates a special battle type for trainers without an active Pokémon
- Starter battles only allow catching (no attacking/fleeing)
- Determined by checking if `trainer.activePokemonId` exists
