import { ButtonCustomView, FlexItemWrapper, FlexWrapper, InlineFlex, LabelView, Messages, Spinner } from '.';
import { IconCamera, IconSpinner, IconUpload } from '@/icons';
import { useDarkMode } from '@/state/DarkModeProvider';

function DocumentUpload({ handleFileInputChange, isUploadDisabled, dataUploaded, handleIconClick, handleModalOpen, defaultDocument, fileInputRef, iconText}) {
  const { darkMode } = useDarkMode();
  return (
    <div className="w-full mb-4 p-4 m-2 rounded-md">

        <FlexWrapper>
          <FlexItemWrapper width={`md:w-1/2`}>
            <LabelView name={`Upload Documents`} forWhat={`image`} />
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
            <LabelView name={`Manage Documents`} forWhat={`media`} />
              <InlineFlex>
                <ButtonCustomView
                  click={!dataUploaded.loading ? handleModalOpen : undefined}
                  condition={dataUploaded.loading}
                >
                  <IconCamera title={`Document Manager`} className="h-5 w-5 text-xl" />
                  <span>{`Manage`}</span>
                </ButtonCustomView>
              </InlineFlex>
          </FlexItemWrapper>

        </FlexWrapper>
        
        <FlexWrapper>
            <FlexItemWrapper width={`md:w-1/1`}>
                {dataUploaded.error && <Messages>{dataUploaded.error}</Messages>}
                {defaultDocument.secure_url && (
                    <div id="image-preview" className={`w-full h-96 overflow-hidden relative rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
                      <div id="no-preview" className={`flex items-center justify-center w-full h-96 overflow-hidden relative rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
                          {defaultDocument.original_filename}
                      </div>
                    </div>
                )}
                {!defaultDocument.secure_url && (
                    <div id="no-preview" className={`flex items-center justify-center w-full h-96 overflow-hidden relative rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'}`}>
                        No document selected.
                    </div>
                )}
            </FlexItemWrapper>
        </FlexWrapper>

    </div>
  );
}

export default DocumentUpload;