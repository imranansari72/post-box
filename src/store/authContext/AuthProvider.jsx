import AuthContext from "./AuthContext";
import React, { useReducer, useEffect } from "react";
import { users } from "../data";

const initialState = {
  userId: null,
  error: false,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const user = users.filter((user) => {
      return (
        user.email === action.payload.email &&
        user.password === action.payload.password
      );
    });

    if (user.length === 0) {
      return {
        ...state,
        userId: null,
        error: true,
        isAuthenticated: false,
      };
    }

    return {
      userId: user[0].id,
      error: false,
      isAuthenticated: true,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      userId: null,
      isAuthenticated: false,
    };
  }

  if (action.type == "SIGNUP") {
    users.push({
      id: users.length + 1,
      email: action.payload.email,
      password: action.payload.password,
      posts: [],
    });
    return {
      ...state,
      userId: users[users.length - 1].id,
      isAuthenticated: true,
    };
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [isMobile, setIsMobile] = React.useState(false);

  const login = (email, password) => {
    dispatch({
      type: "LOGIN",
      payload: { email, password },
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const signup = (user) => {
    dispatch({
      type: "SIGNUP",
      payload: user,
    });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        isMobile,
        login,
        logout,
        signup,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
