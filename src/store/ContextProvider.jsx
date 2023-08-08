import React from "react";
import AuthProvider from "./authContext/AuthProvider";
import PostsProvider from "./postsContext/PostsProvider";

const ContextProvider = (props) => {
  return (
    <AuthProvider>
      <PostsProvider>{props.children}</PostsProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
