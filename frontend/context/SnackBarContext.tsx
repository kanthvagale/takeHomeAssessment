import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";

type SnackbarType = "success" | "error";

type SnackbarContextType = {
  showSnackbar: (message: string, type?: SnackbarType) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");

  const showSnackbar = (
    msg: string,
    snackbarType: SnackbarType = "success"
  ) => {
    setMessage(msg);
    setType(snackbarType);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{
          backgroundColor:
            type === "error" ? "#D32F2F" : "#2E7D32",
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "useSnackbar must be used within a SnackbarProvider"
    );
  }

  return context;
};
