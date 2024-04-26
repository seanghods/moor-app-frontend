import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { Avatar, XStack, useTheme } from "tamagui";
import { useUser } from "../../context/UserContext";

const StackLayout = () => {
  const { user } = useUser();
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link
            href={user ? `/profiles/${user?._id}` : "/authentication/login"}
            asChild
          >
            <TouchableOpacity>
              {user && user?.profileImage ? (
                <Avatar
                  size={"$3"}
                  mr={5}
                  circular
                  bw={1}
                  bc={theme.color12.val}
                >
                  <Avatar.Image src={user.profileImage} />
                </Avatar>
              ) : (
                <Ionicons
                  name="person-sharp"
                  style={{ marginRight: 5 }}
                  size={24}
                  color={theme.color12.val}
                />
              )}
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
