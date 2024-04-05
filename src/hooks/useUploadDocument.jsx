import { useReducer, useRef, useState } from 'react';
import { useAuth } from '.';
import { BASE_URL, GetError } from '@/helpers';
import { uploadReducer } from '@/state/Reducers';

const useUploadDocument = (uploadLimit, subfolder) => {
  const { axiosInstance } = useAuth();

  const [data, dispatch] = useReducer(uploadReducer, {
    data: [],
    loading: false,
    success: false,
    error: null,
  });

  const fileInputRef = useRef(null);
  const [defaultDocument, setDefaultDocument] = useState({});
  const [documents, setDocuments] = useState([]);

  const isUploadDisabled = documents.length >= uploadLimit;

  const fileUploadHandler = async (files) => {
    // Check if the limit has been reached before attempting to upload
    if (documents.length + files.length > uploadLimit) {
      window.alert(`You can only upload a maximum of ${uploadLimit} documents.`);
      return;
    }

    const formData = new FormData();

    // Append the subfolder to the FormData
    formData.append('subfolder', subfolder);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axiosInstance.post(`${BASE_URL}/documents/new`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newDocuments = data.data.documents.map((document) => ({
        secure_url: document.secure_url,
        public_id: document.public_id,
        asset_id: document.asset_id,
        original_filename: document.original_filename,
      }));

      setDocuments([...documents, ...newDocuments]);

      if (!defaultDocument.public_id) {
        if (newDocuments.length > 0) {
          const latestDefaultDocument = newDocuments[newDocuments.length - 1];
          setDefaultDocument(latestDefaultDocument);
        }
      }

      dispatch({ type: 'UPLOAD_SUCCESS', payload: data.data.documents });
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: GetError(err) });
      window.alert(GetError(err));
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      fileUploadHandler(files);
    }
  };

  const handleIconClick = () => {
    if (!isUploadDisabled && documents.length < uploadLimit) {
      fileInputRef.current.click();
    } else if (documents.length >= uploadLimit) {
      window.alert(`You can only upload a maximum of ${uploadLimit} documents.`);
    }
  };

  return {
    fileInputRef,
    data,
    defaultDocument,
    documents,
    setDocuments,
    setDefaultDocument,
    handleFileInputChange,
    handleIconClick,
    isUploadDisabled,
  };
};

export default useUploadDocument;
