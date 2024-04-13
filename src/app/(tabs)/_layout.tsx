import React from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "react-native";
import { View, Text } from "@/src/components/Themed";
import { useUser } from "../context/UserContext";
import { Avatar } from "tamagui";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useUser();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 85,
          backgroundColor: Colors[colorScheme ?? "light"].primary,
        },
        tabBarInactiveTintColor: "black",
        headerRight: () => (
          <Link
            href={user ? `/profiles/${user?.id}` : "/profiles/login"}
            asChild
          >
            <Pressable>
              {({ pressed }) =>
                user && user?.profileImage ? (
                  <Avatar
                    size={"$3"}
                    mr={25}
                    circular
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  >
                    <Avatar.Image src={user.profileImage} />
                  </Avatar>
                ) : (
                  <Ionicons
                    name="person-sharp"
                    style={{ marginRight: 25, opacity: pressed ? 0.5 : 1 }}
                    size={24}
                    color="black"
                  />
                )
              }
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trending",
          headerLeft: () => (
            <TouchableOpacity>
              <View style={{ flexDirection: "row", marginLeft: 25 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>Filter</Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={Colors.light.info}
                />
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fire" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: "Communities",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="groups" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarActiveTintColor: colorScheme === "light" ? "#5C5C5C" : "white",
          tabBarItemStyle: {
            maxWidth: 70,
            padding: 5,
            marginTop: 5,
            backgroundColor: colorScheme === "light" ? "white" : "black",
            borderRadius: 10,
          },
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: !focused && colorScheme === "dark" ? "#A9A9A9" : color,
                fontSize: 10,
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="magnifying-glass"
              size={30}
              color={!focused && colorScheme === "dark" ? "#A9A9A9" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="share"
        options={{
          title: "Share",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plussquareo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
