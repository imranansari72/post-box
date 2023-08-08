import React from "react";
import CreatePost from "./CreatePost";

const EditPost = ({postToBeEdit, resetEditMode}) => {
  return (
    <CreatePost
      titleOfPage={"Edit Post"}
      post={postToBeEdit}
      onEdit={resetEditMode}
    />
  );
};

export default EditPost;
