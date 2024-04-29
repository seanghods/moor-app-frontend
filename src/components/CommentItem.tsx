import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Text, YStack, XStack, useTheme, Avatar } from "tamagui";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { CommentType, PostType, UserType } from "../api-types/api-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ROUTES } from "../utils/helpers";
import { usePost } from "../app/context/PostContext";
import { useUser } from "../app/context/UserContext";

type Props = {
  comment: CommentType;
  discussionId: string;
};

const CommentItem: React.FC<Props> = ({ comment, discussionId }) => {
  const { user, setUser } = useUser();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { currentPost, setCurrentPost } = usePost();
  async function commentVote(voteType: "up" | "down") {
    if (user) {
      user.commentVotes.push({ comment: comment._id, vote: voteType });
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(API_ROUTES.commentVote, {
          method: "POST",
          body: JSON.stringify({
            commentId: comment._id,
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
            commentVotes: data.commentVotes,
          };
        });

        const discussionIndex = currentPost?.discussions.findIndex(
          (discussion) => discussion._id == discussionId
        );
        const commentIndex = currentPost?.discussions[
          discussionIndex as number
        ].comments.findIndex((com) => comment._id == com._id);
        if (commentIndex !== undefined && discussionIndex !== undefined) {
          setCurrentPost((prevPost: PostType | null): PostType | null => {
            if (prevPost === null) {
              return null;
            }
            return {
              ...prevPost,
              discussions: prevPost.discussions.map((discussion, index) => {
                if (index === discussionIndex) {
                  return {
                    ...discussion,
                    comments: discussion.comments.map((comment, index) => {
                      if (index === commentIndex) {
                        return {
                          ...comment,
                          voteCount: data.voteCount,
                        };
                      }
                      return comment;
                    }),
                  };
                }
                return discussion;
              }),
            };
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push("/authentication/login");
    }
  }
  function getVoteColor(voteType: "up" | "down") {
    const hasVoted = user?.commentVotes.some(
      (vote) => vote.comment === comment._id && vote.vote === voteType
    );
    return hasVoted ? theme.blue10.val : theme.color12.val;
  }
  return (
    <YStack gap={5}>
      <TouchableOpacity
        onPress={() => router.push(`/profiles/${comment.creator._id}`)}
      >
        <XStack gap={5} alignItems="center">
          <Avatar
            size={"$1"}
            flex={1}
            mr={5}
            circular
            bw={1}
            bc={theme.color12.val}
          >
            <Avatar.Image src={comment.creator.profileImage} />
          </Avatar>
          <Text color={Colors[colorScheme ?? "light"].info}>
            {comment.creator.username}
          </Text>
        </XStack>
      </TouchableOpacity>
      <Text fontSize={16} mb={3}>
        {comment.body}
      </Text>
      <XStack gap={7}>
        <XStack gap={3} alignItems="center">
          <TouchableOpacity onPress={() => commentVote("up")}>
            <Ionicons name="chevron-up" size={15} color={getVoteColor("up")} />
          </TouchableOpacity>
          <Text> {comment.voteCount} </Text>
          <TouchableOpacity onPress={() => commentVote("down")}>
            <Ionicons
              name="chevron-down"
              size={15}
              color={getVoteColor("down")}
            />
          </TouchableOpacity>
        </XStack>
        <TouchableOpacity>
          <XStack gap={5}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={16}
              color={Colors[colorScheme ?? "light"].info}
            />
            <Text fontSize={12} color={Colors[colorScheme ?? "light"].info}>
              Reply
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>
      {comment.children && comment.children.length > 0 && (
        <YStack pl={20} p={15}>
          {comment.children.map((childComment, index) => (
            <CommentItem
              key={index}
              comment={childComment}
              discussionId={discussionId}
            />
          ))}
        </YStack>
      )}
    </YStack>
  );
};
export default CommentItem;
