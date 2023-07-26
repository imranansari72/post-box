import React, { useContext, useEffect } from "react";
import Hero from "./pages/users/Login";
import Navbar from "./layout/Navbar";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/profile/Profile";
import Footer from "./layout/Footer";
import Feed from "./pages/feed/Feed";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContextProvider from "./store/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Navbar>
          {" "}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
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
