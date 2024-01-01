import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { type Todo } from "../components/Lists/TodoList/types";
import AddTodoForm from "../components/Forms/AddTodo";
import TodoList from "../components/Lists/TodoList/TodoList";

const storeData = async (value: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("todos", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("todos");

    if (value !== null) {
      return JSON.parse(value) as Todo[];
    }
  } catch (e) {
    // error reading value
  }
};

const HomeScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getData().then((data) => {
      if (data) setTodos(data);
    });
  }, []);

  useEffect(() => {
    storeData(todos);
  }, [todos]);

  function finishTodoHandler(todo: Todo) {
    setTodos((prev) =>
      prev.filter((prevTodo) => prevTodo.createdAt !== todo.createdAt)
    );
  }

  function AddTodoHandler(title: string) {
    setTodos((prev) => {
      const newTodo: Todo = {
        id: (prev[prev.length - 1]?.id || 0) + 1,
        title,
        isDone: false,
        createdAt: new Date(),
      };
      return [...prev, newTodo];
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" /* animated hidden */ />

      <Text style={styles.text}>Tasks</Text>

      <TodoList todos={todos} finishTodo={finishTodoHandler} />

      <AddTodoForm AddTodo={AddTodoHandler} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "#ddd",
    display: "flex",
    height: "100%",
  },

  text: {
    fontSize: 24,
  },
});
