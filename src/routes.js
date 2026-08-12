import { createBrowserRouter } from "react-router";
import { Products } from "./pages/products";
import { ProductDetails } from "./pages/product-details";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  { path: "/", Component: Products },
  {
    path: "/products/:productId",
    Component: ProductDetails,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
