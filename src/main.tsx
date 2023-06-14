import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./components/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./assets/colors.scss";

import "./assets/index.scss";
import "./assets/fonts/fonts.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);
