import React from "react";
import { FlatList, Pressable, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useDecks } from "@/hooks/useDecks";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function DecksScreen() {
  const { decks, deleteDeck } = useDecks();
  const router = useRouter();

  const openAddDeckModal = () => {
    router.push("/(modals)/add-deck");
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
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Your Decks</ThemedText>

        <FlatList
          data={decks}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.deckList}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleDeckPress(item.id)}>
              <ThemedView style={styles.deckItem}>
                <ThemedText>{item.name}</ThemedText>
                <Pressable
                  onPress={(e) => {
                    handleDeleteDeck(item.id, item.name);
                  }}
                  style={styles.deleteButton}
                >
                  <AntDesign name="delete" size={20} color="red" />
                </Pressable>
              </ThemedView>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText>No decks found , add one!</ThemedText>
            </ThemedView>
          )}
        />

        <Pressable style={styles.fab} onPress={openAddDeckModal}>
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  deckList: {
    flex: 1,
  },
  deckItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
