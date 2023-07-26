import React from "react";
import Avatar from "../../ui/Avatar";
import { useContext, useReducer } from "react";
import AuthContext from "../../store/authContext/AuthContext";
import Left from "./Left";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import UpdateProfile from "./UpdateProfile";

const contentReducer = (state, action) => {
  switch (action.type) {
    case "POSTS":
      return {
        showPosts: true,
        showUpdate: false,
        showCreate: false,
      };
    case "UPDATE":
      return {
        showPosts: false,
        showUpdate: true,
        showCreate: false,
      };
    case "CREATE":
      return {
        showPosts: false,
        showUpdate: false,
        showCreate: true,
      };
  }
};

const Profile = () => {
  const [contentState, contentDispatcher] = useReducer(contentReducer, {
    showPosts: true,
    showUpdate: false,
    showCreate: false,
  });

  return (
    <div className="flex flex-col lg:flex-row bg-base-200 min-h-screen">
      {/* right */}
      <Left
        showPosts={contentState.showPosts}
        showUpdate={contentState.showUpdate}
        showCreate={contentState.showCreate}
        handlePosts={() => contentDispatcher({ type: "POSTS" })}
        handleUpdate={() => contentDispatcher({ type: "UPDATE" })}
        handleCreate={() => contentDispatcher({ type: "CREATE" })}
      />
      <div className="w-full max-h-screen overflow-auto">
        {/* posts */}
        {contentState.showPosts && (
          <Posts handleCreate={() => contentDispatcher({ type: "CREATE" })} />
        )}
        {/* update profile */}
        {contentState.showUpdate && <UpdateProfile />}
        {/* create post */}
        {contentState.showCreate && <CreatePost />}
      </div>
    </div>
  );
};

export default Profile;
