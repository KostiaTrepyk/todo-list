import { Button, StyleSheet, Text, View } from "react-native";

import { type Todo } from "./types";

interface TodoListItemProps {
  todo: Todo;
  finishTodo: (todo: Todo) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, finishTodo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.date}>{todo.createdAt.toLocaleString()}</Text>
      </View>
      <Button title="Done" onPress={() => finishTodo(todo)} />
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
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    elevation: 2,
  },
  textContainer: {
    flexGrow: 1,
  },
  title: { fontSize: 18 },
  date: { fontSize: 12 },
});
