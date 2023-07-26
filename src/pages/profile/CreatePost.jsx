import React, { useContext, useEffect } from "react"
import UserContext from "../../store/userContext/UserContext";
import Toast from "../../ui/Toast";
import PostForm from "./PostForm";


const CreatePost = () => {
  const userCtx = useContext(UserContext);
  const [inputState, setInputState] = React.useState({
    img: null,
    title: "",
    caption: "",
  });
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

  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { img, title, caption } = inputState;
    if (img && title) {
      userCtx.createPost(title, caption, img);
      setInputState({
        img: null,
        title: "",
        caption: "",
      });
      setNewPostAdded(true);
      setTimeout(() => {
        setNewPostAdded(false);
      }, 2000);
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
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-4xl my-4">Create Post</h1>
      <PostForm
        submitHandler={submitHandler}
        inputState={inputState}
        inputHandler={inputHandler}
        onImageDelete={onImageDelete}
      />
    
      {newPostAdded && (
        <Toast type={"success"} message={"Post Created Successfully"} />
      )}
      {error && <Toast type={"error"} message={error} />}
    </div>
  );
};

export default CreatePost;
