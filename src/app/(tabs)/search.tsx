import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";
import { XStack, YStack, useTheme } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function Search() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
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
                style={{ padding: 10, color: theme.color7.val }}
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
                placeholder="Search..."
              />
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
