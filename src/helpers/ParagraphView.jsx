import { useDarkMode } from "@/state/DarkModeProvider";

const ParagraphView = ({ children }) => {
  const { darkMode } = useDarkMode();

  return (
    <p className={`text-lg font-bold mt-2 pt-1 mb-0 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {children}
    </p>
  );
};

export default ParagraphView;