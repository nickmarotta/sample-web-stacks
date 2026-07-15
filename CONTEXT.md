# PokéStart

A sample TanStack Start application where trainers catch and battle Pokémon. Demonstrates full-stack TanStack Start patterns including auth, Drizzle ORM, service layers, and third-party API integration.

## Language

### Trainer
A registered account that is simultaneously the auth identity and game persona. Owns a collection of caught Pokémon and designates one as their Active Pokémon.
_Avoid_: User, Player, Account

### Wild Pokémon
A Pokémon fetched from PokeAPI during an Encounter. Not owned by any Trainer. Exists only for the duration of a Battle.
_Avoid_: Enemy, Opponent, NPC Pokémon

### Pokémon Species
Cached PokeAPI data for a species (name, base HP, sprite URL, typing). Populated on first Encounter and reused thereafter.
_Avoid_: Pokédex entry, PokeAPI Pokémon

### Caught Pokémon
A Wild Pokémon that was successfully caught and now belongs to a Trainer's Collection. References a Pokémon Species.
_Avoid_: Owned Pokémon, Captured Pokémon

### Active Pokémon
The single Caught Pokémon a Trainer has designated to fight in Battles. A Trainer always has exactly one Active Pokémon (once they have caught at least one).
_Avoid_: Party Pokémon, Lead Pokémon

### Collection
The full set of Caught Pokémon owned by a Trainer.
_Avoid_: Party, Bag, Pokédex (Pokédex refers to species knowledge, not ownership)

### Encounter
The act of initiating a battle with a Wild Pokémon. Encountering and starting the Battle are the same action — there is no separate browse phase.
_Avoid_: Wild encounter, Random encounter

### Battle
An active or resolved fight between a Trainer's Active Pokémon and a Wild Pokémon. The Battle record is the source of truth for all in-battle state, including both sides' current HP.
_Avoid_: Fight, Match, Duel

### Battle Outcome
The terminal state of a Battle. One of three values: **caught** (Trainer successfully caught the Wild Pokémon), **fled** (Trainer abandoned the Battle), or **fainted** (Active Pokémon HP reached zero — catch opportunity lost, Active Pokémon auto-recovers).
_Avoid_: Result, Status (overloaded)

### Catch Attempt
An action the Trainer takes during a Battle to try to catch the Wild Pokémon. Success probability increases as the Wild Pokémon's HP decreases.
_Avoid_: Throw Pokéball, Capture

## Relationships

- A **Trainer** has exactly one **Active Pokémon** (after catching their first)
- A **Trainer** has a **Collection** of zero or more **Caught Pokémon**
- A **Battle** belongs to exactly one **Trainer** and references exactly one **Pokémon Species**
- A **Caught Pokémon** references exactly one **Pokémon Species**
- A **Pokémon Species** is shared across all **Caught Pokémon** and **Battle** records that reference it
- A **Battle** ends in exactly one **Battle Outcome**

## Example dialogue

> **Dev:** "When a Trainer starts an Encounter, do we create the Battle immediately?"
> **Domain expert:** "Yes — Encounter and Battle start are the same action. The Battle record is created with both sides' HP before the first turn."

> **Dev:** "If the Active Pokémon faints, does the Trainer lose it?"
> **Domain expert:** "No — it auto-recovers after the Battle. But the Battle Outcome is 'fainted', so the Wild Pokémon escapes uncaught."

> **Dev:** "Can I show the Trainer's Collection without hitting PokeAPI?"
> **Domain expert:** "Yes — Pokémon Species data is cached locally on first Encounter. The Collection view reads from our database only."

## Flagged ambiguities

- "Pokédex" was used loosely to mean the Trainer's Collection — resolved: **Collection** means owned Pokémon; **Pokémon Species** is the encyclopaedic species data cached from PokeAPI.
