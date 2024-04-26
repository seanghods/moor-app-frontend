import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { PostProvider } from "./context/PostContext";
import { TamaguiProvider, createTamagui } from "tamagui";
import config from "@/tamagui.config";
import { UserProvider } from "./context/UserContext";
import { Feather } from "@expo/vector-icons";

const tamaguiConfig = createTamagui(config);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    DMSans: require("../../assets/fonts/DMSans.ttf"),
    DMSansSemiBold: require("../../assets/fonts/DMSans-SemiBold.ttf"),
    DMSansBold: require("../../assets/fonts/DMSans-Bold.ttf"),
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
    <UserProvider>
      <PostProvider>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme as any}
        >
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
                name="discussions/[id]"
                options={{ title: "Discussion" }}
              />
              <Stack.Screen
                name="profiles/[id]"
                options={{
                  title: "Profile",
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/profiles/settings");
                      }}
                    >
                      <Feather
                        name="settings"
                        size={24}
                        color={colorScheme === "dark" ? "#eee" : "black"}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="profiles/settings"
                options={{ title: "Settings" }}
              />
              <Stack.Screen
                name="authentication/login"
                options={{ title: "Log In" }}
              />
              <Stack.Screen
                name="authentication/register"
                options={{ title: "Register" }}
              />
            </Stack>
          </ThemeProvider>
        </TamaguiProvider>
      </PostProvider>
    </UserProvider>
  );
}
