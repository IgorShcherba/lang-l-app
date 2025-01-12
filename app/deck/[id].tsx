import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeckScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <ThemedText>Deck</ThemedText>;
      </ThemedView>
    </SafeAreaView>
  );
}
