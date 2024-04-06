import { useDeleteDocument } from "@/hooks";
import { ButtonCustomView, InlineFlex, Messages, ModalWrapper } from "@/helpers";
import { IconClose, IconDelete, IconSpinner, IconToggleOn } from "@/icons";
import { useDarkMode } from "@/state/DarkModeProvider";
import { useState } from "react";

export default function DocumentModal({ showModal, setShowModal, documents, setDocuments, defaultDocument, setDefaultDocument }) {
  const { darkMode } = useDarkMode();
  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const { data: dataDeleted, deleteDocument } = useDeleteDocument('documents/remove');
  const handleDelete = async (asset_id) => {
    await deleteDocument(asset_id, documents, setDocuments, setDefaultDocument);
    setSelectedDocument(null);
  };

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('index', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (targetIndex) => (event) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('index');
    const updatedDocuments = [...documents];
    const [draggedDocument] = updatedDocuments.splice(draggedIndex, 1);
    updatedDocuments.splice(targetIndex, 0, draggedDocument);
  
    // Always set the first document as the default when dragged
    setDefaultDocument(updatedDocuments[0]);
  
    setDocuments(updatedDocuments);
    setSelectedDocument(null);
  };

  const showDocumentMenu = (document) => {
    setSelectedDocument(document);
  };

  const hideImageMenu = () => {
    setSelectedDocument(null);
  };

  const handleSetAsDefault = () => {
    if (selectedDocument) {
      let updatedDocuments = [...documents];
  
      if (selectedDocument.public_id === defaultDocument.public_id) {
        // Toggle off if the selected document is the default
        setDefaultDocument(documents[0]);
      } else {
        // Set as default if the selected document is not the default
        updatedDocuments = [selectedDocument, ...documents.filter(document => document.public_id !== selectedDocument.public_id)];
        setDefaultDocument(selectedDocument);
      }
  
      setDocuments(updatedDocuments);
      hideImageMenu();
    }
  };
  

const documentList = (
    <div className="flex flex-wrap">
      {documents.map((document, index) => (
        <div
          key={index}
          className={`document-item w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4`}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        >
          <div className={`relative w-64 h-64 overflow-hidden cursor-pointer rounded-lg ${defaultDocument.public_id === document.public_id ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : 'bg-gray-600'}`}
            onClick={() => showDocumentMenu(document)}
          >
            <span
              className={`${
                selectedDocument && selectedDocument.public_id === document.public_id
                  ? darkMode
                    ? 'bg-gray-500 opacity-10'
                    : 'bg-gray-400'
                  : `${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`
              } absolute inset-0 flex items-center justify-center w-full h-full object-cover`}
            >
              {document.original_filename}
            </span>

          </div>
        </div>
      ))}

    </div>
  );

  return (
    <>
      {showModal ? (
        <ModalWrapper>
          {selectedDocument ? (
            <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
              {documents.indexOf(selectedDocument) === 0 && (
                <InlineFlex>
                  <ButtonCustomView 
                    click={() => handleDelete(selectedDocument.asset_id)}
                    condition={dataDeleted.loading}
                  >
                    {dataDeleted.loading ? (
                      <IconSpinner className={`h-5 w-5 text-xl`} />
                      ) : (
                      <IconDelete title={`Delete Media`} className="h-5 w-5 text-xl" />
                    )}
                    <span>{`Delete`}</span>
                  </ButtonCustomView>
                </InlineFlex>
              )}
              {documents.indexOf(selectedDocument) !== 0 && (
                <>
                  <InlineFlex>
                    <ButtonCustomView 
                      click={() => handleDelete(selectedDocument.public_id)}
                      condition={dataDeleted.loading}
                    >
                      {dataDeleted.loading ? (
                        <IconSpinner className={`h-5 w-5 text-xl`} />
                        ) : (
                        <IconDelete title={`Delete Media`} className="h-5 w-5 text-xl" />
                      )}
                      <span>{`Delete`}</span>
                    </ButtonCustomView>
                  </InlineFlex>

                  <InlineFlex>
                    <ButtonCustomView 
                      click={handleSetAsDefault}
                      condition={dataDeleted.loading}
                    >
                      <IconToggleOn title={`Set as default`} className="h-5 w-5 text-xl" />
                      <span>{`Set Default`}</span>
                    </ButtonCustomView>
                  </InlineFlex>
                </>
              )}
            </div>
          ) : (
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-10 sm:px-6 rounded`}>
              <span className="h-5 w-5"></span>
            </div>
          )}

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-300'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                {dataDeleted.error && <Messages>{dataDeleted.error}</Messages>}
            <div className="mt-1 mb-2">{documentList}</div>
          </div>

          <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}>
            <InlineFlex>
              <ButtonCustomView 
                click={closeModal}
                condition={dataDeleted.loading}
              >
                <IconClose title={`Close Document Manager`} className="h-5 w-5 text-xl" />
                <span>{`Close Document Manager`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>
          
        </ModalWrapper>
      ) : null}
    </>
  );
}