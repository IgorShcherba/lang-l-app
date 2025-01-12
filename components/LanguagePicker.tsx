import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLanguages } from "@/hooks/useLanguages";
import { ThemedText } from "./ThemedText";
import { ActivityIndicator } from "react-native";

type Props = {
  selectedLanguage: number;
  onSelectLanguage: (languageId: number) => void;
};

export function LanguagePicker({ selectedLanguage, onSelectLanguage }: Props) {
  const { languages, loading, error } = useLanguages();

  if (loading) {
    return <ActivityIndicator size="small" />;
  }

  if (error) {
    return <ThemedText>Error loading languages</ThemedText>;
  }

  return (
    <View style={styles.container}>
      <Picker
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => onSelectLanguage(Number(itemValue))}
      >
        {languages.map((language) => (
          <Picker.Item
            key={language.id}
            label={language.name}
            value={language.id}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
  },
});
