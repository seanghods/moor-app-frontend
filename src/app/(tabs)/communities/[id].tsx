import communities, { CommunityType } from "@/assets/data/communityData";
import { PostType, posts } from "@/assets/data/postsData";
import PostFeed from "@/src/components/PostFeed";
import { Text, View, Button, YStack, XStack, useTheme } from "tamagui";
import Colors from "@/src/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const communityPage = () => {
  // const [currentCommunity, setCurrentCommunity] = useState({});
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const [communityPosts, setCommunityPosts] = useState<PostType[]>([]);
  const [community, setCommunity] = useState<CommunityType | undefined>(
    undefined
  );
  useEffect(() => {
    async function getCommunityAndPosts() {
      const com = communities.find((comm) => comm.id == id);
      setCommunity(com);
      const commPosts = posts.filter((post) => post.community.id == id);
      setCommunityPosts(commPosts);
    }
    getCommunityAndPosts();
  }, []);
  return (
    <YStack bg={"$background"} flex={1}>
      <XStack>
        <YStack bg="$blue3" flex={1} gap={3} p={8} pb={2} my={2}>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack gap={5} alignItems="center">
              <MaterialIcons
                name="groups"
                size={25}
                color={theme.color12.val}
              />
              <Text py={10} fontSize={20} fontWeight={"700"}>
                {community?.title}
              </Text>
            </XStack>
            <Button size={"$2"} theme="blue" mr={6}>
              <Ionicons
                name="person-add-outline"
                size={20}
                color={theme.color12.val}
              />
            </Button>
          </XStack>
          <Text>{community?.description}</Text>
          <YStack
            bw={1}
            bc={"#E0E0E0"}
            br={15}
            p={5}
            px={8}
            gap={12}
            alignSelf="flex-start"
          >
            <XStack gap={5} alignItems="flex-end">
              <Ionicons name="person" size={16} color={theme.color12.val} />
              <Text style={{ fontSize: 14 }}>
                {community?.followers.length}
              </Text>
            </XStack>
            <XStack gap={5} alignItems="flex-end">
              <MaterialCommunityIcons
                name="comment-outline"
                size={16}
                color={theme.color12.val}
              />
              <Text style={{ fontSize: 14 }}>{community?.posts.length}</Text>
            </XStack>
          </YStack>
        </YStack>
      </XStack>
      <PostFeed posts={communityPosts} showCommunity={false} />
    </YStack>
  );
};

export default communityPage;
