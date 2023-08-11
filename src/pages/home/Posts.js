import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + "/posts");
      setPosts(res.data);
      setLoading(false);
      console.log("fetch posts");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log("home posts rerender");
  const postList = useMemo(() => {
    return posts.map((post) => {
      return <PostCard key={post._id} post={post} />;
    });
  }, [posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  //using useMemo

  // const postList = posts.map((post) => {
  //   return <PostCard key={post._id} post={post} />;
  // });

  return <div className="flex p-2 flex-col">{postList}</div>;
};

export default memo(Posts);
