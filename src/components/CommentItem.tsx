import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Text, YStack, XStack, useTheme } from "tamagui";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { CommentType } from "../api-types/api-types";

type Props = {
  comment: CommentType;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <YStack gap={5}>
      <TouchableOpacity
        onPress={() => router.push(`/profiles/${comment.creator._id}`)}
      >
        <XStack gap={5} alignItems="center">
          <MaterialCommunityIcons
            name="face-man-profile"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text color={Colors[colorScheme ?? "light"].info}>
            {comment.creator.username}
          </Text>
        </XStack>
      </TouchableOpacity>
      <Text fontSize={16} mb={3}>
        {comment.description}
      </Text>
      <XStack gap={7}>
        <XStack gap={3} alignItems="center">
          <TouchableOpacity>
            <Ionicons name="chevron-up" size={15} color={theme.color12.val} />
          </TouchableOpacity>
          <Text> 1 </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={15} color={theme.color12.val} />
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
            <CommentItem key={index} comment={childComment} />
          ))}
        </YStack>
      )}
    </YStack>
  );
};
export default CommentItem;
