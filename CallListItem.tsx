import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Call } from "@/types/chat";
import { formatChatTime, formatCallDuration } from "@/utils/dateUtils";
import { Spacing, Typography, WhatsAppColors } from "@/constants/theme";

interface CallListItemProps {
  call: Call;
  onPress: () => void;
}

export function CallListItem({ call, onPress }: CallListItemProps) {
  const { theme, whatsapp } = useTheme();
  const { getContactById } = useAuth();
  const contact = getContactById(call.participantId);

  if (!contact) return null;

  const isMissed = call.status === "missed";
  const callColor = isMissed ? "#FF3B30" : whatsapp.primary;
  const directionIcon =
    call.direction === "incoming" ? "phone-incoming" : "phone-outgoing";

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
      />
      <View style={styles.content}>
        <ThemedText
          style={[styles.name, isMissed ? { color: "#FF3B30" } : null]}
          numberOfLines={1}
        >
          {contact.name}
        </ThemedText>
        <View style={styles.callInfo}>
          <Feather
            name={directionIcon}
            size={14}
            color={callColor}
            style={styles.directionIcon}
          />
          <ThemedText style={[styles.time, { color: theme.textSecondary }]}>
            {formatChatTime(call.timestamp)}
            {call.duration ? ` - ${formatCallDuration(call.duration)}` : ""}
          </ThemedText>
        </View>
      </View>
      <Pressable style={styles.callButton}>
        <Feather
          name={call.type === "video" ? "video" : "phone"}
          size={22}
          color={whatsapp.primary}
        />
      </Pressable>
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
  name: {
    ...Typography.chatName,
    marginBottom: 2,
  },
  callInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  directionIcon: {
    marginRight: Spacing.xs,
  },
  time: {
    fontSize: 14,
  },
  callButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
