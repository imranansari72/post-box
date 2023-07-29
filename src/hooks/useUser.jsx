import React, { useContext } from "react";
import UserContext from "../store/userContext/UserContext";

const useUser = () => {
  const userCtx = useContext(UserContext);
  if (!userCtx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return userCtx;
};

export default useUser;
