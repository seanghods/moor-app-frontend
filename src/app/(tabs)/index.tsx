import { PostType } from "@/src/api-types/api-types";
import PostFeed from "@/src/components/content-components/PostFeed";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Spinner, YStack } from "tamagui";
import { useTrending } from "../context/TrendingContext";

const Trending = () => {
  const { trendingPosts } = useTrending();
  return (
    <>
      {trendingPosts && trendingPosts.length > 0 ? (
        <PostFeed showCommunity={true} posts={trendingPosts} />
      ) : (
        <YStack flex={1} bg={"$background"}>
          <Spinner />
        </YStack>
      )}
    </>
  );
};

export default Trending;
