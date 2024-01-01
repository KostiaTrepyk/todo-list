import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Todo } from "../components/Lists/TodoList/types";

export const storageKeys = {
  todos: "todos",
  hideDone: "hideDone",
};

export const saveTodos = async (value: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKeys.todos, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const loadTodos = async () => {
  try {
    const value = await AsyncStorage.getItem(storageKeys.todos);

    if (value !== null) {
      return JSON.parse(value) as Todo[] | undefined;
    }
  } catch (e) {
    // error reading value
  }
};

export const saveHideDone = async (value: boolean) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKeys.hideDone, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const loadHideDone = async () => {
  try {
    const value = await AsyncStorage.getItem(storageKeys.hideDone);

    if (value !== null) {
      return JSON.parse(value) as boolean | undefined;
    }
  } catch (e) {
    // error reading value
  }
};
