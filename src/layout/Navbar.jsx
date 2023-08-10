import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import AuthContext from "../store/authContext/AuthContext";
import { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = (props) => {
  // const { state, logout } = useContext(AuthContext);
  const { user, isAuthenticated, logout } = useAuth();
  console.log("in anvbar authCtx", user, isAuthenticated);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-slate-200">
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
          <div className="flex-1 text-xl font-bold lg:text-4xl px-2 mx-2 justify-center lg:justify-start">
            Post Box
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal space-x-4 text-md">
              {/* Navbar menu content here */}
              <li>
                <Link to={"/"}>
                  <span>
                    <AiFillHome size={20} />
                  </span>
                  Home
                </Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <NavLink to={"/profile"}>
                    <span>
                      <BsFillPersonFill size={20} />
                    </span>
                    Profile
                  </NavLink>
                ) : (
                  <NavLink to={"/login"}>Login</NavLink>
                )}
              </li>
              <li>
                {isAuthenticated ? (
                  <NavLink to={"/"} onClick={logout}>
                    <span>
                      <FiLogOut size={20} />
                    </span>
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to={"/signup"}>Signup</NavLink>
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
          {/* Sidebar content here */}
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to={"/"}>
                  <span>
                    <AiFillHome size={20} />
                  </span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>
                  <span>
                    <BsFillPersonFill size={20} />
                  </span>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"} onClick={logout}>
                  <span>
                    <FiLogOut size={20} />
                  </span>
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/login"}>
                  <span>
                    <AiFillHome size={20} />
                  </span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/signup"}>Signup</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
