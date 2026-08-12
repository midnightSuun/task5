import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import { Provider } from 'react-redux';
import { store } from "./store";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
