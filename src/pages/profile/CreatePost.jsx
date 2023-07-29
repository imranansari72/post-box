import React, { useContext, useEffect } from "react";
import UserContext from "../../store/userContext/UserContext";
import Toast from "../../ui/Toast";
import PostForm from "./PostForm";
import Loading from "../../ui/Loading";


const CreatePost = ({ titleOfPage, post, onEdit, handlePosts }) => {
  const userCtx = useContext(UserContext);
  const [inputState, setInputState] = React.useState({
    img: null,
    title: "",
    caption: "",
  });

  const id = post?.id;

  useEffect(() => {
    if (titleOfPage !== undefined) {
      setInputState({
        img: post.img,
        title: post.title,
        caption: post.caption,
      });
    }
  }, []);
  const [newPostAdded, setNewPostAdded] = React.useState(false);
  const [error, setError] = React.useState(null);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setInputState((prevState) => {
      return {
        ...prevState,
        [id]: id === "img" ? e.target.files[0] : value,
      };
    });
  };

  const onImageDelete = () => {
    setInputState((prevState) => {
      return {
        ...prevState,
        img: null,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { img, title, caption } = inputState;
    if (img && title) {
      // userCtx.createPost(title, caption, img);
      setInputState({
        img: null,
        title: "",
        caption: "",
      });
      if (titleOfPage !== undefined) {
        userCtx.editPost(id, title, caption, img);
      } else {
        userCtx.createPost(title, caption, img);
      }
      setNewPostAdded(true);
      setTimeout(() => {
        if (titleOfPage !== undefined) {
          // Resetin the edit mode
          onEdit();
        } else {
          // Navigae to posts page
          handlePosts();
        }
        setNewPostAdded(false);
      }, 1000);
    } else {
      setError(() => {
        if (!inputState.img && !inputState.title) {
          return "Please select an image and enter a title";
        } else if (!inputState.img) {
          return "Please select an image";
        } else if (!inputState.title) {
          return "Please enter a title";
        }
      });
      setTimeout(() => {
        setError(null);
      }, 500);
    }
  };

  if (newPostAdded) {
    return (
      <>
        <Toast
          type={"success"}
          message={`Post ${
            titleOfPage !== undefined ? "edited" : "craete"
          } Successfully`}
        />
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-10 w-full">
      <h1 className="text-4xl my-4">
        {titleOfPage !== undefined ? titleOfPage : "Create Post"}
      </h1>
      <PostForm
        submitHandler={submitHandler}
        inputState={inputState}
        inputHandler={inputHandler}
        onImageDelete={onImageDelete}
        handleCancel={titleOfPage !== undefined ? onEdit : handlePosts}
      />
      {newPostAdded && (
        <Toast
          type={"success"}
          message={`Post ${
            titleOfPage !== undefined ? "edited" : "craete"
          } Successfully`}
        />
      )}
      {error && <Toast type={"error"} message={error} />}
    </div>
  );
};

export default CreatePost;
