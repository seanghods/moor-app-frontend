import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";

type Props = {
  onPress: () => void;
  title: string;
  size: number;
};

export default function Button(props: Props) {
  const colorScheme = useColorScheme();
  const { onPress, title = "Save", size } = props;
  const dynamicStyles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: size == 1 ? 6 : 12,
      paddingHorizontal: size == 1 ? 16 : 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: Colors[colorScheme ?? "light"].primary,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  return (
    <TouchableOpacity style={dynamicStyles.button} onPress={onPress}>
      <Text style={dynamicStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
