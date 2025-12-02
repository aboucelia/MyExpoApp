import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MessageBubble } from "@/components/MessageBubble";
import { ChatInput } from "@/components/ChatInput";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/types/chat";
import { MainStackParamList } from "@/navigation/MainStackNavigator";
import { Spacing } from "@/constants/theme";
import { formatChatTime } from "@/utils/dateUtils";

type RouteProps = RouteProp<MainStackParamList, "ChatConversation">;
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ChatConversationScreen() {
  const { theme } = useTheme();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { user, chats, getMessages, sendMessage, getChatParticipants } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const chat = chats.find((c) => c.id === route.params.chatId);
  const participants = chat ? getChatParticipants(chat) : [];
  const displayName =
    chat?.type === "group"
      ? chat.name || "Group"
      : participants[0]?.name || "Unknown";

  useEffect(() => {
    if (chat) {
      navigation.setOptions({
        title: displayName,
      });
      loadMessages();
    }
  }, [chat, displayName, navigation]);

  const loadMessages = async () => {
    if (!chat) return;
    const msgs = await getMessages(chat.id);
    setMessages(msgs.reverse());
  };

  const handleSend = async (text: string) => {
    if (!chat) return;
    await sendMessage(chat.id, text);
    await loadMessages();
  };

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble message={item} isOwn={item.senderId === user?.id} />
    ),
    [user]
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  const renderDateSeparator = useCallback(
    (date: Date) => (
      <View style={styles.dateSeparator}>
        <ThemedText style={[styles.dateText, { color: theme.textSecondary }]}>
          {formatChatTime(date)}
        </ThemedText>
      </View>
    ),
    [theme]
  );

  if (!chat) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Chat not found</ThemedText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        inverted
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    paddingVertical: Spacing.sm,
  },
  dateSeparator: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  dateText: {
    fontSize: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    overflow: "hidden",
  },
});
