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
});

export default AuthContext;
