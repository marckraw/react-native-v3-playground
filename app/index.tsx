import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee", isCompleted: false },
  { id: "2", name: "Tea", isCompleted: true },
  { id: "3", name: "Milk", isCompleted: false },
];

export default function App() {
  const [text, setText] = useState("");
  const [navigationTarget, setNavigationTarget] = useState("");
  const [list, setList] = useState<ShoppingListItemType[]>(initialList);
  const router = useRouter();

  const handleOnChangeText = (text: string) => {
    setText(text);
  };

  const handleOnChangeNavigationTarget = (text: string) => {
    setNavigationTarget(text);
  };

  const handleSubmit = () => {
    setList([
      ...list,
      { id: new Date().getTime().toString(), name: text, isCompleted: false },
    ]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push(navigationTarget);
        }}
      >
        <Text>go to {navigationTarget}</Text>
      </TouchableOpacity>
      <TextInput
        value={navigationTarget}
        onChangeText={handleOnChangeNavigationTarget}
        style={styles.textInput}
        placeholder="Enter your navigation target"
        returnKeyType="done"
        onSubmitEditing={() => {
          router.push(navigationTarget);
        }}
      />
      <TextInput
        value={text}
        onChangeText={handleOnChangeText}
        style={styles.textInput}
        placeholder="Enter your new shoping list item"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {list.map((item) => (
        <ShoppingListItem
          key={item.id}
          name={item.name}
          isCompleted={item.isCompleted}
        />
      ))}
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
  textInput: {
    width: "80%",
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
});
