import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface AddTodoFormProps {
  AddTodo: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ AddTodo }) => {
  const [title, setTitle] = useState<string>("");

  function AddTodoHandler() {
    if (!title) return;

    setTitle("");
    AddTodo(title);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
        onSubmitEditing={AddTodoHandler}
      />
      <Button title="Add" onPress={AddTodoHandler} disabled={!title} />
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
  },
  input: {
    paddingHorizontal: 8,
    borderWidth: 1,
    flexGrow: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
