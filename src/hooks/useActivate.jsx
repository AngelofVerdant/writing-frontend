import { useContext, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createReducer } from '../state/Reducers';
import { BASE_URL, GetError } from '@/helpers';
import { AuthContext } from '@/state/AuthProvider';

const useActivate = (resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { dispatch: ctxDispatch } = authContext;

  const activateUser = async (activationToken, userId, redirectUrl) => {
    try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.put(`${BASE_URL}/${resource}/${activationToken}/${userId}`);

        ctxDispatch({ type: 'USER_ACTIVATE', payload: data });

        dispatch({ type: 'CREATE_SUCCESS', payload: data });

        if (redirectUrl) {
            router.replace(redirectUrl);
        }
    } catch (err) {
        const errorPayload = GetError(err);
        dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
    activateUser,
  };
};

export default useActivate;