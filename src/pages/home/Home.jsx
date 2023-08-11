import React,  {memo} from "react";
import Users from "./Users";
import HomeProfile from "./HomeProfile";
import Posts from "./Posts";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <section className="m-0 bg-hero-pattern bg-cover">
      <div className="flex space-x-2 justify-between p-4">
        <div className=" bg-gray-100 w-[60%] min-h-[50%] rounded text-center shadow-sm p-2 text-[12px] hidden md:block">
          <HomeProfile />
        </div>
        <div className=" bg-gray-100 w-full max-h-screen rounded text-center shadow-sm p-2 text-[12px] overflow-y-auto">
          <Outlet />
        </div>
        <div className=" bg-gray-100 w-[60%] min-h-[50%] max-h-screen rounded text-center shadow-sm p-2 text-[12px] overflow-y-auto hidden md:block">
          <Users />
        </div>
      </div>
    </section>
  );
};

export default memo(Home);
