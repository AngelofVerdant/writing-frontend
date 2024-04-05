import { useEffect, useState, useReducer } from 'react';
import { BASE_URL, GetError } from '@/helpers';
import { useAuth, useDebounce } from '.';
import { createReducer, fetchReducer } from '@/state/Reducers';

const useAssignmentList = (
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

  const [downloadData, downloadDispatch] = useReducer(createReducer, {
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

      const { data } = await axiosInstance.get(`${BASE_URL}/orders/writer/paginate`, {
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
  }, [filters, sortOrder, page, limit, search, downloadData]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortOrderChange = (event) => {
    setPage(1);
    setSortOrder(event.target.value);
  };

  const handleDownload = async (item) => {
    try {
        downloadDispatch({ type: 'CREATE_REQUEST' });
        
        // Use axios GET request to download the file
        const response = await axiosInstance.get(`${BASE_URL}/orders/download/${item.id}`, {
            responseType: 'blob' // Set response type to blob
        });

        // Extract file name from response headers or response body
        const contentDisposition = response.headers['content-disposition'];
        const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'order_images.zip';

        // Create blob from response data
        const blob = new Blob([response.data], { type: 'application/zip' }); 

        // Create temporary URL for the blob
        const url = URL.createObjectURL(blob); 

        // Create a link element and set attributes for downloading the file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Set download attribute to specify filename

        // Set event listener to detect when the download has completed
        link.onload = () => {
            // Dispatch success action
            downloadDispatch({ type: 'CREATE_SUCCESS', payload: 'Download successful' }); 
            setPage(1);
        };

        // Append the link to the body and trigger a click event to download the file
        document.body.appendChild(link);
        link.click();

        // Revoke the temporary URL
        URL.revokeObjectURL(url);
    } catch (error) {
        // Handle errors
        const errorPayload = GetError(error);
        downloadDispatch({ type: 'UPDATE_FAIL', payload: errorPayload });
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
    downloadData,
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
    handleDownload,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  };
};
export default useAssignmentList;