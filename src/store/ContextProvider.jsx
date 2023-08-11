import React from "react";
import AuthProvider from "./authContext/AuthProvider";
import PostsProvider from "./postsContext/PostsProvider";
import UiContextProvider from "./uiContext/UiContextProvider";

const ContextProvider = (props) => {
  return (
    <AuthProvider>
      <PostsProvider>
        <UiContextProvider>{props.children}</UiContextProvider>
      </PostsProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
