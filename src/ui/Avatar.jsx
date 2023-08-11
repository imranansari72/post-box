import React from "react";
import UserContext from "../store/postsContext/PostsContext";
import { useContext } from "react";

const Avatar = ({ img, firstAlpha, size }) => {
  const classAvatar = `h-${size} w-${size} rounded-full bg-gray-500 text-primary flex items-center justify-center` 
  return (
    <>
      {img ? (
        <div className={classAvatar}>
            <span className="text-3xl">{firstAlpha.toUpperCase()}</span>
        </div>
      ) : (
        <div className="avatar">
          <div className={`w-[${size}px] rounded-full`}>
            <img src={img} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
  