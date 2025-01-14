import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCards } from "@/hooks/useCards";

export const AddCardScreen = () => {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const router = useRouter();
  const { addCard } = useCards(parseInt(deckId, 10));

  const handleSubmit = async () => {
    if (!front.trim() || !back.trim()) return;

    try {
      await addCard(front.trim(), back.trim());
      router.back();
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Add New Card</ThemedText>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Front</ThemedText>
            <TextInput
              style={styles.input}
              value={front}
              onChangeText={setFront}
              placeholder="Enter the front text"
              placeholderTextColor="#666"
              multiline
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Back</ThemedText>
            <TextInput
              style={styles.input}
              value={back}
              onChangeText={setBack}
              placeholder="Enter the back text"
              placeholderTextColor="#666"
              multiline
            />
          </ThemedView>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSubmit}
          >
            <ThemedText style={styles.buttonText}>Add Card</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
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
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
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
