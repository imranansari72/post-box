import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL + "/users");
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const userList = users.map((user) => {
    return <UserCard key={user.name} {...user} />;
  });
  return <div className="p-2 flex flex-col gap-2 max-h-screen">
    <h2 className="text-lg font-semibold">Peoples</h2>
    {userList}</div>;
};

export default Users;
