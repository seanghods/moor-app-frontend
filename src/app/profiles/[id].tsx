import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Separator,
  Spinner,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  getTokenValue,
  useTheme,
} from 'tamagui';
import { useUser } from '../context/UserContext';
import { ImageBackground, TouchableOpacity } from 'react-native';
import PostFeed from '@/src/components/content-components/PostFeed';
import { router, useLocalSearchParams } from 'expo-router';
import { API_ROUTES } from '@/src/utils/helpers';
import { UserType } from '@/src/api-types/api-types';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { user, setUser } = useUser();
  const [shownUser, setShownUser] = useState<UserType | undefined>(undefined);
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const [viewType, setViewType] = useState<'Personal' | 'History'>('History');
  useEffect(() => {
    async function getUser() {
      if (user?._id == id) {
        setShownUser(user);
        return;
      }
      const response = await fetch(`${API_ROUTES.user}?id=${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setShownUser(data.user);
    }
    getUser();
  }, [user]);
  async function followUser() {
    if (user) {
      if (shownUser) {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(API_ROUTES.followUser, {
          method: 'POST',
          body: JSON.stringify({
            userId: shownUser._id,
          }),
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          if (user.usersFollowing.some((user) => user == shownUser?._id)) {
            setUser((prevUser) => {
              if (prevUser) {
                return {
                  ...prevUser,
                  usersFollowing: prevUser.usersFollowing?.filter(
                    (id) => id != shownUser?._id
                  ),
                };
              }
              return prevUser;
            });
          } else {
            setUser((prevUser) => {
              if (prevUser) {
                return {
                  ...prevUser,
                  usersFollowing: [
                    ...(prevUser.usersFollowing ?? []),
                    shownUser?._id,
                  ],
                };
              }
              return prevUser;
            });
          }
        }
      }
    } else {
      router.push('/authentication/login');
    }
  }
  return (
    <YStack bg='$background' flex={1}>
      {shownUser ? (
        <>
          <ImageBackground
            source={{ uri: shownUser.coverImage }}
            resizeMode='cover'
            style={{ backgroundColor: theme.blue8.val, height: 180 }}
          >
            <XStack w={'100%'} h={5} justifyContent='flex-end'>
              <TouchableOpacity>
                <Text>X</Text>
              </TouchableOpacity>
            </XStack>
            <XStack>
              <YStack width={'30%'} height={'100%'}>
                <YStack p={25} width='36%' gap={10}>
                  <Avatar
                    circular
                    bw={2}
                    bc={theme.color12.val}
                    size='$10'
                    bg='white'
                  >
                    <Avatar.Image scale={1.1} src={shownUser.profileImage} />
                  </Avatar>
                </YStack>
              </YStack>
              <YStack width={'70%'} p={40} gap={5}>
                <XStack justifyContent='flex-end'>
                  {shownUser._id !== user?._id && (
                    <Button
                      size={'$2'}
                      bg={'$blue6'}
                      onPress={() => followUser()}
                    >
                      {user?.usersFollowing.some(
                        (id) => id == shownUser._id
                      ) ? (
                        <AntDesign
                          name='check'
                          size={20}
                          color={theme.color12.val}
                        />
                      ) : (
                        <Ionicons
                          name='person-add-outline'
                          size={20}
                          color={theme.color12.val}
                        />
                      )}
                    </Button>
                  )}
                </XStack>
              </YStack>
            </XStack>
          </ImageBackground>
          <YStack jc='center' ai='center'>
            <Text fontWeight={'700'} fontSize={18}>
              {shownUser.username}
            </Text>
          </YStack>
          {shownUser.bio && (
            <XStack px={10}>
              <Text fontWeight={'700'} fontSize={12}>
                Bio:{' '}
              </Text>
              <Text fontSize={12}>{shownUser.bio}</Text>
            </XStack>
          )}
          <XStack width={'100%'} height={'10%'} justifyContent='space-between'>
            <XStack p={25} gap={10}>
              <YStack alignItems='center' gap={3}>
                <Text fontWeight={'700'}>
                  {shownUser.usersFollowers?.length ?? 0}
                </Text>
                <Text fontSize={10} color={'$gray10'}>
                  Followers
                </Text>
              </YStack>
              <Separator bc={'$accentColor'} vertical />
              <YStack alignItems='center' gap={3}>
                <Text fontWeight={'700'}>
                  {shownUser.usersFollowing?.length ?? 0}
                </Text>
                <Text fontSize={10} color={'$gray10'}>
                  Following
                </Text>
              </YStack>
              <Separator bc={'$accentColor'} vertical />
              <YStack alignItems='center' gap={3}>
                <Text fontWeight={'700'}>{shownUser.posts?.length ?? 0}</Text>
                <Text fontSize={10} color={'$gray10'}>
                  Post
                </Text>
              </YStack>
              <Separator bc={'$accentColor'} vertical />
              <YStack alignItems='center' gap={3}>
                <Text fontWeight={'700'}>
                  {shownUser.communitiesFollowed?.length ?? 0}
                </Text>
                <Text fontSize={10} color={'$gray10'}>
                  Communities
                </Text>
              </YStack>
            </XStack>
            <XStack>
              <XStack alignItems='center' gap={5} mr={15}>
                <Text fontSize={12} fontWeight={'700'}>
                  H
                </Text>
                <Switch
                  onCheckedChange={() =>
                    setViewType((prev) =>
                      prev == 'Personal' ? 'History' : 'Personal'
                    )
                  }
                  native
                  size='$4'
                  nativeProps={{
                    ios_backgroundColor: getTokenValue('$blue10Dark'),
                    trackColor: {
                      false: getTokenValue('$blue10Dark'),
                      true: getTokenValue('$blue3Dark'),
                    },
                  }}
                >
                  <Switch.Thumb bg={'$accentBackground'} animation='200ms' />
                </Switch>
                <Text fontSize={12} fontWeight={'700'}>
                  P
                </Text>
              </XStack>
            </XStack>
          </XStack>
          <XStack justifyContent='center'>
            <Text fontWeight={'700'}>{viewType}</Text>
          </XStack>
          <YStack mt={12}>
            {shownUser.posts && (
              <PostFeed
                posts={
                  viewType == 'Personal'
                    ? shownUser.posts.filter(
                        (post) => post.community.name == 'Personal'
                      )
                    : shownUser.posts.filter(
                        (post) => post.community.name !== 'Personal'
                      )
                }
                showCommunity={true}
              />
            )}
          </YStack>
        </>
      ) : (
        <Spinner />
      )}
    </YStack>
  );
}
