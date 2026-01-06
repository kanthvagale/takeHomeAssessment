import { getEmployees } from "@/api/restApi";
import EmployeeCard from "@/components/EmployeeCard";
import { useSnackbar } from "@/context/SnackBarContext";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
};

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    getEmployeesAPI();
  }, []);

  const getEmployeesAPI = useCallback(() => {
    setRefreshing(true);
    getEmployees()
      .then((res) => {
        setEmployees(res);
        setRefreshing(false);
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
        setRefreshing(false);
      });
  }, []);

  if (refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <FlatList
        data={employees}
        renderItem={({ item }) => <EmployeeCard item={item} />}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={<Text>No Employees</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getEmployeesAPI} />
        }
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    gap: 20,
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
