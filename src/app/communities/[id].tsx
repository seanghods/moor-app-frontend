import communities, { CommunityType } from "@/assets/data/communityData";
import { PostType, posts } from "@/assets/data/postsData";
import Button from "@/src/components/Button";
import PostFeed from "@/src/components/PostFeed";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
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
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            gap: 3,
            padding: 8,
            paddingTop: 2,
            borderBottomWidth: 2,
            borderBottomColor: colorScheme == "light" ? "#eee" : "#333333",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons
              name="groups"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text style={styles.communityTitle}>{community?.title}</Text>
          </View>
          <Text>{community?.description}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Button title="Follow" onPress={() => {}} size={1} />
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
    fontWeight: "bold",
    paddingVertical: 10,
  },
  postTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 3,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
