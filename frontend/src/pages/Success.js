import React from "react";
import success from "../assest/success.webm";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 md:w-96 md:h-96 mb-5"
      >
        <source src={success} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <p className="text-green-600 font-bold text-2xl mb-4 text-center">
        Payment Successfully Completed
      </p>

      <Link
        to="/order"
        className="px-6 py-3 border-2 border-green-600 rounded-md font-semibold text-green-600 hover:bg-green-600 hover:text-white transition duration-300"
      >
        Go to Order Page
      </Link>
    </div>
  );
};

export default Success;
