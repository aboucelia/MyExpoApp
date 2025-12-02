import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, WhatsAppColors } from "@/constants/theme";

interface ChatInputProps {
  onSend: (text: string) => void;
  onTyping?: () => void;
}

export function ChatInput({ onSend, onTyping }: ChatInputProps) {
  const { theme, whatsapp } = useTheme();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleTextChange = (value: string) => {
    setText(value);
    if (onTyping) {
      onTyping();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundRoot,
          paddingBottom: insets.bottom + Spacing.sm,
          borderTopColor: theme.border,
        },
      ]}
    >
      <View
        style={[styles.inputContainer, { backgroundColor: theme.inputBackground }]}
      >
        <Pressable style={styles.iconButton}>
          <Feather name="smile" size={22} color={theme.textSecondary} />
        </Pressable>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Message"
          placeholderTextColor={theme.textSecondary}
          value={text}
          onChangeText={handleTextChange}
          multiline
          maxLength={1000}
        />
        <Pressable style={styles.iconButton}>
          <Feather name="paperclip" size={22} color={theme.textSecondary} />
        </Pressable>
      </View>
      <Pressable
        onPress={handleSend}
        style={({ pressed }) => [
          styles.sendButton,
          { 
            opacity: pressed ? 0.8 : 1,
            backgroundColor: text.trim() ? WhatsAppColors.primary : WhatsAppColors.darkGreen,
          },
        ]}
      >
        <Feather
          name={text.trim() ? "send" : "mic"}
          size={20}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.xs,
    minHeight: 48,
    maxHeight: 120,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? Spacing.md : Spacing.sm,
    paddingHorizontal: Spacing.xs,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: WhatsAppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
});
