import { ButtonCustomView, FlexItemWrapper, FlexWrapper, InlineFlex, Messages, ModalWrapper, RadioView, Spinner } from "@/helpers";
import { useFetchResource, useRadio } from "@/hooks";
import { IconAdd, IconClose, IconSpinner } from "@/icons";
import { useDarkMode } from "@/state/DarkModeProvider";
import { useState, useEffect } from "react";

export default function AssignModal({ showModal, itemName, item, handleUpdate, handleCancel, updateData }) {
  const { darkMode } = useDarkMode();

  const [users, setUsers] = useState([]);
  const { data: dataFetchedUsers } = useFetchResource('users/writers');
  
  useEffect(() => {
      if (dataFetchedUsers.success) {
        setUsers(dataFetchedUsers.data.users);
      }
  }, [dataFetchedUsers]);    

  const [selectedId, radios] = useRadio(users, 'md:w-1/4');

  return (
    <>
      {showModal ? (
        <ModalWrapper>

          <div className={`${updateData.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
            <InlineFlex>
              <ButtonCustomView 
                click={() => {
                  handleCancel();
                }}
                condition={updateData.loading}
              >
                <IconClose title={`Assign Media Modal`} className="h-5 w-5 text-xl" />
                <span>{`Cancel`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-300'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                {updateData.error && <Messages>{updateData.error}</Messages>}
            <div className="mt-1 mb-2">
              <FlexWrapper>
                <FlexItemWrapper width={`md:w-1/1`}>
                    {dataFetchedUsers.loading && <Spinner />}
                    {dataFetchedUsers.error && <Messages>{dataFetchedUsers.error}</Messages>}
                    {!dataFetchedUsers.loading && !dataFetchedUsers.error && (
                        <RadioView title={`Choose Writer`} label={`writer`} data={radios}/>
                    )}
                </FlexItemWrapper>
              </FlexWrapper>
            </div>
          </div>

          <div className={`${updateData.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
            <InlineFlex>
              <ButtonCustomView 
                click={()=> {
                  handleUpdate(item, selectedId);
                }}
                condition={updateData.loading || !selectedId}
                disabled={updateData.loading || !selectedId}
              >
                {updateData.loading ? (
                  <IconSpinner className={`h-5 w-5 text-xl`} />
                  ) : (
                  <IconAdd title={`Assign Writer`} className="h-5 w-5 text-xl" />
                )}
                <span>{`Assign`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>
          
        </ModalWrapper>
      ) : null}
    </>
  );
}