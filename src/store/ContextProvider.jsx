import React from "react";
import AuthProvider from "./authContext/AuthProvider";
import UserProvider from "./userContext/UserProvider";

const ContextProvider = (props) => {
  return (
    <AuthProvider>
      <UserProvider>{props.children}</UserProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
