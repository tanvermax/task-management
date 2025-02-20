import React, { useState } from "react";
import Complete from "./Complete";
import Dragitem from "./Dragitem";
import { useDrop } from "react-dnd";
import "../../App.css";
const Inbox = () => {
  // Sample daily tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Meeting with Team",
      description: "Discuss project progress.",
      date: "2025-02-20",
      priority: "red",
      status: "pending",
    },
    {
      id: 2,
      title: "Code Review",
      description: "Review PRs and provide feedback.",
      date: "2025-02-21",
      priority: "yellow",
      status: "completed",
    },
    {
      id: 3,
      title: "Write Report",
      description: "Complete project documentation.",
      date: "2025-02-22",
      priority: "green",
      status: "pending",
    },
    {
      id: 4,
      title: "write a cv fr job",
      description: "Complete project documentation.",
      date: "2025-02-22",
      priority: "green",
      status: "pending",
    },
  ]);
  const [board, setBoard] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (task) => addtasktobord(task.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addtasktobord = (id) => {
    const selectedTask = tasks.find((task) => task.id === id); // Use `tasks`
    if (selectedTask) {
      setBoard((prevBoard) => [...prevBoard, selectedTask]); // Update board state
    }
  };

  // Function to toggle task status
  const toggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  return (
    <>
      <div className="max-w-4xl max-h-[400px] rounded-xl border overflow-scroll mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-4">📥 Inbox - Daily Tasks</h2>

        <div className="py-5 ">
          {tasks.map((task) => (
            <Dragitem key={task.id} task={task} />
          ))}
        </div>
      </div>
      {/* <Complete/> */}

      <div className="Board" ref={drop}>
        {board.map((task) => {
          return (
            <>
              <div
                
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
                    {task.status === "pending"
                      ? "Mark as Done"
                      : "Completed ✅"}
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Inbox;

{
  /* <div className="space-y-4">
{tasks.map((task) => (
  <div
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
      {/* Priority Flag */
}
//       <span
//         className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
//           task.priority === "red"
//             ? "bg-red-500"
//             : task.priority === "yellow"
//             ? "bg-yellow-500"
//             : "bg-green-500"
//         }`}
//       >
//         {task.priority === "red"
//           ? "🔴 High"
//           : task.priority === "yellow"
//           ? "🟡 Medium"
//           : "🟢 Low"}
//       </span>

//       {/* Task Status */}
//       <button
//         onClick={() => toggleStatus(task.id)}
//         className={`px-3 py-1 rounded-lg text-white text-sm font-semibold ${
//           task.status === "pending"
//             ? "bg-blue-500 hover:bg-blue-600"
//             : "bg-gray-500 hover:bg-gray-600"
//         }`}
//       >
//         {task.status === "pending" ? "Mark as Done" : "Completed ✅"}
//       </button>
//     </div>
//   </div>
// ))}
// </div> */}
