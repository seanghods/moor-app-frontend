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
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text, View } from "@/src/components/Themed";
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
              <TouchableOpacity style={{ width: "100%", height: "100%" }}>
                <Image
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                  source={require("@/assets/images/moor-logo-grey.jpg")}
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
              <Text style={styles.postTitle}>{community.title}</Text>
              <Text
                style={{ fontSize: 14, flexGrow: 1, paddingVertical: 3 }}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {community.description}
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <AntDesign
                    name="hearto"
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
                {/* <TouchableOpacity
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 10,
                    backgroundColor: Colors[colorScheme ?? "light"].primary,
                  }}
                >
                  <Text style={{ color: "white" }}>Follow</Text>
                </TouchableOpacity> */}
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
    fontWeight: "bold",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
