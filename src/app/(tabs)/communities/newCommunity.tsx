import {
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, Button, YStack, XStack, useTheme } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function newCommunity() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const [communityData, setCommunityData] = useState<CommunityDataType>({
    name: "",
    description: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setCommunityData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const pickImage = async () => {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
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
        alert("File size should not exceed 5MB");
        return;
      }

      setCommunityData((prevCommunity) => {
        return {
          ...prevCommunity,
          image: {
            uri: uri,
            type: type,
            name: "community.jpg",
          },
        };
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
  const uploadData = async () => {
    if (communityData.name === "") {
      alert("Please fill in the community name");
      return;
    }
    if (communityData.name.length < 3) {
      alert("Community name must be longer than 3 characters");
      return;
    }
    if (communityData.description === "") {
      alert("Please create a community description.");
      return;
    }
    const formData = new FormData();
    if (communityData.image) {
      const { uri, type, name } = communityData.image;
      formData.append("image", {
        uri,
        type,
        name,
      } as any);
    }
    formData.append("name", communityData.name);
    formData.append("description", communityData.description);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(API_ROUTES.community, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      alert("Community created successfully");
    } catch (error) {
      console.error("Failed to upload data:", error);
    }
  };
  const dynamicStyles = StyleSheet.create({
    textInput: {
      height: 40,
      paddingLeft: 5,
      width: "80%",
    },
    textArea: {
      height: 140,
      paddingLeft: 5,
      width: "80%",
      marginTop: 8,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <YStack
        alignItems="center"
        justifyContent="flex-start"
        gap={12}
        bg="$background"
        flex={1}
      >
        <YStack p={15}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
            }}
          >
            Create a Community
          </Text>
        </YStack>
        <YStack>
          <YStack>
            <Text p={4} mb={6} fontWeight={"700"}>
              Community
            </Text>
          </YStack>
          <XStack
            br={20}
            justifyContent="center"
            alignItems="center"
            bg="$blue4"
          >
            <MaterialIcons
              name="groups"
              style={{ padding: 10 }}
              size={25}
              color="black"
            />
            <TextInput
              returnKeyType="done"
              placeholder="community"
              value={communityData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              style={dynamicStyles.textInput}
              autoCapitalize="none"
              placeholderTextColor={
                colorScheme === "light"
                  ? Colors.extraColors.mediumGray
                  : Colors.extraColors.darkGray
              }
            />
          </XStack>
        </YStack>
        <YStack w={"90%"}>
          <YStack>
            <Text my={6} p={4} fontWeight={"700"}>
              Community Picture
            </Text>
          </YStack>
          <YStack>
            <YStack alignSelf="center" mb={5}>
              {communityData.image && (
                <Image
                  source={{ uri: communityData.image.uri }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              )}
            </YStack>
            <Button
              theme="blue"
              onPress={pickImage}
              w={"80%"}
              alignSelf="center"
            >
              <Entypo name="camera" size={20} color={theme.color12.val} />
              <Text>Pick an image from your camera roll</Text>
            </Button>
          </YStack>
        </YStack>
        <YStack>
          <YStack>
            <Text my={6} p={4} fontWeight={"700"}>
              Description
            </Text>
          </YStack>
          <XStack
            br={20}
            justifyContent="center"
            alignContent="center"
            bg="$blue4"
          >
            <MaterialCommunityIcons
              name="subtitles-outline"
              style={{ padding: 10 }}
              size={25}
              color="black"
            />
            <TextInput
              placeholder="description"
              value={communityData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              style={dynamicStyles.textArea}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={
                colorScheme === "light"
                  ? Colors.extraColors.mediumGray
                  : Colors.extraColors.darkGray
              }
            />
          </XStack>
        </YStack>
        <Button
          onPress={uploadData}
          size={"$4"}
          fontWeight={"700"}
          bg={"$blue8"}
          mt={16}
        >
          Create Community
        </Button>
      </YStack>
    </TouchableWithoutFeedback>
  );
}

type CommunityDataType = {
  name: string;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
  description: string;
};
