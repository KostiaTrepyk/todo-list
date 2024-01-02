import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Todo } from "../components/Lists/TodoList/types";

/* The `storageKeys` object is used to define the keys that will be used to store and retrieve data
from AsyncStorage. */
export const storageKeys = {
  todos: "todos",
  hideDone: "hideDone",
};

/**
 * The function saves an array of Todo objects to AsyncStorage in JSON format.
 * @param {Todo[]} value - The `value` parameter is an array of `Todo` objects.
 */
export const saveTodos = async (value: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKeys.todos, jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * The function `loadTodos` is an asynchronous function that retrieves and parses a value from
 * AsyncStorage and returns it as an array of Todo objects or undefined.
 * @returns The function `loadTodos` returns a promise that resolves to an array of `Todo` objects or
 * `undefined`.
 */
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

/**
 * The function saves a boolean value to AsyncStorage after converting it to a JSON string.
 * @param {boolean} value - A boolean value indicating whether to hide completed tasks or not.
 */
export const saveHideDone = async (value: boolean) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKeys.hideDone, jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * The function `loadHideDone` is an asynchronous function that retrieves a boolean value from
 * AsyncStorage and returns it.
 * @returns The function `loadHideDone` returns a promise that resolves to a boolean value or
 * `undefined`.
 */
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
