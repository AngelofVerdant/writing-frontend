const SectionOverviewWrapper = ({ children, submit, darkMode }) => {
  return (
    <div
      onSubmit={submit}
      className={`mb-4 p-4 m-0 rounded-md focus:outline-none ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'
      } focus:ring-2 focus:ring-blue-500`}
    >
      {children}
    </div>
  );
};
export default SectionOverviewWrapper;