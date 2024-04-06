import { ButtonCustomView, FlexItemWrapper, InlineFlex, LabelView, Messages, ModalWrapper, Spinner } from "@/helpers";
import { IconCheck, IconClose, IconDelete, IconSpinner } from "@/icons";
import { useDarkMode } from "@/state/DarkModeProvider";
import { CardElement } from "@stripe/react-stripe-js"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentModal({ showModal, itemName, item, handlePayment, handleCancel, updateData }) {
    const { darkMode } = useDarkMode();

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
                <IconClose title={`Close Media Manager`} className="h-5 w-5 text-xl" />
                <span>{`Cancel`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-300'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                {updateData.error && <Messages>{updateData.error}</Messages>}
            <div className="mt-1 mb-2">
              <FlexItemWrapper>
                <LabelView name={`Card Details`} forWhat={`text`} />
              </FlexItemWrapper>
                <CardElement options={CARD_OPTIONS}/>
            </div>
          </div>

          <div className={`${updateData.loading ? 'animate-pulse' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-end space-x-2 px-4 py-3 sm:px-6 rounded`}>
            <InlineFlex>
              <ButtonCustomView 
                click={()=> {
                  handlePayment(item, itemName);
                }}
                condition={updateData.loading}
                disabled={updateData.loading}
              >
                {updateData.loading ? (
                  <IconSpinner className={`h-5 w-5 text-xl`} />
                  ) : (
                  <IconCheck title={`Pay`} className="h-5 w-5 text-xl" />
                )}
                <span>{`Pay`}</span>
              </ButtonCustomView>
            </InlineFlex>
          </div>
          
        </ModalWrapper>
      ) : null}
    </>
  );
}