import React from "react";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";

const PasswordInput = ({ error, ...props }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <div className="flex">
        <input
          type={show ? "text" : "password"}
          {...props}
          className={`${error} input w-[90%] input-bordered focus:outline-none border-r-0 rounded-r-none`}
        />
        <button
          type="button"
          className={`p-2 rounded-md rounded-l-none border-[1px] border-gray-300 border-l-0 bg-white text-lg ${
            error !== "" && "border-red-400"
          }`}
          onClick={() => setShow(!show)}
        >
          {!show ? <GrFormViewHide /> : <GrFormView />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
