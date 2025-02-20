import Lottie from "lottie-react";
import React from "react";
import resiteanim from "./../../assets/Animation - 1740010453167.json";
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <>
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold">Registration now!</h1>
        </div>
        <div className="grid grid-cols-2 ">
          <div className="items-center justify-center ">
            <Lottie animationData={resiteanim}></Lottie>
          </div>
          <div>
            <div className="lg:p-10 bg-base-200 min-h-screen rounded-3xl">
              <div className=" flex-col lg:flex-row-reverse mt-20">
                <div className="card bg-base-100 w-full   shadow-2xl">
                  <div className="card-body">
                    <fieldset className="fieldset">
                    <label className="fieldset-label">Name</label>
                    <input type="email" className="input w-full" placeholder="name" />


                    <label className="fieldset-label">age</label>
                      <input type="email" className="input w-full" placeholder="age " />

                      <label className="fieldset-label">Email</label>
                      <input type="email" className="input w-full" placeholder="Email" />
                      <label className="fieldset-label">Password</label>
                      <input
                        type="password"
                        className="input w-full"
                        placeholder="Password"
                      />
                      {/* <div className="text-center">
                        <a className="link link-hover ">Forgot password?</a>
                      </div> */}
                      <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <div>
                        <Link className="">already have and account? log in with google</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Registration;