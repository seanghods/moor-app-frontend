import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useUser } from "../app/context/UserContext";
import Colors from "../constants/Colors";
import { router } from "expo-router";
import { Text } from "tamagui";
import { UserType } from "../api-types/api-types";

type Props = {
  creator: UserType;
  type: "feed" | "post";
};

const AuthorButton: React.FC<Props> = ({ creator, type }) => {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    creator: {
      fontSize: 13,
      marginHorizontal: type == "post" ? 10 : 0,
      paddingTop: 5,
      paddingBottom: type == "post" ? 10 : 3,
      fontWeight: "700",
      color: Colors[colorScheme ?? "light"].info,
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
      <Text style={dynamicStyles.creator}>{creator.username}</Text>
    </TouchableOpacity>
  );
};

export default AuthorButton;
