import {
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Spinner, Text, XStack, YStack, useTheme } from "tamagui";
import { router } from "expo-router";
import { API_ROUTES } from "@/src/utils/helpers";
import { useEffect, useState } from "react";
import { CommunityType } from "@/src/api-types/api-types";
import { useUser } from "../context/UserContext";
import { useIsFocused } from "@react-navigation/native";

export default function Communities() {
  const theme = useTheme();
  const [communities, setCommunities] = useState<Array<CommunityType>>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function getCommunities() {
      const response = await fetch(API_ROUTES.allCommunity, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        return Alert.alert("Error", data.message);
      }
      setCommunities(data.communities);
    }
    getCommunities();
  }, [isFocused]);
  return (
    <>
      {communities.length == 0 ? (
        <YStack flex={1} bg={"$background"}>
          <Spinner />
        </YStack>
      ) : (
        <FlatList
          data={communities}
          style={{ backgroundColor: theme.background.val }}
          contentContainerStyle={{ gap: 5 }}
          keyExtractor={(community) => community._id.toString()}
          renderItem={({ item: community }) => (
            <ShowCommunity community={community} />
          )}
        />
      )}
    </>
  );
}

type ShowProps = {
  community: CommunityType;
};

export const ShowCommunity: React.FC<ShowProps> = ({ community }) => {
  const { user } = useUser();
  const theme = useTheme();
  return (
    <TouchableOpacity
      key={community._id}
      delayPressIn={50}
      onPress={() => {
        router.push(`/communities/${community._id}`);
      }}
      style={{ width: "100%" }}
    >
      <XStack gap={8} p={8} pt={2} bbw={2} bbc="#eee">
        <YStack
          w="30%"
          h="auto"
          aspectRatio={1}
          justifyContent="center"
          alignItems="center"
        >
          <Image
            style={{
              width: "90%",
              height: "90%",
              borderRadius: 15,
            }}
            resizeMode="cover"
            source={{
              uri: community.profileImage,
            }}
          />
        </YStack>
        <YStack flex={1}>
          <MaterialIcons name="groups" size={25} color={theme.color12.val} />
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={20} fontWeight={"700"}>
              {community.name}
            </Text>
          </XStack>
          <Text
            fontSize={14}
            flexGrow={1}
            py={3}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {community.description}
          </Text>
          <XStack
            bw={1}
            bc={theme.color8.val}
            br={15}
            p={5}
            px={8}
            gap={12}
            my={5}
            alignSelf="flex-start"
          >
            <XStack gap={5} alignItems="flex-end">
              <Ionicons name="person" size={16} color={theme.color12.val} />
              <Text style={{ fontSize: 14 }}>{community.followers.length}</Text>
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
    </TouchableOpacity>
  );
};
