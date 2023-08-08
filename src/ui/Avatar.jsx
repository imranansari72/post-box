import React from "react";
import UserContext from "../store/postsContext/PostsContext";
import { useContext } from "react";

const Avatar = ({ img, firstAlpha, size }) => {
  return (
    <>
      {img == '' ? (
        <div className="avatar placeholder">
          <div
            className={`bg-neutral-focus text-neutral-content rounded-full  w-${size} h-${size}`}
          >
            <span className="text-3xl">{firstAlpha.toUpperCase()}</span>
          </div>
        </div>
      ) : (
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={img} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
