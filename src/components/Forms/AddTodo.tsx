import { useState } from "react";
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

  function AddTodoHandler() {
    if (!title) return;

    setTitle("");
    AddTodo(title);
  }

  const isDisabledAddBtn: boolean = !title;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.nativeEvent.text)}
        onSubmitEditing={AddTodoHandler}
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
  },
  input: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 50,
    flexGrow: 1,
    backgroundColor: "#fff",
    maxWidth: "86%" /* Fix  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */,
  },

  addBtnWrapper: {
    height: 45,
    backgroundColor: "#ffff",
    aspectRatio: 1 / 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#999",
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
