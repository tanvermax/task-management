import React, { useEffect, useState } from "react";
import Complete from "./Complete";
import Dragitem from "./Dragitem";
import { useDrop } from "react-dnd";
import "../../App.css";
import UserAuth from "../../Provider/UserAuth";
import { useSocket } from "./SocketProvider";

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

  const fetchTasks = async () => {
    try {
      console.log("📥 Fetching tasks...");
      const res = await fetch("https://task-managment-server-jilq.onrender.com/addedtask");
      const data = await res.json();
      console.log("✅ Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

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
      <h2 className="lg:text-3xl text-[8px] font-semibold mb-4">📥 Inbox </h2>
      <div className="grid grid-cols-3 gap-1">
        <div ref={dropTodo} className="rounded-xl lg:text-base  text-[8px] border overflow-scroll mx-auto">
          <h1>To-Do</h1>
          <div className="grid grid-cols-1 lg:gap-5">
            {tasks
              .filter((task) => task.status === "todo" && task.userEmail === user.email)
              .map((task) => <Dragitem key={task._id} task={task} />)}
          </div>
        </div>

        <div className="Board" ref={drop}>
          <h1 className="lg:text-base text-[8px]">In Progress</h1>
          {tasks
            .filter((task) => task.status === "in-progress" && task.userEmail === user.email)
            .map((task) => <Dragitem key={task._id} task={task} />)}
        </div>

        <div className="Board" ref={dropDone}>
          <h1 className="lg:text-base text-[8px]">Completed</h1>
          <div className={`grid gap-3 ${isOverDone ? "bg-green-200" : ""}`}>
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
