import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { runMigrations } from "@/db/migrate";

type Props = {
  onComplete: () => void;
};

export function DatabaseInitializer({ onComplete }: Props) {
  const sqlite = useSQLiteContext();

  useEffect(() => {
    async function init() {
      try {
        await runMigrations(sqlite);
        onComplete();
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    }

    init();
  }, [sqlite, onComplete]);

  return null;
}
