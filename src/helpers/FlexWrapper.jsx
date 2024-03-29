import React from 'react';

const FlexWrapper = ({ children }) => {
  return (
    <div className="flex flex-wrap w-full mb-4">
      {children}
    </div>
  );
};

export default FlexWrapper;