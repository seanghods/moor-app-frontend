import { Image, FlatList, TouchableOpacity, Linking } from "react-native";
import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button, Text, XStack, YStack, useTheme } from "tamagui";
import communities from "@/assets/data/communityData";
import { router } from "expo-router";

export default function Communities() {
  const theme = useTheme();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <FlatList
      data={communities}
      style={{ backgroundColor: theme.background.val }}
      contentContainerStyle={{ gap: 5 }}
      keyExtractor={(community) => community.id.toString()}
      renderItem={({ item: community }) => (
        <TouchableOpacity
          key={community.id}
          delayPressIn={50}
          onPress={() => {
            router.push(`/communities/${community.id}`);
          }}
          style={{ width: "100%" }}
        >
          <XStack gap={8} p={8} pt={2} bbw={2} bbc="#eee">
            <YStack
              w="30%"
              h="auto"
              aspectRatio={1}
              justifyContent="center"
              alignItems="center"
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                  source={
                    community.profilePic
                      ? {
                          uri: community.profilePic,
                        }
                      : require("@/assets/images/moor-logo-grey.jpg")
                  }
                />
              </TouchableOpacity>
            </YStack>
            <YStack flex={1}>
              <MaterialIcons
                name="groups"
                size={25}
                color={theme.color12.val}
              />
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={20} fontWeight={"700"}>
                  {community.title}
                </Text>
                <Button size={"$2"} theme="blue" mr={6}>
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={theme.color12.val}
                  />
                </Button>
              </XStack>
              <Text
                fontSize={14}
                flexGrow={1}
                py={3}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {community.description}
              </Text>
              <XStack
                bw={1}
                bc={theme.color8.val}
                br={15}
                p={5}
                px={8}
                gap={12}
                my={5}
                alignSelf="flex-start"
              >
                <XStack gap={5} alignItems="flex-end">
                  <Ionicons name="person" size={16} color={theme.color12.val} />
                  <Text style={{ fontSize: 14 }}>
                    {community.followers.length}
                  </Text>
                </XStack>
                <XStack gap={5} alignItems="flex-end">
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={16}
                    color={theme.color12.val}
                  />
                  <Text style={{ fontSize: 14 }}>{community.posts.length}</Text>
                </XStack>
              </XStack>
            </YStack>
          </XStack>
        </TouchableOpacity>
      )}
    />
  );
}
