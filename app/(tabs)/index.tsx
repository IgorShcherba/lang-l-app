import React from "react";
import { ActivityIndicator } from "react-native";
import { useDecks } from "@/hooks/useDecks";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { decks, loading, error } = useDecks();

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <ThemedText style={{ fontSize: 24, marginBottom: 16 }}>
          Your Decks
        </ThemedText>
        {decks.map((deck) => (
          <ThemedView
            key={deck.id}
            style={{ padding: 16, marginBottom: 8, borderRadius: 8 }}
          >
            <ThemedText>{deck.name}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </SafeAreaView>
  );
}
