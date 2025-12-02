import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Status } from "@/types/chat";
import { formatStatusTime } from "@/utils/dateUtils";
import { Spacing, Typography, WhatsAppColors } from "@/constants/theme";

interface StatusListItemProps {
  status: Status;
  onPress: () => void;
  viewed?: boolean;
}

export function StatusListItem({ status, onPress, viewed = false }: StatusListItemProps) {
  const { theme, whatsapp } = useTheme();
  const { getContactById, user } = useAuth();
  const contact = getContactById(status.userId);

  if (!contact) return null;

  const hasViewed = status.views.includes(user?.id || "");

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
      <View
        style={[
          styles.avatarRing,
          {
            borderColor: hasViewed ? theme.textSecondary : whatsapp.primary,
          },
        ]}
      >
        <Avatar
          name={contact.name}
          avatarIndex={contact.avatar}
          size="medium"
        />
      </View>
      <View style={styles.content}>
        <ThemedText style={Typography.chatName} numberOfLines={1}>
          {contact.name}
        </ThemedText>
        <ThemedText style={[styles.time, { color: theme.textSecondary }]}>
          {formatStatusTime(status.timestamp)}
        </ThemedText>
      </View>
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
  avatarRing: {
    padding: 2,
    borderRadius: 28,
    borderWidth: 2,
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  time: {
    fontSize: 14,
    marginTop: 2,
  },
});
