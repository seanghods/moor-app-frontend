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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text, View, Button, Form, Spinner, Image } from "tamagui";
import { router } from "expo-router";
import { useUser } from "../context/UserContext";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const colorScheme = useColorScheme();
  const { user, setUser } = useUser();
  const [formError, setFormError] = useState({ message: "" });
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
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
  const handleLogIn = async () => {
    setFormError({
      message: "",
    });
    try {
      setStatus("submitting");
      const response = await fetch(API_ROUTES.logIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        setStatus("off");
        const error = await response.json();
        if (error.message) {
          setFormError({
            message: error.message,
          });
          return;
        } else {
          throw new Error("Failed to register");
        }
      }
      setStatus("off");
      const data = await response.json();
      await AsyncStorage.setItem("userToken", data.token);
      setUser(data.user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setFormError({
        message: "Login failed. Please try again.",
      });
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
    inputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} bg="$background">
        <Image
          source={{
            width: 200,
            height: 200,
            uri: require("@/assets/images/moor-logo.jpg"),
          }}
        />
        <Form
          onSubmit={() => {
            handleLogIn();
          }}
        >
          <View>
            <View>
              <Text p={4} mb={6} fontWeight={"700"}>
                Username
              </Text>
            </View>
            <View style={dynamicStyles.inputContainer} bg="$blue4">
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
                Password
              </Text>
            </View>
            <View style={dynamicStyles.inputContainer} bg="$blue4">
              <MaterialIcons
                name="password"
                style={{ padding: 10 }}
                size={18}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="password"
                value={formData.password}
                secureTextEntry={true}
                onChangeText={(value) => handleInputChange("password", value)}
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
              Log In
            </Button>
          </Form.Trigger>
          <Text mt={16} color={"$red9"} alignSelf="center">
            {formError.message}
          </Text>
        </Form>
        <View
          mt={24}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Don't have an account yet? </Text>
          <TouchableOpacity
            onPress={() => router.push("/authentication/register")}
          >
            <Text col="$blue10">Register here</Text>
          </TouchableOpacity>
        </View>
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
