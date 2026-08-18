CREATE TABLE `battles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`trainer_id` integer NOT NULL,
	`species_id` integer NOT NULL,
	`wild_current_hp` integer NOT NULL,
	`wild_max_hp` integer NOT NULL,
	`active_current_hp` integer,
	`active_max_hp` integer,
	`outcome` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`trainer_id`) REFERENCES `trainers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`species_id`) REFERENCES `pokemon_species`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `caught_pokemon` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`trainer_id` integer NOT NULL,
	`species_id` integer NOT NULL,
	`nickname` text,
	`caught_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`trainer_id`) REFERENCES `trainers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`species_id`) REFERENCES `pokemon_species`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_species` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`base_hp` integer NOT NULL,
	`sprite_url` text NOT NULL,
	`types` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trainers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`active_pokemon_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `trainers_username_unique` ON `trainers` (`username`);