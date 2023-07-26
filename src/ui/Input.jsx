import React from "react";

const Input = (props) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        {...props}
      />
    </div>
  );
};

export default Input;
