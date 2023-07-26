import React from "react";

const Toast = (props) => {
  return (
    <>
      {(
        <div className="toast toast-top toast-end">
          <div className={`alert alert-${props.type}`}>
            <span>{props.message}</span>
          </div>
        </div>
      )}
    </>

    // <div className="toast toast-top toast-end">
    //   <div className="alert alert-success">
    //     <span>{props.message}</span>
    //   </div>
    // </div>
  );
};

export default Toast;
