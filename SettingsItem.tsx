import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, WhatsAppColors } from "@/constants/theme";

interface SettingsItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  danger?: boolean;
  iconColor?: string;
}

export function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  danger = false,
  iconColor,
}: SettingsItemProps) {
  const { theme, whatsapp } = useTheme();
  const color = danger
    ? "#FF3B30"
    : iconColor || whatsapp.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed
            ? theme.backgroundDefault
            : theme.backgroundRoot,
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color="#FFFFFF" />
      </View>
      <View style={styles.content}>
        <ThemedText
          style={[styles.title, danger ? { color: "#FF3B30" } : null]}
        >
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {showArrow ? (
        <Feather
          name="chevron-right"
          size={20}
          color={theme.textSecondary}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
