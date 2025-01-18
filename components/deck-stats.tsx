import React, { useState } from "react";
import { StyleSheet, useColorScheme, TextInput, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

interface DeckStatsProps {
  deckName: string;
  totalCards: number;
  cardsToReview: number;
  onUpdateDeckName: (newName: string) => Promise<void>;
}

export function DeckStats({
  deckName,
  totalCards,
  cardsToReview,
  onUpdateDeckName,
}: DeckStatsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(deckName);

  const handleSave = async () => {
    if (editedName.trim() && editedName !== deckName) {
      await onUpdateDeckName(editedName.trim());
    }
    setIsEditing(false);
  };

  return (
    <ThemedView style={styles.header}>
      <ThemedView style={styles.titleContainer}>
        {isEditing ? (
          <ThemedView style={styles.editContainer}>
            <TextInput
              numberOfLines={1}
              value={editedName}
              onChangeText={setEditedName}
              style={[
                styles.titleInput,
                {
                  color: isDark ? "#fff" : "#000",
                  borderColor: isDark ? "#444" : "#ddd",
                },
              ]}
              autoFocus
              onBlur={handleSave}
              onSubmitEditing={handleSave}
            />
            <Pressable onPress={handleSave} style={styles.saveButton}>
              <AntDesign name="check" size={20} color="#34C759" />
            </Pressable>
          </ThemedView>
        ) : (
          <ThemedView style={styles.titleRow}>
            <ThemedText style={styles.deckName}>{deckName}</ThemedText>

            <Pressable
              onPress={() => {
                setEditedName(deckName);
                setIsEditing(true);
              }}
              style={({ pressed }) => [
                styles.editButton,
                pressed && styles.editButtonPressed,
              ]}
            >
              <AntDesign name="edit" size={20} color={"#007AFF"} />
            </Pressable>
          </ThemedView>
        )}
        <ThemedView>
          <ThemedText style={styles.algorithmText}>
            Learning Algorithm: General Space Repetition
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.reviewLabel}>Cards to review:</ThemedText>
      <ThemedView style={styles.reviewSection}>
        <ThemedView style={styles.reviewCircle}>
          <ThemedText style={styles.reviewNumber}>{cardsToReview}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.statsRow}>
        <ThemedView
          style={[
            styles.statsContainer,
            {
              backgroundColor: isDark ? "#2c2c2c" : "#f5f5f5",
            },
          ]}
        >
          <ThemedView style={styles.statsItem}>
            <ThemedText style={styles.statsNumber}>🗂️ {totalCards}</ThemedText>
            <ThemedText style={styles.statsLabel}>Total Cards</ThemedText>
          </ThemedView>
          <Divider />
          <ThemedView style={styles.statsItem}>
            <ThemedText style={styles.statsNumber}>📚 {0} </ThemedText>
            <ThemedText style={styles.statsLabel}>Cards Reviewed</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const Divider = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ThemedView
      style={[
        styles.divider,
        {
          backgroundColor: isDark ? "#FFF" : "#ddd",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  deckName: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  reviewSection: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  reviewCircle: {
    width: "50%",
    aspectRatio: 1,
    borderWidth: 6,
    borderColor: "#34C759",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reviewNumber: {
    fontSize: 50,
    lineHeight: 50,
    fontWeight: "600",
  },
  reviewLabel: {
    fontWeight: "800",
    fontSize: 16,
    marginTop: 8,
  },
  statsRow: {
    marginBottom: 16,
  },
  statsContainer: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  statsNumber: {
    fontSize: 14,
    fontWeight: "400",
  },
  algorithmText: {
    fontSize: 14,
    opacity: 0.7,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "600",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  editButton: {
    padding: 8,
  },
  editButtonPressed: {
    opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  saveButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  statsItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.7,
  },
});
