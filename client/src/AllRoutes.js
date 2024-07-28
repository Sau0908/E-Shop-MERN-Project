import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import AllProduct from "./component/Product/AllProduct";
import AddProduct from "./component/Product/AddProduct";
import Main from "./component/Auth/Main";
import Body from "./component/Home/Body";
import EditProduct from "./component/Product/EditProduct";
import Product from "./component/Product/Product";
import PrivateRoute from "./component/PrivateRoute";
import AllUser from "./component/User/AllUser";

const AllRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
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
      element: <PrivateRoute element={AllProduct} />,
    },
    {
      path: "/product/:id",
      element: <PrivateRoute element={Product} />,
    },
    {
      path: "/editproduct/:id",
      element: <PrivateRoute element={EditProduct} />,
    },
    {
      path: "/alluser",
      element: <PrivateRoute element={AllUser} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AllRoutes;
