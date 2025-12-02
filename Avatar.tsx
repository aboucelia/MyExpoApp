import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Spacing, BorderRadius } from "@/constants/theme";
import { getAvatarColor, getInitials } from "@/utils/mockData";
import { useTheme } from "@/hooks/useTheme";

interface AvatarProps {
  name: string;
  avatarIndex: number;
  size?: "small" | "medium" | "large";
  showOnline?: boolean;
  isOnline?: boolean;
}

export function Avatar({
  name,
  avatarIndex,
  size = "medium",
  showOnline = false,
  isOnline = false,
}: AvatarProps) {
  const { whatsapp } = useTheme();
  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(avatarIndex);

  const sizeValue =
    size === "small"
      ? Spacing.avatarSizeSmall
      : size === "large"
        ? Spacing.avatarSizeLarge
        : Spacing.avatarSize;

  const fontSize = size === "small" ? 14 : size === "large" ? 22 : 18;
  const onlineDotSize = size === "small" ? 10 : size === "large" ? 16 : 12;

  return (
    <View style={[styles.container, { width: sizeValue, height: sizeValue }]}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor,
            width: sizeValue,
            height: sizeValue,
            borderRadius: sizeValue / 2,
          },
        ]}
      >
        <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
      </View>
      {showOnline && isOnline ? (
        <View
          style={[
            styles.onlineDot,
            {
              width: onlineDotSize,
              height: onlineDotSize,
              borderRadius: onlineDotSize / 2,
              backgroundColor: whatsapp.primary,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
