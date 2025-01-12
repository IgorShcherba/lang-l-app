import React from "react";
import { Button, FlatList, View, Alert, Pressable } from "react-native";
import { useDecks } from "@/hooks/useDecks";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { decks, deleteDeck } = useDecks();
  const router = useRouter();

  const openAddDeckModal = () => {
    router.push({
      pathname: "/(modals)/add-deck",
    });
  };

  const handleDeleteDeck = (deckId: number, deckName: string) => {
    Alert.alert(
      "Delete Deck",
      `Are you sure you want to delete "${deckName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteDeck(deckId),
        },
      ]
    );
  };

  const handleDeckPress = (deckId: number) => {
    router.push(`/deck/${deckId}`);
  };

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
            <Pressable onPress={() => handleDeckPress(item.id)}>
              <ThemedView
                style={{
                  padding: 16,
                  marginBottom: 8,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>{item.name}</ThemedText>
                <Button
                  title="Delete"
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDeleteDeck(item.id, item.name);
                  }}
                  color="red"
                />
              </ThemedView>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <ThemedView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText>No decks found</ThemedText>
            </ThemedView>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
