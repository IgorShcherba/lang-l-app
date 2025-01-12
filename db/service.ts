import { drizzle } from "drizzle-orm/expo-sqlite";
import { decks } from "./schema";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";

export function useDatabase() {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  return {
    async getDecks() {
      try {
        const result = await db.select().from(decks);
        return result;
      } catch (error) {
        console.error("Error fetching decks:", error);
        throw error;
      }
    },

    async addDeck(name: string, language: string) {
      try {
        const result = await db.insert(decks).values({ name, language });
        return result;
      } catch (error) {
        console.error("Error adding deck:", error);
        throw error;
      }
    },

    async deleteDeck(id: number) {
      try {
        await db.delete(decks).where(eq(decks.id, id));
      } catch (error) {
        console.error("Error deleting deck:", error);
        throw error;
      }
    },
  };
}
