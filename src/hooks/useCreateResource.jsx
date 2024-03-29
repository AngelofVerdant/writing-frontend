import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { GetError, BASE_URL } from '@/helpers';
import { createReducer } from '@/state/Reducers';
import { useAuth } from '.';

const useCreateResource = (resource) => {
  const { axiosInstance } = useAuth();
  const router = useRouter();

  const [data, dispatch] = useReducer(createReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const createResource = async (dataToBeCreated, redirectUrl) => {
    try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axiosInstance.post(`${BASE_URL}/${resource}`, dataToBeCreated);
    
        dispatch({ type: 'CREATE_SUCCESS', payload: data.data.resource });
        if (redirectUrl) {
            router.replace(redirectUrl)
        }
    } catch (err) {
        const errorPayload = GetError(err);
        dispatch({ type: 'CREATE_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
    createResource,
  };
};

export default useCreateResource;