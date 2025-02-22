import React, { useEffect, useState } from "react";
import Complete from "./Complete";
import Dragitem from "./Dragitem";
import { useDrop } from "react-dnd";
import "../../App.css";
const Inbox = () => {
  // Sample daily tasks
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/addedtask")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setBoard(data);
      });
  }, []);

  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (task) => movetoinprogress(task._id),
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
    await updateTaskStatus(id, "in-progress");
  };
  const movetoDone = async (id) => {
    await updateTaskStatus(id, "done");
  };

  const updateTaskStatus = async (id,status) => {
    const selectedtask = tasks.find((task) => task._id === id);

    console.log("Moving Task to In Progress:", selectedtask);

    setBoard((prevBoard) =>
      prevBoard.map((task) =>
        task._id === id ? { ...task, status } : task
      )
    );

    try {
      const res = await fetch(`http://localhost:5000/addedtask/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

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
        <div className=" rounded-xl border  overflow-scroll mx-auto">
          <h1>To-Do</h1>
          <div className=" grid grid-cols-1 gap-5 ">
            {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                <Dragitem key={task._id} task={task} />
              ))}
          </div>
        </div>
        {/* <Complete/> */}

        <div className="Board" ref={drop}>
          <h1>In Progress</h1>

          {board
            .filter((task) => task.status === "in-progress")
            .map((task) => {
              return <Dragitem key={task._id} task={task} />;
            })}
        </div>

        <div className="Board" ref={dropDone}>
          <h1>completed</h1>
          <div className={`grid gap-3 ${isOverDone ? "bg-green-200" : ""}`}>
            {board
              .filter((task) => task.status === "done")
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
