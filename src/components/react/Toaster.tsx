import { Toaster } from "react-hot-toast";

function ToasterGlobal() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: "green",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "green",
          },
        },
        error: {
          style: {
            background: "red",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
        },
      }}
    />
  );
}

export default ToasterGlobal;
