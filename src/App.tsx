// import './App.css'

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import { store } from "./redux/store";
import DetailPage from "./pages/DetailPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CompareProduct } from "./pages/CompareProduct";
import { queryClient } from "./Services/MainService";
import { UserProfile } from "./pages/UserProfile";
import { UserInfo } from "./components/UserInfo";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      id: "root",
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/detail/:id",
          element: <DetailPage />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },

        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/CompareProduct",
          element: <CompareProduct />,
        },
        {
          path: "User",
          element: <UserProfile />,
          children:[
            {
              index:true,
              element:<UserInfo/>
            }
          ]
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
