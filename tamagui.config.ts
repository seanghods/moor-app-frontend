import { config as configBase } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const myColors = {
  primary: "#3366FF",
  secondary: "#FFD700",
  success: "#28A745",
  danger: "#DC3545",
  warning: "#FFC107",
};

export const config = createTamagui(configBase);

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
