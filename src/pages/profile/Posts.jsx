import React from "react";
import { useContext } from "react";
import Card from "../post/Card";
import UserContext from "../../store/userContext/UserContext";
import CreatePost from "./CreatePost";

const Posts = ({ handleCreate, handlePosts }) => {
  const { user, deletePost, editPost } = useContext(UserContext);

  const [postToBeEdit, setPostToBeEdit] = React.useState(null);

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

  const posts = user.posts.length ? (
    user.posts.map((post) => {
      return (
        <Card
          key={post.id}
          {...post}
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
      <button
        className="btn btn-primary inline-block mt-10"
        onClick={handleCreate}
      >
        Craete Post
      </button>
    </div>
  );

  const editPostModal = (
    <CreatePost
      titleOfPage={"Edit Post"}
      post={postToBeEdit}
      onEdit={resetEditMode}
    />
  );

  return (
    <div className="flex flex-col space-y-10 my-10  items-center">
      <h2 className="text-4xl">Your Posts</h2>
      {postToBeEdit ? editPostModal : posts}
    </div>
  );
};

export default Posts;
