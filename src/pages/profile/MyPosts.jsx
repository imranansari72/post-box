import React, { useEffect, useMemo, memo } from "react";
import { useContext, useState } from "react";
import Card from "../post/Card";
import EditPost from "./EditPost";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";
import { MdOutlinePostAdd } from "react-icons/md";
import CreatePost from "./CreatePost";

const MyPosts = () => {
  const { user } = useAuth();

  const { posts, error, deletePost } = usePosts();

  const [postToBeEdit, setPostToBeEdit] = useState(null);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const onClickEdit = (post) => {
    setPostToBeEdit(post);
    console.log(post, "post");
  };

  const resetEditMode = () => {
    setPostToBeEdit(null);
  };

  const onDeleteHandler = (id) => {
    deletePost(id);
  };

  console.log("in my posts showing posts", posts);
  //using useMemo
  const postsList = posts?.length ? (
    posts.map((post) => {
      return (
        <Card
          key={post._id}
          post={post}
          userName={user.name}
          isOwner={true}
          onClickEdit={onClickEdit}
          onClickDelete={onDeleteHandler}
        />
      );
    })
  ) : (
    <div className=" text-center text-2xl">
      <p>Loading...</p>
    </div>
  );

  const editPostModal = (
    <EditPost postToBeEdit={postToBeEdit} resetEditMode={resetEditMode} />
  );

  return (
    <div className="flex flex-col space-y-10 my-10  items-center">
      <div className="w-full bg-primary rounded py-2">
          <h2 className="flex justify-between text-lg px-4 rounded">
            <span>New Post</span>
            <button onClick={() => setShowCreatePost(!showCreatePost)}>
              <MdOutlinePostAdd size={24} />
            </button>
          </h2>
          {showCreatePost && (
            <div>
              <CreatePost />
            </div>
          )}
      </div>
      {postToBeEdit ? editPostModal : postsList}
    </div>
  );
};

export default MyPosts;
