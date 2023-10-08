import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MainContainer from "./components/MainContainer";
import { themeOptions } from "./theme";
import { Route, RouterProvider, Routes, createHashRouter } from 'react-router-dom';
import Home from "./components/Home";
import Menu from "./components/Menu";
import Users from "./components/Users";
import Order from "./components/Order";
import Products from "./components/Products";


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
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}