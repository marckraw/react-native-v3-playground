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
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

const initialList: ShoppingListItemType[] = [
  {
    id: "1",
    name: "Coffee",
    isCompleted: false,
    lastUpdatedTimestamp: Date.now(),
  },
  {
    id: "2",
    name: "Tea",
    isCompleted: true,
    lastUpdatedTimestamp: Date.now(),
  },
  {
    id: "3",
    name: "Milk",
    isCompleted: false,
    lastUpdatedTimestamp: Date.now(),
  },
];

export default function App() {
  const [text, setText] = useState("");
  const [navigationTarget, setNavigationTarget] = useState("");
  const [list, setList] = useState<ShoppingListItemType[]>(initialList);
  const router = useRouter();

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setList(data);
      }
    };
    fetchInitial();
  }, []);

  const handleOnChangeText = (text: string) => {
    setText(text);
  };

  const handleOnChangeNavigationTarget = (text: string) => {
    setNavigationTarget(text);
  };

  const handleSubmit = () => {
    const newList = [
      ...list,
      {
        id: new Date().getTime().toString(),
        name: text,
        isCompleted: false,
        lastUpdatedTimestamp: Date.now(),
      },
    ];
    setList(newList);
    saveToStorage(storageKey, newList);
    setText("");
  };

  const handleDelete = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const handleToggleComplete = (id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });
    setList(newList);
  };

  // Sorts shopping list: incomplete items first (by last update), then completed items (by completion time)
  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    <>
      <FlatList
        data={orderShoppingList(list)}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <ShoppingListItem
            name={item.name}
            isCompleted={Boolean(item.completedAtTimestamp)}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: 24 }}>
            <Text>No items in the list</Text>
          </View>
        }
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
      <View style={{ padding: 24 }}>
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
