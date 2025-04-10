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
import { PersonalInfo } from "./components/PersonalInfo";
import { Address } from "./components/Address";
import { CreateAddress } from "./components/CreateAddress";
import { UserOrders } from "./components/UserOrders";
import { FavoriteProducts } from "./components/FavoriteProducts";
import { ChangePassword } from "./components/ChangePassword";
import { Blog } from "./pages/Blog";
import { AllBlog } from "./components/AllBlog";
import { SkinCare } from "./components/SkinCare";
import { BlogDetail } from "./pages/BlogDetail";

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
          path: "/User",
          element: <UserProfile />,
          children: [
            {
              index: true,
              element: <UserInfo />,
            },
            {
              path: "info",
              element: <PersonalInfo />,
            },
            {
              path: "address",
              element: <Address />,
            },
            {
              path: "address/create",
              element: <CreateAddress />,
            },
            {
              path: "orders",
              element: <UserOrders />,
            },
            {
              path: "favorites",
              element: <FavoriteProducts />,
            },
            {
              path:"change-password",
              element:<ChangePassword/>
            }
          ],
        },
        {

          path:"/blog",
          element:<Blog/>,
          children:[
            {
              index:true,
              element:<AllBlog/>
            },
            {
              path:"cach-cham-da/:id",
              element:<SkinCare/>
            }
          ]
        },
        {
          path:"/blogdetail/:id",
          element:<BlogDetail/>
        }
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
