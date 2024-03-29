const MobileIconAndView = ({children, click}) => {
    return (
        <div className={`mb-4 mt-2 ml-2 cursor-pointer`} onClick={click}>
          {children}
        </div>
    );
  };
  
export default MobileIconAndView;