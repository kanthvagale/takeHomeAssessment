import { getEmployeeById } from "@/api/restApi";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Employee } from "../(tabs)";

export default function EmployeeDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getEmployeeById(id)
      .then(setEmployee)
      .catch(() => setEmployee(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.center}>
        <Text>Employee not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {employee.firstName} {employee.lastName}
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{employee.username}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{employee.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.value}>{employee.mobile}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>
          {new Date(employee.createdAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
});
