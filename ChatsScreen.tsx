import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatListItem } from "@/components/ChatListItem";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { useAuth } from "@/contexts/AuthContext";
import { Chat } from "@/types/chat";
import { MainStackParamList } from "@/navigation/MainStackNavigator";
import { Spacing } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function ChatsScreen() {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom } = useScreenInsets();
  const navigation = useNavigation<NavigationProp>();
  const { chats, markChatAsRead } = useAuth();

  const handleChatPress = useCallback(
    (chat: Chat) => {
      markChatAsRead(chat.id);
      navigation.navigate("ChatConversation", { chatId: chat.id });
    },
    [navigation, markChatAsRead]
  );

  const handleNewChat = useCallback(() => {
    navigation.navigate("NewChat");
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Chat }) => (
      <ChatListItem chat={item} onPress={() => handleChatPress(item)} />
    ),
    [handleChatPress]
  );

  const keyExtractor = useCallback((item: Chat) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingTop,
          paddingBottom: paddingBottom + Spacing["4xl"],
        }}
        ListEmptyComponent={
          <EmptyState
            icon="message-circle"
            title="No Chats Yet"
            message="Start a new conversation by tapping the button below"
          />
        }
      />
      <FloatingActionButton onPress={handleNewChat} icon="message-circle" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
