import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BooksList from "./pages/BooksList.jsx";
import Book from "./pages/Book.jsx";
import Chapter from "./pages/Chapter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <BooksList />,
      },
      {
        path: "/list/:id",
        element: <Book />,
      },
      {
        path: "/chapter/:id",
        element: <Chapter />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
