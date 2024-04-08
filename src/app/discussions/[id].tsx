import { usePost } from "@/src/app/context/PostContext";
import CommentFeed from "@/src/components/CommentFeed";
import { Separator, Text, View } from "tamagui";
import Colors from "@/src/constants/Colors";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { DiscussionType } from "@/assets/data/postsData";
import { useState } from "react";

const Discussion = () => {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const { currentPost } = usePost();
  const [currentDiscussion, setCurrentDiscussion] = useState<
    DiscussionType | undefined
  >(currentPost?.discussions.find((discussion) => discussion.id == id));
  const dynamicStyles = StyleSheet.create({
    textArea: {
      height: 100,
      paddingLeft: 5,
      width: "90%",
      marginTop: 8,
    },
    commentContainer: {
      width: "90%",
      padding: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor:
        colorScheme === "light" ? "#f9f9f9" : Colors.extraColors.mediumGray,
      borderRadius: 20,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text
            style={{
              padding: 15,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {currentDiscussion?.title}
          </Text>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              size={18}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 10,
          }}
        >
          <View style={dynamicStyles.commentContainer}>
            <FontAwesome
              name="pencil-square-o"
              size={24}
              style={{ padding: 10 }}
              color="black"
            />
            <TextInput
              placeholder="add a comment..."
              // value={postData.body}
              // onChangeText={(value) => handleInputChange("body", value)}
              style={dynamicStyles.textArea}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={
                colorScheme === "light"
                  ? Colors.extraColors.mediumGray
                  : Colors.extraColors.darkGray
              }
            />
          </View>
          <View
            style={{
              alignItems: "flex-end",
              width: "90%",
              paddingTop: 12,
              paddingRight: 12,
            }}
          >
            <Button theme={"blue"}>Post</Button>
          </View>
        </View>
        <Separator alignSelf="stretch" />
        <View>
          <CommentFeed comments={currentDiscussion?.comments} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Discussion;
