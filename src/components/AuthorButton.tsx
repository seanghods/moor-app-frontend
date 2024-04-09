import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useUser } from "../app/context/UserContext";
import Colors from "../constants/Colors";
import { View } from "tamagui";
import { router } from "expo-router";
import { Text } from "tamagui";

type Props = {
  author: { username: string; id: string };
  type: "feed" | "post";
};

const AuthorButton: React.FC<Props> = ({ author, type }) => {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    author: {
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
        router.push(`/profiles/${author.id}`);
      }}
    >
      <Text style={dynamicStyles.author}>{author.username}</Text>
    </TouchableOpacity>
  );
};

export default AuthorButton;
