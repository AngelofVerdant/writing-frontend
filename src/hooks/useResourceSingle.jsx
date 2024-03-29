import { useEffect, useReducer } from 'react';
import { BASE_URL, GetError } from '@/helpers';
import { useAuth } from '.';
import { fetchReducer } from '@/state/Reducers';

const useResourceSingle = ( resource, id ) => {
    const { axiosInstance } = useAuth();

    const [data, dispatch] = useReducer(fetchReducer, {
        data: [],
        loading: false,
        success: false,
        error: null,
    });

  
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axiosInstance.get(`${BASE_URL}/${resource}/${id}`);

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = GetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    data,
  };
};
export default useResourceSingle;