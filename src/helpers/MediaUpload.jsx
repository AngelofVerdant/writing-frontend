import { ButtonCustomView, FlexItemWrapper, FlexWrapper, InlineFlex, LabelView, Messages, Spinner } from '.';
import { IconCamera, IconSpinner, IconUpload } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';
import Image from 'next/image';

function MediaUpload({ handleFileInputChange, isUploadDisabled, dataUploaded, handleIconClick, handleModalOpen, defaultImage, fileInputRef, iconText}) {
  const { darkMode } = useDarkMode();
  return (
    <div className="w-full mb-4 p-4 m-2 rounded-md">

        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/2`}>
            <LabelView name={`Upload Images`} forWhat={`image`} />
            <input type="file" multiple onChange={handleFileInputChange} id="image" className="hidden" ref={fileInputRef} />
            <div className={`mb-4`}>
              <InlineFlex>
                <ButtonCustomView 
                  click={!dataUploaded.loading && !isUploadDisabled ? handleIconClick : undefined}
                  condition={dataUploaded.loading || isUploadDisabled}
                >
                  {dataUploaded.loading ? (
                    <IconSpinner className={`h-5 w-5 text-xl`} />
                    ) : (
                    <IconUpload title={`${iconText}`} className="h-5 w-5 text-xl" />
                  )}
                  <span>{`${iconText}`}</span>
                </ButtonCustomView>
              </InlineFlex>

            </div>
          </FlexItemWrapper>
              
          <FlexItemWrapper width={`md:w-1/2`}>
            <LabelView name={`Manage Media`} forWhat={`media`} />
              <InlineFlex>
                <ButtonCustomView
                  click={!dataUploaded.loading ? handleModalOpen : undefined}
                  condition={dataUploaded.loading}
                >
                  <IconCamera title={`Media Manager`} className="h-5 w-5 text-xl" />
                  <span>{`Manage`}</span>
                </ButtonCustomView>
              </InlineFlex>
          </FlexItemWrapper>

        </FlexWrapper>
        
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                {dataUploaded.error && <Messages>{dataUploaded.error}</Messages>}
                {defaultImage.secure_url && (
                    <div id="image-preview" className={`w-full h-96 overflow-hidden relative rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
                        <Image
                          id="preview"
                          className="w-full h-full object-cover"
                          src={defaultImage.secure_url}
                          alt="Image Preview" 
                          width={50}
                          height={50}
                        />
                    </div>
                )}
                {!defaultImage.secure_url && (
                    <div id="no-preview" className={`flex items-center justify-center w-full h-96 overflow-hidden relative rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
                        No image selected.
                    </div>
                )}
            </FlexItemWrapper>
        </FlexWrapper>

    </div>
  );
}

export default MediaUpload;