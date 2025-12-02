import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "@/screens/ChatsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type ChatsStackParamList = {
  Chats: undefined;
};

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export default function ChatsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="ChatApp" />,
        }}
      />
    </Stack.Navigator>
  );
}
