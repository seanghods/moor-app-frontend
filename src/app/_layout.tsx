import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PostProvider } from "../PostContext";
import { TamaguiProvider, createTamagui } from "tamagui";
import config from "@/tamagui.config";

const tamaguiConfig = createTamagui(config);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PostProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: "Back" }}
            />
            <Stack.Screen name="posts/[id]" options={{ title: "Post" }} />
            <Stack.Screen
              name="communities/[id]"
              options={{ title: "Community" }}
            />
            <Stack.Screen
              name="discussions/[id]"
              options={{ title: "Discussion" }}
            />
            <Stack.Screen
              name="profile"
              options={{ presentation: "modal", title: "Profile" }}
            />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </PostProvider>
  );
}
