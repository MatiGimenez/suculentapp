import { View, Text, Button } from "react-native";
import React, { FC } from "react";
import { signOut } from "@/store/auth";

const Home: FC = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

export default Home;
