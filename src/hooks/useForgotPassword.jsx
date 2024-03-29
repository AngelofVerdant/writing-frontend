import { useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { createReducer } from '../state/Reducers';
import { BASE_URL, GetError } from '@/helpers';
import { AuthContext } from '@/state/AuthProvider';

const useForgotPassword = (resource) => {
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const authContext = useContext(AuthContext);
  const { userInfo, dispatch: ctxDispatch } = authContext;

  const resetUser = async (emailToBeReset, redirectUrl) => {
    try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(`${BASE_URL}/${resource}`, emailToBeReset);

        ctxDispatch({ type: 'USER_RESET', payload: data });

        dispatch({ type: 'CREATE_SUCCESS', payload: data });

        if (redirectUrl) {
            router.replace(redirectUrl);
        }
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
    resetUser,
  };
};

export default useForgotPassword;