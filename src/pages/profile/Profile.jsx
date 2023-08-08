import React from "react";
import { useState, useReducer } from "react";
import Left from "./Left";
import Posts from "./MyPosts";
// import CreatePost from "./CreatePost";
// import ChangePassword from "./ChangePassword";
import { NavLink, Outlet } from "react-router-dom";
import MainProfile from "./MainProfile";

const contentReducer = (state, action) => {
  switch (action.type) {
    case "POSTS":
      return {
        showPosts: true,
        showChangePassword: false,
        showCreate: false,
      };
    case "CHANGE_PASSWORD":
      return {
        showPosts: false,
        showChangePassword: true,
        showCreate: false,
      };
    case "CREATE":
      return {
        showPosts: false,
        showChangePassword: false,
        showCreate: true,
      };
  }
};

const Profile = () => {
  // const [contentState, contentDispatcher] = useReducer(contentReducer, {
  //   showPosts: true,
  //   showChangePassowrd: false,
  //   showCreate: false,
  // });

  // const handleCreate = () => {
  //   contentDispatcher({ type: "CREATE" });
  // }

  // const handlePosts = () => {
  //   console.log("handlePosts");
  //   contentDispatcher({ type: "POSTS" });
  // }

  // return (
  //   <div className="flex flex-col lg:flex-row bg-base-200 min-h-screen">
  //     {/* right */}
  //     <Left
  //       showPosts={contentState.showPosts}
  //       showChangePassword={contentState.showChangePassword}
  //       showCreate={contentState.showCreate}
  //       handlePosts={() => contentDispatcher({ type: "POSTS" })}
  //       handleChangePassword={() => contentDispatcher({ type: "CHANGE_PASSWORD" })}
  //       handleCreate={() => contentDispatcher({ type: "CREATE" })}
  //     />
  //     <div className="w-full lg:max-h-screen lg:overflow-auto">
  //       {/* posts */}
  //       {contentState.showPosts && (
  //         <Posts handleCreate={handleCreate} handlePosts={handlePosts} />
  //       )}
  //       {/* update profile */}
  //       {/* {contentState.showChangePassword && <ChangePassword />} */}
  //       {/* create post */}
  //       {/* {contentState.showCreate && <CreatePost handlePosts={handlePosts} />} */}
  //     </div>
  //   </div>
  // );

  return (
    <>
      <MainProfile />
      <Outlet />
    </>
  );
};

export default Profile;
