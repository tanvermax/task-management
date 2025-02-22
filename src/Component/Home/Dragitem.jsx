import React from "react";
import { useDrag } from "react-dnd";
import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Dragitem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  

  const handledelete = (id) => {
    console.log(id);
    fetch(`https://task-managment-server-jilq.onrender.com/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log("Task deleted successfully", data));
  };

  return (
    <>
      <div
        ref={drag}
        key={task.id}
        className={` rounded-lg shadow-md  justify-between border p-4 items-start md:items-center ${
          task.status === "completed" ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <div>
          <h3 className="lg:text-xl text-xs font-semibold">{task.title}</h3>
          <p className="text-gray-600 lg:text-base text-[8px]">
            {task.description}
          </p>
          <p className="lg:text-sm text-[8px] text-gray-500">📅 {task.date}</p>
        </div>

        <div className="flex items-center gap-1 mt-2 md:mt-0">
          {/* Priority Flag */}
          <span
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
              task.priority === "red"
                ? "bg-red-500"
                : task.priority === "yellow"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task.priority === "red"
              ? " High"
              : task.priority === "yellow"
              ? " Medium"
              : " Low"}
          </span>

          {/* Task Status */}
          <button
            className={`lg:px-3 py-1 px-1 rounded-lg text-white lg:text-sm text-[8px] font-semibold ${
              task.status === "todo"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {task.status}
          </button>

          <Link className="btn" to={`/edittask/${task._id}`}>
            <CiEdit />
          </Link>
          <button onClick={() => handledelete(task._id)} className="btn">
            <MdAutoDelete />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dragitem;
