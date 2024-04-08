import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "tamagui";
import { CommentType } from "@/assets/data/postsData";
import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";

type Props = {
  comments: Array<CommentType> | undefined;
};

const CommentFeed: React.FC<Props> = ({ comments }) => {
  const colorScheme = useColorScheme();
  const [processedComments, setProcessedComments] = useState<
    Array<CommentType>
  >([]);
  useEffect(() => {
    if (comments) {
      setProcessedComments(nestComments(comments));
    }
  }, [comments]);
  const nestComments = (
    comments: Array<CommentType> | undefined
  ): CommentType[] => {
    if (comments !== undefined) {
      const commentMap: {
        [key: string]: CommentType & { children: CommentType[] };
      } = {};

      // First, create a map of all comments by their IDs
      comments.forEach((comment) => {
        commentMap[comment.id] = { ...comment, children: [] };
      });

      // Then, iterate through the comments to assign child comments
      comments.forEach((comment) => {
        if (comment.parentComment) {
          commentMap[comment.parentComment].children.push(
            commentMap[comment.id]
          );
        }
      });

      // Finally, filter out only top-level comments (those without a parentComment)
      const finalComments = Object.values(commentMap).filter(
        (comment) => !comment.parentComment
      );

      return finalComments;
    } else {
      return [];
    }
  };

  return (
    <>
      <View style={styles.container}>
        {!processedComments || processedComments.length == 0 ? (
          <View p={25}>
            <Text>
              There are no comments yet in this discussion board. Post one to
              get the conversation started!
            </Text>
          </View>
        ) : (
          processedComments.map((comment, index) => (
            <View key={index}>
              <CommentItem comment={comment} />
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
