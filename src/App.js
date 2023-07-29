import React, { useContext, useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/profile/Profile";
import Footer from "./layout/Footer";
import Feed from "./pages/post/Feed";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContextProvider from "./store/ContextProvider";
import UserContext from "./store/userContext/UserContext";

function App() {
  const userCtx = useContext(UserContext);
  const [navbarKey, setNavbarKey] = useState(24);

  useEffect(() => {
    setNavbarKey((prev) => prev + 1);
  }, [userCtx.isAuthenticated]);
  return (
    <ContextProvider>
      <Router>
        <Navbar key={navbarKey}>
          {" "}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Navbar>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
