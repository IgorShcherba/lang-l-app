import { DeckDetailsScreen } from "@/screens/deck-details-screen";
import { useLocalSearchParams } from "expo-router";

export default function DeckScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <DeckDetailsScreen deckId={parseInt(id, 10)} />;
}
