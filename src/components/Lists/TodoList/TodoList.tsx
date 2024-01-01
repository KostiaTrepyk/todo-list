import { FlatList, StyleSheet } from "react-native";

import { type Todo } from "./types";
import TodoListItem from "./TodoListItem";
import EmptyTodoList from "./EmptyTodoList";

interface TodoListProps {
  todos: Todo[];
  finishTodo: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, finishTodo }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoListItem todo={item} finishTodo={finishTodo} />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<EmptyTodoList />}
      style={styles.container}
    >
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} finishTodo={finishTodo} />
      ))}
    </FlatList>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
