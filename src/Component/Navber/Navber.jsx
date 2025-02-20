import React from "react";
import { Link } from "react-router-dom";
import UserAuth from "../../Provider/UserAuth";

const Navber = () => {
  const { user, handlelogout } = UserAuth();

  return (
    <div>
      <div className="navbar w-11/12 mx-auto">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
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
                  <p className="btn">{user.email}</p>
                  <button onClick={handlelogout} className="btn">
                    logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={"login"} className="btn">
                    log in
                  </Link>
                  <Link to={"registrstion"} className="btn">
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
