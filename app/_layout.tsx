import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
// Import your global CSS file
import "../global.css";
import { theme } from "../theme";

export default function Layout() {
  return (
    // this are the stack screens
    // <Stack>
    //   <Stack.Screen
    //     name="index"
    //     options={{ title: "Taskly", headerShown: true }}
    //   />
    //   <Stack.Screen name="idea" options={{ title: "Idea" }} />
    //   <Stack.Screen
    //     name="counter"
    //     options={{ title: "Counter", presentation: "modal", animation: "fade" }}
    //   />
    // </Stack>
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Taskly",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
