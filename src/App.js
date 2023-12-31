import React, { useContext, useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/profile/Profile";
import Footer from "./layout/Footer";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Posts from "./pages/home/Posts";
import MyPosts from "./pages/profile/MyPosts";
import SavedPosts from "./pages/profile/SavedPosts";
import Friends from "./pages/profile/Friends";
import Toast from "./ui/Toast";
import useUi from "./hooks/useUi";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const { isAuthenticated } = useAuth();
  const [navbarKey, setNavbarKey] = useState(24);
  const { toast } = useUi();

  useEffect(() => {
    setNavbarKey((prev) => prev + 1);
  }, [isAuthenticated]);

  console.log("showing the toast value : ", toast);

  return (
    <Router>
      <Navbar key={navbarKey}>
        {toast.show && <Toast type={toast.type} message={toast.message} />}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Posts />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="/profile/" element={<MyPosts />} />
              <Route path="/profile/posts" element={<MyPosts />} />
              <Route path="/profile/savedposts" element={<SavedPosts />} />
              <Route path="/profile/friends" element={<Friends />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Navbar>
      <Footer />
    </Router>
  );
}

export default App;
