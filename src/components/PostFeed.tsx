import { PostType } from "@/assets/data/postsData";
import {
  Image,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, View, XStack, YStack } from "tamagui";
import Colors from "@/src/constants/Colors";
import { router } from "expo-router";
import { usePost } from "@/src/app/context/PostContext";
import AuthorButton from "./AuthorButton";
import { useTheme } from "tamagui";

type Props = {
  posts: Array<PostType>;
  showCommunity: boolean;
};

const PostFeed: React.FC<Props> = ({ posts, showCommunity }) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { setCurrentPost } = usePost();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <FlatList
      data={posts}
      style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
      contentContainerStyle={{ gap: 5 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: post }) => (
        <TouchableOpacity
          delayPressIn={50}
          onPress={() => {
            setCurrentPost(post);
            router.push(`/posts/${post.id}`);
          }}
        >
          <View key={post.id} style={{ width: "100%" }}>
            {showCommunity && (
              <TouchableOpacity
                delayPressIn={50}
                style={{ alignSelf: "flex-start", marginVertical: 2 }}
                onPress={() => router.push(`/communities/${post.community.id}`)}
              >
                <XStack pl={14} gap={8} alignItems="center">
                  <MaterialIcons
                    name="groups"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text fontSize={16} fontWeight={"700"}>
                    {post.community.title}
                  </Text>
                </XStack>
              </TouchableOpacity>
            )}
            <XStack
              gap={8}
              p={8}
              pt={2}
              bbw={2}
              bbc={colorScheme == "light" ? "#eee" : "#333333"}
            >
              {post.link && (
                <YStack
                  w="30%"
                  h="auto"
                  aspectRatio={1}
                  justifyContent="center"
                  alignContent="center"
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    onPress={() => handleLinkPress(post.link as string)}
                  >
                    <Image
                      style={{ width: "90%", height: "90%", borderRadius: 15 }}
                      resizeMode="cover"
                      source={{ uri: post.thumbnail }}
                    />
                    <YStack
                      pos="absolute"
                      bottom={11}
                      right={16}
                      bg={"rgba(0, 0, 0, 0.5)"}
                      width="85%"
                      p={3}
                      br={12}
                      overflow="hidden"
                    >
                      <Text color="white" fontSize={10} textAlign="center">
                        {post.domain}
                      </Text>
                    </YStack>
                  </TouchableOpacity>
                </YStack>
              )}
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text fontSize={20} fontWeight={"700"} letterSpacing={-0.3}>
                  {post.title}
                </Text>
                <AuthorButton author={post.author} type="feed" />
                <Text
                  fontSize={14}
                  flexGrow={1}
                  py={5}
                  letterSpacing={-0.3}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {post.body}
                </Text>
                <XStack
                  gap={12}
                  p={5}
                  px={8}
                  my={5}
                  br={15}
                  alignSelf="flex-start"
                  bw={1}
                  bc={Colors.extraColors.lightGray}
                >
                  <XStack gap={7}>
                    <XStack alignItems="center">
                      <TouchableOpacity>
                        <Ionicons
                          name="chevron-up"
                          size={15}
                          color={theme.color12.val}
                        />
                      </TouchableOpacity>
                      <Text> {post.voteCount} </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="chevron-down"
                          size={15}
                          color={theme.color12.val}
                        />
                      </TouchableOpacity>
                    </XStack>
                  </XStack>
                  <XStack gap={5} alignItems="flex-end">
                    <MaterialCommunityIcons
                      name="comment-outline"
                      size={16}
                      color={theme.color12.val}
                    />
                    <Text fontSize={14}>
                      {" "}
                      {post?.discussions.reduce(
                        (acc, currArray) => acc + currArray.comments.length,
                        0
                      )}
                    </Text>
                  </XStack>
                </XStack>
              </View>
            </XStack>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default PostFeed;
