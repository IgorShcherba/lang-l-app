import { useMemo } from "react";

import { decks } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";

export function useDecks() {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  const { data } = useLiveQuery(db.select().from(decks));

  return useMemo(() => {
    return {
      decks: data,
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
    };
  }, [data]);
}
