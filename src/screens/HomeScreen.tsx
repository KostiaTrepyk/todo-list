import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  loadHideDone,
  loadTodos,
  saveHideDone,
  saveTodos,
} from "../storage/storage";

import { type Todo } from "../components/Lists/TodoList/types";
import AddTodoForm from "../components/Forms/AddTodo";
import TodoList from "../components/Lists/TodoList/TodoList";
import LoadingScreen from "./LoadingScreen";

const HomeScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hideDone, setHideDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* Load the todos and hideDone state from storage when the component mounts. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await loadTodos();
        if (todosData !== undefined) {
          setTodos(todosData);
        }

        const hideDoneData = await loadHideDone();
        if (hideDoneData !== undefined) {
          setHideDone(hideDoneData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function restoreTodoHandler(todo: Todo) {
    setTodos((prev) => {
      const result = [...prev];
      const i = prev.findIndex((_todo) => _todo.id === todo.id);
      result[i] = { ...result[i], isDone: false };

      saveTodos(result);
      return result;
    });
  }

  function finishTodoHandler(todo: Todo) {
    setTodos((prev) => {
      const result = [...prev];
      const i = prev.findIndex((_todo) => _todo.id === todo.id);
      result[i] = { ...result[i], isDone: true };

      saveTodos(result);
      return result;
    });
  }

  function AddTodoHandler(title: string) {
    setTodos((prev) => {
      const newTodo: Todo = {
        id: (prev[prev.length - 1]?.id || 0) + 1,
        title,
        isDone: false,
        createdAt: new Date(),
      };

      saveTodos([...prev, newTodo]);
      return [...prev, newTodo];
    });
  }

  function deleteTodoHandler(id: number) {
    setTodos((prev) => {
      const result = prev.filter((prevTodo) => prevTodo.id !== id);

      saveTodos(result);
      return result;
    });
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />

      <View style={styles.titleContaner}>
        <Text style={styles.title}>Today's tasks</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Hide done</Text>
          <Switch
            value={hideDone}
            onChange={(e) => {
              setHideDone(e.nativeEvent.value);
              saveHideDone(e.nativeEvent.value);
            }}
            thumbColor={styles.switch.color}
          />
        </View>
      </View>

      <TodoList
        todos={todos}
        finishTodoHandler={finishTodoHandler}
        restoreTodoHandler={restoreTodoHandler}
        deleteTodoHandler={deleteTodoHandler}
        hideDone={hideDone}
      />

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

  titleContaner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#444",
    fontSize: 28,
    fontWeight: "900",
  },

  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {},
  switch: {
    color: "#0090ff",
  },
});
