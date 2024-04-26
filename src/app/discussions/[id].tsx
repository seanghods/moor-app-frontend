import { usePost } from "@/src/app/context/PostContext";
import CommentFeed from "@/src/components/CommentFeed";
import { Separator, Text, View, XStack, YStack, useTheme } from "tamagui";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { DiscussionType } from "@/src/api-types/api-types";

const Discussion = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { currentPost } = usePost();
  const [currentDiscussion, setCurrentDiscussion] = useState<
    DiscussionType | undefined
  >(currentPost?.discussions.find((discussion) => discussion._id == id));
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: theme.background.val,
        }}
      >
        <XStack justifyContent="space-between" alignItems="center" mr={15}>
          <Text p={15} fontSize={20} fontWeight={"700"}>
            {currentDiscussion?.title}
          </Text>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              size={18}
              color={theme.color12.val}
            />
          </TouchableOpacity>
        </XStack>
        <YStack alignItems="center" p={10}>
          <XStack
            w={"90%"}
            p={10}
            justifyContent="center"
            alignItems="flex-start"
            br={12}
            bg={theme.color4.val}
          >
            <FontAwesome
              name="pencil-square-o"
              size={24}
              style={{ padding: 10 }}
              color={theme.color12.val}
            />
            <TextInput
              placeholder="add a comment..."
              // value={postData.body}
              // onChangeText={(value) => handleInputChange("body", value)}
              style={{
                height: 100,
                paddingLeft: 5,
                width: "90%",
                marginTop: 8,
                color: theme.color12.val,
              }}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={theme.color11.val}
            />
          </XStack>
          <YStack w={"90%"} pt={12} pr={12} alignItems="flex-end">
            <Button theme={"blue"}>Post</Button>
          </YStack>
        </YStack>
        <Separator alignSelf="stretch" />
        <View>
          <CommentFeed comments={currentDiscussion?.comments} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Discussion;
