import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-12 gap-2 min-h-screen">
      <div className="col-span-2 border">
        <ul className=" p-5 ">
          <Link to={"addtask"} className="flex items-center gap-2 text-xl">
            <CiCirclePlus />
            Add task
          </Link>
          <Link to={"tasklist"} className="flex items-center gap-2 text-xl">
            <CiCirclePlus />
            Task List
          </Link>
        </ul>
      </div>
      <div className="col-span-10 border p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
