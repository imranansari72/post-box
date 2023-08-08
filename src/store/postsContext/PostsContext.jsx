import { createContext } from "react";

const PostsContext = createContext({
  posts: null,
  error: null,
  createPost: (img, desc) => {},
  deletePost: (postId) => {},
  editPost: (desc, img, postId) => {},
});

export default PostsContext;
