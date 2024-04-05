import { FlatList, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { CommentType } from "@/assets/data/postsData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  comments: Array<CommentType> | undefined;
};

const CommentFeed: React.FC<Props> = ({ comments }) => {
  const colorScheme = useColorScheme();
  return (
    <>
      <View style={styles.container}>
        {comments?.map((comment) => (
          <View style={{ gap: 5 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialCommunityIcons
                name="face-man-profile"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
                // style={{}}
              />
              <Text style={{ color: Colors[colorScheme ?? "light"].info }}>
                {comment.author.username}
              </Text>
            </View>
            <Text style={{ fontSize: 16 }}>{comment.body}</Text>
          </View>
        ))}
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
