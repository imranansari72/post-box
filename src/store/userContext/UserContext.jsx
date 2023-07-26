import { createContext } from "react";

const UserContext = createContext({
  user: null,
  createPost: (title, caption, img) => {},
  deletePost: (postId) => {},
  editPost: (postId, title, caption, img) => {},
  setUser: (userId) => {},
});

export default UserContext;
