import React from "react";
import Avatar from "../../ui/Avatar";
import { IoIosPersonAdd } from "react-icons/io";

const UserCard = ({ name, email, profilePicture }) => {
  return (
    <div className=" bg-base-100 flex p-2 rounded shadow-sm">
      <div>
        <Avatar img={profilePicture} firstAlpha={name[0]} size={8} />
      </div>
      <div className="flex w-full justify-between p-2">
        <h2 className="text-md font-semibold">{name}</h2>
        <button className="bg-transparent">
          <IoIosPersonAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
