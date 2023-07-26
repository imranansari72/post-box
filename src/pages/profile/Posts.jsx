import React from "react";
import { useContext, useReducer } from "react";
import AuthContext from "../../store/authContext/AuthContext";
import Card from "../feed/Card";
import UserContext from "../../store/userContext/UserContext";

const Posts = ({ handleCreate }) => {
  const { user, deletePost, editPost } = useContext(UserContext);

  const [postToBeEdit, setEditMode] = React.useState(null);

  const onClickEdit = () => {
    setEditMode(this.post);
  };

  const onDeleteHandler = (id) => {
    deletePost(id);
  };

  return (
    <div className="flex flex-col space-y-10 my-10  items-center">
      <h2 className="text-4xl">Your Posts</h2>
      {user.posts.length ? (
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
      )}
      {postToBeEdit !== null && ""}
    </div>
  );
};

export default Posts;
