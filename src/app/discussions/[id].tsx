import { usePost } from '@/src/app/context/PostContext';
import CommentFeed from '@/src/components/content-components/CommentFeed';
import { Separator, Text, View, XStack, YStack, useTheme } from 'tamagui';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { DiscussionType, PostType } from '@/src/api-types/api-types';
import { API_ROUTES } from '@/src/utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@/src/components/BottomSheet';

const Discussion = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const { currentPost, setCurrentPost } = usePost();
  const [comment, setComment] = useState<string>('');
  const [parentComment, setParentComment] = useState<string>('');
  const [currentDiscussion, setCurrentDiscussion] = useState<
    DiscussionType | undefined
  >(currentPost?.discussions.find((discussion) => discussion._id == id));
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  function openModal() {
    bottomSheetRef.current?.present();
  }
  useEffect(() => {
    setCurrentDiscussion(
      currentPost?.discussions.find((discussion) => discussion._id == id)
    );
  }, [currentPost]);
  async function postComment() {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(API_ROUTES.comment, {
      method: 'POST',
      body: JSON.stringify({
        postId: currentPost?._id,
        discussionId: currentDiscussion?._id,
        body: comment,
        parentComment: parentComment,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const discussions = currentPost?.discussions.filter(
      (discussion) => discussion._id !== data.discussion._id
    );
    discussions?.push(data.discussion);
    if (discussions) {
      setCurrentPost((prevPost: PostType | null): PostType | null => {
        if (prevPost === null) {
          return null;
        }
        return {
          ...prevPost,
          discussions: discussions,
        };
      });
    }
    setComment('');
    setParentComment('');
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: theme.background.val,
        }}
      >
        <BottomSheet ref={bottomSheetRef} discussion={currentDiscussion} />
        <XStack justifyContent='space-between' alignItems='center' mr={15}>
          <Text p={15} fontSize={20} fontWeight={'700'}>
            {currentDiscussion?.title}
          </Text>
          {user &&
          (user._id === currentDiscussion?.creator._id ||
            user.isAdmin ||
            currentPost?.community.moderators.includes(user._id)) ? (
            <TouchableOpacity onPress={() => openModal()}>
              <Entypo
                name='dots-three-vertical'
                size={18}
                color={theme.color12.val}
              />
            </TouchableOpacity>
          ) : null}
        </XStack>
        <YStack alignItems='center' p={10}>
          <XStack
            w={'90%'}
            p={10}
            justifyContent='center'
            alignItems='flex-start'
            br={12}
            bg={theme.color4.val}
          >
            <FontAwesome
              name='pencil-square-o'
              size={24}
              style={{ padding: 10 }}
              color={theme.color12.val}
            />
            <TextInput
              placeholder='add a comment...'
              value={comment}
              onChangeText={(value) => setComment(value)}
              style={{
                height: 100,
                paddingLeft: 5,
                width: '90%',
                marginTop: 8,
                color: theme.color12.val,
                textAlignVertical: 'top',
              }}
              autoCapitalize='none'
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={theme.color11.val}
            />
          </XStack>
          <YStack w={'90%'} pt={12} pr={12} alignItems='flex-end'>
            <Button onPress={() => postComment()} theme={'blue'}>
              Post
            </Button>
          </YStack>
        </YStack>
        <Separator alignSelf='stretch' />
        <View>
          {currentDiscussion?._id && (
            <CommentFeed
              comments={currentDiscussion?.comments}
              discussionId={currentDiscussion._id}
              parentComment={parentComment}
              setParentComment={setParentComment}
            />
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Discussion;
