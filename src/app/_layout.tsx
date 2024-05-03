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
import { TrendingProvider } from "./context/TrendingContext";
import ProfileSettingsHeader from "../components/profile-headers/ProfileSettingsHeader";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeleteUserHeader from "../components/profile-headers/DeleteUserHeader";
import ShowSettingsOrDeleteHeader from "../components/profile-headers/ShowSettingsOrDeleteHeader";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserProvider>
          <PostProvider>
            <TrendingProvider>
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
                    <Stack.Screen
                      name="communities/[id]"
                      options={{ title: "Community" }}
                    />
                    <Stack.Screen
                      name="communities/newCommunity"
                      options={{ title: "New Community" }}
                    />
                    <Stack.Screen
                      name="posts/[id]"
                      options={{ title: "Post" }}
                    />
                    <Stack.Screen
                      name="discussions/[id]"
                      options={{ title: "Discussion" }}
                    />
                    <Stack.Screen
                      name="profiles/[id]"
                      options={{
                        title: "Profile",
                        headerRight: () => (
                          <>
                            <ShowSettingsOrDeleteHeader />
                          </>
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
            </TrendingProvider>
          </PostProvider>
        </UserProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
