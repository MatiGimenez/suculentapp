import { signIn } from "@/store/auth";
import { router } from "expo-router";
import { FC } from "react";
import { Button, Text, View } from "react-native";

const Login: FC = () => {
  const handleLogin = () => {
    signIn();
  };

  return (
    <View>
      <Text>Login ...</Text>
      <Button
        title="Go to Sign in"
        onPress={() => router.replace("/(unlogged)/sign-in")}
      />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
};

export default Login;
