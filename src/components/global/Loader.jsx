import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-12 h-12 border-4 border-t-transparent border-[#1D7C42] border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
