import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import Colors from "@/src/constants/Colors";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { Text, Button, Form, Spinner, Image, YStack, XStack } from "tamagui";
import { router } from "expo-router";
import { useUser } from "../context/UserContext";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const colorScheme = useColorScheme();
  const { user, setUser } = useUser();
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    setFormError({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
    });
    if (!formData.email.includes("@")) {
      setFormError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
      return;
    }
    if (formData.password.length < 6) {
      setFormError((prevState) => ({
        ...prevState,
        password: "Password must be greater than 6 characters.",
      }));
      return;
    }
    if (formData.username.length < 3) {
      setFormError((prevState) => ({
        ...prevState,
        username: "Username must be greater than 3 characters.",
      }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError((prevState) => ({
        ...prevState,
        password: "Passwords do not match.",
      }));
      return;
    }
    try {
      setStatus("submitting");
      const response = await fetch(API_ROUTES.register, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        setStatus("off");
        const error = await response.json();
        if (error.message) {
          setFormError((prevState) => ({
            ...prevState,
            message: error.message,
          }));
          return;
        } else {
          throw new Error("Failed to register");
        }
      }
      const data = await response.json();
      setStatus("off");
      await AsyncStorage.setItem("userToken", data.token);
      setUser(data.user);
      router.push("/");
    } catch (error) {
      setStatus("off");
      console.error("Registration failed:", error);
      setFormError((prevState) => ({
        ...prevState,
        message: "Registration failed. Please try again.",
      }));
    }
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
            handleSubmit();
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
                value={formData.username}
                onChangeText={(value) => handleInputChange("username", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
            <Text mt={5}>{formError.username}</Text>
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
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
            <Text mt={5}>{formError.email}</Text>
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
                secureTextEntry={true}
                placeholder="password"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
            <Text mt={5}>{formError.password}</Text>
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
                value={formData.confirmPassword}
                secureTextEntry={true}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={Colors.extraColors.mediumGray}
              />
            </XStack>
            <Text mt={5}>{formError.confirmPassword}</Text>
          </YStack>
          <Text>{formError.message}</Text>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button
              icon={
                status === "submitting" ? () => <Spinner theme="blue" /> : null
              }
              mt={24}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue8"}
            >
              Register
            </Button>
          </Form.Trigger>
        </Form>
        <XStack mt={24} justifyContent="center" alignItems="center">
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/authentication/login")}
          >
            <Text col="$blue10">Login here</Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
