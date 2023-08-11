import AuthContext from "./AuthContext";
import React, { useReducer, useEffect } from "react";
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
    axios
      .get(process.env.REACT_APP_BASE_URL + "/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  }

  if (action.type == "SIGNUP") {
    console.log(action.payload);
    return {
      user: action.payload,
      isAuthenticated: true,
    };
  }

  if (action.type === "UPDATE_USER") {
    console.log("in UPDATE_USER reducer : ", action.payload);
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === "UPDATE_USER_NAME") {
    console.log("in UPDATE_USER_NAME reducer : ", action.payload);
    return {
      ...state,
      user: {
        ...state.user,
        name: action.payload,
      },
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

  const updateUser = (user) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "UPDATE_USER",
        payload: user,
      });
      resolve(user);
    });
  };

  const updateUserName = (name) => {
    console.log("in updateUserName : ", name);
    return new Promise((resolve, reject) => {
      dispatch({
        type: "UPDATE_USER_NAME",
        payload: name,
      });
      console.log("after dispatch", state.user);
      resolve(name);
    });
  };

  const updateUserProfilePicture = (profilePicture) => {
    dispatch({
      type: "UPDATE_USER_PROFILE_PICTURE",
      payload: profilePicture,
    });
  };

  const updateUserCoverPhoto = (coverPicture) => {
    dispatch({
      type: "UPDATE_USER_COVER_PHOTO",
      payload: coverPicture,
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

  useEffect(() => {
    console.log("in auth provider");
    console.log(window.cookie);
    axios
      .get(process.env.REACT_APP_BASE_URL + "/auth/checkAuth", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("in useEffect login showinf res", res.data.user);
        if (res.data.success) {
          dispatch({
            type: "LOGIN",
            payload: res.data.user,
          });
        } else {
          dispatch({
            type: "LOGOUT",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        error,
        login,
        logout,
        signup,
        updateUser,
        updateUserName,
        updateUserProfilePicture,
        updateUserCoverPhoto,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
