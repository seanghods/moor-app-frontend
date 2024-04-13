import {
  Image,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import * as React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button, Text, View } from "tamagui";
import Colors from "@/src/constants/Colors";
import communities from "@/assets/data/communityData";
import { router } from "expo-router";

export default function Communities() {
  const colorScheme = useColorScheme();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <FlatList
      data={communities}
      style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
      contentContainerStyle={styles.container}
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
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              padding: 8,
              paddingTop: 2,
              borderBottomWidth: 2,
              borderBottomColor: "#eee",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "auto",
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <MaterialIcons
                name="groups"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.postTitle}>{community.title}</Text>
                <Button size={"$2"} theme="blue" mr={6}>
                  <Ionicons name="person-add-outline" size={20} color="black" />
                </Button>
              </View>
              <Text
                style={{ fontSize: 14, flexGrow: 1, paddingVertical: 3 }}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {community.description}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.extraColors.lightGray,
                  borderRadius: 15,
                  marginVertical: 5,
                  padding: 5,
                  paddingHorizontal: 8,
                  flexDirection: "row",
                  gap: 12,
                  alignSelf: "flex-start",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <Ionicons
                    name="person"
                    size={16}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text style={{ fontSize: 14 }}>
                    {community.followers.length}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={16}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text style={{ fontSize: 14 }}>{community.posts.length}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
