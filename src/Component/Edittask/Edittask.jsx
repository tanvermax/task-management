import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edittask = () => {
  // const loadData = useLoaderData();
  // console.log(loadData);
  const { id } = useParams();
  console.log("Editing task ID:", id);
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://task-managment-server-jilq.onrender.com/updatetask/${id}`) // Adjust URL based on your backend
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error("Error fetching task:", err));
  }, [id]);
  console.log(task);

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  
    fetch(`https://task-managment-server-jilq.onrender.com/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.modifiedCount > 0) {
          // alert("Task updated successfully!");
           toast('Task updated successfully!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
          navigate("/"); // Redirect to task list after update
        }
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div className="max-w-md mx-auto  shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Update your Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="block font-medium">Task Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task title"
            defaultValue={task.title}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Task Description */}
        <div>
          <label className="block font-medium">Task Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task details"
            defaultValue={task.description}
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            defaultValue={task.date}
            {...register("date")}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Priority Mark */}
        <div>
          <label className="block font-medium">Priority</label>
          <select
            defaultValue={task.priority}
            {...register("priority",)}
            className="w-full p-2 border bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Priority</option>
            <option value="red">🔴 Red Flag (High Priority)</option>
            <option value="yellow">🟡 Yellow Flag (Medium Priority)</option>
            <option value="green">🟢 Green Flag (Low Priority)</option>
          </select>
          {errors.priority && (
            <p className="text-red-500">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            defaultValue={task.status}
            {...register("status")}
            className="w-full p-2 border bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="todo">todo</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white  p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default Edittask;
