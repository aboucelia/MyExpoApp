import React, { useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CallListItem } from "@/components/CallListItem";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { useScreenInsets } from "@/hooks/useScreenInsets";
import { useAuth } from "@/contexts/AuthContext";
import { Call } from "@/types/chat";
import { Spacing } from "@/constants/theme";

export default function CallsScreen() {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom } = useScreenInsets();
  const { calls } = useAuth();

  const handleCallPress = (call: Call) => {
    console.log("Call pressed:", call.id);
  };

  const handleNewCall = () => {
    console.log("New call");
  };

  const renderItem = useCallback(
    ({ item }: { item: Call }) => (
      <CallListItem call={item} onPress={() => handleCallPress(item)} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Call) => item.id, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={calls}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingTop,
          paddingBottom: paddingBottom + Spacing["4xl"],
        }}
        ListEmptyComponent={
          <EmptyState
            icon="phone"
            title="No Calls Yet"
            message="Your call history will appear here"
          />
        }
      />
      <FloatingActionButton onPress={handleNewCall} icon="phone" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
