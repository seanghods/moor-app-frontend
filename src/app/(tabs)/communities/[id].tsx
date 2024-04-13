import communities, { CommunityType } from "@/assets/data/communityData";
import { PostType, posts } from "@/assets/data/postsData";
import PostFeed from "@/src/components/PostFeed";
import { Text, View, Button } from "tamagui";
import Colors from "@/src/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

const communityPage = () => {
  // const [currentCommunity, setCurrentCommunity] = useState({});
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [communityPosts, setCommunityPosts] = useState<PostType[]>([]);
  const [community, setCommunity] = useState<CommunityType | undefined>(
    undefined
  );
  useEffect(() => {
    async function getCommunityAndPosts() {
      const com = communities.find((comm) => comm.id == id);
      setCommunity(com);
      const commPosts = posts.filter((post) => post.community.id == id);
      setCommunityPosts(commPosts);
    }
    getCommunityAndPosts();
  }, []);
  return (
    <View
      bg={"$background"}
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          bg="$blue3"
          style={{
            flex: 1,
            gap: 3,
            padding: 8,
            paddingBottom: 2,
            marginVertical: 2,
            borderWidth: 2,
            borderColor: colorScheme == "light" ? "#eee" : "#333333",
            borderTopWidth: 0,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            width: "90%",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons
                name="groups"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
              />
              <Text style={styles.communityTitle}>{community?.title}</Text>
            </View>
            <Button size={"$2"} theme="blue" mr={6}>
              <Ionicons name="person-add-outline" size={20} color="black" />
            </Button>
          </View>
          <Text>{community?.description}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.extraColors.lightGray,
              borderRadius: 15,
              marginVertical: 10,
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
                {community?.followers.length}
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
              <Text style={{ fontSize: 14 }}>{community?.posts.length}</Text>
            </View>
          </View>
        </View>
      </View>
      <PostFeed posts={communityPosts} showCommunity={false} />
    </View>
  );
};

export default communityPage;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  communityTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingVertical: 10,
  },
  postTitle: {
    fontSize: 25,
    fontWeight: "700",
    padding: 3,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
