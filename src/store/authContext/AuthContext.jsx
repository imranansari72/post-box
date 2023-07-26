import { createContext } from "react";

const AuthContext = createContext({
  userId: null,
  isAuthenticated: false,
  error: false,
  isMobile: false,
  login: (userId) => {},
  logout: () => {},
  signup: (user) => {},
});

export default AuthContext;
