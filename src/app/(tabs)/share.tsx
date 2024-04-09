import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
// import { Text, View } from "@/src/components/Themed";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, View, Switch, Button, getTokenValue } from "tamagui";

export default function Share() {
  const colorScheme = useColorScheme();
  const [postType, setPostType] = useState<"link" | "text">("link");
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
      backgroundColor:
        colorScheme === "light"
          ? Colors.extraColors.lightGray
          : Colors.extraColors.mediumGray,
      borderRadius: 20,
    },
    areaContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor:
        colorScheme === "light"
          ? Colors.extraColors.lightGray
          : Colors.extraColors.mediumGray,
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
            Share an Insight
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Link</Text>
          <Switch
            checked={postType == "text"}
            onCheckedChange={() =>
              setPostType((prev) => (prev == "text" ? "link" : "text"))
            }
            bg={postType == "text" ? "$blue3Dark" : "$accentBackground"}
            native
            size="$4"
            nativeProps={{
              ios_backgroundColor: getTokenValue("$blue10Dark"),
              trackColor: {
                false: getTokenValue("$blue10Dark"),
                true: getTokenValue("$blue3Dark"),
              },
              thumbColor:
                postType == "text"
                  ? getTokenValue("$blue10Dark")
                  : getTokenValue("$blue3Dark"),
            }}
          >
            <Switch.Thumb bg={"$accentBackground"} animation="200ms" />
          </Switch>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Text</Text>
        </View>
        <View>
          <View>
            <Text p={4} mb={6} fontWeight={"700"}>
              Community
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
              Title
            </Text>
          </View>
          <View style={dynamicStyles.inputContainer}>
            <MaterialIcons
              name="title"
              style={{ padding: 10 }}
              size={25}
              color="black"
            />
            <TextInput
              returnKeyType="done"
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
        </View>
        {postType == "link" && (
          <View>
            <View>
              <Text my={6} p={4} fontWeight={"700"}>
                Link
              </Text>
            </View>
            <View style={dynamicStyles.inputContainer}>
              <Entypo
                name="link"
                style={{ padding: 10 }}
                size={25}
                color="black"
              />
              <TextInput
                returnKeyType="done"
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
          </View>
        )}
        <View>
          <View>
            <Text my={6} p={4} fontWeight={"700"}>
              Description
            </Text>
          </View>
          <View style={dynamicStyles.areaContainer}>
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
