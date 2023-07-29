import React from "react";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return (
    <div className=" fixed top-0 left-0 w-full h-screen bg-slate-900/75 z-20">
      {props.children}
    </div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="fixed w-[90%] lg:w-[60%] left-[5%] lg:left-[20%] top-[10%] bg-base-200 rounded shadow-sm z-30">
      <div className="p-4">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlayElement = document.getElementById("overlays");

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, overlayElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlayElement
      )}
    </>
  );
};

export default Modal;
