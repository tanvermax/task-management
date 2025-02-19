import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Mainlayout from "./Component/Mainlayout.jsx";
import { RouterProvider } from "react-router-dom";
import { routs } from "./Routs/routs.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routs}></RouterProvider>
  </StrictMode>
);
