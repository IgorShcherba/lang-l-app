import React, { useEffect } from "react";
import {
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useCards } from "@/hooks/useCards";
import { useDecks } from "@/hooks/useDecks";
import { DeckStats } from "@/components/deck-stats";

export const DeckDetailsScreen = () => {
  const { id: deckId } = useLocalSearchParams<{ id: string }>();
  const { cards, deleteCard } = useCards(parseInt(deckId, 10));
  const { decks, updateDeck } = useDecks();
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const deck = decks?.find((d) => d.id === parseInt(deckId, 10));
  const cardsToReview = cards?.length || 0; // TODO: implement actual review logic

  const handleDeleteCard = (cardId: number) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteCard(cardId),
      },
    ]);
  };

  const openAddCardModal = () => {
    router.push({
      pathname: "/(modals)/add-card",
      params: { deckId },
    });
  };

  const handleCardPress = (cardId: number) => {
    router.push({
      pathname: "/(modals)/add-card",
      params: { cardId, deckId },
    });
  };

  const handleUpdateDeckName = async (newName: string) => {
    if (!deck) return;
    try {
      await updateDeck(deck.id, newName);
      navigation.setOptions({
        title: newName,
      });
    } catch (error) {
      console.error("Failed to update deck name:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <DeckStats
        deckName={deck?.name || ""}
        totalCards={cards?.length || 0}
        cardsToReview={cardsToReview}
        onUpdateDeckName={handleUpdateDeckName}
      />

      <FlatList
        data={cards}
        contentContainerStyle={styles.cardList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleCardPress(item.id)}
            style={({ pressed }) => [
              styles.cardPressable,
              pressed && styles.cardPressed,
            ]}
          >
            <ThemedView
              style={[
                styles.card,
                { backgroundColor: isDark ? "#2c2c2c" : "#f5f5f5" },
              ]}
            >
              <ThemedView style={styles.cardContent}>
                <ThemedText style={styles.cardText}>{item.front}</ThemedText>
              </ThemedView>
              <Pressable
                onPress={() => handleDeleteCard(item.id)}
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
              No cards yet, add one!
            </ThemedText>
          </ThemedView>
        )}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={openAddCardModal}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardList: {
    flexGrow: 1,
  },
  cardPressable: {
    marginBottom: 8,
  },
  cardPressed: {
    opacity: 0.7,
  },
  card: {
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
  cardContent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  cardText: {
    fontSize: 16,
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
