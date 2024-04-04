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
import posts from "@/assets/data/postsData";
import Colors from "@/src/constants/Colors";

export default function Trending() {
  const colorScheme = useColorScheme();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    // <View style={styles.container}>
    <FlatList
      data={posts}
      style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: post }) => (
        <View key={post.id} style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 14,
              gap: 8,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="groups"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text style={styles.communityTitle}>{post.community.title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              padding: 8,
              paddingTop: 2,
              borderBottomWidth: 2,
              borderBottomColor: colorScheme == "light" ? "#eee" : "#333333",
            }}
          >
            {post.link && (
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
                    position: "relative",
                  }}
                  onPress={() => handleLinkPress(post.link as string)}
                >
                  <Image
                    style={{
                      width: "90%",
                      height: "90%",
                      borderRadius: 15,
                    }}
                    resizeMode="cover"
                    source={{ uri: post.thumbnail }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 11,
                      right: 16,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      width: "85%",
                      padding: 3,
                      fontSize: 10,
                      textAlign: "center",
                      overflow: "hidden",
                      borderRadius: 12,
                    }}
                  >
                    {post.domain}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: Colors[colorScheme ?? "light"].info,
                }}
              >
                {post.author.username}
              </Text>
              <Text
                style={{ fontSize: 14, flexGrow: 1, paddingVertical: 3 }}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {post.body}
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
                  <Text style={{ fontSize: 14 }}>{post.likes}</Text>
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
                  <Text style={{ fontSize: 14 }}>{post.comments.length}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
