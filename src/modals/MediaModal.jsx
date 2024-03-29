import { useDeleteMedia } from "@/hooks";
import { ButtonCustomView, InlineFlex, Messages, ModalWrapper } from "@/helpers";
import { IconClose, IconDelete, IconSpinner, IconToggleOn } from "@/icons";
import { useDarkMode } from "@/state/DarkModeProvider";
import { useState } from "react";

export default function MediaModal({ showModal, setShowModal, images, setImages, defaultImage, setDefaultImage }) {
  const { darkMode } = useDarkMode();
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const { data: dataDeleted, deleteMedia } = useDeleteMedia('media/remove');
  const handleDelete = async (public_id) => {
    await deleteMedia(public_id, images, setImages, setDefaultImage);
    setSelectedImage(null);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData('index', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (targetIndex) => (event) => {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('index');
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
  
    // Always set the first image as the default when dragged
    setDefaultImage(updatedImages[0]);
  
    setImages(updatedImages);
    setSelectedImage(null);
  };

  const showImageMenu = (image) => {
    setSelectedImage(image);
  };

  const hideImageMenu = () => {
    setSelectedImage(null);
  };

  const handleSetAsDefault = () => {
    if (selectedImage) {
      let updatedImages = [...images];
  
      if (selectedImage.public_id === defaultImage.public_id) {
        // Toggle off if the selected image is the default
        setDefaultImage(images[0]);
      } else {
        // Set as default if the selected image is not the default
        updatedImages = [selectedImage, ...images.filter(image => image.public_id !== selectedImage.public_id)];
        setDefaultImage(selectedImage);
      }
  
      setImages(updatedImages);
      hideImageMenu();
    }
  };
  

const imageList = (
    <div className="flex flex-wrap">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-item w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mb-4`}
          draggable
          onDragStart={handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        >
          <div className={`relative w-64 h-64 overflow-hidden cursor-pointer rounded-lg ${defaultImage.public_id === image.public_id ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : 'bg-gray-600'}`}
            onClick={() => showImageMenu(image)}
          >
            <img
              src={image.secure_url}
              alt={`gallery-image-${index}`}
              className={`${
                selectedImage && selectedImage.public_id === image.public_id
                  ? darkMode
                    ? 'bg-gray-500 opacity-10'
                    : 'bg-gray-400'
                  : `${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`
              } absolute inset-0 w-full h-full object-cover`}
            />
          </div>
        </div>
      ))}

    </div>
  );

  return (
    <>
      {showModal ? (
        <ModalWrapper>
          {selectedImage ? (
            <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
              {images.indexOf(selectedImage) === 0 && (
                <InlineFlex>
                  <ButtonCustomView 
                    click={() => handleDelete(selectedImage.public_id)}
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
              {images.indexOf(selectedImage) !== 0 && (
                <>
                  <InlineFlex>
                    <ButtonCustomView 
                      click={() => handleDelete(selectedImage.public_id)}
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
            <div className="mt-1 mb-2">{imageList}</div>
          </div>

          <div className={`${dataDeleted.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}>
            <InlineFlex>
              <ButtonCustomView 
                click={closeModal}
                condition={dataDeleted.loading}
              >
                <IconClose title={`Close Media Manager`} className="h-5 w-5 text-xl" />
                <span>{`Close Media Manager`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>
          
        </ModalWrapper>
      ) : null}
    </>
  );
}