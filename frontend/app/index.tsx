import { router } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const pressOnContinue = () => {
    router.navigate("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <Text style={styles.header}>TakeHomeAssessment</Text>

      <TouchableOpacity onPress={pressOnContinue} style={styles.btn}>
        <Text style={styles.btnTxt}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    gap: 24,
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    color: "#000000",
  },
  btn: {
    marginHorizontal: 24,
    borderRadius: 100,
    paddingVertical: 10,
    backgroundColor: "#0e76ffff",
  },
  btnTxt: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
  },
});
