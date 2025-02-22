import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Component/Mainlayout";
import Home from "../Component/Home/Home";
import Addtask from "../PrivetRouts/Addtask";
import TaskList from "../PrivetRouts/TaskList";
import Log from "../Component/Auth/Log";
import Registration from "../Component/Auth/Registration";
import Inbox from "../Component/Home/Inbox";
import PrivetRouts from "./PrivetRouts";
import Edittask from "../Component/Edittask/Edittask";

export const routs = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <h2>erro there is no page</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement: <h2>erro there is no page</h2>,
        children: [
          {
            path: "/",
            element: <Inbox></Inbox>,
          },
          {
            path: "/addtask",
            element: (
              <PrivetRouts>
                <Addtask></Addtask>
              </PrivetRouts>
            ),
            errorElement: <h2>erro there is no page</h2>,
          },
          {
            path: "/edittask/:id",
            element: (
              <PrivetRouts>
                <Edittask></Edittask>
              </PrivetRouts>
            ),
            loader: ({ params }) => {
              console.log("task id :=",params.id);

              fetch(`https://task-managment-server-jilq.onrender.com/edittask/${params.id}`);
            },
            errorElement: <h2>erro there is no page</h2>,
          },
          {
            path: "/tasklist",
            element: (
              <PrivetRouts>
                <TaskList></TaskList>
              </PrivetRouts>
            ),
            errorElement: <h2>erro there is no page</h2>,
          },
        ],
      },
      {
        path: "/login",
        element: <Log></Log>,
      },
      {
        path: "/registrstion",
        element: <Registration></Registration>,
      },
    ],
  },
]);
