import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  name: string;
  isCompleted: boolean;
};

export const ShoppingListItem = ({ name, isCompleted }: Props) => {
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
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text style={styles.itemText}>{name}</Text>
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        style={styles.button}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colors.green : theme.colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  completedContainer: {
    backgroundColor: theme.colors.secondary,
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1,
  },
  itemContainer: {
    width: "100%",
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
});
