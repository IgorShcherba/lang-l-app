import { drizzle } from "drizzle-orm/expo-sqlite";
import { decks } from "./schema";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";
import { languages } from "./schema";
import { useMemo } from "react";

export function useDatabase() {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  return useMemo(() => {
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

      async addDeck(name: string, languageId: number) {
        try {
          const result = await db.insert(decks).values({
            name,
            languageId,
          });
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

      async getLanguages() {
        try {
          const result = await db.select().from(languages);
          return result;
        } catch (error) {
          console.error("Error fetching languages:", error);
          throw error;
        }
      },
    };
  }, [sqlite]);
}
