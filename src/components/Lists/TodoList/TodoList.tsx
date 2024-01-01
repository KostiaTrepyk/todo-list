import { FlatList, StyleSheet } from "react-native";

import { type Todo } from "./types";
import TodoListItem from "./TodoListItem";
import EmptyTodoList from "./EmptyTodoList";

interface TodoListProps {
  todos: Todo[];
  restoreTodoHandler: (todo: Todo) => void;
  finishTodoHandler: (todo: Todo) => void;
  deleteTodoHandler: (id: number) => void;
  hideDone?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  restoreTodoHandler,
  finishTodoHandler,
  deleteTodoHandler,
  hideDone = false,
}) => {
  const data = hideDone ? todos.filter((todo) => !todo.isDone) : todos;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TodoListItem
          todo={item}
          finishTodoHandler={finishTodoHandler}
          restoreTodoHandler={restoreTodoHandler}
          deleteTodoHandler={deleteTodoHandler}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<EmptyTodoList />}
      style={styles.container}
    />
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
