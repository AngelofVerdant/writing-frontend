import { useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createReducer } from '../state/Reducers';
import { BASE_URL, GetError } from '@/helpers';
import { AuthContext } from '@/state/AuthProvider';

const useLogin = (resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch: ctxDispatch } = authContext;

  const createUser = async (userToBeCreated) => {
    try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(`${BASE_URL}/${resource}`, userToBeCreated);

        ctxDispatch({ type: 'LOGIN', payload: data });

        dispatch({ type: 'CREATE_SUCCESS', payload: data.user });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        const errorPayload = GetError(err);
        dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  };

    useEffect(() => {
        if (userInfo) {
            router.replace('/');
        }
    }, [router, userInfo]);

  return {
    data,
    createUser,
  };
};

export default useLogin;