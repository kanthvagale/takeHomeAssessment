import { SnackbarProvider } from "@/context/SnackBarContext";
import { Stack } from "expo-router";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SnackbarProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="employee/[id]"
          options={{ title: "Employee Details" }}
        />
      </Stack>
    </SnackbarProvider>
  );
}
