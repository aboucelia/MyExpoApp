import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { AVATAR_COLORS, getInitials } from "@/utils/mockData";
import { Spacing, BorderRadius, WhatsAppColors } from "@/constants/theme";

export default function LoginScreen() {
  const { theme, whatsapp } = useTheme();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    try {
      await login(name.trim(), selectedAvatar);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + Spacing["2xl"] }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <ThemedText type="h2" style={styles.title}>
            Welcome to ChatApp
          </ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: theme.textSecondary }]}
          >
            Create your profile to start messaging
          </ThemedText>
        </View>

        <View style={styles.avatarSection}>
          <View
            style={[
              styles.selectedAvatar,
              { backgroundColor: AVATAR_COLORS[selectedAvatar] },
            ]}
          >
            <ThemedText style={styles.selectedAvatarText}>
              {name.trim() ? getInitials(name) : "?"}
            </ThemedText>
          </View>

          <ThemedText
            style={[styles.avatarLabel, { color: theme.textSecondary }]}
          >
            Choose your avatar color
          </ThemedText>

          <View style={styles.avatarGrid}>
            {AVATAR_COLORS.map((color, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAvatar(index)}
                style={({ pressed }) => [
                  styles.avatarOption,
                  { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
                  selectedAvatar === index ? styles.avatarSelected : null,
                ]}
              >
                {selectedAvatar === index ? (
                  <ThemedText style={styles.checkmark}>
                    {"\u2713"}
                  </ThemedText>
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputSection}>
          <ThemedText style={styles.inputLabel}>Your Name</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
            maxLength={30}
            autoCapitalize="words"
          />
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.xl }]}>
          <Button
            onPress={handleLogin}
            disabled={!name.trim() || isLoading}
            style={{ backgroundColor: whatsapp.primary }}
          >
            {isLoading ? "Creating Profile..." : "Get Started"}
          </Button>

          <ThemedText
            style={[styles.terms, { color: theme.textSecondary }]}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  selectedAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  selectedAvatarText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "600",
  },
  avatarLabel: {
    fontSize: 14,
    marginBottom: Spacing.md,
  },
  avatarGrid: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  avatarOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSelected: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputSection: {
    marginBottom: Spacing["2xl"],
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
    borderWidth: 1,
  },
  footer: {
    marginTop: "auto",
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    marginTop: Spacing.lg,
    lineHeight: 18,
  },
});
