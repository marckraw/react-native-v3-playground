import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link, useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Link href="/counter">Counter</Link>
      <TouchableOpacity
        onPress={() => {
          router.push("/idea");
        }}
      >
        <Text>go to /idea</Text>
      </TouchableOpacity>
      <ShoppingListItem name="Coffee" isCompleted={false} />
      <ShoppingListItem name="Tea" isCompleted={true} />
      <ShoppingListItem name="Milk" isCompleted={false} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
