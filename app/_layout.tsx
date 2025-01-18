import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import { DB_NAME } from "@/db/schema";
import { DatabaseInitializer } from "@/components/DatabaseInitializer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    if (loaded && dbInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, dbInitialized]);

  if (!loaded) {
    return null;
  }

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
      <SQLiteProvider
        databaseName={DB_NAME}
        useSuspense
        options={{ enableChangeListener: true }}
      >
        <SafeAreaProvider>
          <DatabaseInitializer onComplete={() => setDbInitialized(true)} />
          {dbInitialized && (
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: true,
                    title: "Decks",
                    headerTitleStyle: {
                      fontSize: 28,
                      fontWeight: "600",
                    },
                  }}
                />
                <Stack.Screen name="deck/[id]" options={{ title: "Deck" }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                  name="(modals)/add-deck"
                  options={{ presentation: "modal", title: "Add Deck" }}
                />
                <Stack.Screen
                  name="(modals)/add-card"
                  options={{ presentation: "modal", title: "Add Card" }}
                />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          )}
        </SafeAreaProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
