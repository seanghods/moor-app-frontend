import React from 'react';
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { Link, Tabs, router } from 'expo-router';
import { Platform, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { useUser } from '../context/UserContext';
import { Avatar, useTheme, Text, XStack } from 'tamagui';
// import Dropdown from "@/src/components/FilterDropdown";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { user } = useUser();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          height: 85,
          paddingBottom: Platform.OS === 'android' ? 15 : 0,
          backgroundColor: theme.blue9.val,
        },
        tabBarInactiveTintColor: 'black',
        headerRight: () => (
          <Link
            href={user ? `/profiles/${user?._id}` : '/authentication/login'}
            asChild
          >
            <TouchableOpacity>
              {user && user?.profileImage ? (
                <Avatar
                  size={'$3'}
                  mr={25}
                  circular
                  bw={1}
                  bc={theme.color12.val}
                  bg='white'
                >
                  <Avatar.Image scale={1.1} src={user.profileImage} />
                </Avatar>
              ) : (
                <Ionicons
                  name='person-sharp'
                  style={{ marginRight: 25 }}
                  size={24}
                  color={theme.color12.val}
                />
              )}
            </TouchableOpacity>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Trending',
          // headerLeft: () => <Dropdown />,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='fire' size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='communities'
        options={{
          title: 'Communities',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push('/communities/newCommunity')}
            >
              <XStack ml={25}>
                <FontAwesome
                  name='pencil-square-o'
                  size={23}
                  color={theme.color12.val}
                />
              </XStack>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='groups' size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarActiveTintColor: theme.color12.val,
          tabBarItemStyle: {
            maxWidth: 70,
            padding: 5,
            marginTop: 5,
            backgroundColor: theme.background.val,
            borderRadius: 10,
          },
          tabBarLabel: ({ focused, color }) => (
            <Text
              fontSize={10}
              color={!focused && colorScheme === 'dark' ? '#A9A9A9' : color}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name='magnifying-glass'
              size={30}
              color={!focused && colorScheme === 'dark' ? '#A9A9A9' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='share'
        options={{
          title: 'Share',
          tabBarIcon: ({ color }) => (
            <AntDesign name='plussquareo' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <Ionicons name='people-outline' size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
