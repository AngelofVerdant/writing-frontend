import { useEffect, useState, useReducer } from 'react';
import { BASE_URL, GetError } from '@/helpers';
import { useAuth, useDebounce } from '.';
import { fetchReducer } from '@/state/Reducers';

const useBalanceSheet = (
  productionIdentifier,
  defaultFilters = {},
  defaultDate = new Date().toISOString()) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [filters, setFilters] = useState(defaultFilters);

  const [selecteddate, setSelectedDate] = useState(defaultDate);

  const { axiosInstance } = useAuth();
  
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axiosInstance.get(`${BASE_URL}/reports/balance-sheet/${productionIdentifier}`, {
        params: {
          filters: JSON.stringify({
            selectedDate: selecteddate,
          }),
        },
      });

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
    } catch (err) {
      const errorPayload = GetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  const debouncedFetchData = useDebounce(fetchData, 5);

  useEffect(() => {
    debouncedFetchData();
  }, [filters, selecteddate]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSelectedDate = (event) => {
    console.log(event.target.value)
    setSelectedDate(event.target.value);
  };

  return {
    data,
    filters,
    selecteddate,
    handleSelectedDate,
    handleFilterChange,
  };
};
export default useBalanceSheet;