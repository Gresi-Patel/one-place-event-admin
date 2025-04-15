import React from "react";

const Card = ({ title, value, bgColor = "bg-white", textColor = "text-gray-800" }) => {
  return (
    <div className={`p-6 shadow-lg rounded-lg flex flex-col items-center ${bgColor} hover:shadow-xl transition-shadow duration-300`}>
      <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
      <p className={`text-3xl font-bold mt-4 ${textColor}`}>
        {value === undefined ? <span className="text-sm text-gray-500 animate-pulse">Loading...</span> : value}
      </p>
    </div>
  );
};

export default Card;
