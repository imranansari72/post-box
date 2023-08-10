import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Avatar from "../../ui/Avatar";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const HomeProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const commonClasses = "flex gap-2 justify-center text-gray-500 w-1/2 rounded py-1";
  const activeClasses =
    " bg-primary scale-110 transform duration-200 text-gray-900";

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Your Profile</h2>
        <button
          className="btn btn-primary w-1/2"
          onClick={() => navigate("/login")}
        >
          <Link to="/login">Login</Link>
        </button>
        <button className="btn w-1/2" onCanPlay={() => navigate("/signup")}>
          <Link to="/signup">signup</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex space-x-4 items-center border-b-4 border-gray-600 pb-4">
        <div>
          <Avatar
            img={user?.profilePicture}
            firstAlpha={user?.name[0]}
            size={24}
          />
        </div>
        <div className="pl-2">
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <h3 className="text-sm text-gray-500">{user?.email}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center uppercase text-[16px] pt-4">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive
              ? activeClasses + " " + commonClasses
              : commonClasses;
          }}
        >
          <span>
            <AiFillHome size={24} />
          </span>
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => {
            return isActive
              ? activeClasses + " " + commonClasses
              : commonClasses;
          }}
        >
          <span>
            <BsFillPersonFill size={24} />
          </span>
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default HomeProfile;
