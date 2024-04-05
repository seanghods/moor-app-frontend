import { Text, View } from "@/src/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { usePost } from "@/src/PostContext";
import { useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import {
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Button from "@/src/components/Button";
import CommentFeed from "@/src/components/CommentFeed";

const postPage: React.FC = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { currentPost, setCurrentPost } = usePost();
  const handleLinkPress = (linkUrl: string) => {
    Linking.openURL(linkUrl).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  useEffect(() => {
    async function getPostData() {
      if (!currentPost) {
        //fetch from back end
      }
    }
    getPostData();
  }, [currentPost]);
  const dynamicStyles = StyleSheet.create({
    author: {
      fontSize: 14,
      marginHorizontal: 5,
      marginVertical: 10,
      fontWeight: "700",
      color: Colors[colorScheme ?? "light"].info,
    },
    mainPostContainer: {
      flexDirection: "row",
      gap: 8,
      padding: 8,
      paddingTop: 2,
      borderBottomWidth: 2,
      borderBottomColor: colorScheme == "light" ? "#eee" : "#333333",
    },
  });
  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginVertical: 2 }}
        onPress={() => router.push(`/communities/${currentPost?.community.id}`)}
      >
        <View style={styles.communityContainer}>
          <MaterialIcons
            name="groups"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text style={styles.communityTitle}>
            {currentPost?.community.title}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={dynamicStyles.mainPostContainer}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.postTitle}>{currentPost?.title}</Text>
          <Text style={dynamicStyles.author}>
            {currentPost?.author.username}
          </Text>
          {currentPost?.link && (
            <View style={styles.linkContainer}>
              <TouchableOpacity
                style={styles.linkPressContainer}
                onPress={() => handleLinkPress(currentPost.link as string)}
              >
                <Image
                  style={styles.linkPreview}
                  resizeMode="cover"
                  source={{ uri: currentPost.thumbnail }}
                />
                <Text style={styles.domain}>{currentPost?.domain}</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.body}>{currentPost?.body}</Text>
          <View style={styles.likeCommentContainer}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <AntDesign
                name="hearto"
                size={18}
                color={Colors[colorScheme ?? "light"].text}
              />
              <Text style={{ fontSize: 16 }}>{currentPost?.likes}</Text>
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
                size={18}
                color={Colors[colorScheme ?? "light"].text}
              />
              <Text style={{ fontSize: 16 }}>
                {currentPost?.discussions.reduce(
                  (acc, currArray) => acc + currArray.comments.length,
                  0
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Discussion Board:
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          {currentPost?.discussions.map((discussion) => {
            return (
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.push(`/discussions/${discussion.id}`)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                    padding: 25,
                    borderRadius: 15,
                    shadowColor: Colors.extraColors.mediumGray,
                    shadowOpacity: 0.3,
                    borderWidth: 2,
                    borderColor: Colors.extraColors.mediumGray,
                    backgroundColor:
                      colorScheme === "light"
                        ? Colors.extraColors.lightGray
                        : Colors.extraColors.darkGray,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{discussion.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.extraColors.lightGray
                          : Colors.extraColors.darkGray,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {discussion.comments.length}
                    </Text>
                    <MaterialCommunityIcons
                      name="comment-outline"
                      size={18}
                      color={Colors[colorScheme ?? "light"].text}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  communityContainer: {
    flexDirection: "row",
    paddingLeft: 14,
    gap: 8,
    alignItems: "center",
    paddingTop: 10,
    paddingVertical: 3,
  },
  communityTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkContainer: {
    width: "100%",
    height: "auto",
    aspectRatio: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  linkPressContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
  linkPreview: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
  },
  domain: {
    position: "absolute",
    bottom: 22,
    right: 23,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    width: "90%",
    padding: 3,
    fontSize: 10,
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 12,
  },
  body: { fontSize: 15, flexGrow: 1, padding: 8 },
  postTitle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 3,
  },
  likeCommentContainer: {
    borderWidth: 1,
    borderColor: Colors.extraColors.lightGray,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    gap: 12,
    alignSelf: "flex-start",
  },
});

export default postPage;
