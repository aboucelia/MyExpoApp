import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatusScreen from "@/screens/StatusScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type StatusStackParamList = {
  Status: undefined;
};

const Stack = createNativeStackNavigator<StatusStackParamList>();

export default function StatusStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Status"
        component={StatusScreen}
        options={{
          title: "Status",
        }}
      />
    </Stack.Navigator>
  );
}
