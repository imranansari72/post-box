import React from "react";
import Avatar from "../../ui/Avatar";
import { useContext } from "react";
import AuthContext from "../../store/authContext/AuthContext";
import UserContext from "../../store/userContext/UserContext";

const Left = (props) => {
  const {
    showPosts,
    showUpdate,
    showCreate,
    handlePosts,
    handleUpdate,
    handleCreate,
  } = props;

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  return (
    <div className=" bg-gray-200 px-10 shadow-xl">
      {/* profile */}
      <div className="flex w-full items-center space-x-4 mt-10 border-b-2 border-gray-500 pb-6">
        <Avatar size={'24'} />
        <h2 className="text-4xl">{userCtx.user.name}</h2>
      </div>
      {/* nav buttons */}
      <ul className="menu w-full justify-center menu-horizontal lg:menu-vertical">
        <li className="m-1">
          <button className={showPosts && "active "} onClick={handlePosts}>Posts</button>
        </li>
        <li className="m-1">
          <button className={showUpdate  && "active"} onClick={handleUpdate}>
            Update Profile
          </button>
        </li>
        <li className="m-1">
          <button className={showCreate && "active"} onClick={handleCreate}>
            Create Post
          </button>
        </li>
      </ul>
      {/* conetnt */}
    </div>
  );
};

export default Left;
