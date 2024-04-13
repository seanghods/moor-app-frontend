import { router, useLocalSearchParams } from "expo-router";
import { usePost } from "@/src/app/context/PostContext";
import { useEffect } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
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
  ScrollView,
} from "react-native";
import { Button, View, Text, useTheme, XStack, YStack } from "tamagui";
import AuthorButton from "@/src/components/AuthorButton";

const postPage: React.FC = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const theme = useTheme();
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
        <XStack w={"100%"} justifyContent="space-between" alignItems="center">
          <XStack pl={14} gap={8} alignItems="center" pt={10} py={3}>
            <MaterialIcons name="groups" size={25} color={theme.color12.val} />
            <Text fontSize={20} fontWeight={"700"}>
              {currentPost?.community.title}
            </Text>
          </XStack>
          <TouchableOpacity>
            <Entypo
              name="dots-three-vertical"
              size={16}
              color={theme.color12.val}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </XStack>
      </TouchableOpacity>
      <XStack
        gap={8}
        pt={2}
        p={8}
        bbw={2}
        bbc={colorScheme == "light" ? "#eee" : "#333333"}
      >
        <YStack flex={1}>
          <YStack>
            <Text fontSize={25} fontWeight="700" py={3}>
              {currentPost?.title}
            </Text>
          </YStack>
          {currentPost?.author ? (
            <AuthorButton author={currentPost?.author} type="post" />
          ) : null}
          {currentPost?.link && (
            <YStack
              w="100%"
              h="auto"
              aspectRatio={2}
              justifyContent="center"
              alignItems="center"
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  alignItems: "center",
                }}
                onPress={() => handleLinkPress(currentPost.link as string)}
              >
                <Image
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: 15,
                  }}
                  resizeMode="cover"
                  source={{ uri: currentPost.thumbnail }}
                />
                <YStack
                  pos="absolute"
                  bottom={21}
                  right={23}
                  bg="rgba(0, 0, 0, 0.5)"
                  w="90%"
                  p={3}
                  overflow="hidden"
                  borderRadius={12}
                >
                  <Text color="white" fontSize={10} textAlign="center">
                    {currentPost?.domain}
                  </Text>
                </YStack>
              </TouchableOpacity>
            </YStack>
          )}
          <Text fontSize={15} flexGrow={1} p={8} mb={10}>
            {currentPost?.body}
          </Text>
          <XStack
            gap={12}
            alignSelf="flex-start"
            p={5}
            px={8}
            br={15}
            bw={1}
            bc={Colors.extraColors.lightGray}
          >
            <XStack gap={7}>
              <XStack gap={3} alignItems="center">
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-up"
                    size={15}
                    color={theme.color12.val}
                  />
                </TouchableOpacity>
                <Text> 1 </Text>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-down"
                    size={15}
                    color={theme.color12.val}
                  />
                </TouchableOpacity>
              </XStack>
            </XStack>
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
          </XStack>
        </YStack>
      </XStack>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Discussion Board:
          </Text>
          <TouchableOpacity>
            <FontAwesome
              name="pencil-square-o"
              size={20}
              style={{ marginRight: 15 }}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 20 }}>
          {currentPost?.discussions.map((discussion, index) => {
            return (
              <Button
                size={"$6"}
                theme={
                  discussion.title == "Discussion"
                    ? "blue"
                    : discussion.title == "Questions"
                    ? "orange"
                    : discussion.title == "More Resources"
                    ? "green"
                    : "blue"
                }
                style={{
                  alignItems: "center",
                  width: "90%",
                  alignSelf: "center",
                  height: 100,
                }}
                onPress={() => router.push(`/discussions/${discussion.id}`)}
                key={index}
              >
                <View
                  style={{
                    gap: 10,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontWeight: "700" }}>
                      {discussion.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>
                      {discussion.comments.length}
                    </Text>
                    <MaterialCommunityIcons
                      name="comment-outline"
                      size={18}
                      color={Colors[colorScheme ?? "light"].text}
                    />
                  </View>
                </View>
              </Button>
            );
          })}
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default postPage;
