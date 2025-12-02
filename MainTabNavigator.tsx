import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet } from "react-native";
import ChatsStackNavigator from "@/navigation/ChatsStackNavigator";
import StatusStackNavigator from "@/navigation/StatusStackNavigator";
import CallsStackNavigator from "@/navigation/CallsStackNavigator";
import SettingsStackNavigator from "@/navigation/SettingsStackNavigator";
import { useTheme } from "@/hooks/useTheme";
import { WhatsAppColors } from "@/constants/theme";

export type MainTabParamList = {
  ChatsTab: undefined;
  StatusTab: undefined;
  CallsTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ChatsTab"
      screenOptions={{
        tabBarActiveTintColor: WhatsAppColors.primary,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundRoot,
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ChatsTab"
        component={ChatsStackNavigator}
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StatusTab"
        component={StatusStackNavigator}
        options={{
          title: "Status",
          tabBarIcon: ({ color, size }) => (
            <Feather name="circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CallsTab"
        component={CallsStackNavigator}
        options={{
          title: "Calls",
          tabBarIcon: ({ color, size }) => (
            <Feather name="phone" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
