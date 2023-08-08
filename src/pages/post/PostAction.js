import React from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const PostAction = ( { onDelete, onEdit }) => {
  const [showAction, setShowAction] = useState(false);

  return (
    <div className="relative">
      <BsThreeDotsVertical onClick={() => setShowAction(!showAction)} />
      {showAction && (
        <div className="absolute top-5 right-0 bg-white shadow-lg rounded-lg">
          <ul className="flex flex-col gap-2">
            <li className="hover:bg-gray-200 rounded-t-lg  px-4 py-2" onClick={onEdit}>Edit</li>
            <li className="hover:bg-gray-200 rounded-b-lg px-4 py-2"  onClick={onDelete}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostAction;
