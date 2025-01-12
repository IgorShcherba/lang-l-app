import { useEffect, useState } from "react";
import { useDatabase } from "@/db/service";
import { Language } from "@/db/schema";

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const db = useDatabase();

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const result = await db.getLanguages();
        setLanguages(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch languages")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchLanguages();
  }, [db]);
  return { languages, loading, error };
}
