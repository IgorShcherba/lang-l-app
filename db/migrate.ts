import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import type { SQLiteDatabase } from "expo-sqlite";
import migrations from "./migrations/migrations";

export async function runMigrations(sqlite: SQLiteDatabase) {
  const db = drizzle(sqlite);

  // Create migrations table with SQLite-compatible syntax
  await sqlite.execAsync(`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL,
      created_at INTEGER
    )
  `);

  try {
    await migrate(db, migrations);
    console.log("Migrations completed");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}
