import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { forwardRef, useMemo, useState } from "react";
import { Button, Separator, Text, XStack, YStack, useTheme } from "tamagui";
import { API_ROUTES } from "../utils/helpers";
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  CommentType,
  CommunityType,
  DiscussionType,
  PostType,
} from "../api-types/api-types";
import { useUser } from "../app/context/UserContext";
import { View } from "./Themed";

export type Ref = BottomSheetModal;

interface Props {
  community?: CommunityType | null;
  post?: PostType | null;
  discussion?: DiscussionType | null;
  comment?: CommentType | null;
}

const BottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const { community, post, discussion, comment } = props;
  const [modalVisible, setModalVisible] = useState<"add" | "remove" | "off">(
    "off"
  );
  const { user } = useUser();
  const { dismiss } = useBottomSheetModal();
  const theme = useTheme();
  const handleInputSubmit = (input: string, change: string) => {
    changeModerator(change);
    setModalVisible("off");
  };
  async function changeModerator(change: string) {
    const moderatorPath =
      change == "add" ? API_ROUTES.addModerator : API_ROUTES.removeModerator;
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(moderatorPath, {
      method: "POST",
      body: JSON.stringify({
        communityId: community?._id,
        userId: user?._id,
      }),
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      dismiss();
    }
  }
  async function del() {
    const token = await AsyncStorage.getItem("userToken");
    let contentToDelete:
      | CommunityType
      | PostType
      | DiscussionType
      | CommentType
      | undefined
      | null = post ?? discussion ?? comment ?? community;
    if (!contentToDelete) {
      console.error("No content to delete");
      return;
    }
    const routeType = community
      ? "community"
      : post
      ? "post"
      : discussion
      ? "discussion"
      : "comment";
    if (routeType) {
      const response = await fetch(
        `${API_ROUTES[routeType]}?id=${contentToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        dismiss();
        routeType == "post"
          ? router.push("/")
          : routeType == "discussion" || routeType == "community"
          ? router.back()
          : null;
      }
    } else {
      Alert.alert("Error", "There was an error deleting.");
    }
  }
  return (
    <BottomSheetModal
      snapPoints={community ? ["30%"] : ["18%"]}
      ref={ref}
      backgroundStyle={{
        backgroundColor: theme.color2.val,
      }}
    >
      <YStack>
        <TouchableOpacity onPress={del}>
          <YStack my={5} p={12} justifyContent="center" gap={12}>
            <Text color={"$red10"} fontSize={15}>
              Delete{" "}
              {community
                ? "Community"
                : post
                ? "Post"
                : discussion
                ? "Discussion"
                : comment
                ? "Comment"
                : null}
            </Text>
          </YStack>
        </TouchableOpacity>
        {community &&
        user &&
        (community.moderators.includes(user._id) || user.isAdmin) ? (
          <>
            <Separator
              shadowColor={theme.color10.val}
              shadowOpacity={0.3}
              shadowRadius={1}
              shadowOffset={{ width: 0, height: 1 }}
              bc={theme.color8.val}
            />

            <TouchableOpacity onPress={() => setModalVisible("add")}>
              <YStack my={5} p={12} justifyContent="center" gap={12}>
                <Text fontSize={15}>Add Moderator to this Community</Text>
              </YStack>
            </TouchableOpacity>
            <Separator
              shadowColor={theme.color10.val}
              shadowOpacity={0.3}
              shadowRadius={1}
              shadowOffset={{ width: 0, height: 1 }}
              bc={theme.color8.val}
            />
            <TouchableOpacity onPress={() => setModalVisible("remove")}>
              <YStack my={5} p={12} justifyContent="center" gap={12}>
                <Text fontSize={15}>Remove Moderator from this Community</Text>
              </YStack>
            </TouchableOpacity>
            <InputAlertModal
              visible={modalVisible}
              onClose={() => setModalVisible("off")}
              onSubmit={handleInputSubmit}
            />
          </>
        ) : null}
        <Separator
          shadowColor={theme.color10.val}
          shadowOpacity={0.3}
          shadowRadius={1}
          shadowOffset={{ width: 0, height: 1 }}
          bc={theme.color8.val}
        />
        <TouchableOpacity onPress={() => dismiss()}>
          <YStack my={5} p={12} justifyContent="center" gap={12}>
            <Text fontSize={15}>Cancel</Text>
          </YStack>
        </TouchableOpacity>
      </YStack>
    </BottomSheetModal>
  );
});

export default BottomSheet;

type InputAlertModalProps = {
  visible: "add" | "remove" | "off";
  onClose: () => void;
  onSubmit: (input: string, change: string) => void;
};

const InputAlertModal: React.FC<InputAlertModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme();

  const dynamicStyles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: theme.background.val,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible == "add" || visible == "remove"}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={dynamicStyles.modalView}>
          <Text style={styles.modalText}>
            {visible.charAt(0).toUpperCase() + visible.slice(1)} Moderator's
            Username
          </Text>
          <TextInput
            returnKeyType="done"
            style={{
              marginVertical: 20,
              padding: 10,
              width: 200,
              color: theme.color12.val,
              borderRadius: 10,
              backgroundColor: theme.color3.val,
            }}
            onChangeText={setInputValue}
            value={inputValue}
            placeholder="username."
          />
          <XStack gap={10}>
            <Button onPress={onClose} theme="red">
              <Text>Close</Text>
            </Button>
            <Button
              theme="blue"
              onPress={() => {
                onSubmit(inputValue, visible);
                setInputValue("");
              }}
            >
              Submit
            </Button>
          </XStack>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalText: {
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});
