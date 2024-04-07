import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "tamagui";
import Colors from "../constants/Colors";
import { CommentType } from "@/assets/data/postsData";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  comments: Array<CommentType> | undefined;
};

const CommentFeed: React.FC<Props> = ({ comments }) => {
  const colorScheme = useColorScheme();
  return (
    <>
      <View style={styles.container}>
        {!comments || comments.length == 0 ? (
          <View p={25}>
            <Text>
              There are no comments yet in this discussion board. Post one to
              get the conversation started!
            </Text>
          </View>
        ) : (
          comments.map((comment, index) => (
            <View key={index} style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginRight: 15,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text style={{ color: Colors[colorScheme ?? "light"].info }}>
                    {comment.author.username}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Entypo
                    name="dots-three-vertical"
                    size={16}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 16 }}>{comment.body}</Text>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <View
                  style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
                >
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
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
  },
});

export default CommentFeed;
