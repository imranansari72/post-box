import React from "react";

const BoxAlert = (props) => {

  return (
    <div className="alert alert-error p-0 rounded-sm">
      <div className="flex-1">
        <label className="flex justify-between mx-4  py-2">
          <p className="label-text">{props.message}</p>
        </label>
      </div>
    </div>
  );
};

export default BoxAlert;
