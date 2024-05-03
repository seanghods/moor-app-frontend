import { router, useLocalSearchParams } from "expo-router";
import { usePost } from "@/src/app/context/PostContext";
import { useEffect, useRef, useState } from "react";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import {
  useColorScheme,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Button, Text, useTheme, XStack, YStack } from "tamagui";
import AuthorButton from "@/src/components/content-components/AuthorButton";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContext";
import { PostType, UserType } from "@/src/api-types/api-types";
import { useTrending } from "../context/TrendingContext";
import BottomSheet from "@/src/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const postPage: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { user, setUser } = useUser();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { trendingPosts, setTrendingPosts } = useTrending();
  const [newDiscussionName, setNewDiscussionName] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { currentPost, setCurrentPost } = usePost();
  function openModal() {
    bottomSheetRef.current?.present();
  }
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  useEffect(() => {
    async function getPostData() {
      const response = await fetch(`${API_ROUTES.post}?id=${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCurrentPost(data.post);
    }
    getPostData();
  }, []);
  async function postVote(voteType: "up" | "down") {
    if (user && currentPost) {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(API_ROUTES.postVote, {
          method: "POST",
          body: JSON.stringify({
            postId: currentPost._id,
            voteType,
          }),
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUser((prevUser: UserType | null): UserType | null => {
          if (prevUser === null) {
            return null;
          }
          return {
            ...prevUser,
            postVotes: data.postVotes,
          };
        });
        setCurrentPost((prevPost: PostType | null): PostType | null => {
          if (prevPost === null) {
            return null;
          }
          return {
            ...prevPost,
            voteCount: data.voteCount,
          };
        });
        const currentPostIndex = trendingPosts?.findIndex(
          (p) => p._id === currentPost._id
        );
        if (
          currentPostIndex !== -1 &&
          currentPostIndex !== undefined &&
          trendingPosts
        ) {
          const updatedTrendingPosts = [
            ...trendingPosts.slice(0, currentPostIndex),
            {
              ...trendingPosts[currentPostIndex],
              voteCount: data.voteCount,
            },
            ...trendingPosts.slice(currentPostIndex + 1),
          ];
          setTrendingPosts(updatedTrendingPosts);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push("/authentication/login");
    }
  }

  async function createDiscussion() {
    if (user && currentPost) {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(API_ROUTES.discussion, {
        method: "POST",
        body: JSON.stringify({
          postId: currentPost._id,
          title: newDiscussionName,
        }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCurrentPost((prevPost: PostType | null): PostType | null => {
        if (prevPost === null) {
          return null;
        }
        return {
          ...prevPost,
          discussions: [...prevPost.discussions, data.discussion],
        };
      });

      router.push(`/discussions/${data.discussion._id}`);
    } else {
      router.push("/authentication/login");
    }
  }
  useEffect(() => {
    async function getPostData() {
      if (!currentPost) {
        const response = await fetch(`${API_ROUTES.post}?id=${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setCurrentPost(data.post);
      }
    }
    getPostData();
  }, [currentPost]);
  function getVoteColor(voteType: "up" | "down") {
    const hasVoted = user?.postVotes.some(
      (vote) => vote.post === currentPost?._id && vote.vote === voteType
    );
    return hasVoted ? theme.blue10.val : theme.color12.val;
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <BottomSheet ref={bottomSheetRef} post={currentPost} />
      <XStack w={"100%"} justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          style={{ alignSelf: "flex-start", marginVertical: 2 }}
          onPress={() =>
            router.push(`/communities/${currentPost?.community._id}`)
          }
        >
          <XStack pl={14} gap={8} alignItems="center" mt={12} pt={10} py={3}>
            <MaterialIcons name="groups" size={25} color={theme.color12.val} />
            <Text fontSize={20} fontWeight={"700"}>
              {currentPost?.community.name}
            </Text>
          </XStack>
        </TouchableOpacity>
        {user &&
        (user._id === currentPost?.creator._id ||
          user.isAdmin ||
          currentPost?.community.moderators.includes(user._id)) ? (
          <TouchableOpacity
            style={{
              zIndex: 25,
              paddingTop: 10,
            }}
            onPress={() => openModal()}
          >
            <Entypo
              name="dots-three-vertical"
              size={18}
              color={theme.color12.val}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ) : null}
      </XStack>
      <XStack
        gap={8}
        pt={2}
        p={8}
        bbw={2}
        bbc={colorScheme == "light" ? "#eee" : "#333333"}
      >
        <YStack flex={1}>
          <YStack>
            <Text fontSize={25} fontWeight="700" py={3}>
              {currentPost?.title}
            </Text>
          </YStack>
          {currentPost?.creator ? (
            <AuthorButton creator={currentPost?.creator} type="post" />
          ) : null}
          {currentPost?.link && (
            <YStack
              w="100%"
              h="auto"
              aspectRatio={2}
              justifyContent="center"
              alignItems="center"
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  alignItems: "center",
                }}
                onPress={() => handleLinkPress(currentPost.link as string)}
              >
                <Image
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                  source={{ uri: currentPost.thumbnail }}
                />
                <YStack
                  pos="absolute"
                  bottom={21}
                  right={23}
                  bg="rgba(0, 0, 0, 0.5)"
                  w="90%"
                  p={3}
                  overflow="hidden"
                  borderRadius={12}
                >
                  <Text color="white" fontSize={10} textAlign="center">
                    {currentPost?.domain}
                  </Text>
                </YStack>
              </TouchableOpacity>
            </YStack>
          )}
          <Text fontSize={15} flexGrow={1} p={8} mb={10}>
            {currentPost?.description}
          </Text>
          <XStack
            gap={12}
            alignSelf="flex-start"
            p={5}
            px={8}
            br={15}
            bw={1}
            bc={Colors.extraColors.lightGray}
          >
            <XStack gap={7}>
              <XStack gap={3} alignItems="center">
                <TouchableOpacity onPress={() => postVote("up")}>
                  <Ionicons
                    name="chevron-up"
                    size={15}
                    color={getVoteColor("up")}
                  />
                </TouchableOpacity>
                <Text> {currentPost?.voteCount} </Text>
                <TouchableOpacity onPress={() => postVote("down")}>
                  <Ionicons
                    name="chevron-down"
                    size={15}
                    color={getVoteColor("down")}
                  />
                </TouchableOpacity>
              </XStack>
            </XStack>
            <XStack gap={5} alignItems="flex-end">
              <MaterialCommunityIcons
                name="comment-outline"
                size={18}
                color={theme.color12.val}
              />
              <Text fontSize={16}>
                {currentPost?.discussions.reduce(
                  (acc, currArray) => acc + (currArray.comments?.length ?? 0),
                  0
                )}
              </Text>
            </XStack>
          </XStack>
        </YStack>
      </XStack>
      <YStack>
        <XStack p={20} justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight={"700"}>
            Discussion Board:
          </Text>
        </XStack>

        <YStack gap={20}>
          {currentPost?.discussions.map((discussion, index) => {
            return (
              <Button
                size={"$6"}
                theme={
                  discussion.title == "Discussion"
                    ? "blue"
                    : discussion.title == "Questions"
                    ? "orange"
                    : discussion.title == "More Resources"
                    ? "green"
                    : "blue"
                }
                alignItems="center"
                w="90%"
                h={100}
                alignSelf="center"
                onPress={() => router.push(`/discussions/${discussion._id}`)}
                key={index}
              >
                <YStack gap={10}>
                  <YStack alignItems="center">
                    <Text fontWeight={"700"}>{discussion.title}</Text>
                  </YStack>
                  <XStack gap={2} alignItems="center" justifyContent="center">
                    <Text style={{ fontSize: 14 }}>
                      {discussion.comments?.length ?? 0}
                    </Text>
                    <MaterialCommunityIcons
                      name="comment-outline"
                      size={18}
                      color={Colors[colorScheme ?? "light"].text}
                    />
                  </XStack>
                </YStack>
              </Button>
            );
          })}
        </YStack>
        <YStack alignItems="center" p={10} mt={15}>
          <XStack
            w={"90%"}
            p={5}
            justifyContent="center"
            alignItems="flex-start"
            br={12}
            bg={theme.color4.val}
          >
            <FontAwesome
              name="pencil-square-o"
              size={18}
              style={{ padding: 4 }}
              color={theme.color12.val}
            />
            <TextInput
              placeholder="add a new discussion board..."
              value={newDiscussionName}
              onChangeText={(value) => setNewDiscussionName(value)}
              style={{
                height: 25,
                paddingLeft: 5,
                width: "90%",
                color: theme.color12.val,
              }}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={theme.color11.val}
            />
          </XStack>
          <YStack w={"90%"} pt={12} alignItems="flex-end">
            <Button
              size={"$3"}
              theme={"blue"}
              onPress={() => createDiscussion()}
            >
              Create
            </Button>
          </YStack>
        </YStack>
      </YStack>
      <YStack h={40} />
    </ScrollView>
  );
};

export default postPage;
