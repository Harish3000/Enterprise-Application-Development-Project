import "./App.css";
import {
  // BrowserRouter,
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
import Profile from "./Home/profile";
import Welcome from "./Home/welcome";

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
      path: "/welcome",
      element: <Welcome />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/dashboard",
      element: <SideBarMenu />
    },

    {
      path: "/profile",
      element: <Profile />
    },
    
    // inventory
    {
      path: "/inventory",
      element: <SideBarMenu />
    },
    // users
    {
      path: "/user",
      element: <User />
    },
    {
      path: "/add",
      element: <AddUser />
    },
    {
      path: "/update",
      element: <Update />
    },

    // vendors
    {
      path: "/vendor",
      element: <Vendor />
    },
    {
      path: "/add-vendor",
      element: <AddVendor />
    },
    {
      path: "/update-vendor",
      element: <UpdateVendor />
    },

    // orders
    {
      path: "/order",
      element: <Order />
    },
    {
      path: "/add-order",
      element: <AddOrder />
    },
    {
      path: "/update-order",
      element: <UpdateOrder />
    },

    // products
    {
      path: "/product",
      element: <ProductList />
    },
    {
      path: "/add-product",
      element: <AddProduct />
    },
    {
      path: "/update-product",
      element: <UpdateProduct />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
