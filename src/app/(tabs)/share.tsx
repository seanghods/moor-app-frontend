import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Button from "@/src/components/Button";

export default function Share() {
  const colorScheme = useColorScheme();
  const [postData, setPostData] = useState({
    community: "",
    title: "",
    link: "",
    body: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dynamicStyles = StyleSheet.create({
    textInput: {
      backgroundColor: Colors[colorScheme ?? "light"].tabIconDefault,
      borderRadius: 15,
      height: 40,
      paddingLeft: 5,
      width: "80%",
    },
    textArea: {
      backgroundColor: Colors[colorScheme ?? "light"].tabIconDefault,
      borderRadius: 15,
      height: 140,
      paddingLeft: 5,
      width: "80%",
      marginTop: 8,
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].tabIconDefault,
      borderRadius: 20,
    },
    areaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: Colors[colorScheme ?? "light"].tabIconDefault,
      borderRadius: 20,
    },
  });
  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          Create Post
        </Text>
      </View>
      <View style={dynamicStyles.inputContainer}>
        <MaterialIcons
          name="groups"
          style={{ padding: 10 }}
          size={25}
          color="black"
        />
        <TextInput
          placeholder="community"
          value={postData.community}
          onChangeText={(value) => handleInputChange("community", value)}
          style={dynamicStyles.textInput}
          autoCapitalize="none"
          placeholderTextColor={
            colorScheme === "light"
              ? Colors.extraColors.mediumGray
              : Colors.extraColors.darkGray
          }
        />
      </View>
      <View style={dynamicStyles.inputContainer}>
        <MaterialIcons
          name="title"
          style={{ padding: 10 }}
          size={25}
          color="black"
        />
        <TextInput
          placeholder="title"
          value={postData.title}
          onChangeText={(value) => handleInputChange("title", value)}
          style={dynamicStyles.textInput}
          autoCapitalize="none"
          placeholderTextColor={
            colorScheme === "light"
              ? Colors.extraColors.mediumGray
              : Colors.extraColors.darkGray
          }
        />
      </View>
      <View style={dynamicStyles.inputContainer}>
        <Entypo name="link" style={{ padding: 10 }} size={25} color="black" />
        <TextInput
          placeholder="link"
          value={postData.link}
          onChangeText={(value) => handleInputChange("link", value)}
          style={dynamicStyles.textInput}
          autoCapitalize="none"
          placeholderTextColor={
            colorScheme === "light"
              ? Colors.extraColors.mediumGray
              : Colors.extraColors.darkGray
          }
        />
      </View>
      <View style={dynamicStyles.areaContainer}>
        <MaterialCommunityIcons
          name="subtitles-outline"
          style={{ padding: 10 }}
          size={25}
          color="black"
        />
        <TextInput
          placeholder="body"
          value={postData.body}
          onChangeText={(value) => handleInputChange("body", value)}
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
      </View>
      <Button onPress={() => {}} title={"Submit"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
});
