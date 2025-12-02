import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CallsScreen from "@/screens/CallsScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type CallsStackParamList = {
  Calls: undefined;
};

const Stack = createNativeStackNavigator<CallsStackParamList>();

export default function CallsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          title: "Calls",
        }}
      />
    </Stack.Navigator>
  );
}
