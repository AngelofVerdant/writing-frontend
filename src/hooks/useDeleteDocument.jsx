import { useReducer } from 'react';
import { useAuth } from '.';
import { deleteReducer } from '@/state/Reducers';
import { BASE_URL, GetError } from '@/helpers';

const useDeleteDocument = (resource) => {
  const { axiosInstance } = useAuth();

  const [data, dispatch] = useReducer(deleteReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const deleteDocument = async (documentId, documents, setDocuments, setDefaultDocument) => {
    try {
        dispatch({ type: 'DELETE_REQUEST' });
        const { data } = await axiosInstance.post(`${BASE_URL}/${resource}`, { public_id: documentId });

        dispatch({ type: 'DELETE_SUCCESS', payload: data.data.documents });

        const updatedDocuments = documents.filter(document => document.public_id !== documentId);
        setDocuments(updatedDocuments);

        if (updatedDocuments.length > 0) {
          const firstDocumentUrl = updatedDocuments[0];
          setDefaultDocument(firstDocumentUrl);
        } else {
          setDefaultDocument(`#`);
        }

    } catch (err) {
        const errorPayload = GetError(err);
        dispatch({ type: 'DELETE_FAIL', payload: errorPayload });
    }
  };

  return {
    data,
    deleteDocument,
  };
};

export default useDeleteDocument;
