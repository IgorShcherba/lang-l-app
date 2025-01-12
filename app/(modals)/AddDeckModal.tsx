import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useDecks } from "@/hooks/useDecks";

export default function AddDeckModal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const { addDeck } = useDecks();
  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }
    addDeck(name.trim(), language);
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Create New Deck</ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText>Deck Name</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter deck name"
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText>Language</ThemedText>
        <TextInput
          style={styles.input}
          value={language}
          onChangeText={setLanguage}
          placeholder="Enter language"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => router.back()} />
        <Button title="Create" onPress={handleSubmit} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
