import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col lg:flex-row px-20">
        <div className="text-center lg:text-left">
          <h1 className=" flex flex-col items-center justify-center gap-5 text-5xl font-bold">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <span className="text-5xl font-bold">Loading...</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
