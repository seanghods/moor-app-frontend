import { Separator, Text, XStack, YStack, useTheme } from "tamagui";
import { useUser } from "../context/UserContext";
import { TouchableOpacity } from "react-native";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";

export default function Settings() {
  const { user, setUser } = useUser();
  const theme = useTheme();
  async function handleLogOut() {
    await AsyncStorage.removeItem("userToken");
    setUser(null);
    router.push("/");
  }
  return (
    <YStack bg={"$background"} flex={1}>
      {user ? (
        <>
          <XStack alignItems="center" p={35} gap={10}>
            <YStack>
              <Text fontSize={20} fontWeight={"700"}>
                Settings
              </Text>
              <Text fontSize={15} color={"$gray10"}>
                Manage your account settings
              </Text>
            </YStack>
          </XStack>
          <Separator
            shadowColor={theme.color10.val}
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
          <XStack p={12} justifyContent="space-between" alignItems="center">
            <Text fontSize={15}>Edit Bio</Text>
            <Entypo name="chevron-right" size={24} color={theme.color12.val} />
          </XStack>
          <Separator
            shadowColor={theme.color10.val}
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
          <XStack p={12} justifyContent="space-between" alignItems="center">
            <Text fontSize={15}>Change Username</Text>
            <Entypo name="chevron-right" size={24} color={theme.color12.val} />
          </XStack>
          <Separator
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
          <XStack p={12} justifyContent="space-between" alignItems="center">
            <Text fontSize={15}>Change Email</Text>
            <Entypo name="chevron-right" size={24} color={theme.color12.val} />
          </XStack>
          <Separator
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
          <TouchableOpacity onPress={() => handleLogOut()}>
            <XStack p={12} justifyContent="space-between" alignItems="center">
              <Text color={"$red10"} fontSize={15}>
                Log Out
              </Text>
              <Entypo
                name="chevron-right"
                size={24}
                color={theme.color12.val}
              />
            </XStack>
          </TouchableOpacity>
          <Separator
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
        </>
      ) : (
        <Text p={15} fontSize={15}>
          Please log in to view your settings.
        </Text>
      )}
    </YStack>
  );
}
