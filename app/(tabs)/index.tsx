import React from "react";
import { ActivityIndicator, Button, FlatList, View } from "react-native";
import { useDecks } from "@/hooks/useDecks";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { decks, loading, error } = useDecks();
  const router = useRouter();

  const openAddDeckModal = () => {
    router.push({
      pathname: "/(modals)/AddDeckModal",
    });
  };

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

        <View style={{ marginTop: 16 }}>
          <Button title="Add New Deck" onPress={openAddDeckModal} />
        </View>

        <FlatList
          data={decks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView
              style={{ padding: 16, marginBottom: 8, borderRadius: 8 }}
            >
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
