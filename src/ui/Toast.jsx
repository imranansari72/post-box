import React from "react";

const Toast = (props) => {
  return (
    <div className="toast  toast-top toast-end z-10">
      <div className={`alert rounded-md alert-${props.type}`}>
        <span>{props.message}</span>
      </div>
    </div>
    // <div className="toast toast-top toast-end">
    //   <div className="alert alert-success">
    //     <span>{props.message}</span>
    //   </div>
    // </div>
    // <div className="alert alert-success">
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     className="stroke-current shrink-0 h-6 w-6"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    //     />
    //   </svg>
    //   <span>{props.message}</span>
    // </div>
  );
};

export default Toast;
