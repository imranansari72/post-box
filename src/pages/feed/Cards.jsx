import React from "react";
import AuthContext from "../../store/authContext/AuthContext";
import UserContext from "../../store/userContext/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Card from "./Card";

const Cards = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  if (!authCtx.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const cards = userCtx.user.posts.map((post) => {
    return (
      <>
        <Card key={post.id} {...post} userName={userCtx.user.name} isOwner={true} />
      </>
    );
  });
  return (
    <div className="flex flex-col space-y-4 items-center">
      {cards}
      <div></div>
    </div>
  );
};

export default Cards;
