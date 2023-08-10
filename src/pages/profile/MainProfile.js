import React from "react";
import useAuth from "../../hooks/useAuth";

import { AiOutlineEdit } from "react-icons/ai";
import { BsFillFilePostFill, BsFillBookmarkStarFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import UserName from "./UserName";
import Avatar from "../../ui/Avatar";
import ProfilePicture from "./ProfilePicture";

const MainProfile = ({
  handlePosts,
  handleSavedPosts,
  handleFriends,
  showPosts,
  showSavedPosts,
  showFriends,
}) => {
  const { user } = useAuth();

  const activeClasses =
    "bg-primary scale-110 transform duration-200 text-gray-900";
  const commonClasses = "flex gap-1 text-gray-500 mt-2 px-2 py-1 rounded";

  return (
    <div className="flex flex-col">
      <div className="container bg-base-200">
        <div className="w-full h-2/3 bg-hero-pattern">coverPhoto</div>
        <div className="flex gap-2 items-center px-2">
          <ProfilePicture />
          <UserName />
        </div>
      </div>
      <div className="border-t-2 flex pl-4 py-2 gap-4 text-md">
        <button
          className={
            showPosts ? activeClasses + " " + commonClasses : commonClasses
          }
          onClick={handlePosts}
        >
          <BsFillFilePostFill size={20} />
          <span>Posts</span>
        </button>
        <button
          className={
            showSavedPosts ? activeClasses + " " + commonClasses : commonClasses
          }
          onClick={handleSavedPosts}
        >
          <BsFillBookmarkStarFill size={20} />
          <span>Saved Posts</span>
        </button>
        <button
          className={
            showFriends ? activeClasses + " " + commonClasses : commonClasses
          }
          onClick={handleFriends}
        >
          <FaUserFriends size={20} />
          <span>Friends</span>
        </button>
      </div>
    </div>
  );
};

export default MainProfile;
