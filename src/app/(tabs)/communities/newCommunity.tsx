import {
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
import { Text, View, Switch, Button, getTokenValue } from "tamagui";

export default function newCommunity() {
  const colorScheme = useColorScheme();
  const [postType, setPostType] = useState<"link" | "text">("link");
  const [postData, setPostData] = useState({
    community: "",
    picture: "",
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
    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    areaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      borderRadius: 20,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} bg="$background">
        <View style={{ padding: 15 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "700",
            }}
          >
            Create a Community
          </Text>
        </View>
        <View>
          <View>
            <Text p={4} mb={6} fontWeight={"700"}>
              Community
            </Text>
          </View>
          <View style={dynamicStyles.inputContainer} bg="$blue4">
            <MaterialIcons
              name="groups"
              style={{ padding: 10 }}
              size={25}
              color="black"
            />
            <TextInput
              returnKeyType="done"
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
        </View>
        <View>
          <View>
            <Text my={6} p={4} fontWeight={"700"}>
              Picture
            </Text>
          </View>
          <View style={dynamicStyles.inputContainer} bg="$blue4">
            <Entypo
              name="image"
              style={{ padding: 10 }}
              size={24}
              color="black"
            />
            <TextInput
              returnKeyType="done"
              placeholder="community picture"
              value={postData.picture}
              onChangeText={(value) => handleInputChange("picture", value)}
              style={dynamicStyles.textInput}
              autoCapitalize="none"
              placeholderTextColor={
                colorScheme === "light"
                  ? Colors.extraColors.mediumGray
                  : Colors.extraColors.darkGray
              }
            />
          </View>
        </View>
        <View>
          <View>
            <Text my={6} p={4} fontWeight={"700"}>
              Description
            </Text>
          </View>
          <View style={dynamicStyles.areaContainer} bg="$blue4">
            <MaterialCommunityIcons
              name="subtitles-outline"
              style={{ padding: 10 }}
              size={25}
              color="black"
            />
            <TextInput
              placeholder="description"
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
        </View>
        <Button mt={8} size={"$5"} fontWeight={"700"} bg={"$blue5"}>
          Submit
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
});
