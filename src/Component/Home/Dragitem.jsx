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
        className={` rounded-lg shadow-md  justify-between border lg:p-5  p-1 items-start md:items-center ${
          task.status === "done" ? "bg-amber-900" : "bg-gray-100"
        }`}
      >
        <div className="">
          <h3 className="lg:text-xl text-[8px] font-semibold">{task.title}</h3>
          <p className="text-gray-600 lg:text-base text-[8px]">
            {task.description}
          </p>
          <p className="lg:text-sm text-[8px] text-gray-500">📅 {task.date}</p>
        </div>

        <div className="lg:flex items-center gap-1 mt-2 md:mt-0">
          {/* Priority Flag */}
          <span
            className={`lg:p-2 py-1 px-1 rounded-md text-white lg:text-xs text-[8px] font-semibold ${
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
            className={` lg:p-2 px-1 rounded-md text-white lg:text-sm text-[8px] font-semibold ${
              task.status === "todo"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-600 hover:bg-gray-600"
            }`}
          >
            {task.status}
          </button>

          <Link className="lg:btn p-1 lg:text-xs text-[8px]" to={`/edittask/${task._id}`}>
            <CiEdit />
          </Link>
          <button onClick={() => handledelete(task._id)} className="lg:btn lg:text-xs text-[8px]">
            <MdAutoDelete />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dragitem;
