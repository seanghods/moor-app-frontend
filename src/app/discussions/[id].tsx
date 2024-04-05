import { usePost } from "@/src/PostContext";
import Button from "@/src/components/Button";
import CommentFeed from "@/src/components/CommentFeed";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";

const Discussion = () => {
  const colorScheme = useColorScheme();
  const { currentPost } = usePost();
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
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <View>
        <Text>Discussion Title</Text>
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
          <Button title="Post" size={1} onPress={() => {}} />
        </View>
      </View>
      <View>
        <CommentFeed comments={currentPost?.discussions[0].comments} />
      </View>
    </ScrollView>
  );
};

export default Discussion;
