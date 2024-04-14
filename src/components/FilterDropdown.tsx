import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { XStack, Text, View, useTheme } from "tamagui";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const theme = useTheme();
  const items = ["Computers", "Nature", "Fitness", "Learning", "Art"];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#ddd",
      padding: 10,
      marginTop: 50,
    },
    dropdown: {
      position: "absolute",
      borderRadius: 7,
      top: 40,
      left: 10,
      width: 200,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5, // for Android
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <XStack ml={25}>
          <Text fontSize={16} fontWeight={"700"}>
            Filter
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.blue9.val} />
        </XStack>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                console.log(item); // Handle the item selection
                setIsOpen(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
