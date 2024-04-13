import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Text,
  View,
  Switch,
  Button,
  getTokenValue,
  Form,
  Spinner,
  YStack,
  XStack,
  useTheme,
} from "tamagui";

export default function Share() {
  const theme = useTheme();
  const [postType, setPostType] = useState<"link" | "text">("link");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
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
  useEffect(() => {
    if (status === "submitting") {
      const timer = setTimeout(() => setStatus("off"), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);
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
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        bg="$background"
      >
        <YStack p={15}>
          <Text fontSize={25} fontWeight="700">
            Share an Insight
          </Text>
        </YStack>
        <XStack alignItems="center" gap={5}>
          <Text fontSize={16} fontWeight="700">
            Link
          </Text>
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
          <Text fontSize={16} fontWeight="700">
            Text
          </Text>
        </XStack>
        <Form
          gap={25}
          mt={20}
          onSubmit={() => {
            setStatus("submitting");
          }}
        >
          <YStack>
            <YStack>
              {/* <Text p={4} mb={6} fontWeight={"700"}>
                Community
              </Text> */}
            </YStack>
            <XStack
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
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
                value={postData.community}
                onChangeText={(value) => handleInputChange("community", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={theme.color9.val}
              />
            </XStack>
          </YStack>
          <YStack>
            <YStack>
              {/* <Text my={6} p={4} fontWeight={"700"}>
                Title
              </Text> */}
            </YStack>
            <XStack
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
            >
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
                placeholderTextColor={theme.color9.val}
              />
            </XStack>
          </YStack>
          {postType == "link" && (
            <YStack>
              <YStack>
                {/* <Text my={6} p={4} fontWeight={"700"}>
                  Link
                </Text> */}
              </YStack>
              <XStack
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                bg="$blue4"
              >
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
                  placeholderTextColor={theme.color9.val}
                />
              </XStack>
            </YStack>
          )}
          <YStack>
            <YStack>
              {/* <Text my={6} p={4} fontWeight={"700"}>
                Description
              </Text> */}
            </YStack>
            <XStack
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
            >
              <MaterialCommunityIcons
                name="subtitles-outline"
                style={{ padding: 10, alignSelf: "flex-start" }}
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
                placeholderTextColor={theme.color9.val}
              />
            </XStack>
          </YStack>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button
              icon={
                status === "submitting" ? () => <Spinner theme="blue" /> : null
              }
              mt={8}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue5"}
            >
              Post
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
