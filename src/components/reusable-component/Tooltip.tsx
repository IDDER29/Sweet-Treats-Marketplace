import React from "react";

export default function Tooltip({ message }: any) {
  return (
    <span className="relative group">
      <span className="text-gray-400 cursor-pointer">ℹ️</span>
      <span className="absolute left-0 bottom-full mb-2 hidden w-40 text-sm text-white bg-black rounded-md py-2 px-3 group-hover:block">
        {message}
      </span>
    </span>
  );
}
