import { createBrowserRouter } from "react-router";
import { Products } from "./pages/products";
import { ProductDetails } from "./pages/product-details";

function Root() {
  return <h1>Hello world</h1>;
}

export const router = createBrowserRouter([
  { path: "/", Component: Root },
  { path: "/products", Component: Products },
  {
    path: "/products/:productId",
    Component: ProductDetails,
  }
]);
