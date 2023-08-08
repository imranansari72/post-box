import React from "react";
import Input from "../../ui/Input";
import InputImage from "../../ui/InputImage";

const PostForm = (props) => {
  const { submitHandler, inputState, inputHandler, onImageDelete, handleCancel } = props;

  return (
    <form
      className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
      onSubmit={submitHandler}
    >
      <div className="card-body py-4">
        {inputState.img ? (
          <div className="flex flex-col space-y-2">
            <img src={URL.createObjectURL(inputState.img)} alt="" />
            <button className="btn" onClick={onImageDelete}>
              Delete
            </button>
          </div>
        ) : (
          <InputImage onChange={inputHandler} />
        )}

        <Input
          id="desc"
          type="text"
          placeholder="Description"
          className="input input-bordered"
          label="Caption"
          value={inputState.desc}
          onChange={inputHandler}
        />
        <button type="submit" className="btn btn-primary">
          Upload Post
        </button>
        <button type="submit" className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
