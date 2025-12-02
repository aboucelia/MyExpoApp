import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { User } from "@/types/chat";
import { Spacing, Typography } from "@/constants/theme";

interface ContactListItemProps {
  contact: User;
  onPress: () => void;
  selected?: boolean;
  showCheckbox?: boolean;
}

export function ContactListItem({
  contact,
  onPress,
  selected = false,
  showCheckbox = false,
}: ContactListItemProps) {
  const { theme, whatsapp } = useTheme();

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
      <Avatar
        name={contact.name}
        avatarIndex={contact.avatar}
        size="medium"
        showOnline
        isOnline={contact.isOnline}
      />
      <View style={styles.content}>
        <ThemedText style={Typography.chatName} numberOfLines={1}>
          {contact.name}
        </ThemedText>
        <ThemedText
          style={[styles.status, { color: theme.textSecondary }]}
          numberOfLines={1}
        >
          {contact.status}
        </ThemedText>
      </View>
      {showCheckbox ? (
        <View
          style={[
            styles.checkbox,
            selected
              ? { backgroundColor: whatsapp.primary, borderColor: whatsapp.primary }
              : { borderColor: theme.textSecondary },
          ]}
        >
          {selected ? (
            <ThemedText style={styles.checkmark}>
              {"\u2713"}
            </ThemedText>
          ) : null}
        </View>
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
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  status: {
    fontSize: 14,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
