import React, { useReducer, useEffect, useState, useContext } from "react";
import { users } from "../data";
import UsersContext from "./PostsContext";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const initialState = {
  posts: null,
  error: null,
};

const userReducer = (state, action) => {
  if (action.type === "SET_POSTS") {
    return {
      posts: action.payload,
    };
  }

  if (action.type === "CREATE_POST") {
    const newPost = action.payload;
    state.posts.unshift(newPost);
    return {
      posts: state.posts,
      error: state.error,
    };
  }

  if (action.type === "DELETE_POST") {
    const deletedPostIndex = state.posts.findIndex(
      (post) => post._id == action.payload
    );
    console.log("deletedPostIndex", deletedPostIndex)
    state.posts.splice(deletedPostIndex, 1);
    console.log("after deletetion -> ", state.posts)
    return {
      posts: state.posts,
      error: state.error,
    };
  }

  if (action.type === "EDIT_POST") {
    const editedPostIndex = state.posts.findIndex(
      (post) => post._id == action.payload._id
    );
    state.posts[editedPostIndex] = action.payload;
    return {
      posts: state.posts,
      error: state.error,
    };
  }
};

const PostsProvider = (props) => {
  const { user, isAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(userReducer, initialState);

  const deletePostHandler = (postId) => {
    //fist delete in back end and then delete in front end
    axios
      .delete(process.env.REACT_APP_BASE_URL + "/posts/delete/" + postId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch({ type: "DELETE_POST", payload: postId });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPostHandler = (post) => {
    dispatch({ type: "EDIT_POST", payload: post });
  };

  const createPostHandler = (post) => {
    dispatch({ type: "CREATE_POST", payload: post });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/posts/user/" + user._id
      );
      if (res.data) {
        dispatch({ type: "SET_POSTS", payload: res.data });
      }
    };
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  return (
    <UsersContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        createPost: createPostHandler,
        deletePost: deletePostHandler,
        editPost: editPostHandler,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default PostsProvider;
