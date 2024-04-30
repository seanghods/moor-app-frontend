import { Text, YStack } from "tamagui";
import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { CommentType } from "../api-types/api-types";

type Props = {
  comments: Array<CommentType> | undefined;
  discussionId: string;
  parentComment: string;
  setParentComment: Function;
};

const CommentFeed: React.FC<Props> = ({
  comments,
  discussionId,
  parentComment,
  setParentComment,
}) => {
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
        commentMap[comment._id] = { ...comment, children: [] };
      });

      comments.forEach((comment) => {
        if (comment.parentComment) {
          commentMap[comment.parentComment].children.push(
            commentMap[comment._id]
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
              <CommentItem
                comment={comment}
                discussionId={discussionId}
                parentComment={parentComment}
                setParentComment={setParentComment}
              />
            </YStack>
          ))
        )}
        <YStack h={40} />
      </YStack>
    </>
  );
};

export default CommentFeed;
