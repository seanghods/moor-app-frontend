import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Avatar, View, XStack } from "tamagui";
import { useUser } from "../../context/UserContext";

const StackLayout = () => {
  const { user } = useUser();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href={`/profiles/${user?.id}`} asChild>
            <TouchableOpacity delayPressIn={50}>
              <Avatar size={"$3"} mr={5} circular>
                <Avatar.Image src={user?.profileImage} />
              </Avatar>
            </TouchableOpacity>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Communities",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/communities/newCommunity")}
            >
              <XStack ml={10}>
                <FontAwesome name="pencil-square-o" size={23} color="black" />
              </XStack>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Community" }} />
      <Stack.Screen name="newCommunity" options={{ title: "New Community" }} />
    </Stack>
  );
};

export default StackLayout;
