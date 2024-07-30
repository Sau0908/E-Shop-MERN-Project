import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllProduct from "./component/Product/AllProduct";
import AddProduct from "./component/Product/AddProduct";
import Main from "./component/Auth/Main";
import Body from "./component/Home/Body";
import EditProduct from "./component/Product/EditProduct";
import Product from "./component/Product/Product";
import PrivateRoute from "./component/PrivateRoute";
import AllUser from "./component/User/AllUser";
import AdminPannel from "./component/Admin/AdminPannel";
import UserProfile from "./component/User/UserProfile";

const AllRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
      path: "/login",
      element: <Main />,
    },
    {
      path: "/browse",
      element: <PrivateRoute element={Body} />,
    },
    {
      path: "/addproduct",
      element: <PrivateRoute element={AddProduct} />,
    },
    {
      path: "/allproduct",
      element: <AllProduct />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
    {
      path: "/editproduct/:id",
      element: <PrivateRoute element={EditProduct} />,
    },
    {
      path: "/alluser",
      element: <PrivateRoute element={AllUser} />,
    },
    {
      path: "/admin",
      element: <PrivateRoute element={AdminPannel} />,
    },
    {
      path: "/user/userprofile",
      element: <PrivateRoute element={UserProfile} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AllRoutes;
