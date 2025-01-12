import { useEffect } from "react";
import { openDatabaseSync } from "expo-sqlite";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";
import { DB_NAME } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
type Props = {
  onComplete: () => void;
};

const db = openDatabaseSync(DB_NAME);
const decklyDb = drizzle(db);

export function DatabaseInitializer({ onComplete }: Props) {
  const { success, error } = useMigrations(decklyDb, migrations);

  useEffect(() => {
    if (success) {
      onComplete();
    }
  }, [success, onComplete]);

  return null;
}
