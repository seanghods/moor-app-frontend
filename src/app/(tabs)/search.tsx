import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function Search() {
  const colorScheme = useColorScheme();
  const dynamicStyles = StyleSheet.create({
    searchField: {
      flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? Colors.extraColors.lightGray
          : Colors.extraColors.darkGray,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      padding: 10,
      color:
        colorScheme === "light"
          ? Colors.extraColors.darkGray
          : Colors.extraColors.lightGray,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <View style={dynamicStyles.searchField}>
            <FontAwesome
              name="search"
              size={20}
              style={styles.searchIcon}
              color={
                colorScheme === "light"
                  ? Colors.extraColors.darkGray
                  : Colors.extraColors.lightGray
              }
            />
            <TextInput style={dynamicStyles.input} placeholder="Search..." />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: { height: 60, backgroundColor: "#fff" },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchIcon: { paddingLeft: 10 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
