import React, { useState } from "react";

const Complete = () => {
  // Sample completed tasks
  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 1,
      title: "Submit Report",
      description: "Finalized and submitted report.",
      date: "2025-02-19",
      priority: "green",
      status: "To Do",
    },
    {
      id: 2,
      title: "Client Meeting",
      description: "Discussed project updates.",
      date: "2025-02-18",
      priority: "yellow",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Bug Fixes",
      description: "Resolved major issues in the code.",
      date: "2025-02-17",
      priority: "red",
      status: "Completed",
    },
  ]);

  const moveTask = (taskId, newStatus) => {
    setCompletedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-xl mt-5">
      <h2 className="text-3xl font-semibold mb-4">✅ Completed Tasks</h2>

      <div className="space-y-4">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center bg-green-100"
            >
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">📅 {task.date}</p>
              </div>

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
            </div>
          ))
        ) : (
          <p className="text-gray-600">No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default Complete;
