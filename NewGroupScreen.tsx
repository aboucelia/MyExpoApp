import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContactListItem } from "@/components/ContactListItem";
import { Avatar } from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/chat";
import { MainStackParamList } from "@/navigation/MainStackNavigator";
import { Spacing, BorderRadius, WhatsAppColors } from "@/constants/theme";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function NewGroupScreen() {
  const { theme, whatsapp } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { contacts, createChat } = useAuth();
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleCreateGroup = async () => {
    if (selectedContacts.length < 2 || !groupName.trim()) return;
    try {
      const chat = await createChat(selectedContacts, groupName.trim());
      navigation.replace("ChatConversation", { chatId: chat.id });
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <ContactListItem
        contact={item}
        onPress={() => toggleContact(item.id)}
        selected={selectedContacts.includes(item.id)}
        showCheckbox
      />
    ),
    [selectedContacts]
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const selectedContactsList = contacts.filter((c) =>
    selectedContacts.includes(c.id)
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      {selectedContacts.length > 0 ? (
        <View style={styles.selectedSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedContactsList.map((contact) => (
              <Pressable
                key={contact.id}
                style={styles.selectedContact}
                onPress={() => toggleContact(contact.id)}
              >
                <View style={styles.selectedAvatarContainer}>
                  <Avatar
                    name={contact.name}
                    avatarIndex={contact.avatar}
                    size="small"
                  />
                  <View style={styles.removeButton}>
                    <Feather name="x" size={12} color="#FFFFFF" />
                  </View>
                </View>
                <ThemedText style={styles.selectedName} numberOfLines={1}>
                  {contact.name.split(" ")[0]}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}

      <View
        style={[styles.groupNameSection, { borderBottomColor: theme.border }]}
      >
        <TextInput
          style={[styles.groupNameInput, { color: theme.text }]}
          placeholder="Group name (required)"
          placeholderTextColor={theme.textSecondary}
          value={groupName}
          onChangeText={setGroupName}
          maxLength={25}
        />
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.inputBackground },
        ]}
      >
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search contacts"
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>
        Add Participants ({selectedContacts.length} selected)
      </ThemedText>

      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {selectedContacts.length >= 2 && groupName.trim() ? (
        <View
          style={[
            styles.footer,
            {
              backgroundColor: theme.backgroundRoot,
              paddingBottom: insets.bottom + Spacing.lg,
            },
          ]}
        >
          <Button
            onPress={handleCreateGroup}
            style={{ backgroundColor: whatsapp.primary }}
          >
            Create Group ({selectedContacts.length} members)
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  selectedContact: {
    alignItems: "center",
    marginHorizontal: Spacing.xs,
    width: 60,
  },
  selectedAvatarContainer: {
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#667781",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedName: {
    fontSize: 12,
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  groupNameSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  groupNameInput: {
    fontSize: 16,
    height: 40,
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
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
