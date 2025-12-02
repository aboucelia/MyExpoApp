import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface EmptyStateProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message?: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Feather name={icon} size={64} color={theme.textSecondary} />
      <ThemedText type="h4" style={styles.title}>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText
          style={[styles.message, { color: theme.textSecondary }]}
        >
          {message}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing["2xl"],
  },
  title: {
    marginTop: Spacing.lg,
    textAlign: "center",
  },
  message: {
    marginTop: Spacing.sm,
    textAlign: "center",
    fontSize: 14,
  },
});
