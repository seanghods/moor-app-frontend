import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useUser } from "../../app/context/UserContext";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import { Avatar, Text, XStack } from "tamagui";
import { UserType } from "../../api-types/api-types";

type Props = {
  creator: UserType;
  type: "feed" | "post";
};

const AuthorButton: React.FC<Props> = ({ creator, type }) => {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    creator: {
      marginHorizontal: type == "post" ? 8 : 0,
      paddingTop: 5,
      paddingBottom: type == "post" ? 10 : 3,
    },
  });
  return (
    <TouchableOpacity
      delayPressIn={50}
      style={{ alignSelf: "flex-start" }}
      onPress={() => {
        router.push(`/profiles/${creator._id}`);
      }}
    >
      <XStack style={dynamicStyles.creator} alignItems="center">
        <Avatar flex={1} mr={5} circular bw={1} size={"$1.5"}>
          <Avatar.Image scale={1.1} src={creator.profileImage} />
        </Avatar>
        <Text
          fontWeight={"700"}
          color={Colors[colorScheme ?? "light"].info}
          fontSize={type == "post" ? 16 : 13}
        >
          {creator.username}
        </Text>
      </XStack>
    </TouchableOpacity>
  );
};

export default AuthorButton;
