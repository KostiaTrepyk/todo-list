import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { type Todo } from "./types";

function getTodoTimeCreation(date: Date): string {
  const time = date.toLocaleTimeString().slice(0, -3);

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  /* If craeted today */
  if (date.toDateString() === today.toDateString()) {
    return "Today, " + time;
  }

  /* If craeted yesterday */
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday, " + time;
  }

  return date.toLocaleString().slice(0, -3);
}

interface TodoListItemProps {
  todo: Todo;
  finishTodoHandler: (todo: Todo) => void;
  restoreTodoHandler: (todo: Todo) => void;
  deleteTodoHandler: (id: number) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  finishTodoHandler,
  restoreTodoHandler,
  deleteTodoHandler,
}) => {
  const date = getTodoTimeCreation(new Date(todo.createdAt));

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title} selectable>
          {todo.title}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {todo.isDone ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => restoreTodoHandler(todo)}
          >
            <Text style={styles.buttonText}>✔️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => finishTodoHandler(todo)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteTodoHandler(todo.id)}
        >
          <Text style={styles.buttonText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoListItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    elevation: 2,
  },
  textContainer: {
    flexGrow: 1,
  },
  title: { fontSize: 18 },
  date: { fontSize: 11 },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },

  button: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 50,
    aspectRatio: 1 / 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {},
});
