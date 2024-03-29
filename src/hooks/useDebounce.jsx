import { useCallback } from 'react';

const useDebounce = (callback, delay) => {
  const debouncedFunction = useCallback(
    (...args) => {
      const handler = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay]
  );

  return debouncedFunction;
};

export default useDebounce;