import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider, Typography, Box } from "@mui/material";
import "@fontsource/poppins"; // Poppins font

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: { fontWeight: 800, fontSize: "3rem" }, // big title
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
    caption: { fontSize: "0.8rem", color: "#555" },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h1">File Upload Manager</Typography>
    </Box>
    <App />
  </ThemeProvider>
);
