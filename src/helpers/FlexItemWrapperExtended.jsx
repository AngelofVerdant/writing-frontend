import React from 'react';

const FlexItemWrapperExtended = ({ children, width }) => {
  return (
      <div className={`w-full ${width} mb-4`}>
        {children}
      </div>
  );
};

export default FlexItemWrapperExtended;