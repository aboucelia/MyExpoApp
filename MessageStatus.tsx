import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { WhatsAppColors } from "@/constants/theme";

interface MessageStatusProps {
  status: "sent" | "delivered" | "read";
  size?: number;
}

export function MessageStatus({ status, size = 16 }: MessageStatusProps) {
  const color =
    status === "read" ? WhatsAppColors.checkmarkBlue : WhatsAppColors.checkmarkGray;

  if (status === "sent") {
    return <Feather name="check" size={size} color={color} />;
  }

  return (
    <View style={styles.doubleCheck}>
      <Feather name="check" size={size} color={color} style={styles.firstCheck} />
      <Feather name="check" size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  doubleCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  firstCheck: {
    marginRight: -10,
  },
});
