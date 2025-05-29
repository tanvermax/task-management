import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import UserAuth from "../../Provider/UserAuth";

const Navber = () => {
  const { user, handlelogout } = UserAuth();
  // console.log(user);

  const [loguser, setloguser]= useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/user")
    .then(res=>res.json())
    .then(data=>setloguser(data)
    )
  },[])

 
  
 const loggedInUser = loguser.filter((userData) => userData.email === user?.email);
  

//  console.log(loggedInUser);
 

  return (
    <div>
      <div className="navbar lg:w-11/12 mx-auto">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost lg:text-xl text-[8px]">
            ToDoTask
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="form-control">
            {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
            <div>
              {user ? (
                <>
                  <p className="btn lg:text-base text-[8px]">{user.email }</p>
                  <button onClick={handlelogout} className="btn lg:text-base text-[8px]">
                    logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={"login"} className="btn lg:text-base text-[8px]">
                    log in
                  </Link>
                  <Link to={"registrstion"} className="btn lg:text-base text-[8px]">
                    Registrstion
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
