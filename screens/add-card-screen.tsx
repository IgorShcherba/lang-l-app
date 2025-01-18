import React, { useEffect, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCards } from "@/hooks/useCards";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AddCardParams = {
  deckId: string;
  cardId?: string;
};

export const AddCardScreen = () => {
  const { deckId, cardId } = useLocalSearchParams<AddCardParams>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const { addCard, editCard, cards } = useCards(parseInt(deckId, 10));

  const card = useMemo(
    () => !!cardId && cards?.find((card) => card.id === parseInt(cardId, 10)),
    [cardId, cards]
  );
  const [front, setFront] = useState((card && card?.front) || "");
  const [back, setBack] = useState((card && card?.back) || "");

  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
    }
  }, [card]);

  const handleSubmit = async () => {
    if (!front.trim() || !back.trim()) return;

    try {
      if (cardId) {
        await editCard(parseInt(cardId, 10), front.trim(), back.trim());
      } else {
        await addCard(front.trim(), back.trim());
      }
      router.back();
    } catch (error) {
      console.error("Failed to add/edit card:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Front</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#1c1c1c" : "#fff",
                  borderColor: isDark ? "#333" : "#ccc",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
              value={front}
              onChangeText={setFront}
              placeholder="Enter the front text"
              placeholderTextColor={isDark ? "#666" : "#999"}
              multiline
              returnKeyType="next"
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Back</ThemedText>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#1c1c1c" : "#fff",
                  borderColor: isDark ? "#333" : "#ccc",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
              value={back}
              onChangeText={setBack}
              placeholder="Enter the back text"
              placeholderTextColor={isDark ? "#666" : "#999"}
              multiline
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </ThemedView>
        </ThemedView>
      </ScrollView>

      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: Math.max(insets.bottom, 16),
            backgroundColor: isDark ? "#1c1c1c" : "#fff",
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
        >
          <ThemedText style={styles.buttonText}>
            {cardId ? "Save Changes" : "Add Card"}
          </ThemedText>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(128,128,128,0.2)",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
