import React from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../store/authContext/AuthContext";
import { useContext, useState } from "react";
import Avatar from "../ui/Avatar";
import UserContext from "../store/userContext/UserContext";

const Navbar = (props) => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-primary">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 text-2xl lg:text-4xl px-2 mx-2 justify-center lg:justify-start">Post Box</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal space-x-4 text-lg">
              {/* Navbar menu content here */}
              <li>{authCtx.isAuthenticated && <Link to={"/"}>Home</Link>}</li>
              <li>
                {authCtx.isAuthenticated ? (
                  <Link to={"/profile"}>Profile</Link>
                ) : (
                  <Link to={"/login"}>Login</Link>
                )}
              </li>
              <li>
                {authCtx.isAuthenticated ? (
                  <Link to={"/"} onClick={authCtx.logout}>
                    Logout
                  </Link>
                ) : (
                  <Link to={"/signup"}>Signup</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div>{props.children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          {authCtx.isAuthenticated && <div className="border-b-2">
            <div className="flex flex-col items-center space-y-4 mb-4">
              <Avatar size={24} img={userCtx.user?.img} firstAlpha={userCtx.user?.name[0] } />
              <h2>{userCtx.user?.name}</h2>
            </div>
          </div>}
          {/* Sidebar content here */}
          <li>{authCtx.isAuthenticated && <Link to={"/"}>Home</Link>}</li>
          <li>
            {authCtx.isAuthenticated ? (
              <Link to={"/profile"}>Profile</Link>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </li>
          <li>
            {authCtx.isAuthenticated ? (
              <Link to={"/"} onClick={authCtx.logout}>
                Logout
              </Link>
            ) : (
              <Link to={"/signup"}>Signup</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
