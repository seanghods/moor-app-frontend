import { createFont, createTamagui } from "tamagui";
import { animations } from "@tamagui/config/v3";
import { createInterFont } from "@tamagui/font-inter";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { config } from "@tamagui/config/v3";

const headingFont = createInterFont();
const bodyFont = createInterFont();

const spaceMonoFont = createFont({
  family: "SpaceMono, Helvetica, Arial, sans-serif",
  size: {
    1: 12,
    2: 14,
    3: 15,
    // ...
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    // ...
  },
  weight: {
    4: "300",
    6: "600",
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },

  // for native only, alternate family based on weight/style
  face: {
    // pass in weights as keys
    700: { normal: "InterBold", italic: "InterBold-Italic" },
    800: { normal: "InterBold", italic: "InterBold-Italic" },
    900: { normal: "InterBold", italic: "InterBold-Italic" },
  },
});

const blueTheme = {
  color: "#fff",
  backgroundColor: "#0000ff",
};

const tamaguiConfig = createTamagui({
  defaultTheme: "dark",
  shouldAddPrefersColorThemes: true,
  animations,
  shorthands,
  tokens: { ...tokens, color: { ...tokens.color, galaxies: "#6f0a9b" } },
  themes: { ...themes },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
