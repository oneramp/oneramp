import { createTheme } from "@mui/material";

// colors
const primaryColor = "#2b3f99";
const primaryGreen = "#0d7f41";
const dimWhite = "#f2f2f2";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Khula",
    button: {
      textTransform: "none",
    },
  },
});

export { theme, primaryColor, primaryGreen, dimWhite };
