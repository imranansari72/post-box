import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  error: false,
  user: null,
  isMobile: false,
  login: (userId) => {},
  logout: () => {},
  signup: (user) => {},
  updateUser: (user) => {},
  updateUserProfilePicture: (profilePicture) => {},
  updateUserCoverPicture: (coverPhoto) => {},
  updateUserName: (name) => {},
});

export default AuthContext;
