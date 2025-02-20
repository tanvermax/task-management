import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-12 gap-2 min-h-screen">
      <div className="col-span-2 border rounded-2xl">
        <ul className=" p-5 leading-7">
          <Link to={"addtask"} className="flex items-center gap-2 lg:text-xl">
            <CiCirclePlus />
            Add task
          </Link>
          <Link to={"tasklist"} className="flex items-center gap-2 lg:text-xl">
            <CiCirclePlus />
            Task List
          </Link>
        </ul>
      </div>
      <div className="col-span-10 border p-5 rounded-2xl">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
