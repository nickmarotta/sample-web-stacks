import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export const trainers = sqliteTable('trainers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  activePokemonId: integer('active_pokemon_id'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const pokemonSpecies = sqliteTable('pokemon_species', {
  id: integer('id').primaryKey(), // PokeAPI numeric ID
  name: text('name').notNull(),
  baseHp: integer('base_hp').notNull(),
  spriteUrl: text('sprite_url').notNull(),
  types: text('types').notNull(), // JSON stringified string[]
})

export const caughtPokemon = sqliteTable('caught_pokemon', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  trainerId: integer('trainer_id')
    .notNull()
    .references(() => trainers.id, { onDelete: 'cascade' }),
  speciesId: integer('species_id')
    .notNull()
    .references(() => pokemonSpecies.id),
  nickname: text('nickname'),
  caughtAt: integer('caught_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const battles = sqliteTable('battles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  trainerId: integer('trainer_id')
    .notNull()
    .references(() => trainers.id, { onDelete: 'cascade' }),
  speciesId: integer('species_id')
    .notNull()
    .references(() => pokemonSpecies.id),
  wildCurrentHp: integer('wild_current_hp').notNull(),
  wildMaxHp: integer('wild_max_hp').notNull(),
  activeCurrentHp: integer('active_current_hp'), // null in starterMode
  activeMaxHp: integer('active_max_hp'),
  outcome: text('outcome', { enum: ['caught', 'fled', 'fainted'] }), // null = ongoing
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// Inferred types
export type Trainer = InferSelectModel<typeof trainers>
export type TrainerInsert = InferInsertModel<typeof trainers>

export type PokemonSpecies = InferSelectModel<typeof pokemonSpecies>
export type PokemonSpeciesInsert = InferInsertModel<typeof pokemonSpecies>

export type CaughtPokemon = InferSelectModel<typeof caughtPokemon>
export type CaughtPokemonInsert = InferInsertModel<typeof caughtPokemon>

export type Battle = InferSelectModel<typeof battles>
export type BattleInsert = InferInsertModel<typeof battles>

// Relations for Drizzle's `with:` query syntax
export const trainersRelations = relations(trainers, ({ one, many }) => ({
  activePokemon: one(caughtPokemon, {
    fields: [trainers.activePokemonId],
    references: [caughtPokemon.id],
  }),
  caughtPokemon: many(caughtPokemon),
  battles: many(battles),
}))

export const caughtPokemonRelations = relations(caughtPokemon, ({ one }) => ({
  trainer: one(trainers, {
    fields: [caughtPokemon.trainerId],
    references: [trainers.id],
  }),
  species: one(pokemonSpecies, {
    fields: [caughtPokemon.speciesId],
    references: [pokemonSpecies.id],
  }),
}))

export const battlesRelations = relations(battles, ({ one }) => ({
  trainer: one(trainers, {
    fields: [battles.trainerId],
    references: [trainers.id],
  }),
  species: one(pokemonSpecies, {
    fields: [battles.speciesId],
    references: [pokemonSpecies.id],
  }),
}))

export const pokemonSpeciesRelations = relations(pokemonSpecies, ({ many }) => ({
  caughtPokemon: many(caughtPokemon),
  battles: many(battles),
}))
