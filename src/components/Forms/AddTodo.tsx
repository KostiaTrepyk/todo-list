import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddTodoFormProps {
  AddTodo: (title: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ AddTodo }) => {
  const [title, setTitle] = useState<string>("");

  const inputRef = useRef<TextInput>(null);

  function AddTodoHandler() {
    if (!title) return;

    setTitle("");
    AddTodo(title);

    inputRef.current?.blur();
  }

  const isDisabledAddBtn: boolean = !title;

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Write a task..."
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
        onSubmitEditing={AddTodoHandler}
        selectTextOnFocus
        scrollEnabled
        blurOnSubmit
        multiline
      />

      <View style={[styles.addBtnWrapper, isDisabledAddBtn && styles.disabled]}>
        <TouchableOpacity onPress={AddTodoHandler} disabled={isDisabledAddBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    gap: 4,
    maxWidth: "100%",
    overflow: "hidden",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 1,
  },
  input: {
    minHeight: 55,
    maxHeight: 100,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 25,
    flexGrow: 1,
    flexShrink: 1,
  },

  addBtnWrapper: {
    height: 55,
    aspectRatio: 1 / 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  addBtnText: {
    color: "#444",
    fontSize: 20,
    transform: [{ scale: 1.6 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
