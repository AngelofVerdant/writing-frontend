import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { fetchReducer } from '../state/Reducers';
import { BASE_URL, GetError } from '@/helpers';

const useFetchMenu = (resource) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axios.get(`${BASE_URL}/${resource}`);

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = GetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
  };
};

export default useFetchMenu;