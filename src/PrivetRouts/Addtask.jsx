import React from "react";
import { useForm } from "react-hook-form";

const Addtask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  

  const onSubmit = (data) => {
    console.log("Task Data:", data);
    reset(); // Clear form after submission
  };
  
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="block font-medium">Task Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Task Description */}
        <div>
          <label className="block font-medium">Task Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter task details"
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
            {...register("date", { required: "Date is required" })}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Priority Mark */}
        <div>
          <label className="block font-medium">Priority</label>
          <select
            {...register("priority", { required: "Priority is required" })}
            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default Addtask;
