import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { SnackbarProvider } from "notistack";
import Router from "./router/index.jsx";
import "@fontsource/anonymous-pro";
import "@fontsource/poppins";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <RouterProvider router={Router} />
    </SnackbarProvider>
  </StrictMode>
);
