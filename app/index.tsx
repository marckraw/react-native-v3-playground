import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useRouter } from "expo-router";
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
    <>
      <FlatList
        data={list}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ShoppingListItem name={item.name} isCompleted={item.isCompleted} />
        )}
        ListHeaderComponent={
          <TextInput
            value={text}
            onChangeText={handleOnChangeText}
            style={styles.textInput}
            placeholder="Enter your new shoping list item"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        }
      />
      <View>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: 12,
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
