import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
      title="Ingresar"
      onPress={()=> router.navigate("/mapScreen")}/>
    </View>
  );
}
