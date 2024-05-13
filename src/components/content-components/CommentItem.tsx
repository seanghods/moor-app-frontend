import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Text, YStack, XStack, useTheme, Avatar, Separator } from 'tamagui';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import { CommentType, PostType, UserType } from '../../api-types/api-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROUTES } from '../../utils/helpers';
import { usePost } from '../../app/context/PostContext';
import { useUser } from '../../app/context/UserContext';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '../BottomSheet';

type Props = {
  comment: CommentType;
  discussionId: string;
  parentComment: string;
  setParentComment: Function;
};

const CommentItem: React.FC<Props> = ({
  comment,
  discussionId,
  parentComment,
  setParentComment,
}) => {
  const { user, setUser } = useUser();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { currentPost, setCurrentPost } = usePost();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  function openModal() {
    bottomSheetRef.current?.present();
  }
  async function commentVote(voteType: 'up' | 'down') {
    if (user) {
      user.commentVotes.push({ comment: comment._id, vote: voteType });
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_ROUTES.commentVote, {
          method: 'POST',
          body: JSON.stringify({
            commentId: comment._id,
            voteType,
          }),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
      router.push('/authentication/login');
    }
  }
  function getVoteColor(voteType: 'up' | 'down') {
    const hasVoted = user?.commentVotes.some(
      (vote) => vote.comment === comment._id && vote.vote === voteType
    );
    return hasVoted ? theme.blue10.val : theme.color12.val;
  }
  return (
    <YStack gap={5}>
      <BottomSheet ref={bottomSheetRef} comment={comment} />
      <XStack gap={24} alignItems='center'>
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => router.push(`/profiles/${comment.creator._id}`)}
        >
          <XStack gap={1} alignItems='center'>
            <Avatar
              size={'$1'}
              flex={1}
              mr={5}
              circular
              bw={1}
              bc={theme.color12.val}
            >
              <Avatar.Image scale={1.1} src={comment.creator.profileImage} />
            </Avatar>
            <Text color={Colors[colorScheme ?? 'light'].info}>
              {comment.creator.username}
            </Text>
          </XStack>
        </TouchableOpacity>
        <XStack gap={2}>
          <Text pt={1} fontSize={12} color={theme.color12.val}>
            - {new Date(comment.createdAt).toLocaleDateString().slice(0, -5)}
          </Text>
          <Text pt={1} fontSize={12} color={theme.color12.val}>
            -{' '}
            {new Date(comment.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </XStack>
      </XStack>
      <Text fontSize={16} mb={3}>
        {comment.body}
      </Text>
      <XStack gap={7} alignItems='center'>
        <XStack gap={3} alignItems='center'>
          <TouchableOpacity onPress={() => commentVote('up')}>
            <Ionicons name='chevron-up' size={15} color={getVoteColor('up')} />
          </TouchableOpacity>
          <Text> {comment.voteCount} </Text>
          <TouchableOpacity onPress={() => commentVote('down')}>
            <Ionicons
              name='chevron-down'
              size={15}
              color={getVoteColor('down')}
            />
          </TouchableOpacity>
        </XStack>
        <TouchableOpacity
          onPress={() =>
            setParentComment(parentComment == comment._id ? '' : comment._id)
          }
        >
          <XStack gap={5}>
            <MaterialCommunityIcons
              name='comment-outline'
              size={16}
              color={Colors[colorScheme ?? 'light'].info}
            />
            <Text fontSize={12} color={Colors[colorScheme ?? 'light'].info}>
              Reply
            </Text>
            {parentComment == comment._id && (
              <Text fontSize={12}>Replying</Text>
            )}
          </XStack>
        </TouchableOpacity>
        {user &&
        (user._id === comment?.creator._id ||
          user.isAdmin ||
          currentPost?.community.moderators.includes(user._id)) ? (
          <TouchableOpacity onPress={() => openModal()}>
            <Entypo
              name='dots-three-horizontal'
              size={18}
              color={theme.color12.val}
            />
          </TouchableOpacity>
        ) : null}
      </XStack>
      {comment.children && comment.children.length > 0 && (
        <YStack>
          {comment.children.map((childComment, index) => (
            <YStack mt={15} key={index}>
              <XStack gap={20}>
                <Separator vertical={true} bc={theme.color9.val} />
                <CommentItem
                  comment={childComment}
                  discussionId={discussionId}
                  parentComment={parentComment}
                  setParentComment={setParentComment}
                />
              </XStack>
            </YStack>
          ))}
        </YStack>
      )}
    </YStack>
  );
};
export default CommentItem;
