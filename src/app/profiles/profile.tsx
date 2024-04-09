import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Avatar,
  ScrollView,
  Separator,
  Switch,
  Text,
  View,
  XStack,
  YStack,
  getTokenValue,
} from "tamagui";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const [viewType, setViewType] = useState<"personal" | "history">("personal");
  return (
    // <ScrollView bg="$background" flex={1}>
    <YStack bg="$background" flex={1}>
      <View bg="$blue8" width={"100%"} height={"30%"}>
        <YStack p={25} width="36%" gap={10}>
          <Avatar circular size="$10">
            <Avatar.Image src={user?.profileImage} />
          </Avatar>
          <Text alignSelf="center" fontSize={20} fontWeight={"700"}>
            {user?.username}
          </Text>
        </YStack>
      </View>
      <XStack width={"100%"} height={"10%"} justifyContent="space-between">
        <XStack p={25} gap={10}>
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>40K</Text>
            <Text fontSize={10} color={"$gray10"}>
              Followers
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>400</Text>
            <Text fontSize={10} color={"$gray10"}>
              Following
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>40</Text>
            <Text fontSize={10} color={"$gray10"}>
              Post
            </Text>
          </YStack>
          <Separator bc={"$accentColor"} vertical />
          <YStack alignItems="center" gap={3}>
            <Text fontWeight={"700"}>40</Text>
            <Text fontSize={10} color={"$gray10"}>
              Communities
            </Text>
          </YStack>
        </XStack>
        <XStack>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginRight: 15,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>P</Text>
            <Switch
              // checked={postType == "text"}
              onCheckedChange={() =>
                setViewType((prev) =>
                  prev == "personal" ? "history" : "personal"
                )
              }
              // bg={postType == "text" ? "$blue3Dark" : "$accentBackground"}
              native
              size="$4"
              nativeProps={{
                ios_backgroundColor: getTokenValue("$blue10Dark"),
                trackColor: {
                  false: getTokenValue("$blue10Dark"),
                  true: getTokenValue("$blue3Dark"),
                },
                // thumbColor:
                //   postType == "text"
                //     ? getTokenValue("$blue10Dark")
                //     : getTokenValue("$blue3Dark"),
              }}
            >
              <Switch.Thumb bg={"$accentBackground"} animation="200ms" />
            </Switch>
            <Text style={{ fontSize: 12, fontWeight: "700" }}>H</Text>
          </View>
        </XStack>
      </XStack>
      <XStack justifyContent="center">
        <Text fontWeight={"700"}>{viewType}</Text>
      </XStack>
    </YStack>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});