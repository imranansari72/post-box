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
    // update in backend
    axios
      .post(process.env.REACT_APP_BASE_URL + "/posts/create", {
        userId: state.user._id,
        desc: action.payload.desc,
        img: action.payload.img,
      })
      .then((res) => {
        if (res.success) {
          state.user.posts.push(res.data);
        } else {
          console.log(res.error);
          state.error = res.error;
        }
      });
    return {
      user: state.user,
      error: state.error,
    };
  }

  if (action.type === "DELETE_POST") {
    const deletedPostIndex = state.user.posts.findIndex(
      (post) => post.id == action.payload
    );
    //delete in backend
    axios
      .delete(process.env.REACT_APP_BASE_URL + "/posts/" + action.payload)
      .then((res) => {
        if (res.success) {
          state.user.posts.splice(deletedPostIndex, 1);
        } else {
          console.log(res.error);
          state.error = res.error;
        }
      });

    return {
      user: state.user,
    };
  }
  
  if (action.type === "EDIT_POST") {
    const editedPostIndex = state.user.posts.findIndex(
      (post) => post._id == action.payload._id
    );
    //edit in backend
    axios
      .put(
        process.env.REACT_APP_BASE_URL +
          "/posts/update/" +
          action.payload.postId,
        {
          desc: action.payload.desc,
          img: action.payload.img,
        }
      )
      .then((res) => {
        if (res.success) {
          state.user.posts[editedPostIndex].desc = res.data.desc;
          state.user.posts[editedPostIndex].img = res.data.img;
        } else {
          console.log(res.error);
          state.error = res.error;
        }
      });
    return {
      user: state.user,
    };
  }
};

const PostsProvider = (props) => {
  const { user, isAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(userReducer, initialState);

  const deletePostHandler = (postId) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  };

  const editPostHandler = (desc, img, _id) => {
    dispatch({ type: "EDIT_POST", payload: { img, desc, _id } });
  };

  const createPostHandler = ( img, desc ) => {
    dispatch({ type: "CREATE_POST", payload: { img, desc } });
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
