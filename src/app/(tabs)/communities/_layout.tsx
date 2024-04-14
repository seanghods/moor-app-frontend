import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { Avatar, View, XStack, useTheme } from "tamagui";
import { useUser } from "../../context/UserContext";

const StackLayout = () => {
  const { user } = useUser();
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link
            href={user ? `/profiles/${user?.id}` : "/profiles/login"}
            asChild
          >
            <Pressable>
              {({ pressed }) =>
                user && user?.profileImage ? (
                  <Avatar
                    size={"$3"}
                    mr={25}
                    circular
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  >
                    <Avatar.Image src={user.profileImage} />
                  </Avatar>
                ) : (
                  <Ionicons
                    name="person-sharp"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                    size={24}
                    color={theme.color12.val}
                  />
                )
              }
            </Pressable>
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
