import React from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { Text } from "react-native";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          <Link href="/profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="account-cowboy-hat"
                  size={35}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 25, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trending",
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
