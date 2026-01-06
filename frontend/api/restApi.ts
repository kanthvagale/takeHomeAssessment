import axios from "axios";

export const getEmployees = async () => {
  try {
    const response = await axios.get("http://192.168.1.9:3000/api/employee");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error('Something went wrong');
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://192.168.1.9:3000/api/employee/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
    throw new Error('Something went wrong');
  }
};

// export const createEmployee = (data: any) =>
//   networkCall("/employee", "POST", data);

// export const updateEmployee = (id: string, data: any) =>
//   networkCall(`/employee/${id}`, "PUT", data);

// export const deleteEmployee = (id: string) =>
//   networkCall(`/employee/${id}`, "DELETE");

export const uploadEmployeeExcel = async (formData: FormData) => {
  try {
    const response = await axios.post(
      "http://192.168.1.9:3000/api/employee/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("ERROR", error);

    throw new Error(
      error?.response?.data?.message || "Failed to upload Excel file"
    );
  }
};

