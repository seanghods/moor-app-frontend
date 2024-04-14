import { Text, YStack } from "tamagui";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Friends() {
  const { user } = useUser();
  //pull posts from following
  return (
    <YStack bg={"$background"} flex={1}>
      <YStack py={24} width="80%" alignSelf="center">
        {!user ? (
          <>
            <Text fontSize={16}>
              <Text
                onPress={() => router.push("/profiles/register")}
                fontSize={16}
                color="$blue10"
              >
                Create an account{" "}
              </Text>
              <Text>
                to follow other users and see their personal and community posts
                here!"
              </Text>
            </Text>
          </>
        ) : (
          <Text py={24} width="80%" fontSize={16} alignSelf="center">
            You aren't following anyone yet! Follow users to see their personal
            posts appear here.
          </Text>
        )}
      </YStack>
    </YStack>
  );
}
