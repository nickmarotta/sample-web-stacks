# Cache Pokémon Species data on first encounter

When a Wild Pokémon is encountered, we fetch its species data from PokeAPI and persist it to a local `pokemon_species` table (name, base_hp, sprite_url, types) via Drizzle ORM. All subsequent reads — battle views, Collection views — use the local cache. PokeAPI is never called for a species we have already seen.

This avoids rate-limiting on PokeAPI, makes Collection views fast with no external dependency, and demonstrates a "fetch or insert" pattern with Drizzle ORM.

## Considered options

- Always fetch live from PokeAPI (ruled out — external call on every page load, fragile)
- Pre-seed all species (ruled out — 1000+ records of setup overhead, defeats sample app purpose)
- Cache on first encounter (chosen)
