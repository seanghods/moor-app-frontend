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
import { Text, Button, Form, Spinner, YStack, XStack, useTheme } from "tamagui";

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
      color: theme.color12.val,
    },
    textArea: {
      height: 140,
      paddingLeft: 5,
      width: "80%",
      marginTop: 8,
      color: theme.color12.val,
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
        <XStack>
          <YStack
            btlr={5}
            bblr={5}
            bw={1}
            bc={postType == "link" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={postType == "link" ? "$blue6" : null}
            onPress={() => setPostType("link")}
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <Entypo name="link" size={16} color="black" />
              <Text>Link</Text>
            </XStack>
          </YStack>
          <YStack
            btrr={5}
            bbrr={5}
            bw={1}
            bc={postType == "text" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={postType == "text" ? "$blue6" : null}
            onPress={() => setPostType("text")}
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <MaterialCommunityIcons
                name="subtitles-outline"
                size={16}
                color="black"
              />
              <Text>Text</Text>
            </XStack>
          </YStack>
        </XStack>
        <Form
          gap={30}
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
              width={"92%"}
              alignSelf="center"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
              mt={10}
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
                placeholderTextColor={theme.color11.val}
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
              width={"92%"}
              alignSelf="center"
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
                placeholderTextColor={theme.color11.val}
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
                width={"92%"}
                alignSelf="center"
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
                  placeholderTextColor={theme.color11.val}
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
              width={"92%"}
              alignSelf="center"
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
                placeholderTextColor={theme.color11.val}
              />
            </XStack>
          </YStack>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button
              icon={
                status === "submitting" ? () => <Spinner theme="blue" /> : null
              }
              mt={8}
              pl={30}
              pr={30}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue8"}
            >
              Post
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
