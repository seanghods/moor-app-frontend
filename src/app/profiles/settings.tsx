import { Text, YStack, useTheme } from "tamagui";

export default function Settings() {
  const theme = useTheme();
  return (
    <YStack bg={"$background"} flex={1}>
      <Text>Settings</Text>
    </YStack>
  );
}
