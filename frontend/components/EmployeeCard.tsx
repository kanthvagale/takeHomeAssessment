import { Employee } from "@/app/(tabs)";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const EmployeeCard = ({ item }: { item: Employee }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => {
        router.push(`/employee/${item._id}`);
      }}
    >
      <Text>{item.username}</Text>
    </TouchableOpacity>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
