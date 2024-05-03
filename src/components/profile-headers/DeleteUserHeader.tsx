import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "../../app/context/UserContext";
import { useTheme } from "tamagui";

const DeleteUserHeader = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const theme = useTheme();

  if (!user?.isAdmin || user?._id == id) {
    return null;
  }

  const handlePress = () => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to do this?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteUser(),
        },
      ],
      { cancelable: true }
    );
  };

  async function deleteUser() {
    Alert.prompt;
    const response = await fetch(`/api/user&id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      router.back();
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress();
      }}
    >
      <FontAwesome6 name="user-xmark" size={24} color="darkred" />
    </TouchableOpacity>
  );
};

export default DeleteUserHeader;
