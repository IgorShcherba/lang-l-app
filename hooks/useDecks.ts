import { useEffect, useState } from "react";
import { useDatabase } from "@/db/service";
import { Deck } from "@/db/schema";

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const db = useDatabase();

  useEffect(() => {
    async function fetchDecks() {
      try {
        const result = await db.getDecks();
        setDecks(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch decks")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDecks();
  }, [db]);

  return { decks, loading, error };
}
