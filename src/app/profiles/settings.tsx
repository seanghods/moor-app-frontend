import { Separator, Text, XStack, YStack, useTheme } from "tamagui";
import { useUser } from "../context/UserContext";
import { Alert, TextInput, TouchableOpacity } from "react-native";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

export default function Settings() {
  const { user, setUser } = useUser();
  const theme = useTheme();
  const [newBio, setNewBio] = useState("");
  const [newUsername, setNewUsername] = useState("");
  async function changeUsername() {
    if (!newUsername || newUsername.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long.");
      return;
    }
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ROUTES.changeUsername, {
      method: "POST",
      body: JSON.stringify({
        username: newUsername,
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            username: newUsername,
          };
        }
        return prevUser;
      });
      setNewUsername("");
    } else if (data.message == "Username already exist") {
      Alert.alert("Error", "Username already exists.");
    }
  }
  async function changeBio() {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ROUTES.changeBio, {
      method: "POST",
      body: JSON.stringify({
        bio: newBio,
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            bio: newBio,
          };
        }
        return prevUser;
      });
    }
    setNewBio("");
  }
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
          <YStack p={12} justifyContent="center" gap={12}>
            <Text fontSize={15}>Change Username:</Text>
            <Text>
              Current: <Text fontWeight={"700"}>{user.username}</Text>
            </Text>
            <TextInput
              returnKeyType="done"
              value={newUsername}
              onChangeText={setNewUsername}
              style={{
                padding: 10,
                color: theme.color12.val,
                width: "100%",
                backgroundColor: theme.color4.val,
                borderRadius: 6,
              }}
              placeholder="username..."
            />
            <XStack w={"100%"} justifyContent="flex-end">
              <TouchableOpacity onPress={() => changeUsername()}>
                <Text color={"$blue10"} mr={10}>
                  Save
                </Text>
              </TouchableOpacity>
            </XStack>
          </YStack>
          <Separator
            shadowColor={theme.color10.val}
            shadowOpacity={0.3}
            shadowRadius={1}
            shadowOffset={{ width: 0, height: 1 }}
            bc={theme.color8.val}
          />
          <YStack p={12} justifyContent="center" gap={12}>
            <Text fontSize={15}>Change Bio:</Text>
            <TextInput
              returnKeyType="done"
              value={newBio}
              onChangeText={setNewBio}
              multiline={true}
              numberOfLines={4}
              style={{
                height: 80,
                padding: 10,
                color: theme.color12.val,
                width: "100%",
                backgroundColor: theme.color4.val,
                borderRadius: 6,
              }}
              placeholder="bio..."
            />
            <XStack w={"100%"} justifyContent="flex-end">
              <TouchableOpacity onPress={() => changeBio()}>
                <Text color={"$blue10"} mr={10}>
                  Save
                </Text>
              </TouchableOpacity>
            </XStack>
          </YStack>
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
