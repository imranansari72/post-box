import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AiOutlineEdit } from "react-icons/ai";
import { CiSaveUp2 } from "react-icons/ci";
import axios from "axios";
import useUi from "../../hooks/useUi";

const UserName = () => {
  const { user, updateUserName } = useAuth();
  const { setTimedToast } = useUi();

  const [toggleNameEdit, setToggleNameEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name);

  console.log("rendering username : ", user?.name);

  const editName = () => {
    console.log("edit name : ", name);
    setLoading(true);
    axios
      .put(
        process.env.REACT_APP_BASE_URL + "/profile/name",
        { name: name },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("response by api update unername : ", res);
        if (res.data.success) {
          updateUserName(res.data.data.name).then((res) => {
            console.log("response by update username : ", res);
            setTimedToast("success", "Your name updated successfully.");
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          });
          setToggleNameEdit(false);
        } else {
          console.log("error in update username : ", res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("error in updateName (catch): ", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-between items-center py-4 bg-base-200 w-full px-2">
        <div className="text-left py-2 w-[60%]">
          <h1 className="text-lg font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-4 bg-base-200 w-full px-2">
      <div className="text-left py-2 w-[60%]">
        {toggleNameEdit ? (
          <div className="flex">
            <input
              type="text"
              className="border-2 border-blue-400  bg-transparent text-lg p-1 font-bold px-2 rounded-md focus:outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              onBlur={() => setToggleNameEdit(!toggleNameEdit)}
              autoFocus
            />
          </div>
        ) : (
          <h1 className="text-lg font-bold">{name}</h1>
        )}
        <h2 className="text-sm text-gray-500 pt-1">{user.email}</h2>
      </div>
      <div className="pr-4">
        <button
          className="btn border-none rounded-full bg-gray-100 shadow-md"
          onClick={
            name !== user?.name
              ? editName
              : () => setToggleNameEdit(!toggleNameEdit)
          }
        >
          {name !== user?.name ? (
            <CiSaveUp2 size={16} />
          ) : (
            <AiOutlineEdit size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserName;
