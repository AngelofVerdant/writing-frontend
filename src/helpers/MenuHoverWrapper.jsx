const MenuHoverWrapper = ({ children }) => {
  return (
    <div className="flex relative justify-evenly space-x-0 mt-2">
      {children}
    </div>
  );
};

export default MenuHoverWrapper;