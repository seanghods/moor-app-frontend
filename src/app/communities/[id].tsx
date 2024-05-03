import PostFeed from "@/src/components/content-components/PostFeed";
import { Text, Button, YStack, XStack, useTheme, Spinner } from "tamagui";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { CommunityType } from "@/src/api-types/api-types";
import { API_ROUTES } from "@/src/utils/helpers";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import BottomSheet from "@/src/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Alert, TouchableOpacity } from "react-native";

const communityPage = () => {
  const { id } = useLocalSearchParams();
  const { user, setUser } = useUser();
  const theme = useTheme();
  const [community, setCommunity] = useState<CommunityType | undefined>(
    undefined
  );
  const isFocused = useIsFocused();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  function openModal() {
    bottomSheetRef.current?.present();
  }
  useEffect(() => {
    async function getCommunity() {
      const response = await fetch(`${API_ROUTES.community}?id=${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (!data.success) {
        return Alert.alert("Error", data.message);
      }
      setCommunity(data.community);
    }
    getCommunity();
  }, [isFocused]);
  async function followCommunity(community: CommunityType) {
    if (!user) {
      return router.push("/authentication/login");
    }
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(API_ROUTES.followCommunity, {
      method: "POST",
      body: JSON.stringify({
        communityId: community._id,
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!data.success) {
      return Alert.alert("Error", data.message);
    }
    if (user.communitiesFollowed.some((comm) => comm == community._id)) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            communitiesFollowed: prevUser.communitiesFollowed?.filter(
              (comm) => comm !== community._id
            ),
          };
        }
        return prevUser;
      });
      setCommunity((prevCommunity) => {
        if (prevCommunity) {
          return {
            ...prevCommunity,
            followers: prevCommunity.followers?.filter(
              (follower) => follower !== user._id
            ),
          };
        }
        return prevCommunity;
      });
    } else {
      setCommunity((prevCommunity) => {
        if (prevCommunity) {
          return {
            ...prevCommunity,
            followers: [...prevCommunity.followers, user._id],
          };
        }
        return prevCommunity;
      });
      const communitiesFollowed = user.communitiesFollowed;
      communitiesFollowed.push(community._id);
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            communitiesFollowed: prevUser.communitiesFollowed
              ? [...prevUser.communitiesFollowed, community._id]
              : [community._id],
          };
        }
        return prevUser;
      });
    }
  }
  return (
    <YStack bg={"$background"} flex={1}>
      {community ? (
        <>
          <BottomSheet ref={bottomSheetRef} community={community} />
          <XStack mx={6}>
            <YStack bg="$blue3" flex={1} gap={3} p={8} pb={2} my={2}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={5} alignItems="center">
                  <MaterialIcons
                    name="groups"
                    size={25}
                    color={theme.color12.val}
                  />
                  <Text py={10} fontSize={20} fontWeight={"700"}>
                    {community.name}
                  </Text>
                </XStack>
                <Button
                  size={"$2"}
                  theme="blue"
                  mr={6}
                  onPress={() => followCommunity(community)}
                >
                  {user?.communitiesFollowed.some(
                    (comm) => comm == community._id
                  ) ? (
                    <AntDesign
                      name="check"
                      size={20}
                      color={theme.color12.val}
                    />
                  ) : (
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={theme.color12.val}
                    />
                  )}
                </Button>
              </XStack>
              <Text my={7}>{community.description}</Text>
              <XStack
                bw={1}
                bc={"#E0E0E0"}
                br={15}
                p={5}
                px={8}
                gap={12}
                alignSelf="flex-start"
              >
                <XStack gap={5} alignItems="flex-end">
                  <Ionicons name="person" size={16} color={theme.color12.val} />
                  <Text style={{ fontSize: 14 }}>
                    {community.followers?.length}
                  </Text>
                </XStack>
                <XStack gap={5} alignItems="flex-end">
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={16}
                    color={theme.color12.val}
                  />
                  <Text style={{ fontSize: 14 }}>{community.posts.length}</Text>
                </XStack>
                {user &&
                (user._id === community?.creator._id ||
                  user.isAdmin ||
                  community.moderators.includes(user._id)) ? (
                  <TouchableOpacity onPress={() => openModal()}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={18}
                      color={theme.color12.val}
                    />
                  </TouchableOpacity>
                ) : null}
              </XStack>
            </YStack>
          </XStack>
          <PostFeed
            posts={community.posts}
            showCommunity={false}
            setCommunity={setCommunity}
          />
        </>
      ) : (
        <Spinner />
      )}
    </YStack>
  );
};

export default communityPage;
