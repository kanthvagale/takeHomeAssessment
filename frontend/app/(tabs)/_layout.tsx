import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="import" options={{ title: "Import" }} />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
