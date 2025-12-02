import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContactListItem } from "@/components/ContactListItem";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/chat";
import { MainStackParamList } from "@/navigation/MainStackNavigator";
import { Spacing, BorderRadius, WhatsAppColors } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function NewChatScreen() {
  const { theme, whatsapp } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { contacts, createChat } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactPress = async (contact: User) => {
    try {
      const chat = await createChat([contact.id]);
      navigation.replace("ChatConversation", { chatId: chat.id });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleNewGroup = () => {
    navigation.navigate("NewGroup");
  };

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <ContactListItem contact={item} onPress={() => handleContactPress(item)} />
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const ListHeader = () => (
    <View>
      <View style={[styles.searchContainer, { backgroundColor: theme.inputBackground }]}>
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search contacts"
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <Pressable onPress={() => setSearchQuery("")}>
            <Feather name="x" size={20} color={theme.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        onPress={handleNewGroup}
        style={({ pressed }) => [
          styles.newGroupButton,
          { backgroundColor: pressed ? theme.backgroundDefault : theme.backgroundRoot },
        ]}
      >
        <View style={[styles.newGroupIcon, { backgroundColor: whatsapp.primary }]}>
          <Feather name="users" size={22} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.newGroupText}>New Group</ThemedText>
      </Pressable>

      <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>
        Contacts
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.lg }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    height: 40,
    borderRadius: BorderRadius.xs,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
  },
  newGroupButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  newGroupIcon: {
    width: Spacing.avatarSize,
    height: Spacing.avatarSize,
    borderRadius: Spacing.avatarSize / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  newGroupText: {
    marginLeft: Spacing.md,
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
