import React, { useReducer, useEffect, useState, useContext } from "react";
import { users } from "../data";
import UserContext from "./UserContext";
import AuthContext from "../authContext/AuthContext";

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  if (action.type === "SET_USER") {
    const user = users.filter((user) => user.id == action.payload);
    return {
      user: user[0],
    };
  }

  if (action.type === "CREATE_POST") {
    const newPost = {
      id: state.user.posts.length + 1,
      title: action.payload.title,
      caption: action.payload.caption,
      img: action.payload.img,
    };
    state.user.posts.push(newPost);
    return {
      user: state.user,
    };
  }

  if (action.type === "DELETE_POST") {
    const deletedPostIndex = state.user.posts.findIndex(
      (post) => post.id == action.payload
    );
    state.user.posts.splice(deletedPostIndex, 1);
    return {
      user: state.user,
    };
  }

  if (action.type === "EDIT_POST") {
    const editedPost = state.user.posts.filter(
      (post) => post.id == action.payload.postId
    );
    editedPost.title = action.payload.title;
    editedPost.caption = action.payload.caption;
    editedPost.img = action.payload.img;
    return {
      user: state.user,
    };
  }
};

const UserProvider = (props) => {
  const authCtx = useContext(AuthContext);

  const [state, dispatch] = useReducer(userReducer, initialState);

  const deletePostHandler = (postId) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  };

  const editPostHandler = (postId, title, caption, img) => {
    dispatch({ type: "EDIT_POST", payload: { postId, title, caption, img } });
  };

  const createPostHandler = (title, caption, img) => {
    dispatch({ type: "CREATE_POST", payload: { title, caption, img } });
  };

  useEffect(() => {
    const setUserHandler = (userId) => {
      dispatch({ type: "SET_USER", payload: userId });
    };

    setUserHandler(authCtx.userId);
  }, [authCtx.userId]);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        createPost: createPostHandler,
        deletePost: deletePostHandler,
        editPost: editPostHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
