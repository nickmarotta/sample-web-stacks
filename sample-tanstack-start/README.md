# PokéStart

A sample full-stack application built with TanStack Start. Trainers register, catch Wild Pokémon (fetched from PokeAPI), and battle them using their Active Pokémon. Demonstrates SSR, type-safe server functions, Drizzle ORM, and session-based auth.

## Running the app

```bash
npm install
npm run db:migrate   # creates pokemon.db
npm run dev          # http://localhost:5173
```

## Code organization

```
app/
├── routes/          # One file per URL — contains the loader and component
├── services/        # All business logic
├── db/              # Drizzle schema and client
├── lib/             # Shared utilities (session)
├── router.tsx       # Router factory
├── client.tsx       # Browser hydration entry
└── server.ts        # SSR request handler entry
```

### routes/

Each file owns one URL. The pattern in every route file is the same: define server functions at the top, wire them into the route's `loader`, render in the component.

| File | URL |
|---|---|
| `__root.tsx` | Layout wrapper (nav, `<html>` shell) |
| `index.tsx` | `/` — dashboard, start an Encounter |
| `auth/login.tsx` | `/auth/login` |
| `auth/register.tsx` | `/auth/register` |
| `battles/$battleId.tsx` | `/battles/:id` — active battle view |
| `collection.tsx` | `/collection` — trainer's caught Pokémon |

Server functions in route files are the only layer that talks to services. They handle auth checks, call the appropriate service, and either return data or throw a redirect.

### services/

Business logic lives here, completely decoupled from TanStack Start (see [ADR 0001](docs/adr/0001-service-layer-for-frontend-agnosticism.md)). Services call the database directly and have no knowledge of HTTP.

| File | Responsibility |
|---|---|
| `auth.service.ts` | Register, login, logout, get current trainer from session |
| `battle.service.ts` | Start battle, attack, catch attempt, flee, fetch battle |
| `pokeapi.service.ts` | Fetch species from PokeAPI, cache locally on first encounter |
| `trainer.service.ts` | Collection queries, set active Pokémon |

### db/

- `schema.ts` — Four tables: `trainers`, `pokemon_species`, `caught_pokemon`, `battles`. Also contains Drizzle `relations()` declarations required for `with:` queries.
- `index.ts` — Singleton Drizzle client (better-sqlite3, WAL mode).

The `caught_pokemon` table has no `current_hp` column by design — HP only lives on the `battles` record and is discarded when the battle ends (see [ADR 0002](docs/adr/0002-battle-record-as-source-of-truth.md)).

### lib/

- `session.ts` — HMAC-signed cookie sessions. Reads/writes cookies via `@tanstack/react-start/server` primitives. No sessions table in the database.

## Key concepts

**Starter mode.** A trainer with no Active Pokémon enters every battle in starter mode: only the Pokéball action is available, and on a successful catch that Pokémon is automatically set as their Active Pokémon.

**Species caching.** When a Wild Pokémon is encountered, its data is fetched from PokeAPI once and stored in `pokemon_species`. All subsequent reads (battle view, collection) use the local cache — PokeAPI is never called for a species already seen (see [ADR 0003](docs/adr/0003-pokemon-species-cache-on-first-encounter.md)).

**Catch probability.** Success chance is `1 - (wildCurrentHp / wildMaxHp) * 0.75`, so weakening the Wild Pokémon first meaningfully improves catch odds.

## Domain language

See [CONTEXT.md](../CONTEXT.md) for the full ubiquitous language (Trainer, Wild Pokémon, Battle, Battle Outcome, etc.) and entity relationships.
