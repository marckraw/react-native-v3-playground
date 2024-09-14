import { Text, View, StyleSheet } from "react-native";

export default function IdeaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} className="text-red-600">
        Idea
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});
