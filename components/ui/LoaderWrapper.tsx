"use client";

import React from "react";
import Loader from "./Loader";

interface LoaderWrapperProps {
  fullPage?: boolean;
  height?: string;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  fullPage = false,
  height = "h-64",
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullPage ? "fixed inset-0 bg-white/80 z-50" : height
      }`}
    >
      <Loader />
    </div>
  );
};

export default LoaderWrapper;
