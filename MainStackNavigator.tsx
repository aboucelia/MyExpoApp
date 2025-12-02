import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ChatConversationScreen from "@/screens/ChatConversationScreen";
import NewChatScreen from "@/screens/NewChatScreen";
import NewGroupScreen from "@/screens/NewGroupScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type MainStackParamList = {
  MainTabs: undefined;
  ChatConversation: { chatId: string };
  NewChat: undefined;
  NewGroup: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark, transparent: false }),
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatConversation"
        component={ChatConversationScreen}
        options={{
          title: "Chat",
        }}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{
          title: "New Chat",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="NewGroup"
        component={NewGroupScreen}
        options={{
          title: "New Group",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
