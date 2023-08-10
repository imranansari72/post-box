import React, { useContext, useEffect } from "react";
import UserContext from "../../store/postsContext/PostsContext";
import Toast from "../../ui/Toast";
import PostForm from "./PostForm";
import Loading from "../../ui/Loading";
import useAuth from "../../hooks/useAuth";
import usePosts from "../../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = ({ titleOfPage, post, onEdit }) => {
  const { user } = useAuth();
  const { editPost, createPost } = usePosts();
  const navigate = useNavigate();

  const [inputState, setInputState] = React.useState({
    img: null,
    desc: "",
  });

  useEffect(() => {
    if (titleOfPage !== undefined) {
      setInputState({
        img: {
          data: post.img.data,
          contentType: post.img.contentType,
        },
        desc: post.desc,
      });
    }
  }, []);

  const [newPostAdded, setNewPostAdded] = React.useState(false);
  const [error, setError] = React.useState(null);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    if (id === "img") {
      console.log(e.target.files[0]);
    }
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
    const { img, desc } = inputState;
    if (img && desc) {
      // userCtx.createPost(title, caption, img);
      setInputState({
        img: null,
        desc: "",
      });

      const formData = new FormData();
      formData.append("desc", desc);
      formData.append("img", img);

      axios({
        method: titleOfPage !== undefined ? "put" : "post",
        url:
          titleOfPage !== undefined
            ? process.env.REACT_APP_BASE_URL + "/posts/update/" + post._id
            : process.env.REACT_APP_BASE_URL + "/posts/create",
        data: formData,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          if (titleOfPage !== undefined) {
            editPost(res.data.data);
          } else {
            createPost(res.data.data);
          }
          setNewPostAdded(true);
          setTimeout(() => {
            if (titleOfPage !== undefined) {
              // Resetin the edit mode
              onEdit();
            } else {
              // Navigae to posts page
              navigate("/profile/posts");
            }
            setNewPostAdded(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(() => {
        if (!inputState.img && !inputState.desc) {
          return "Please select an image and enter a title";
        } else if (!inputState.img) {
          return "Please select an image";
        } else if (!inputState.desc) {
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
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-4xl my-4 w-full">
        {titleOfPage !== undefined ? titleOfPage : "Create Post"}
      </h1>
      <PostForm
        submitHandler={submitHandler}
        inputState={inputState}
        inputHandler={inputHandler}
        onImageDelete={onImageDelete}
        handleCancel={
          titleOfPage !== undefined
            ? onEdit
            : () => {
                navigate("/profile/posts");
              }
        }
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
