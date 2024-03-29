import { useDarkMode } from "@/state/DarkModeProvider";

const HeadingView = ({
  children,
  size = "xl",
  uppercase = true,
  fontWeight = "bold",
  marginBottom = 2,
  paddingTop=0,
  textLocation = "left",
}) => {
  const { darkMode } = useDarkMode();

  const getSizeClass = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl";
      case "5xl":
        return "text-5xl";
      default:
        return "text-xl";
    }
  };

  const textStyle = `${uppercase ? "uppercase" : ""} ${getSizeClass()} font-${fontWeight} mb-${marginBottom} pt-${paddingTop} text-${textLocation}`;

  return (
    <h1 className={`${textStyle} ${darkMode ? "text-white" : "text-gray-500"}`}>
      {children}
    </h1>
  );
};

export default HeadingView;