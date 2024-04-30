import { useEffect, useState } from "react";
import {
  Avatar,
  Separator,
  Spinner,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  getTokenValue,
  useTheme,
} from "tamagui";
import { useUser } from "../context/UserContext";
import { ImageBackground, TouchableOpacity } from "react-native";
import PostFeed from "@/src/components/PostFeed";
import { useLocalSearchParams } from "expo-router";
import { API_ROUTES } from "@/src/utils/helpers";
import { UserType } from "@/src/api-types/api-types";

export default function Profile() {
  const { user, setUser } = useUser();
  const [shownUser, setShownUser] = useState<UserType | undefined>(undefined);
  const { id } = useLocalSearchParams();
  // useEffect(() => {
  //   console.log(user);
  //   console.log(shownUser);
  // }, [user, shownUser]);
  const theme = useTheme();
  const [viewType, setViewType] = useState<"Personal" | "History">("Personal");
  useEffect(() => {
    async function getUser() {
      if (user?._id == id) {
        setShownUser(user);
        return;
      }
      const response = await fetch(`${API_ROUTES.user}?id=${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setShownUser(data.user);
    }
    getUser();
  }, [user]);
  return (
    <YStack bg="$background" flex={1}>
      {shownUser ? (
        <>
          <ImageBackground
            source={{ uri: shownUser.coverImage }}
            resizeMode="cover"
            style={{ backgroundColor: theme.blue8.val, height: 180 }}
          >
            <XStack>
              <YStack width={"30%"} height={"100%"}>
                <YStack p={25} width="36%" gap={10}>
                  <Avatar circular bw={2} bc={theme.color12.val} size="$10">
                    <Avatar.Image src={shownUser.profileImage} />
                  </Avatar>
                </YStack>
              </YStack>
              <YStack width={"70%"} p={40} gap={5}>
                <Text fontSize={20} fontWeight={"700"}>
                  {shownUser.username}
                </Text>
                <YStack gap={1}>
                  <Text fontWeight={"700"}>Bio:</Text>
                  <Text>{shownUser.bio}</Text>
                </YStack>
              </YStack>
            </XStack>
          </ImageBackground>
          <XStack width={"100%"} height={"10%"} justifyContent="space-between">
            <XStack p={25} gap={10}>
              <YStack alignItems="center" gap={3}>
                <Text fontWeight={"700"}>
                  {shownUser.usersFollowed?.length ?? 0}
                </Text>
                <Text fontSize={10} color={"$gray10"}>
                  Followers
                </Text>
              </YStack>
              <Separator bc={"$accentColor"} vertical />
              <YStack alignItems="center" gap={3}>
                <Text fontWeight={"700"}>
                  {shownUser.usersFollowed?.length ?? 0}
                </Text>
                <Text fontSize={10} color={"$gray10"}>
                  Following
                </Text>
              </YStack>
              <Separator bc={"$accentColor"} vertical />
              <YStack alignItems="center" gap={3}>
                <Text fontWeight={"700"}>{shownUser.posts?.length ?? 0}</Text>
                <Text fontSize={10} color={"$gray10"}>
                  Post
                </Text>
              </YStack>
              <Separator bc={"$accentColor"} vertical />
              <YStack alignItems="center" gap={3}>
                <Text fontWeight={"700"}>
                  {shownUser.communitiesFollowed?.length ?? 0}
                </Text>
                <Text fontSize={10} color={"$gray10"}>
                  Communities
                </Text>
              </YStack>
            </XStack>
            <XStack>
              <XStack alignItems="center" gap={5} mr={15}>
                <Text fontSize={12} fontWeight={"700"}>
                  P
                </Text>
                <Switch
                  // checked={postType == "text"}
                  onCheckedChange={() =>
                    setViewType((prev) =>
                      prev == "Personal" ? "History" : "Personal"
                    )
                  }
                  // bg={postType == "text" ? "$blue3Dark" : "$accentBackground"}
                  native
                  size="$4"
                  nativeProps={{
                    ios_backgroundColor: getTokenValue("$blue10Dark"),
                    trackColor: {
                      false: getTokenValue("$blue10Dark"),
                      true: getTokenValue("$blue3Dark"),
                    },
                    // thumbColor:
                    //   postType == "text"
                    //     ? getTokenValue("$blue10Dark")
                    //     : getTokenValue("$blue3Dark"),
                  }}
                >
                  <Switch.Thumb bg={"$accentBackground"} animation="200ms" />
                </Switch>
                <Text fontSize={12} fontWeight={"700"}>
                  H
                </Text>
              </XStack>
            </XStack>
          </XStack>
          <XStack justifyContent="center">
            <Text fontWeight={"700"}>{viewType}</Text>
          </XStack>
          <YStack mt={12}>
            {shownUser.posts && (
              <PostFeed posts={shownUser.posts} showCommunity={true} />
            )}
          </YStack>
        </>
      ) : (
        <Spinner />
      )}
    </YStack>
  );
}
