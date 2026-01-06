import { uploadEmployeeExcel } from "@/api/restApi";
import { useSnackbar } from "@/context/SnackBarContext";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Import() {
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const pickExcelFile = async () => {
    setResult(null);

    const res = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
    });

    if (res.canceled) return;

    const file = res.assets[0];

    if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      showSnackbar("Only Excel files are allowed", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    } as any);

    try {
      setLoading(true);
      const response = await uploadEmployeeExcel(formData);
      setResult(response);
      showSnackbar(`${response.insertedCount} employees imported`, "success");
    } catch (err: any) {
      showSnackbar(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={loading ? "Uploading..." : "Import from Excel"}
        onPress={pickExcelFile}
        // disabled={loading}
      />

      {result && (
        <View style={styles.resultBox}>
          <Text>Inserted: {result.insertedCount}</Text>
          <Text>Failed: {result.invalidCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  resultBox: {
    marginTop: 24,
  },
});
