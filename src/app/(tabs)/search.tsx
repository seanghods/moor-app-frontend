import {
  FlatList,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Avatar,
  Button,
  ScrollView,
  Spinner,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/src/utils/helpers";
import { Text } from "tamagui";
import { CommunityType, PostType, UserType } from "@/src/api-types/api-types";
import { ShowCommunity } from "./communities";
import { ShowPost } from "@/src/components/PostFeed";
import { router } from "expo-router";

export default function Search() {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<"user" | "community" | "post">(
    "post"
  );
  const [results, setResults] = useState<SearchResults>({
    userResults: [],
    communityResults: [],
    postResults: [],
  });
  useEffect(() => {
    const fetchSearch = async () => {
      if (search.length > 2) {
        const response = await fetch(`${API_ROUTES.search}?query=${search}`);
        const data = await response.json();
        setResults({
          userResults: data.users,
          communityResults: data.communities,
          postResults: data.posts,
        });
      }
    };
    if (search.length < 3)
      setResults({
        userResults: [],
        communityResults: [],
        postResults: [],
      });
    const timeoutId = setTimeout(() => {
      fetchSearch();
    }, 500); // Debounce the API call

    return () => clearTimeout(timeoutId);
  }, [search]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <YStack bg={theme.background.val} flex={1}>
        <YStack h={60}>
          <XStack flex={1} gap={10} px={20} alignItems="center">
            <XStack
              flex={1}
              borderRadius={8}
              alignItems="center"
              bg={theme.color7.val}
            >
              <FontAwesome
                name="search"
                size={20}
                style={{ paddingLeft: 10 }}
                color={theme.color11.val}
              />
              <TextInput
                returnKeyType="done"
                style={{ padding: 10, color: theme.color12.val, width: "100%" }}
                value={search}
                onChangeText={(value) => setSearch(value)}
                placeholder="Search..."
              />
            </XStack>
          </XStack>
        </YStack>
        <XStack alignSelf="center">
          <YStack
            btlr={5}
            bblr={5}
            bw={1}
            bc={searchType == "post" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={searchType == "post" ? "$blue6" : null}
            onPress={() => setSearchType("post")}
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <FontAwesome
                name="pencil-square-o"
                size={18}
                style={{ paddingRight: 1 }}
                color={theme.color12.val}
              />
              <Text>Post</Text>
            </XStack>
          </YStack>
          <YStack
            bw={1}
            bc={searchType == "community" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={searchType == "community" ? "$blue6" : null}
            onPress={() => setSearchType("community")}
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <MaterialIcons
                name="groups"
                style={{ paddingRight: 1 }}
                size={20}
                color={theme.color12.val}
              />
              <Text>Community</Text>
            </XStack>
          </YStack>
          <YStack
            btrr={5}
            bbrr={5}
            bw={1}
            bc={searchType == "user" ? "$blue11" : theme.color12.val}
            p={6}
            w="30%"
            justifyContent="center"
            alignItems="center"
            bg={searchType == "user" ? "$blue6" : null}
            onPress={() => setSearchType("user")}
          >
            <XStack alignItems="center" justifyContent="center" gap={3}>
              <Ionicons
                name="person-sharp"
                size={14}
                style={{ paddingRight: 1 }}
                color={theme.color12.val}
              />
              <Text>Users</Text>
            </XStack>
          </YStack>
        </XStack>
        <ScrollView>
          {results.userResults.length > 0 && searchType == "user" && (
            <>
              {results.userResults.map((user, index) => {
                return (
                  <YStack pt={12}>
                    <ShowUser key={index} user={user} />
                  </YStack>
                );
              })}
            </>
          )}
          {results.postResults.length > 0 && searchType == "post" && (
            <>
              {results.postResults.map((post, index) => {
                return (
                  <YStack pt={12} pl={10}>
                    <ShowPost key={index} post={post} showCommunity={true} />
                  </YStack>
                );
              })}
            </>
          )}
          {results.communityResults.length > 0 && searchType == "community" && (
            <>
              {results.communityResults.map(
                (community: CommunityType, index) => {
                  return (
                    <YStack pt={12}>
                      <ShowCommunity key={index} community={community} />
                    </YStack>
                  );
                }
              )}
            </>
          )}
        </ScrollView>
      </YStack>
    </TouchableWithoutFeedback>
  );
}

export type SearchResults = {
  userResults: UserType[];
  communityResults: CommunityType[];
  postResults: PostType[];
};

type ShowUserProps = {
  user: UserType;
};

export const ShowUser: React.FC<ShowUserProps> = ({ user }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      key={user._id}
      delayPressIn={50}
      onPress={() => {
        router.push(`/profiles/${user._id}`);
      }}
      style={{ width: "100%" }}
    >
      <XStack gap={8} p={8} py={4} bbw={2} bbc="#eee">
        <YStack w="30%" justifyContent="center" alignItems="center">
          <Avatar flex={1} mr={5} circular bw={1} bc={theme.color12.val}>
            <Avatar.Image src={user.profileImage} />
          </Avatar>
        </YStack>
        <YStack flex={1} justifyContent="center">
          <XStack alignItems="center">
            <Text fontSize={15} fontWeight={"700"}>
              {user.username}
            </Text>
          </XStack>
          {/* <Text
            fontSize={14}
            flexGrow={1}
            py={3}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {user.usersFollowed?.length}
          </Text> */}
        </YStack>
      </XStack>
    </TouchableOpacity>
  );
};
