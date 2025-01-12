import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useDecks } from "@/hooks/useDecks";
import { LanguagePicker } from "@/components/LanguagePicker";

export const AddDeckScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const [selectedLanguageId, setSelectedLanguageId] = useState(1); // Default to English (ID: 1)

  const { addDeck } = useDecks();

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }
    addDeck(name.trim(), selectedLanguageId);
    router.back();
  };
  console.log("selectedLanguageId", selectedLanguageId);
  return (
    <ThemedView style={styles.container}>
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

        <LanguagePicker
          selectedLanguage={selectedLanguageId}
          onSelectLanguage={setSelectedLanguageId}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => router.back()} />
        <Button title="Create" onPress={handleSubmit} />
      </View>
    </ThemedView>
  );
};

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
