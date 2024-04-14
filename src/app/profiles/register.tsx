import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/src/constants/Colors";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  Button,
  Form,
  Spinner,
  Image,
  YStack,
  XStack,
} from "tamagui";
import { router } from "expo-router";

export default function Register() {
  const colorScheme = useColorScheme();
  const [postType, setPostType] = useState<"link" | "text">("link");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [postData, setPostData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        <Image
          source={{
            width: 200,
            height: 200,
            uri: require("@/assets/images/moor-logo.jpg"),
          }}
        />
        <Form
          onSubmit={() => {
            setStatus("submitting");
          }}
          gap={10}
        >
          <YStack>
            <YStack>
              <Text p={4} mb={6} fontWeight={"700"}>
                Username
              </Text>
            </YStack>
            <XStack
              justifyContent="center"
              alignItems="center"
              br={20}
              bg="$blue4"
            >
              <Ionicons
                name="person-sharp"
                style={{ padding: 10 }}
                size={18}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="username"
                value={postData.username}
                onChangeText={(value) => handleInputChange("username", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
          </YStack>
          <YStack>
            <YStack>
              <Text p={4} mb={6} fontWeight={"700"}>
                Email
              </Text>
            </YStack>
            <XStack
              justifyContent="center"
              alignItems="center"
              br={20}
              bg="$blue4"
            >
              <Entypo
                name="email"
                style={{ padding: 10 }}
                size={16}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="email"
                value={postData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
          </YStack>
          <YStack>
            <YStack>
              <Text my={6} p={4} fontWeight={"700"}>
                Password
              </Text>
            </YStack>
            <XStack
              justifyContent="center"
              alignItems="center"
              br={20}
              bg="$blue4"
            >
              <MaterialIcons
                name="password"
                style={{ padding: 10 }}
                size={18}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="password"
                value={postData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
          </YStack>
          <YStack>
            <YStack>
              <Text p={4} mb={6} fontWeight={"700"}>
                Confirm Password
              </Text>
            </YStack>
            <XStack
              justifyContent="center"
              alignItems="center"
              br={20}
              bg="$blue4"
            >
              <MaterialIcons
                name="password"
                style={{ padding: 10 }}
                size={18}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="confirm password"
                value={postData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
          </YStack>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button
              icon={
                status === "submitting" ? () => <Spinner theme="blue" /> : null
              }
              mt={24}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue5"}
            >
              Register
            </Button>
          </Form.Trigger>
        </Form>
        <XStack mt={24} justifyContent="center" alignItems="center">
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/profiles/login")}>
            <Text col="$blue10">Login here</Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
