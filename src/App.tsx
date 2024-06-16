import type { FC, PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router";
import { darkTheme, lightTheme } from "./themes";
import { router } from "./router";
import { useAppSelector } from "./hooks/redux";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <GlobalStyles
          styles={{
            ".notistack-SnackbarContainer": {
              bottom: "calc(env(safe-area-inset-bottom) + 14px)",
            },
          }}
        />
        <SnackbarProvider maxSnack={3} dense>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeWrapper>
    </Provider>
  );
};

export const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
