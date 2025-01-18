import { useMemo } from "react";
import { flashcards } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";

export function useCards(deckId: number) {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  const { data } = useLiveQuery(
    db.select().from(flashcards).where(eq(flashcards.deckId, deckId))
  );

  return useMemo(() => {
    return {
      cards: data,
      async addCard(front: string, back: string) {
        try {
          await db.insert(flashcards).values({
            deckId,
            front,
            back,
          });
        } catch (error) {
          console.error("Error adding card:", error);
          throw error;
        }
      },
      async editCard(cardId: number, front: string, back: string) {
        try {
          await db
            .update(flashcards)
            .set({ front, back })
            .where(eq(flashcards.id, cardId));
        } catch (error) {
          console.error("Error editing card:", error);
          throw error;
        }
      },
      async deleteCard(cardId: number) {
        try {
          await db.delete(flashcards).where(eq(flashcards.id, cardId));
        } catch (error) {
          console.error("Error deleting card:", error);
          throw error;
        }
      },
    };
  }, [data, deckId, db]);
}
