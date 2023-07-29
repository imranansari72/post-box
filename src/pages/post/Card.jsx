import React from "react";
import Avatar from "../../ui/Avatar";
import DeleteModal from "./DeleteModal";

const Card = ({
  id,
  img,
  title,
  caption,
  userName,
  isOwner,
  onClickEdit,
  onClickDelete,
}) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const onDeleteHandler = () => {
    onClickDelete(id);
  };

  const confirmDeleteHandler = () => {
    setConfirmDelete(true);
  };

  const onEditHandler = () => {
    onClickEdit({ id, img, title, caption });
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
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className=" flex space-x-5 text-lg p-4">
        <Avatar size={"6"} />
        <div className="">{userName}</div>
      </div>
      {img !== undefined && (
        <figure>
          <img src={URL.createObjectURL(img)} alt="Post" width={`384px`} />
        </figure>
      )}
      <div className="card-body">
        <div className="flex space-x-2"></div>
        <h2 className="card-title text-lg">{title}</h2>
        <p className="text-sm">{caption}</p>
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
      </div>
    </div>
  );
};

export default Card;
