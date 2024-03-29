import React from 'react';
import { useDarkMode } from '@/state/DarkModeProvider';

const GroupAbsoluteInnerIcon = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <span className={`text-base ml-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {children}
    </span>
  );
};

export default GroupAbsoluteInnerIcon;