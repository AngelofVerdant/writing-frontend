import { useEffect, useState, useReducer } from 'react';
import { BASE_URL, GetError } from '@/helpers';
import { useAuth, useDebounce } from '.';
import { fetchReducer, updateReducer } from '@/state/Reducers';

const useAdminOrderList = (
  setShowModal,
  setSelectedItem,
  defaultFilters = {},
  defaultSortOrder, 
  defaultPage = 1, 
  defaultLimit = 8, 
  defaultTotalPages = 1) => {
  const [data, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });
  const [updateData, updateDispatch] = useReducer(updateReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const [filters, setFilters] = useState(defaultFilters);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [page, setPage] = useState(defaultPage);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);
  const [limit, setLimit] = useState(defaultLimit);
  const [search, setSearch] = useState('');

  const { axiosInstance } = useAuth();
  
  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_RESET' });
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axiosInstance.get(`${BASE_URL}/orders/admin/paginate`, {
        params: {
          filters: JSON.stringify({
            
          }),
          sortOrder,
          page,
          limit,
          search,
        },
      });

      dispatch({ type: 'FETCH_SUCCESS', payload: data.data });
      setTotalPages(Math.ceil(data.data.totalCount / limit));
    } catch (err) {
      const errorPayload = GetError(err);
      dispatch({ type: 'FETCH_FAIL', payload: errorPayload });
    }
  };

  const debouncedFetchData = useDebounce(fetchData, 250);

  useEffect(() => {
    debouncedFetchData();
  }, [filters, sortOrder, page, limit, search, updateData]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortOrderChange = (event) => {
    setPage(1);
    setSortOrder(event.target.value);
  };
  
  const handleUpdate = async (item, id) => {
      try {
        updateDispatch({ type: 'UPDATE_REQUEST' });
        const { data } = await axiosInstance.patch(`${BASE_URL}/orders/assign`,
          {
            orderId: item.id,
            userId: id
          }
        );
        updateDispatch({ type: 'UPDATE_SUCCESS', payload: data.data.resource });
        setShowModal(false);
        setSelectedItem(null);
        setPage(1);
      } catch (error) {
        const errorPayload = GetError(error);
        updateDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
      }
    };
  
  const handleLimitChange = (event) => {
    setPage(1);
    setLimit(parseInt(event.target.value));
  };

  const handleSearchChange = (event) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next') {
      setPage(page + 1);
    } else if (direction === 'previous') {
      setPage(page - 1);
    }
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToPreviousPage = () => {
    if (page > 1) {
        setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
        setPage(page + 1);
    }
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  return {
    data,
    updateData,
    filters,
    sortOrder,
    page,
    limit,
    search,
    totalPages,
    handleFilterChange,
    handleSortOrderChange,
    handleSearchChange,
    handleLimitChange,
    handlePageChange,
    handleUpdate,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  };
};
export default useAdminOrderList;