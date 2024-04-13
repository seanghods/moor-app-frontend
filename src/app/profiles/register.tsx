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
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, View, Button, Form, Spinner } from "tamagui";
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
            Register
          </Text>
        </View>
        <Form
          onSubmit={() => {
            setStatus("submitting");
          }}
        >
          <View>
            <View>
              <Text p={4} mb={6} fontWeight={"700"}>
                Username
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
                placeholder="username"
                value={postData.username}
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
              <Text p={4} mb={6} fontWeight={"700"}>
                Email
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
                placeholder="email"
                value={postData.email}
                onChangeText={(value) => handleInputChange("email", value)}
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
            <View style={dynamicStyles.inputContainer}>
              <MaterialIcons
                name="title"
                style={{ padding: 10 }}
                size={25}
                color="black"
              />
              <TextInput
                returnKeyType="done"
                placeholder="password"
                value={postData.password}
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
          <View>
            <View>
              <Text p={4} mb={6} fontWeight={"700"}>
                Confirm Password
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
                placeholder="confirm password"
                value={postData.username}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
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
              mt={8}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue5"}
            >
              Submit
            </Button>
          </Form.Trigger>
        </Form>
        <View
          mt={8}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/profiles/login")}>
            <Text col="$blue10">Login here</Text>
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
