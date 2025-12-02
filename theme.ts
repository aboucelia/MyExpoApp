import { Platform } from "react-native";

export const WhatsAppColors = {
  primary: "#25D366",
  primaryDark: "#075E54",
  lightGreen: "#DCF8C6",
  checkmarkBlue: "#53BDEB",
  checkmarkGray: "#92969B",
  online: "#25D366",
};

const tintColorLight = "#25D366";
const tintColorDark = "#25D366";

export const Colors = {
  light: {
    text: "#000000",
    textSecondary: "#667781",
    buttonText: "#FFFFFF",
    tabIconDefault: "#92969B",
    tabIconSelected: tintColorLight,
    link: "#25D366",
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F7F8FA",
    backgroundSecondary: "#E9EDEF",
    backgroundTertiary: "#D9D9D9",
    border: "#E9EDEF",
    sentMessage: "#DCF8C6",
    receivedMessage: "#FFFFFF",
    inputBackground: "#F0F2F5",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#8696A0",
    buttonText: "#FFFFFF",
    tabIconDefault: "#8696A0",
    tabIconSelected: tintColorDark,
    link: "#25D366",
    backgroundRoot: "#111B21",
    backgroundDefault: "#1F2C34",
    backgroundSecondary: "#233138",
    backgroundTertiary: "#2A3942",
    border: "#233138",
    sentMessage: "#005C4B",
    receivedMessage: "#202C33",
    inputBackground: "#2A3942",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
  chatItemHeight: 72,
  avatarSize: 48,
  avatarSizeSmall: 40,
  avatarSizeLarge: 56,
  fabSize: 56,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
  message: 8,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  tiny: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  messageText: {
    fontSize: 15,
    fontWeight: "400" as const,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadows = {
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
};
