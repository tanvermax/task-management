import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Mainlayout from "./Component/Mainlayout.jsx";
import { RouterProvider } from "react-router-dom";
import { routs } from "./Routs/routs.jsx";
import Authprovider from "./Provider/Authprovider.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./Component/Home/SocketProvider.jsx";
import { ToastContainer } from "react-toastify";
// const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <SocketProvider>
   
      <Authprovider>
        <RouterProvider router={routs}></RouterProvider>
        <ToastContainer />
      </Authprovider>
    
   </SocketProvider>
  </StrictMode>
);
