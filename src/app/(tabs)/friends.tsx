import { Spinner, Text, YStack } from "tamagui";
import { useUser } from "../context/UserContext";
import { router } from "expo-router";
import { PostType } from "@/src/api-types/api-types";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostFeed from "@/src/components/content-components/PostFeed";

export default function Friends() {
  const { user } = useUser();
  const [friendsPosts, setFriendsPosts] = useState<PostType[]>([]);
  useEffect(() => {
    async function getFriendsPosts() {
      if (user) {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(API_ROUTES.friendsPosts, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setFriendsPosts(data.posts);
      }
    }
    getFriendsPosts();
  }, [user]);
  return (
    <YStack bg={"$background"} flex={1}>
      {!user ? (
        <>
          <YStack py={24} width="80%" alignSelf="center">
            <Text fontSize={16}>
              <Text
                onPress={() => router.push("/authentication/register")}
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
          </YStack>
        </>
      ) : user.usersFollowing.length == 0 ? (
        <YStack py={24} width="80%" alignSelf="center">
          <Text fontSize={16}>
            You aren't following anyone yet! Follow users to see their personal
            posts appear here.
          </Text>
        </YStack>
      ) : friendsPosts.length == 0 ? (
        <YStack py={24} width="80%" alignSelf="center">
          <Spinner />
        </YStack>
      ) : (
        <YStack>
          <PostFeed
            posts={friendsPosts}
            showCommunity={true}
            setCommunity={setFriendsPosts}
          />
        </YStack>
      )}
    </YStack>
  );
}
