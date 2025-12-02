import React, { useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import { StatusListItem } from "@/components/StatusListItem";
import { Avatar } from "@/components/Avatar";
import { ThemedText } from "@/components/ThemedText";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, WhatsAppColors } from "@/constants/theme";

export default function StatusScreen() {
  const { theme, whatsapp } = useTheme();
  const { user, statuses } = useAuth();

  const recentStatuses = statuses.filter(
    (s) => new Date(s.expiresAt) > new Date()
  );

  const handleStatusPress = (statusId: string) => {
    console.log("View status:", statusId);
  };

  const handleAddStatus = () => {
    console.log("Add status");
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <Pressable
        onPress={handleAddStatus}
        style={({ pressed }) => [
          styles.myStatus,
          {
            backgroundColor: pressed
              ? theme.backgroundDefault
              : theme.backgroundRoot,
          },
        ]}
      >
        <View style={styles.myStatusAvatar}>
          <Avatar
            name={user?.name || "Me"}
            avatarIndex={user?.avatar || 0}
            size="large"
          />
          <View
            style={[styles.addButton, { backgroundColor: whatsapp.primary }]}
          >
            <Feather name="plus" size={16} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.myStatusContent}>
          <ThemedText style={styles.myStatusName}>My Status</ThemedText>
          <ThemedText style={[styles.myStatusHint, { color: theme.textSecondary }]}>
            Tap to add status update
          </ThemedText>
        </View>
      </Pressable>

      {recentStatuses.length > 0 ? (
        <View>
          <ThemedText
            style={[styles.sectionTitle, { color: theme.textSecondary }]}
          >
            Recent Updates
          </ThemedText>
          {recentStatuses.map((status) => (
            <StatusListItem
              key={status.id}
              status={status}
              onPress={() => handleStatusPress(status.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            icon="circle"
            title="No Status Updates"
            message="Status updates from your contacts will appear here"
          />
        </View>
      )}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 0,
  },
  myStatus: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  myStatusAvatar: {
    position: "relative",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  myStatusContent: {
    marginLeft: Spacing.md,
  },
  myStatusName: {
    fontSize: 16,
    fontWeight: "600",
  },
  myStatusHint: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    marginTop: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    marginTop: Spacing["4xl"],
  },
});
