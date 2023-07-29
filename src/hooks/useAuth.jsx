import React, { useContext } from "react";
import AuthContext from "../store/authContext/AuthContext";

const useAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return authCtx;
};

export default useAuth;
