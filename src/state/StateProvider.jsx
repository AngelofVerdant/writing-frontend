'use client'
import { useLocalStorage } from '@/hooks';
import { LoadingScreen } from '@/helpers';
import { createContext, useReducer, useEffect, useState } from 'react';

export const StateContext = createContext();

const initialState = {
  userInfo: null,
  generalInfo: null,
  resetInfo: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_REGISTER':
      return { ...state, generalInfo: action.payload };
    case 'USER_RESET':
      return { ...state, resetInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
      };
    case 'USER_ACTIVATE':
      return {
        ...state,
        generalInfo: null,
      };
    case 'USER_PASS_RESET':
      return {
        ...state,
        resetInfo: null,
      };
    default:
      return state;
  }
}

export default function StateProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const [storedUserInfo, setStoredUserInfo, removeStoredUserInfo] = useLocalStorage('userInfo');
  const [storedGeneralInfo, setStoredGeneralInfo, removeStoredGeneralInfo] = useLocalStorage('generalInfo');
  const [storedResetInfo, setStoredResetInfo, removeStoredResetInfo] = useLocalStorage('resetInfo');

  useEffect(() => {
    const initializeUserInfo = async () => {
      if (storedUserInfo) {
        dispatch({ type: 'USER_SIGNIN', payload: storedUserInfo });
      }

      if (storedGeneralInfo) {
        dispatch({ type: 'USER_REGISTER', payload: storedGeneralInfo });
      }

      if (storedResetInfo) {
        dispatch({ type: 'USER_RESET', payload: storedResetInfo });
      }

      setLoading(false);
    };

    initializeUserInfo();
  }, [storedUserInfo, storedGeneralInfo, storedResetInfo]);

  const [state, dispatch] = useReducer(reducer, initialState);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}