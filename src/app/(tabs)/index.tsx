import { PostType } from "@/src/api-types/api-types";
import PostFeed from "@/src/components/PostFeed";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Spinner, YStack } from "tamagui";

const Trending = () => {
  const [feed, setFeed] = useState<PostType[]>([]);
  useEffect(() => {
    async function getTrending() {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(API_ROUTES.trending, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFeed(data);
    }
    getTrending();
  }, []);
  return (
    <>
      {feed.length > 0 ? (
        <PostFeed showCommunity={true} posts={feed} />
      ) : (
        <YStack flex={1} bg={"$background"}>
          <Spinner />
        </YStack>
      )}
    </>
  );
};

export default Trending;
