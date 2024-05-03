import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useUser } from "../../app/context/UserContext";

const ProfileSettingsHeader = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { user } = useUser();

  if (!user || user._id !== id) {
    return null;
  }

  return (
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
  );
};

export default ProfileSettingsHeader;
