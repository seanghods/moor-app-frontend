import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Avatar, View } from "tamagui";
import { useUser } from "../../context/UserContext";

const StackLayout = () => {
  const colorScheme = useColorScheme();
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
              <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <FontAwesome name="pencil-square-o" size={23} color="black" />
              </View>
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
