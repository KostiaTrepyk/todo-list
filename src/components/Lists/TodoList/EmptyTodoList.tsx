import { StyleSheet, Text } from "react-native";

interface EmptyTodoListProps {}

const EmptyTodoList: React.FC<EmptyTodoListProps> = () => {
  return <Text style={styles.text}>Empty</Text>;
};

export default EmptyTodoList;

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    textAlign: "center",
    marginTop: 16,
  },
});
