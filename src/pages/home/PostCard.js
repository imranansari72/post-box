import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "../../ui/Avatar";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

const PostCard = ({post}) => {
  const { desc, img, userId } = post;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/users/" + userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col m-2 p-4 bg-base-100 rounded shadow-md">
      <div className="flex border-b pb-2 border-gray-200">
        <Avatar
          img={user?.profilePicture}
          firstAlpha={user?.name[0]}
          size={8}
        />
        <div className="pl-4">
          <h2 className="text-lg font-bold">{user?.name}</h2>
        </div>
      </div>
      <div className="pt-2 text-left text-sm">
        <h2>{desc}</h2>
      </div>
      <div className="pt-4">
        <img
          src={`data:image/png;base64,${window.Buffer.from(img.data).toString(
            "base64"
          )}`}
          alt="post"
        />
      </div>
      <div className=" card-actions pt-4">
        <button className="bg-transparent">
          <AiOutlineHeart size={20} />
        </button>
        <button className="bg-transparent">
          <FaRegComment size={20} />
        </button>
      </div>
      <div>
        comment
      </div>
    </div>
  );
};

export default PostCard;
