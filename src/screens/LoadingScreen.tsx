import { View, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
