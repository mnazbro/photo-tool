import { useEffect, type FC } from "react";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import { darkTheme, lightTheme } from "./themes";
import { router } from "./router";
import { useAppSelector, useLoadState } from "./hooks";
import { SnackbarProvider } from "notistack";

export const App: FC = () => {
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
