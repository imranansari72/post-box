import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Card from "../post/Card";
import EditPost from "./EditPost";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";

const MyPosts = () => {
  const { user } = useAuth();

  const { posts, error, deletePost } = usePosts();

  const [postToBeEdit, setPostToBeEdit] = useState(null);

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
      <p>
        You have not created any posts yet. Click the button below to create
      </p>
    </div>
  );

  const editPostModal = (
    <EditPost postToBeEdit={postToBeEdit} resetEditMode={resetEditMode} />
  );

  return (
    <div className="flex flex-col space-y-10 my-10  items-center">
      {postToBeEdit ? editPostModal : postsList}
    </div>
  );
};

export default MyPosts;
