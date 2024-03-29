import React from 'react';

const FlexItemWrapper = ({ children, width }) => {
  return (
      <div className={`w-full ${width} mb-4 md:pr-2`}>
        {children}
      </div>
  );
};

export default FlexItemWrapper;