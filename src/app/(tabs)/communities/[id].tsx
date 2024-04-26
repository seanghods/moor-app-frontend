import PostFeed from "@/src/components/PostFeed";
import { Text, Button, YStack, XStack, useTheme, Spinner } from "tamagui";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { CommunityType } from "@/src/api-types/api-types";
import { API_ROUTES } from "@/src/utils/helpers";

const communityPage = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const [community, setCommunity] = useState<CommunityType | undefined>(
    undefined
  );
  useEffect(() => {
    async function getCommunity() {
      const response = await fetch(`${API_ROUTES.community}?id=${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setCommunity(data);
    }
    getCommunity();
  }, []);
  return (
    <YStack bg={"$background"} flex={1}>
      {community ? (
        <>
          <XStack mx={6}>
            <YStack bg="$blue3" flex={1} gap={3} p={8} pb={2} my={2}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={5} alignItems="center">
                  <MaterialIcons
                    name="groups"
                    size={25}
                    color={theme.color12.val}
                  />
                  <Text py={10} fontSize={20} fontWeight={"700"}>
                    {community.name}
                  </Text>
                </XStack>
                <Button size={"$2"} theme="blue">
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={theme.color12.val}
                  />
                </Button>
              </XStack>
              <Text my={7}>{community.description}</Text>
              <XStack
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
                    {community.followers?.length}
                  </Text>
                </XStack>
                <XStack gap={5} alignItems="flex-end">
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={16}
                    color={theme.color12.val}
                  />
                  <Text style={{ fontSize: 14 }}>{community.posts.length}</Text>
                </XStack>
              </XStack>
            </YStack>
          </XStack>
          <PostFeed posts={community.posts} showCommunity={false} />
        </>
      ) : (
        <Spinner />
      )}
    </YStack>
  );
};

export default communityPage;
