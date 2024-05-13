import { Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import * as React from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Text, View, XStack, YStack } from 'tamagui';
import { router } from 'expo-router';
import { usePost } from '@/src/app/context/PostContext';
import AuthorButton from './AuthorButton';
import { useTheme } from 'tamagui';
import { PostType, UserType } from '../../api-types/api-types';
import { useUser } from '../../app/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROUTES } from '../../utils/helpers';
import { useTrending } from '../../app/context/TrendingContext';

type Props = {
  posts: Array<PostType>;
  showCommunity: boolean;
  setCommunity?: Function;
};

const PostFeed: React.FC<Props> = ({ posts, showCommunity, setCommunity }) => {
  const theme = useTheme();
  return (
    <FlatList
      data={posts}
      style={{ backgroundColor: theme.background.val }}
      contentContainerStyle={{ gap: 5 }}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item: post }) => (
        <ShowPost
          post={post}
          showCommunity={showCommunity}
          setCommunity={setCommunity}
        />
      )}
    />
  );
};

export default PostFeed;

type ShowProps = {
  post: PostType;
  showCommunity: boolean;
  setCommunity?: Function;
};

export const ShowPost: React.FC<ShowProps> = ({
  post,
  showCommunity,
  setCommunity,
}) => {
  const theme = useTheme();
  const { trendingPosts, setTrendingPosts } = useTrending();
  const { setCurrentPost } = usePost();
  const { user, setUser } = useUser();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  async function postVote(voteType: 'up' | 'down') {
    if (user && post) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_ROUTES.postVote, {
          method: 'POST',
          body: JSON.stringify({
            postId: post._id,
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
            postVotes: data.postVotes,
          };
        });
        const currentPostIndex = trendingPosts?.findIndex(
          (p) => p._id === post._id
        );
        if (
          currentPostIndex !== -1 &&
          currentPostIndex !== undefined &&
          trendingPosts
        ) {
          const updatedTrendingPosts = [
            ...trendingPosts.slice(0, currentPostIndex),
            {
              ...trendingPosts[currentPostIndex],
              voteCount: data.voteCount,
            },
            ...trendingPosts.slice(currentPostIndex + 1),
          ];
          setTrendingPosts(updatedTrendingPosts);
        }
        if (setCommunity) {
          setCommunity((prevCommunity: any) => {
            if (prevCommunity) {
              const updatedPosts = prevCommunity.posts.map((p: any) => {
                if (p._id === post._id) {
                  return {
                    ...p,
                    voteCount: data.voteCount,
                  };
                }
                return p;
              });
              return {
                ...prevCommunity,
                posts: updatedPosts,
              };
            }
            return prevCommunity;
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
    const hasVoted = user?.postVotes.some(
      (vote) => vote.post === post?._id && vote.vote === voteType
    );
    return hasVoted ? theme.blue10.val : theme.color12.val;
  }
  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={() => {
        setCurrentPost(post);
        router.push(`/posts/${post._id}`);
      }}
    >
      <View key={post._id} style={{ width: '100%' }}>
        {showCommunity ? (
          <TouchableOpacity
            delayPressIn={50}
            style={{ alignSelf: 'flex-start', marginVertical: 4 }}
            onPress={() => router.push(`/communities/${post.community._id}`)}
          >
            <XStack pl={14} gap={8} alignItems='center'>
              <MaterialIcons
                name='groups'
                size={25}
                color={theme.color12.val}
              />
              <Text fontSize={16} fontWeight={'700'}>
                {post.community.name}
              </Text>
            </XStack>
          </TouchableOpacity>
        ) : (
          <YStack h={10} w={'100%'} />
        )}
        <XStack gap={8} p={8} pt={2} bbw={2} bbc={theme.color4.val}>
          {post.link && (
            <YStack
              w='30%'
              h='auto'
              aspectRatio={1}
              justifyContent='center'
              alignContent='center'
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
                onPress={() => handleLinkPress(post.link as string)}
              >
                <Image
                  style={{ width: '90%', height: '90%', borderRadius: 15 }}
                  resizeMode='cover'
                  source={{ uri: post.thumbnail }}
                />
                <YStack
                  pos='absolute'
                  bottom={11}
                  right={16}
                  bg={'rgba(0, 0, 0, 0.5)'}
                  width='85%'
                  p={3}
                  br={12}
                  overflow='hidden'
                >
                  <Text color='white' fontSize={10} textAlign='center'>
                    {post.domain}
                  </Text>
                </YStack>
              </TouchableOpacity>
            </YStack>
          )}
          <View
            style={{
              flex: 1,
            }}
          >
            <Text fontSize={20} fontWeight={'700'} letterSpacing={-0.3}>
              {post.title}
            </Text>
            <XStack gap={26} alignItems='center'>
              <AuthorButton creator={post.creator} type='feed' />
              <Text
                pt={2}
                fontWeight={'700'}
                fontSize={12}
                color={theme.color12.val}
              >
                - {new Date(post.createdAt).toLocaleDateString().slice(0, -5)}
              </Text>
            </XStack>
            <Text
              fontSize={14}
              flexGrow={1}
              py={5}
              letterSpacing={-0.3}
              numberOfLines={3}
              ellipsizeMode='tail'
            >
              {post.description}
            </Text>
            <XStack
              gap={12}
              p={5}
              px={8}
              my={5}
              br={15}
              alignSelf='flex-start'
              bw={1}
              bc={'#E0E0E0'}
            >
              <XStack gap={7}>
                <XStack alignItems='center'>
                  <TouchableOpacity onPress={() => postVote('up')}>
                    <Ionicons
                      name='chevron-up'
                      size={15}
                      color={getVoteColor('up')}
                    />
                  </TouchableOpacity>
                  <Text> {post.voteCount} </Text>
                  <TouchableOpacity onPress={() => postVote('down')}>
                    <Ionicons
                      name='chevron-down'
                      size={15}
                      color={getVoteColor('down')}
                    />
                  </TouchableOpacity>
                </XStack>
              </XStack>
              <XStack gap={5} alignItems='flex-end'>
                <MaterialCommunityIcons
                  name='comment-outline'
                  size={16}
                  color={theme.color12.val}
                />
                <Text fontSize={14}>
                  {' '}
                  {post?.discussions.reduce(
                    (acc, currArray) => acc + currArray?.comments?.length ?? 0,
                    0
                  )}
                </Text>
              </XStack>
            </XStack>
          </View>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};
