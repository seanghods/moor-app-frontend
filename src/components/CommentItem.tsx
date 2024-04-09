import { CommentType } from "@/assets/data/postsData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "tamagui";
import Colors from "../constants/Colors";
import { router } from "expo-router";

type Props = {
  comment: CommentType;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.commentItem}>
      <TouchableOpacity
        onPress={() => router.push(`/profiles/${comment.author.id}`)}
      >
        <View style={styles.commentHeader}>
          <MaterialCommunityIcons
            name="face-man-profile"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text style={{ color: Colors[colorScheme ?? "light"].info }}>
            {comment.author.username}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginBottom: 3 }}>{comment.body}</Text>
      <View style={{ flexDirection: "row", gap: 7 }}>
        <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
          <TouchableOpacity>
            <Ionicons name="chevron-up" size={15} color="black" />
          </TouchableOpacity>
          <Text> 1 </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={15} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={16}
              color={Colors[colorScheme ?? "light"].info}
            />
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].info,
                fontSize: 12,
              }}
            >
              Reply
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {comment.children && comment.children.length > 0 && (
        <View style={{ paddingLeft: 20, padding: 15 }}>
          {comment.children.map((childComment, index) => (
            <CommentItem key={index} comment={childComment} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    gap: 5,
  },
  commentHeader: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CommentItem;
