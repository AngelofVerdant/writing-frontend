import { useReducer } from 'react';
import { useAuth } from '.';
import { deleteReducer } from '@/state/Reducers';
import { BASE_URL, GetError } from '@/helpers';

const useDeleteMedia = (resource) => {
  const { axiosInstance } = useAuth();

  const [data, dispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const deleteMedia = async (mediaId, images, setImages, setDefaultImage) => {
    try {
        dispatch({ type: 'DELETE_REQUEST' });
        const { data } = await axiosInstance.post(`${BASE_URL}/${resource}`, { public_id: mediaId });

        dispatch({ type: 'DELETE_SUCCESS', payload: data.data.images });

        const updatedImages = images.filter(image => image.public_id !== mediaId);
        setImages(updatedImages);

        if (updatedImages.length > 0) {
          const firstImageUrl = updatedImages[0];
          setDefaultImage(firstImageUrl);
        } else {
            setDefaultImage(`#`);
        }

    } catch (err) {
        const errorPayload = GetError(err);
        dispatch({ type: 'DELETE_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
    deleteMedia,
  };
};

export default useDeleteMedia;