import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layouts/layout.tsx";
import Home from "./Pages/Home.tsx";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import { store } from "./Store.ts";
import Profile from "./Pages/Profile.tsx";
import Protect from "./Pages/Protect.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <Protect>
            <Profile />{" "}
          </Protect>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
);
