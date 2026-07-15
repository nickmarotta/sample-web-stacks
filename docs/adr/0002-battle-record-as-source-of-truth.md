# Battle record as source of truth for in-battle state

All in-battle state — both the Wild Pokémon's current HP and the Active Pokémon's current HP — is stored on the Battle record and updated every turn. This ensures a Trainer can reload the page at any point and see the correct battle state. The Caught Pokémon record never holds a `current_hp` column; HP is transient and lives only on the Battle. When a Battle resolves, both HP values are simply abandoned — the Active Pokémon auto-recovers regardless of outcome.

## Consequences

- Every attack turn requires a database write (acceptable — battles are short)
- No healing mechanic needed; no "fainted" state on the Pokémon record
