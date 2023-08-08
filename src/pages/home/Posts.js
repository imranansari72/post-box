import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL + "/posts");
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const postList = posts.map((post) => {
    return <PostCard key={post._id} {...post} />;
  });

  return <div className="flex p-2 flex-col">{postList}</div>;
};

export default Posts;
