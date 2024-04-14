import { Text, YStack } from "tamagui";
import { CommentType } from "@/assets/data/postsData";
import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";

type Props = {
  comments: Array<CommentType> | undefined;
};

const CommentFeed: React.FC<Props> = ({ comments }) => {
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

      comments.forEach((comment) => {
        commentMap[comment.id] = { ...comment, children: [] };
      });

      comments.forEach((comment) => {
        if (comment.parentComment) {
          commentMap[comment.parentComment].children.push(
            commentMap[comment.id]
          );
        }
      });

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
      <YStack flex={1} gap={10} p={10}>
        {!processedComments || processedComments.length == 0 ? (
          <YStack p={25}>
            <Text>
              There are no comments yet in this discussion board. Post one to
              get the conversation started!
            </Text>
          </YStack>
        ) : (
          processedComments.map((comment, index) => (
            <YStack key={index}>
              <CommentItem comment={comment} />
            </YStack>
          ))
        )}
        <YStack h={40} />
      </YStack>
    </>
  );
};

export default CommentFeed;
