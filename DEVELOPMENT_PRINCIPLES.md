# Development Principles

Guidelines for AI-assisted development. These are framework-agnostic and apply to any full-stack project.

## Start with the Design System

Before building features, establish a visible design system:

1. Create a dedicated route/page (`/design`) that renders every UI primitive.
2. Build shared components (Button, Card, Input, etc.) that embody the project's visual identity.
3. Use those components everywhere — no raw styling in feature code.
4. When the aesthetic changes, update the primitives and the whole app follows.

AI will repeat styling inline endlessly unless you force reuse through components. The design system page is what keeps it honest — if a primitive doesn't exist there, it shouldn't exist in the app.

## Project Structure: Client/Server Separation

Keep a hard boundary between frontend and backend code:

```
app/
  client/
    routes/              ← thin: data loading + component ref
    features/{name}/     ← actual page components
    ui/                  ← shared design system primitives
  server/
    features/{name}/
      controller         ← network/request handling layer
      service            ← business logic
      repo               ← database queries
    db/                  ← schema, migrations, client
    lib/                 ← auth, sessions, utilities
```

This matters because full-stack frameworks blur the line between client and server. Explicit separation prevents logic from drifting into the wrong layer.

## Route Files Should Be Thin

A route file's job is to wire a URL to a data loader and a component. That's it.

- Define what data the page needs (loader).
- Point to the feature component that renders it.
- No business logic, no complex UI, no inline styling.

The actual React component lives in `features/`. This keeps routes scannable and makes page components independently testable.

## MVC on the Server (Controller → Service → Repo)

- **Controller:** Handles the request boundary — auth checks, input validation, calling services, shaping responses.
- **Service:** Business logic and orchestration. No direct database access.
- **Repo:** Pure data access. Accepts and returns types derived from the schema.

Each layer only talks to the one below it. This makes it easy to test services without a database and controllers without business logic.

## Types Flow from the Schema

Never hand-write TypeScript types that duplicate your database schema. Derive them:

- Use your ORM's type inference (e.g., `InferSelectModel`, `InferInsertModel`, Prisma's generated types).
- Repo functions accept and return these inferred types.
- Services and controllers get type safety transitively — no manual interfaces to maintain.

When a column is added or renamed, the types break at compile time all the way up the stack.

## Naming Conventions

- **React components:** PascalCase files (`HomePage.tsx`, `Button.tsx`)
- **Server files:** kebab-case (`auth-controller.ts`, `battle-repo.ts`)
- **Feature directories:** lowercase (`auth/`, `battle/`, `home/`)

Pick a convention and enforce it uniformly. Inconsistency creates friction for both humans and AI.

## What AI Gets Wrong (and How to Prevent It)

| Problem | Fix |
|---------|-----|
| Repeats styling inline everywhere | Require components from the design system |
| Never creates reusable components | Build the design system first, before features |
| Puts business logic in route files | Enforce the controller → service → repo layers |
| Hand-types objects that mirror the DB | Require schema-derived types in repos |
| Validation mismatches between forms | Use shared constants or types for constraints |
| Builds features without testing them | Use browser automation (Playwright) to verify flows end-to-end |

## Testing

- Use browser automation (Playwright, Cypress) to test full user flows against the running app.
- Test the golden path end-to-end: account creation → core feature usage → logout → login.
- Wait for hydration before interacting with SSR pages.
- Keep test usernames/data within validation bounds (a bug caught here: register form truncated at `maxLength=20` but login didn't, causing credential mismatch).
