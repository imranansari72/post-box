import React from "react";
import Avatar from "../../ui/Avatar";
import DeleteModal from "./DeleteModal";
import useAuth from "../../hooks/useAuth";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import PostAction from "./PostAction";

const Card = ({ post, isOwner, onClickEdit, onClickDelete }) => {

  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const { user } = useAuth();

  const onDeleteHandler = () => {
    onClickDelete(post._id);
  };

  const confirmDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const onEditHandler = () => {
    onClickEdit({ ...post });
  };

  if (confirmDelete) {
    return (
      <DeleteModal
        onConfirm={onDeleteHandler}
        onCancel={() => {
          setConfirmDelete(false);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col m-2 p-4 bg-base-100 rounded w-[90%] shadow-md">
      <div className="flex border-b pb-2 border-gray-200">
        <Avatar
          img={user?.profilePicture}
          firstAlpha={user?.name[0]}
          size={12}
        />
        <div className="pl-4 flex justify-between w-full items-center">
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <button className="text-sm text-gray-500">
            <PostAction onDelete={confirmDeleteHandler} onEdit={onEditHandler} />
          </button>
        </div>
      </div>
      <div className="pt-2 text-left text-sm">
        <h2>{post.desc}</h2>
      </div>
      <div>img</div>
      <div className=" card-actions">
        <button className="bg-transparent">
          <AiOutlineHeart size={20} />
        </button>
        <button className="bg-transparent">
          <FaRegComment size={20} />
        </button>
      </div>
      {/* <div className="card-body">
        {isOwner && (
          <div className="card-actions">
            <button className=" btn btn-primary" onClick={onEditHandler}>
              Edit
            </button>
            <button className="btn btn-ghost" onClick={confirmDeleteHandler}>
              Delete
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Card;
