import React from "react";
import { FlatList, Pressable, Alert, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useCards } from "@/hooks/useCards";
import { useDecks } from "@/hooks/useDecks";

type Props = {
  deckId: number;
};

export const DeckDetailsScreen = ({ deckId }: Props) => {
  const { cards, deleteCard } = useCards(deckId);
  const { decks } = useDecks();
  const router = useRouter();

  const deck = decks?.find((d) => d.id === deckId);

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{deck?.name}</ThemedText>

        <FlatList
          data={cards}
          contentContainerStyle={styles.cardList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleCardPress(item.id)}>
              <ThemedView style={styles.card}>
                <ThemedView style={styles.cardContent}>
                  <ThemedText style={styles.cardText}>{item.front}</ThemedText>
                </ThemedView>
                <Pressable
                  onPress={() => handleDeleteCard(item.id)}
                  style={styles.deleteButton}
                >
                  <AntDesign name="delete" size={20} color="red" />
                </Pressable>
              </ThemedView>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText>No cards yet, add one!</ThemedText>
            </ThemedView>
          )}
        />

        <Pressable style={styles.fab} onPress={openAddCardModal}>
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  cardList: {
    flexGrow: 1,
  },
  card: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
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
