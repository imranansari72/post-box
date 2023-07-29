import React from "react";
import Modal from "../../ui/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-2">
        <div>
          <RiDeleteBin6Line className="text-7xl text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl">Are you sure?</h1>
          <h2 className="text-lg text-gray-600">
            This action cannot be undone and will permanently delete this post.
          </h2>
        </div>
      </div>
      <div className="p-4 text-end flex justify-end gap-4 mt-10">
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button className=" btn btn-error" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
