import React, { useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { Avatar } from "@/components/Avatar";
import { SettingsItem } from "@/components/SettingsItem";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing } from "@/constants/theme";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const handleProfilePress = () => {
    console.log("Edit profile");
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  const handleSettingPress = (setting: string) => {
    console.log("Setting pressed:", setting);
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => [
          styles.profileSection,
          {
            backgroundColor: pressed
              ? theme.backgroundDefault
              : theme.backgroundRoot,
          },
        ]}
      >
        <Avatar
          name={user?.name || "User"}
          avatarIndex={user?.avatar || 0}
          size="large"
        />
        <View style={styles.profileInfo}>
          <ThemedText style={styles.profileName}>{user?.name}</ThemedText>
          <ThemedText style={[styles.profileStatus, { color: theme.textSecondary }]}>
            {user?.status}
          </ThemedText>
        </View>
      </Pressable>

      <View style={[styles.section, { borderTopColor: theme.border }]}>
        <SettingsItem
          icon="key"
          title="Account"
          subtitle="Privacy, security, change number"
          onPress={() => handleSettingPress("account")}
        />
        <SettingsItem
          icon="message-circle"
          title="Chats"
          subtitle="Theme, wallpapers, chat history"
          onPress={() => handleSettingPress("chats")}
        />
        <SettingsItem
          icon="bell"
          title="Notifications"
          subtitle="Message, group & call tones"
          onPress={() => handleSettingPress("notifications")}
        />
        <SettingsItem
          icon="database"
          title="Storage and Data"
          subtitle="Network usage, auto-download"
          onPress={() => handleSettingPress("storage")}
        />
      </View>

      <View style={[styles.section, { borderTopColor: theme.border }]}>
        <SettingsItem
          icon="help-circle"
          title="Help"
          subtitle="Help center, contact us, privacy policy"
          onPress={() => handleSettingPress("help")}
          iconColor="#667781"
        />
        <SettingsItem
          icon="users"
          title="Invite a Friend"
          onPress={() => handleSettingPress("invite")}
          iconColor="#667781"
        />
      </View>

      <View style={[styles.section, { borderTopColor: theme.border }]}>
        <SettingsItem
          icon="log-out"
          title="Log Out"
          onPress={handleLogout}
          showArrow={false}
          danger
        />
      </View>

      <ThemedText style={[styles.version, { color: theme.textSecondary }]}>
        ChatApp v1.0.0
      </ThemedText>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
  },
  profileStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.sm,
    marginTop: Spacing.sm,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: Spacing["2xl"],
    marginBottom: Spacing.lg,
  },
});
