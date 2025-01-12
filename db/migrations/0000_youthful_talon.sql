CREATE TABLE `decks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`language` text NOT NULL,
	`created_at` text DEFAULT '2025-01-12T11:16:11.838Z'
);
--> statement-breakpoint
CREATE TABLE `flashcards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`deck_id` integer NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`difficulty_score` integer DEFAULT 0,
	`next_review_date` text,
	`created_at` text DEFAULT '2025-01-12T11:16:11.839Z',
	FOREIGN KEY (`deck_id`) REFERENCES `decks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `review_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`flashcard_id` integer NOT NULL,
	`review_date` text NOT NULL,
	`success` integer NOT NULL,
	FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards`(`id`) ON UPDATE no action ON DELETE no action
);
