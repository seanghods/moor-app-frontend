import { StyleSheet } from "react-native";
import { Text, View } from "tamagui";
import { useUser } from "../context/UserContext";

export default function Friends() {
  const { user } = useUser();
  //pull posts from following
  return (
    <View bg={"$background"} flex={1}>
      <Text py={24} width="80%" fontSize={16} alignSelf="center">
        You aren't following anyone yet! Follow users to see their personal
        posts appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
