import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";

type Props = {
  name: string;
};

export const ShoppingListItem = ({ name }: Props) => {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${name}?`, "Oh well...", [
      {
        text: "Yes",
        onPress: () => console.log("Ok, deleting"),
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    color: theme.colors.secondary,
  },
  button: {
    backgroundColor: theme.colors.black,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
