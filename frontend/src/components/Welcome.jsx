import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-4 items-center justify-center  text-center">
      <h1 className="font-bold text-5xl">
        Welcome to <span className="text-green-400">Pas</span>
        <span className="text-blue-400">Dok</span>
      </h1>
      <p className="font-semibold">
        Please select, which list would you like to see?
      </p>
      <div className="flex flex-row gap-16">
        <Link
          // to={`/edit/${product.id}`}
          to={`/patients`}
          className="font-medium bg-green-400 hover:bg-green-600 px-3 py-1 rounded text-white "
        >
          Patients 🤕
        </Link>
        <Link
          // to={`/edit/${product.id}`}
          to={`/doctors`}
          className="font-medium bg-blue-400 hover:bg-blue-600 px-3 py-1 rounded text-white "
        >
          Doctors 🧑‍⚕️
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
