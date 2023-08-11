import React, { useContext } from "react";
import PostsContext from "../store/postsContext/PostsContext";

const usePosts = () => {
  const postsCtx = useContext(PostsContext);
  if (!postsCtx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return postsCtx;
};

export default usePosts;
