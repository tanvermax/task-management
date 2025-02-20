import React from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import resiteanim from "./../../assets/Animation - 1740010453167.json";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold">Register Now!</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 lg:px-20">
        <div>
          <Lottie animationData={resiteanim} />
        </div>
        <div className="bg-base-200 p-10 rounded-3xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="input w-full"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold">Age</label>
              <input
                {...register("age", { required: "Age is required" })}
                type="number"
                className="input w-full"
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500">{errors.age.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                className="input w-full"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="input w-full"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold">Your  Type</label>
              <select
                {...register("userType", { required: "Please select a user type" })}
                className="input w-full"
              >
                <option value="">Select an option</option>
                <option value="student">Education</option>
                <option value="company">Company Use</option>
                <option value="group">Group</option>
              </select>
              {errors.userType && <p className="text-red-500">{errors.userType.message}</p>}
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link className="text-blue-600 hover:underline" to="/login">
              Already have an account? Log in with Google
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
