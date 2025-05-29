import React, { useEffect, useState } from "react";
import Complete from "./Complete";
import Dragitem from "./Dragitem";
import { useDrop } from "react-dnd";
import "../../App.css";
import UserAuth from "../../Provider/UserAuth";
import { useSocket } from "./SocketProvider";
import Queots from "./Queats.jsx/Queots";

const Inbox = () => {
  const { user } = UserAuth();
  const socket = useSocket();
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    if (user && user.email) {
      fetchTasks();
    }

    if (socket) {
      socket.on("taskUpdated", () => {
        console.log("📡 Task updated via Socket.IO");
        fetchTasks();
      });

      return () => {
        socket.off("taskUpdated");
      };
    }
  }, [user, socket]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (task) => moveTo("in-progress", task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverTodo }, dropTodo] = useDrop(() => ({
    accept: "task",
    drop: (task) => moveTo("todo", task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverDone }, dropDone] = useDrop(() => ({
    accept: "task",
    drop: (task) => moveTo("done", task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // https://task-managment-server-jilq.onrender.com


  const fetchTasks = async () => {
    try {
      console.log("📥 Fetching tasks...");
      const res = await fetch("https://task-managment-server-jilq.onrender.com/addedtask");
      const data = await res.json();
      console.log("✅ Fetched tasks:", data);
      setTasks(data);
      console.log(data);

    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  // console.log(data);


  const moveTo = async (status, id) => {
    console.log(`🔄 Moving task ${id} to ${status}`);
    try {
      const res = await fetch(`https://task-managment-server-jilq.onrender.com/addedtask/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      console.log("✅ Server Response:", data);

      if (data.modifiedCount > 0) {
        console.log("✅ Task updated successfully");
        socket.emit("updateTask", { _id: id, status });
        fetchTasks();
      } else {
        console.error("❌ Error: No modifications made");
      }
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  return (
    <>
      <div>
        <Queots></Queots>
      </div>
      <h2 className="lg:text-3xl text-[8px] font-semibold mb-4"> Hello! create, make  and finish it</h2>
      <div className="grid grid-cols-3 gap-1">
        <div ref={dropTodo} className="rounded-xl lg:text-base  text-[8px] border overflow-scroll mx-auto">
          <h1 className="p-3">To-Do</h1>
          <div className="grid grid-cols-1  p-1">
            {tasks
              .filter((task) => task.status === "todo" && task.userEmail === user.email)
              .map((task) => <Dragitem key={task._id} task={task} />)}
          </div>
        </div>

        <div className="Board p-2  " ref={drop}>
          <h1 className="lg:text-base text-[8px] p-3">In Progress</h1>

          <div >
          {tasks && Array.isArray(tasks) && tasks
            .filter((task) => task && task.status === "in-progress" && task.userEmail === user?.email)
            .map((task) => task && <Dragitem key={task._id} task={task} />)}
          </div>
        </div>

        <div className="Board" ref={dropDone}>
          <h1 className="lg:text-base text-[8px] p-3">Completed</h1>
          <div className={`grid p-3 gap-3 ${isOverDone ? "bg-green-200" : ""}`}>
            {tasks
              .filter((task) => task.status === "done" && task.userEmail === user.email)
              .map((task) => <Dragitem key={task._id} task={task} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
