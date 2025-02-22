import React, { useEffect, useState } from "react";
import Complete from "./Complete";
import Dragitem from "./Dragitem";
import { useDrop } from "react-dnd";
import "../../App.css";
import UserAuth from "../../Provider/UserAuth";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");



const Inbox = () => {
  const { user } = UserAuth();
  const [tasks, setTasks] = useState([]);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // Ensure user is defined before fetching tasks
    if (user && user.email) {
      fetch(`https://task-managment-server-jilq.onrender.com/addedtask`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setTasks(data);
          setBoard(data);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }

    socket.on("taskUpdated", (updatedtask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedtask._id ? updatedtask : task
        )
      );
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [user]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (task) => movetoinprogress(task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isovertodo }, droptodo] = useDrop(() => ({
    accept: "task",
    drop: (task) => movetodo(task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverDone }, dropDone] = useDrop(() => ({
    accept: "task",
    drop: (task) => movetoDone(task._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const movetoinprogress = async (id) => {
    console.log(`Moving task ${id} to In Progress`);
    await updateTaskStatus(id, "in-progress");
  };
  
  const movetodo = async (id) => {
    console.log(`Moving task ${id} to To-Do`);
    await updateTaskStatus(id, "todo");
  };
  
  const movetoDone = async (id) => {
    console.log(`Moving task ${id} to Done`);
    await updateTaskStatus(id, "done");
  };
  

  const updateTaskStatus = async (id, status) => {
    const selectedtask = tasks.find((task) => task._id === id);

    const updatedtask = tasks.find((task) => task._id === id);
    if (!updatedtask) return;

    updatedtask.status = status;
    socket.emit("updateTask", updatedtask);

    console.log("Moving Task to In Progress:", selectedtask);

    setBoard((prevBoard) =>
      prevBoard.map((task) => (task._id === id ? { ...task, status } : task))
    );

    try {
      const res = await fetch(
        `https://task-managment-server-jilq.onrender.com/addedtask/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      console.log(`Updated Task (${status}):`, data);

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, status } : task
          )
        );
      }
    } catch (err) {
      console.error(`Error updating task to ${status}:`, err);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">📥 Inbox </h2>
      <div className="grid grid-cols-3 gap-1">
        <div
          ref={droptodo}
          className=" rounded-xl border  overflow-scroll mx-auto"
        >
          <h1>To-Do</h1>
          <div className=" grid grid-cols-1 gap-5 ">
            {tasks
              .filter(
                (task) =>
                  task.status === "todo" && task.userEmail === user.email
              )
              .map((task) => (
                <Dragitem key={task._id} task={task} />
              ))}
          </div>
        </div>
        {/* <Complete/> */}

        <div className="Board" ref={drop}>
          <h1>In Progress</h1>

          {board
            .filter(
              (task) =>
                task.status === "in-progress" && task.userEmail === user.email
            )
            .map((task) => {
              return <Dragitem key={task._id} task={task} />;
            })}
        </div>

        <div className="Board" ref={dropDone}>
          <h1>completed</h1>
          <div className={`grid gap-3 ${isOverDone ? "bg-green-200" : ""}`}>
            {board
              .filter(
                (task) =>
                  task.status === "done" && task.userEmail === user.email
              )
              .map((task) => {
                return <Dragitem key={task._id} task={task} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
