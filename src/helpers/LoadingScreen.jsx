import React from 'react';

const LoadingScreen = () => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center`}>
      <div className="flex items-center space-x-2">
        <div className="w-24 h-24 border-t-8 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
