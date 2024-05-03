import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text, Button, Form, Spinner, YStack, XStack, useTheme } from "tamagui";
import { API_ROUTES } from "@/src/utils/helpers";
import { CommunityType } from "@/src/api-types/api-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Share() {
  const theme = useTheme();
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );
  const [search, setSearch] = useState("");
  const [communities, setCommunities] = useState<CommunityType[]>([]);
  const [postData, setPostData] = useState({
    community: "",
    postType: "link",
    title: "",
    link: "",
    description: "",
  });
  useEffect(() => {
    const fetchCommunities = async () => {
      if (search.length > 2 && !postData.community) {
        const response = await fetch(
          `${API_ROUTES.community}/search?query=${search}`
        );
        const data = await response.json();
        setCommunities(data);
      }
    };
    if (search.length < 3) setCommunities([]);
    const timeoutId = setTimeout(() => {
      fetchCommunities();
    }, 500); // Debounce the API call

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSelectCommunity = (community: CommunityType) => {
    setPostData((prevData) => ({ ...prevData, community: community.name }));
    setSearch(community.name);
    setCommunities([]); // Clear search results after selection
  };
  const handleInputChange = (name: string, value: string) => {
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const createPost = async () => {
    if (!postData.community) {
      alert("Please select a community");
      return;
    }
    if (!postData.title) {
      alert("Please enter a title");
      return;
    }
    if (postData.postType == "link" && !postData.link) {
      alert("Please enter a link");
      return;
    } else {
      if (postData.postType == "link" && !isValidUrl(postData.link)) {
        alert("Please enter a valid link");
        return;
      }
    }
    if (!postData.description) {
      alert("Please enter a description");
      return;
    }
    setStatus("submitting");
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ROUTES.post, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      setStatus("off");
      const error = await response.json();
      if (error.message) {
        alert(error.message);
        return;
      } else {
        throw new Error("Failed to create post");
      }
    }
    setStatus("submitted");
    const data = await response.json();
    router.replace(`/posts/${data.post._id}`);
  };
  function isValidUrl(url: string) {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?" + // port
        "(\\/[-a-z\\d%_.~+]*)*" + // path
        "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  }
  const dynamicStyles = StyleSheet.create({
    textInput: {
      height: 40,
      paddingLeft: 5,
      width: "80%",
      color: theme.color12.val,
    },
    textArea: {
      height: 140,
      paddingLeft: 5,
      width: "80%",
      marginTop: 8,
      color: theme.color12.val,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="flex-start"
        gap={5}
        bg="$background"
      >
        <YStack p={15}>
          <Text fontSize={25} fontWeight="700">
            Share an Insight
          </Text>
        </YStack>
        <XStack>
          <YStack
            btlr={5}
            bblr={5}
            bw={1}
            bc={postData.postType == "link" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={postData.postType == "link" ? "$blue6" : null}
            onPress={() =>
              setPostData((prevData) => ({ ...prevData, postType: "link" }))
            }
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <Entypo name="link" size={16} color={theme.color12.val} />
              <Text>Link</Text>
            </XStack>
          </YStack>
          <YStack
            btrr={5}
            bbrr={5}
            bw={1}
            bc={postData.postType == "text" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={postData.postType == "text" ? "$blue6" : null}
            onPress={() =>
              setPostData((prevData) => ({ ...prevData, postType: "text" }))
            }
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <MaterialCommunityIcons
                name="subtitles-outline"
                size={16}
                color={theme.color12.val}
              />
              <Text>Text</Text>
            </XStack>
          </YStack>
        </XStack>
        <Form
          gap={30}
          mt={20}
          onSubmit={() => {
            createPost();
          }}
        >
          <YStack zIndex={10}>
            <YStack>
              {/* <Text p={4} mb={6} fontWeight={"700"}>
                Community
              </Text> */}
            </YStack>
            <XStack
              width={"92%"}
              alignSelf="center"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
              mt={10}
            >
              <MaterialIcons
                name="groups"
                style={{ padding: 10 }}
                size={25}
                color={theme.color12.val}
              />
              <TextInput
                returnKeyType="done"
                placeholder="community"
                value={search}
                onChangeText={(value) => {
                  setSearch(value);
                  if (postData.community)
                    setPostData((prevData) => ({
                      ...prevData,
                      community: "",
                    }));
                }}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={theme.color11.val}
              />
            </XStack>
            {search.length > 2 && !postData.community && (
              <>
                <FlatList
                  data={communities}
                  style={{
                    position: "absolute",
                    borderRadius: 7,
                    height: 200,
                    top: 60,
                    left: 40,
                    width: 200,
                    backgroundColor: theme.background.val,
                    shadowColor: "#000",
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 5, // for Android
                  }}
                  ListHeaderComponent={() => (
                    <YStack>
                      <YStack bbw={1} bbc={"#eaeaea"} p={10}>
                        <Text fontWeight={"700"}>Communities:</Text>
                      </YStack>
                      {communities.length == 0 && (
                        <YStack p={10}>
                          <Spinner />
                        </YStack>
                      )}
                    </YStack>
                  )}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: "#ccc",
                        }}
                        onPress={() => handleSelectCommunity(item)}
                      >
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                />
              </>
            )}
          </YStack>
          <YStack>
            <YStack>
              {/* <Text my={6} p={4} fontWeight={"700"}>
                Title
              </Text> */}
            </YStack>
            <XStack
              width={"92%"}
              alignSelf="center"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
            >
              <MaterialIcons
                name="title"
                style={{ padding: 10 }}
                size={25}
                color={theme.color12.val}
              />
              <TextInput
                returnKeyType="done"
                placeholder="title"
                value={postData.title}
                maxLength={100}
                onChangeText={(value) => handleInputChange("title", value)}
                style={dynamicStyles.textInput}
                autoCapitalize="none"
                placeholderTextColor={theme.color11.val}
              />
            </XStack>
          </YStack>
          {postData.postType == "link" && (
            <YStack>
              <YStack>
                {/* <Text my={6} p={4} fontWeight={"700"}>
                  Link
                </Text> */}
              </YStack>
              <XStack
                width={"92%"}
                alignSelf="center"
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                bg="$blue4"
              >
                <Entypo
                  name="link"
                  style={{ padding: 10 }}
                  size={25}
                  color={theme.color12.val}
                />
                <TextInput
                  returnKeyType="done"
                  placeholder="link"
                  value={postData.link}
                  onChangeText={(value) => handleInputChange("link", value)}
                  style={dynamicStyles.textInput}
                  autoCapitalize="none"
                  placeholderTextColor={theme.color11.val}
                />
              </XStack>
            </YStack>
          )}
          <YStack>
            <YStack>
              {/* <Text my={6} p={4} fontWeight={"700"}>
                Description
              </Text> */}
            </YStack>
            <XStack
              width={"92%"}
              alignSelf="center"
              borderRadius={20}
              alignItems="center"
              justifyContent="center"
              bg="$blue4"
            >
              <MaterialCommunityIcons
                name="subtitles-outline"
                style={{ padding: 10, alignSelf: "flex-start" }}
                size={25}
                color={theme.color12.val}
              />
              <TextInput
                placeholder="description"
                value={postData.description}
                onChangeText={(value) =>
                  handleInputChange("description", value)
                }
                style={dynamicStyles.textArea}
                autoCapitalize="none"
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={theme.color11.val}
              />
            </XStack>
          </YStack>
          <Form.Trigger asChild disabled={status !== "off"}>
            <Button
              icon={
                status === "submitting" ? () => <Spinner theme="blue" /> : null
              }
              mt={8}
              pl={30}
              pr={30}
              alignSelf="center"
              textAlign="center"
              fontWeight={"700"}
              bg={"$blue8"}
            >
              Create Post
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
