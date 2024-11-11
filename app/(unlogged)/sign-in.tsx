import { router } from "expo-router";
import { FC } from "react";
import { Button, Text, View } from "react-native";

const SignIn: FC = () => {
  return (
    <View>
      <Text>Sign in ...</Text>
      <Button
        title="Go to login"
        onPress={() => router.replace("/(unlogged)/login")}
      />
    </View>
  );
};

export default SignIn;
