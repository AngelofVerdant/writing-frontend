import { ButtonCustomView, FlexItemWrapper, InlineFlex, LabelView, Messages, ModalWrapper, ParagraphView, Spinner, TextInputView } from "@/helpers";
import { IconClose, IconDelete, IconSpinner } from "@/icons";
import { useDarkMode } from "@/state/DarkModeProvider";
import { useState, useEffect } from "react";

export default function DeleteModal({ showModal, itemName, item, handleDeletion, handleCancel, deleteData }) {
  const { darkMode } = useDarkMode();
  const [typedName, setTypedName] = useState('');

  const isNameMatched = itemName === typedName;

  useEffect(() => {
    return () => {
      setTypedName('');
    };
  }, []);

  return (
    <>
      {showModal ? (
        <ModalWrapper>

          <div className={`${deleteData.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
            <InlineFlex>
              <ButtonCustomView 
                click={() => {
                  handleCancel();
                  setTypedName('');
                }}
                condition={deleteData.loading}
              >
                <IconClose title={`Close Media Manager`} className="h-5 w-5 text-xl" />
                <span>{`Cancel`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-300'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                {deleteData.error && <Messages>{deleteData.error}</Messages>}
            <div className="mt-1 mb-2">
              <FlexItemWrapper>
                <LabelView name={`Confirm Deletion`} forWhat={`text`} />
              </FlexItemWrapper>

              <FlexItemWrapper>
                  <ParagraphView>
                      Please type <span className="font-semibold text-red-600 text-lg">{itemName}</span> to
                  confirm the deletion
                  </ParagraphView>
              </FlexItemWrapper>

              <FlexItemWrapper width={`md:w-1/1`}>
                  <TextInputView
                      id={`text`}
                      type={`text`}
                      name={`text`}
                      value={typedName}
                      change={(e) => setTypedName(e.target.value)}
                      placeholder={`Type ${itemName} to confirm`}
                      preventDefaultPaste={true}
                      autoComplete={false}
                  />
              </FlexItemWrapper>
            </div>
          </div>

          <div className={`${deleteData.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
            <InlineFlex>
              <ButtonCustomView 
                click={()=> {
                  setTypedName('');
                  handleDeletion(item, itemName);
                }}
                condition={deleteData.loading || !isNameMatched}
                disabled={deleteData.loading || !isNameMatched}
              >
                {deleteData.loading ? (
                  <IconSpinner className={`h-5 w-5 text-xl`} />
                  ) : (
                  <IconDelete title={`Delete Media`} className="h-5 w-5 text-xl" />
                )}
                <span>{`Delete`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>
          
        </ModalWrapper>
      ) : null}
    </>
  );
}