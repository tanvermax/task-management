import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Component/Mainlayout";

export const routs = createBrowserRouter([
    {
        path:"/",
        element:<Mainlayout></Mainlayout>
    }
])