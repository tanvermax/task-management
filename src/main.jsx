import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Mainlayout from "./Component/Mainlayout.jsx";
import { RouterProvider } from "react-router-dom";
import { routs } from "./Routs/routs.jsx";
import Authprovider from "./Provider/Authprovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={routs}></RouterProvider>
    </Authprovider>
  </StrictMode>
);
