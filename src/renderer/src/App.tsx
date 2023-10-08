import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MainContainer from "./components/MainContainer";
import { themeOptions } from "./theme";
import { Route, RouterProvider, Routes, createHashRouter } from 'react-router-dom';
import Home from "./components/Home";
import Menu from "./components/Menu";
import Users from "./components/Users";
import Order from "./components/Order";


export default function App() {
  const theme = createTheme(themeOptions)

  const router = createHashRouter([
    {
      path: "/",
      element: <MainContainer />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/order",
          element: <Order />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      {/* <MainContainer> */}
        <RouterProvider router={router} />
      {/* </MainContainer> */}
    </ThemeProvider>
  );
}