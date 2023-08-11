import React from "react";
import Avatar from "../../ui/Avatar";
import useAuth from "../../hooks/useAuth";
import { AiOutlineEdit } from "react-icons/ai";

const ProfilePicture = () => {
  const { user } = useAuth();
  return (
    <div className="relative -translate-y-8">
      <Avatar img={user?.profilePicture} firstAlpha={user?.name[0]} size={24} />
      <div className="absolute bottom-0 right-0 p-2  rounded-full bg-gray-100">
        <AiOutlineEdit />
      </div>
    </div>
  );
};

export default ProfilePicture;
