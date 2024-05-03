import {
  Button,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
import { useUser } from "../context/UserContext";
import { Alert, Image, TextInput, TouchableOpacity } from "react-native";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import validateInput from "@/src/components/ValidateInputFunction";

export default function Settings() {
  const { user, setUser } = useUser();
  const theme = useTheme();
  const [image, setImage] = useState({
    uri: "",
    type: "",
    name: "profilePic.jpg",
  });
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  async function changeUsername() {
    if (!newUsername || newUsername.length < 3 || newUsername.length > 12) {
      Alert.alert(
        "Error",
        "Username must be at least 3 characters long and less than 13."
      );
      return;
    }
    if (!validateInput(newUsername, true)) {
      Alert.alert(
        "Error",
        "Username can only contain letters, numbers, and underscores."
      );
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
  async function changePassword() {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ROUTES.changePassword, {
      method: "POST",
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      Alert.alert("Success", "Password changed successfully.");
      setCurrentPassword("");
      setnewPassword("");
    } else {
      Alert.alert("Error", "Failed to change password.");
    }
    setCurrentPassword("");
    setnewPassword("");
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
  const pickImage = async () => {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Photos", "Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets[0].uri
    ) {
      const asset = pickerResult.assets[0];
      const uri = asset.uri;
      const type = getMimeType(uri);
      if (asset.fileSize && asset.fileSize > 5048000) {
        // 5MB in bytes
        Alert.alert("Error", "File size should not exceed 5MB");
        return;
      }

      setImage({
        uri: uri,
        type: type,
        name: user?.username ?? "profilePic.jpg",
      });
    }
  };
  const getMimeType = (uri: string): string => {
    const extension = uri.split(".").pop(); // Extracts the extension from the URI
    const lowerCaseExtension = extension ? extension.toLowerCase() : "";

    switch (lowerCaseExtension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      default:
        return "application/octet-stream"; // Default fallback for unknown types
    }
  };
  const changeProfilePic = async () => {
    if (image.uri) {
      const formData = new FormData();
      const { uri, type, name } = image;
      formData.append("image", {
        uri,
        type,
        name,
      } as any);
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(API_ROUTES.changeProfilePic, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await response.json();
        if (data.success) {
          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser,
                profileImage: data.image,
              };
            }
            return prevUser;
          });
          setImage({
            uri: "",
            type: "",
            name: "profilePic.jpg",
          });
          Alert.alert("Success", "Profile picture updated successfully");
        } else {
          Alert.alert("Error", "Failed to update profile picture");
        }
      } catch (error) {
        console.error("Failed to upload data:", error);
      }
    } else {
      Alert.alert("Error", "Please select an image to upload");
    }
  };
  return (
    <ScrollView bg={"$background"} flex={1}>
      <YStack>
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
              <Text fontSize={15} fontWeight={"700"}>
                Change Profile Picture:
              </Text>
              <YStack>
                <YStack alignSelf="center" mb={5}>
                  {image.uri && (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                  )}
                </YStack>
                <Button
                  theme="blue"
                  onPress={pickImage}
                  w={"40%"}
                  alignSelf="center"
                >
                  <Entypo name="camera" size={20} color={theme.color12.val} />
                  <Text>Pick an image</Text>
                </Button>
              </YStack>
              <XStack w={"100%"} justifyContent="flex-end">
                <TouchableOpacity onPress={() => changeProfilePic()}>
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
              <Text fontSize={15} fontWeight={"700"}>
                Change Username:
              </Text>
              <Text>
                Current: <Text fontWeight={"700"}>{user.username}</Text>
              </Text>
              <TextInput
                returnKeyType="done"
                value={newUsername}
                maxLength={12}
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
              <Text fontSize={15} fontWeight={"700"}>
                Change Password:
              </Text>
              <TextInput
                returnKeyType="done"
                autoCapitalize="none"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={{
                  padding: 10,
                  color: theme.color12.val,
                  width: "100%",
                  backgroundColor: theme.color4.val,
                  borderRadius: 6,
                }}
                placeholder="current password..."
              />
              <TextInput
                returnKeyType="done"
                autoCapitalize="none"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={setnewPassword}
                style={{
                  padding: 10,
                  color: theme.color12.val,
                  width: "100%",
                  backgroundColor: theme.color4.val,
                  borderRadius: 6,
                }}
                placeholder="new password..."
              />
              <XStack w={"100%"} justifyContent="flex-end">
                <TouchableOpacity onPress={() => changePassword()}>
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
              <Text fontSize={15} fontWeight={"700"}>
                Change Bio:
              </Text>
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
            <YStack h={60} />
          </>
        ) : (
          <Text p={15} fontSize={15}>
            Please log in to view your settings.
          </Text>
        )}
      </YStack>
    </ScrollView>
  );
}
