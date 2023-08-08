import React from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";


const MainProfile = () => {
  return (
    <div className="flex flex-col">
      <div className="container bg-base-200 h-[150px] ">
        <div className="w-full h-2/3 bg-hero-pattern"></div>
        <div className="relative">
          <div className="absolute -top-6 left-4 md:left-8 h-20 w-20 rounded-full bg-slate-700 overflow-hidden">
            <img src="https://picsum.photos/200" alt="" />
          </div>
          <button className="w-8 h-8 rounded-full shadow-md bg-base-100 absolute flex items-center justify-center left-16 -bottom-1 md:left-20">
            <AiOutlineEdit size={16} />
          </button>
          <div className="flex justify-between items-center">
            <div className="text-left pl-28 md:pl-32">
              <h1 className="text-lg font-bold">Imran 1</h1>
              <h2 className="text-sm text-gray-500">email</h2>
            </div>
            <div>
              <button className="btn border-none rounded-full">
                <AiOutlineEdit size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 flex pl-4 py-2 gap-4 text-[16px]">
        <NavLink
          to="/profile/posts"
          className={({ isActive }) => {
            const commonClasses = "text-gray-500 p-2 rounded";
            const activeClasses =
              " bg-primary scale-110 transform duration-200 text-black";
            return isActive
              ? activeClasses + " " + commonClasses
              : commonClasses;
          }}
        >
          Posts
        </NavLink>
        <NavLink
          to="/profile/savedposts"
          className={({ isActive }) => {
            const commonClasses = "text-gray-500 p-2 rounded";
            const activeClasses =
              " bg-primary scale-110 transform duration-200 text-black";
            return isActive
              ? activeClasses + " " + commonClasses
              : commonClasses;
          }}
        >
          Saved Posts
        </NavLink>
        <NavLink
          to="/profile/friends"
          className={({ isActive }) => {
            const commonClasses = "text-gray-500 p-2 rounded";
            const activeClasses =
              " bg-primary scale-110 transform duration-200 text-black";
            return isActive
              ? activeClasses + " " + commonClasses
              : commonClasses;
          }}
        >
          Friends
        </NavLink>
      </div>
    </div>
  );
};

export default MainProfile;
