# Sample App Templates

A collection of templates that each build the same application — **PokéStart**, where trainers catch and battle Pokémon — in a different stack. Building one app repeatedly makes the differences between frameworks the only variable.

## Shared foundation

| File | Purpose |
|---|---|
| [CONTEXT.md](CONTEXT.md) | The domain: ubiquitous language, entity relationships, flagged ambiguities. Every template implements this same model. |
| [DEVELOPMENT_PRINCIPLES.md](DEVELOPMENT_PRINCIPLES.md) | Framework-agnostic guidelines for AI-assisted development — design system first, client/server separation, controller → service → repo, schema-derived types. |

## Templates

| Template | Stack |
|---|---|
| [sample-tanstack-start](sample-tanstack-start/) | TanStack Start, Drizzle ORM, SQLite, session cookie auth |

Each template is self-contained: its own `package.json`, database, and README. Install and run from inside the template directory.

## Adding a template

1. Create a directory at the repo root named for the stack.
2. Read `CONTEXT.md` and implement the same domain — same entities, same terms, same rules.
3. Follow `DEVELOPMENT_PRINCIPLES.md` for structure and layering.
4. Add a README covering how to run it and how the code is organized, and link it in the table above.
