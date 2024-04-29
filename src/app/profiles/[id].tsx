import { useState } from "react";
import {
  Avatar,
  Separator,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  getTokenValue,
  useTheme,
} from "tamagui";
import { useUser } from "../context/UserContext";
import { ImageBackground } from "react-native";
import PostFeed from "@/src/components/PostFeed";

export default function Profile() {
  const { user, setUser } = useUser();
  const theme = useTheme();
  const [viewType, setViewType] = useState<"Personal" | "History">("Personal");
  return (
    // <ScrollView bg="$background" flex={1}>
    <YStack bg="$background" flex={1}>
      <ImageBackground
        source={{ uri: user?.coverImage }}
        resizeMode="cover"
        style={{ backgroundColor: theme.blue8.val }}
      >
        <View width={"100%"} height={"30%"}>
          <YStack p={25} width="36%" gap={10}>
            <Avatar circular bw={2} bc={theme.color12.val} size="$10">
              <Avatar.Image src={user?.profileImage} />
            </Avatar>
            <Text alignSelf="center" fontSize={20} fontWeight={"700"}>
              {user?.username}
            </Text>
          </YStack>
        </View>
      </ImageBackground>
      <XStack width={"100%"} height={"10%"} justifyContent="space-between">
        <XStack p={25} gap={10}>
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>{user?.usersFollowed?.length ?? 0}</Text>
            <Text fontSize={10} color={"$gray10"}>
              Followers
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>{user?.usersFollowed?.length ?? 0}</Text>
            <Text fontSize={10} color={"$gray10"}>
              Following
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>{user?.posts?.length ?? 0}</Text>
            <Text fontSize={10} color={"$gray10"}>
              Post
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>
              {user?.communitiesFollowed?.length ?? 0}
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
        {user?.posts && <PostFeed posts={user.posts} showCommunity={true} />}
      </YStack>
    </YStack>
    // </ScrollView>
  );
}
