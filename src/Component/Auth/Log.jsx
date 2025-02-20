import Lottie from "lottie-react";
import React from "react";
import { useForm } from "react-hook-form";
import resiteanim from "./../../assets/Animation - 1740007365645.json";
import UserAuth from "../../Provider/UserAuth";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const { loginuser } = UserAuth();
  const navigate= useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   console.log (data.email, data.password);
  ;
    loginuser(data.email,data.password)
    .then(result=>{

      alert("hello user", result.user);
      navigate("/")
    })
    .catch(error=>{
      alert("error",error.message)
    })
  };

  return (
    <>
      <div className="text-center py-10 ">
        <h1 className="text-5xl font-bold">Login now!</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 lg:px-20">
        <div>
          <Lottie className="w-xl" animationData={resiteanim} />
        </div>
        <div className="bg-base-200 p-10 rounded-3xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="text-center">
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-4">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Log;
