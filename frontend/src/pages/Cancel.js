import React from "react";
import cancel from "../assest/cancel.webm";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 md:w-96 md:h-96 mb-5"
      >
        <source src={cancel} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <p className="text-red-600 font-bold text-2xl mb-4 text-center">
        Payment Canceled
      </p>

      <Link
        to="/cart"
        className="px-6 py-3 border-2 border-red-600 rounded-md font-semibold text-red-600 hover:bg-red-600 hover:text-white transition duration-300"
      >
        Go to Cart Page
      </Link>
    </div>
  );
};

export default Cancel;
