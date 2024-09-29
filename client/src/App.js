import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  // Navigate,
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

function App() {
  const routes = createBrowserRouter([
    // {
    //   path: '/',
    //   element:<AppHome/>
    // },

    //Login and Register
    {
      path: '/register',
      element:<Register/>
    },
    {
      path: "/login",
      element: <Login />
    },


    {
      path: "/sidebar",
      element: <SideBarMenu />
      // children: [
      //   { element: <Navigate to="/sidebar" />, index: true },
    },

    //users
    { path: "/user", element: <User /> },
    {
      path: "/add",
      element: <AddUser />
    },
    {
      path: "/update/:id",
      element: <Update />
    },

    //vendors
    {
      path: "/vendor",
      element: <Vendor />
    },
    {
      path: "/add-vendor",
      element: <AddVendor />
    },
    {
      path: "/update-vendor/:id",
      element: <UpdateVendor />
    },

    //orders
    {
      path: "/order",
      element: <Order />
    },
    {
      path: "/add-order",
      element: <AddOrder />
    },
    {
      path: "/update-order/:id",
      element: <UpdateOrder />
    },

    //products
    { path: "/product", element: <ProductList /> },
    {
      path: "/add-product",
      element: <AddProduct />
    },
    {
      path: "/update-product/:id",
      element: <UpdateProduct />
    }
    //     ]
    //   }
  ]);

  return (
    <div className="App">
      <BrowserRouter>
        <SideBarMenu />
      </BrowserRouter>
      <div className="main-content">
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;
