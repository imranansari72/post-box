import React from "react";
import UserContext from "../store/userContext/UserContext";
import { useContext } from "react";

const Avatar = (props) => {
  const userCtx = useContext(UserContext);
  let firstAlpha = null;
  let img = props?.img;

  if (img == undefined) {
    img = userCtx.user?.profilePic;
    firstAlpha = userCtx.user?.name[0];
  }
  return (
    <>
      {img == undefined ? (
        <div className="avatar placeholder">
          <div
            className={`bg-neutral-focus text-neutral-content rounded-full  w-${props.size}`}
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
