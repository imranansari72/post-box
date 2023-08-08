import AuthContext from "./AuthContext";
import React, { useReducer, useEffect } from "react";
import { users } from "../data";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload,
      isAuthenticated: true,
    };
  }

  if (action.type === "LOGOUT") {
    // crear cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  }

  if (action.type == "SIGNUP") {
    console.log(action.payload);
    users.push({
      id: users.length + 1,
      email: action.payload.email,
      name: action.payload.name,
      password: action.payload.password,
      posts: [],
    });
    console.log(users, "users");
    return {
      ...state,
      userId: users[users.length - 1].id,
      isAuthenticated: true,
    };
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [error, setError] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const login = async (user) => {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({
      type: "LOGOUT",
    });
  };

  const signup = async (user) => {
    //signup user from api
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + "/auth/signup",
      {
        ...user,
      }
    );
    return new Promise((resolve, reject) => {
      if (res.data.success) {
        dispatch({
          type: "SIGNUP",
          payload: res.data.user,
        });
        resolve(res.data.user);
      } else {
        setError(true);
        reject(res.data.message);
      }
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
        ...state,
        error,
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
