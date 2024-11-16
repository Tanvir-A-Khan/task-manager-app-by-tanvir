import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { LoadingProps } from "../../types";

const Loading: React.FC<LoadingProps> = ({ title = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-max px-4">
      <BarLoader color="#b7b7b7" width={150} />
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{title}</p>
    </div>
  );
};

export default Loading;
