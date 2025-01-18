import React from "react";
import {
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useDecks } from "@/hooks/useDecks";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export function DecksScreen() {
  const { decks, deleteDeck } = useDecks();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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

  const openAddDeckModal = () => {
    router.push("/(modals)/add-deck");
  };

  const handleDeckPress = (deckId: number) => {
    router.push(`/deck/${deckId}`);
  };

  return (
    <ThemedView style={[styles.container]}>
      <FlatList
        data={decks}
        contentContainerStyle={styles.deckList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleDeckPress(item.id)}
            style={({ pressed }) => [
              styles.deckPressable,
              pressed && styles.deckPressed,
            ]}
          >
            <ThemedView
              style={[
                styles.deck,
                {
                  backgroundColor: isDark
                    ? Colors.dark.card
                    : Colors.light.card,
                },
              ]}
            >
              <ThemedView style={styles.deckContent}>
                <ThemedText style={styles.deckName}>{item.name}</ThemedText>
              </ThemedView>
              <Pressable
                onPress={() => {
                  handleDeleteDeck(item.id, item.name);
                }}
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.deleteButtonPressed,
                ]}
              >
                <AntDesign
                  name="delete"
                  size={20}
                  color={isDark ? "#ff6b6b" : "red"}
                />
              </Pressable>
            </ThemedView>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No decks found, add one!
            </ThemedText>
          </ThemedView>
        )}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={openAddDeckModal}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  deckList: {
    flexGrow: 1,
  },
  deckPressable: {
    marginBottom: 12,
  },
  deckPressed: {
    opacity: 0.7,
  },
  deck: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deckContent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  deckName: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
  },
  deleteButtonPressed: {
    opacity: 0.7,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
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
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
