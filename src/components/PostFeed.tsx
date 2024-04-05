import { PostType } from "@/assets/data/postsData";
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
import { router } from "expo-router";
import { usePost } from "@/src/PostContext";

type Props = {
  posts: Array<PostType>;
  showCommunity: boolean;
};

const PostFeed: React.FC<Props> = ({ posts, showCommunity }) => {
  const colorScheme = useColorScheme();
  const { setCurrentPost } = usePost();
  const dynamicStyles = StyleSheet.create({
    mainPostContainer: {
      flexDirection: "row",
      gap: 8,
      padding: 8,
      paddingTop: 2,
      borderBottomWidth: 2,
      borderBottomColor: colorScheme == "light" ? "#eee" : "#333333",
    },
  });
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <FlatList
      data={posts}
      style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: post }) => (
        <TouchableOpacity
          onPress={() => {
            setCurrentPost(post);
            router.push(`/posts/${post.id}`);
          }}
        >
          <View key={post.id} style={{ width: "100%" }}>
            {showCommunity && (
              <TouchableOpacity
                style={{ alignSelf: "flex-start", marginVertical: 2 }}
                onPress={() => router.push(`/communities/${post.community.id}`)}
              >
                <View style={styles.communityContainer}>
                  <MaterialIcons
                    name="groups"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <Text style={styles.communityTitle}>
                    {post.community.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View style={dynamicStyles.mainPostContainer}>
              {post.link && (
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    onPress={() => handleLinkPress(post.link as string)}
                  >
                    <Image
                      style={styles.linkPreview}
                      resizeMode="cover"
                      source={{ uri: post.thumbnail }}
                    />
                    <Text style={styles.domain}>{post.domain}</Text>
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
                    paddingVertical: 3,
                  }}
                >
                  {post.author.username}
                </Text>
                <Text
                  style={styles.body}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {post.body}
                </Text>
                <View style={styles.likeCommentContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
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
                    <Text style={{ fontSize: 14 }}>
                      {" "}
                      {post?.discussions.reduce(
                        (acc, currArray) => acc + currArray.comments.length,
                        0
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  communityContainer: {
    flexDirection: "row",
    paddingLeft: 14,
    gap: 8,
    alignItems: "center",
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
  linkContainer: {
    width: "30%",
    height: "auto",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkPreview: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
  },
  domain: {
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
  },
  body: { fontSize: 14, flexGrow: 1, paddingVertical: 5 },
  likeCommentContainer: {
    borderWidth: 1,
    borderColor: Colors.extraColors.lightGray,
    borderRadius: 15,
    marginVertical: 5,
    padding: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    gap: 12,
    alignSelf: "flex-start",
  },
});

export default PostFeed;
