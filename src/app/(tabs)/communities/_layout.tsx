import Colors from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Avatar } from "tamagui";
import { useUser } from "../../context/UserContext";

const StackLayout = () => {
  const colorScheme = useColorScheme();
  const { user } = useUser();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href={`/profiles/${user?.id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <Avatar
                  size={"$3"}
                  mr={5}
                  circular
                  style={{ opacity: pressed ? 0.5 : 1 }}
                >
                  <Avatar.Image src={user?.profileImage} />
                </Avatar>
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Communities",
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Community" }} />
    </Stack>
  );
};

export default StackLayout;
