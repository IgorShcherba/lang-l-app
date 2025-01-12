import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const DB_NAME = "dockly";

export const decks = sqliteTable("decks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // Name of the deck
  language: text("language").notNull(), // Language the deck focuses on
  createdAt: text("created_at").default(new Date().toISOString()), // Creation timestamp
});

export const flashcards = sqliteTable("flashcards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  deckId: integer("deck_id")
    .references(() => decks.id)
    .notNull(), // Foreign key to decks
  front: text("front").notNull(), // Front of the flashcard (source language)
  back: text("back").notNull(), // Back of the flashcard (target language)
  difficultyScore: integer("difficulty_score").default(0), // Difficulty for spaced repetition
  nextReviewDate: text("next_review_date"), // ISO string for spaced repetition
  createdAt: text("created_at").default(new Date().toISOString()), // Creation timestamp
});

export const reviewSessions = sqliteTable("review_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  flashcardId: integer("flashcard_id")
    .references(() => flashcards.id)
    .notNull(), // Foreign key to flashcards
  reviewDate: text("review_date").notNull(), // Timestamp of the review session
  success: integer("success").notNull(), // 1 for correct, 0 for incorrect
});

export type Deck = typeof decks.$inferSelect;
export type Flashcard = typeof flashcards.$inferSelect;
export type ReviewSession = typeof reviewSessions.$inferSelect;
