import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import User from "./User/user-list";
import AddUser from "./User/add-user";
import Update from "./User/update-user";
import SideBarMenu from "./Components/SideBarMenu";
import ProductList from "./Product/product-list";
import AddProduct from "./Product/add-product";
import UpdateProduct from "./Product/update-product";
import Vendor from "./Vendor/vendor-list";
import AddVendor from "./Vendor/add-vendor";
import UpdateVendor from "./Vendor/update-vendor";
import Order from "./Order/order-list";
import AddOrder from "./Order/add-order";
import UpdateOrder from "./Order/update-order";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AppHome from "./Home/home";
import ProtectedRoute from "./Routes/protected-route";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppHome />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <SideBarMenu />
        </ProtectedRoute>
      )
    },

    // users
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      )
    },
    {
      path: "/add",
      element: (
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      )
    },
    {
      path: "/update/:id",
      element: (
        <ProtectedRoute>
          <Update />
        </ProtectedRoute>
      )
    },

    // vendors
    {
      path: "/vendor",
      element: (
        <ProtectedRoute>
          <Vendor />
        </ProtectedRoute>
      )
    },
    {
      path: "/add-vendor",
      element: (
        <ProtectedRoute>
          <AddVendor />
        </ProtectedRoute>
      )
    },
    {
      path: "/update-vendor/:id",
      element: (
        <ProtectedRoute>
          <UpdateVendor />
        </ProtectedRoute>
      )
    },

    // orders
    {
      path: "/order",
      element: (
        <ProtectedRoute>
          <Order />
        </ProtectedRoute>
      )
    },
    {
      path: "/add-order",
      element: (
        <ProtectedRoute>
          <AddOrder />
        </ProtectedRoute>
      )
    },
    {
      path: "/update-order/:id",
      element: (
        <ProtectedRoute>
          <UpdateOrder />
        </ProtectedRoute>
      )
    },

    // products
    {
      path: "/product",
      element: (
        <ProtectedRoute>
          <ProductList />
        </ProtectedRoute>
      )
    },
    {
      path: "/add-product",
      element: (
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      )
    },
    {
      path: "/update-product/:id",
      element: (
        <ProtectedRoute>
          <UpdateProduct />
        </ProtectedRoute>
      )
    }
  ]);

  return (
    <div className="App">
      <BrowserRouter />
      <div>
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;
