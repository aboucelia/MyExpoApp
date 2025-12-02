import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MessageStatus } from "@/components/MessageStatus";
import { useTheme } from "@/hooks/useTheme";
import { Message } from "@/types/chat";
import { formatMessageTime } from "@/utils/dateUtils";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : null]}>
      <View
        style={[
          styles.bubble,
          isOwn
            ? [styles.ownBubble, { backgroundColor: theme.sentMessage }]
            : [
                styles.otherBubble,
                {
                  backgroundColor: theme.receivedMessage,
                  borderColor: theme.border,
                },
              ],
        ]}
      >
        <Text style={[styles.text, { color: theme.text }]}>{message.text}</Text>
        <View style={styles.meta}>
          <Text style={[styles.time, { color: theme.textSecondary }]}>
            {formatMessageTime(message.timestamp)}
          </Text>
          {isOwn ? (
            <View style={styles.status}>
              <MessageStatus status={message.status} size={14} />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignItems: "flex-start",
  },
  ownContainer: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderRadius: BorderRadius.message,
  },
  ownBubble: {
    borderTopRightRadius: 2,
  },
  otherBubble: {
    borderTopLeftRadius: 2,
    borderWidth: 1,
  },
  text: {
    ...Typography.messageText,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  time: {
    ...Typography.timestamp,
  },
  status: {
    marginLeft: Spacing.xs,
  },
});
