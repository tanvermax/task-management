import React from "react";
import { useDrag } from "react-dnd";

const Dragitem = ({ task }) => {
  if (!task) {
    console.error("Dragitem received an undefined task!");
    return null;
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div ref={drag}
        key={task.id}
        className={`p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center ${
          task.status === "completed" ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <div>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">📅 {task.date}</p>
        </div>

        <div className="flex items-center gap-4 mt-2 md:mt-0">
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
              ? "🔴 High"
              : task.priority === "yellow"
              ? "🟡 Medium"
              : "🟢 Low"}
          </span>

          {/* Task Status */}
          <button
            onClick={() => toggleStatus(task.id)}
            className={`px-3 py-1 rounded-lg text-white text-sm font-semibold ${
              task.status === "pending"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {task.status === "pending" ? "Mark as Done" : "Completed ✅"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Dragitem;

{/* <div
  ref={drag}
  className={`p-4 my-3 rounded-md shadow-md border bg-white cursor-pointer ${
    isDragging ? "opacity-50" : "opacity-100"
  }`}
></div>; */}
