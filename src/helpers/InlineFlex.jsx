const InlineFlex = ({ children }) => {
  return (
    <div className={`inline-flex items-center space-x-2`}>
      {children}
    </div>
  );
};

export default InlineFlex;