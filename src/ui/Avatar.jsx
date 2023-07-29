import React from "react";
import UserContext from "../store/userContext/UserContext";
import { useContext } from "react";

const Avatar = ({ img, firstAlpha, size }) => {
  return (
    <>
      {img == undefined ? (
        <div className="avatar placeholder">
          <div
            className={`bg-neutral-focus text-neutral-content rounded-full  w-${size}`}
          >
            <span className="text-3xl">{firstAlpha}</span>
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
