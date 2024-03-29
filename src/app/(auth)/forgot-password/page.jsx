'use client'
import { useState } from 'react';
import { useForgotPassword } from '@/hooks';
import { AuthContainerWrapper, ButtonView, CenteredVerticallyAndHorizontally, FlexItemWrapper, FlexWrapper, FormWrapper, HeadingView, LabelView, Messages, Spinner, TextInputView } from '@/helpers';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const { data: userReseted, resetUser } = useForgotPassword('auth/forgot-password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backUser = {
            email,
        };
        resetUser(backUser, '/login');
    };

  return (
    <AuthContainerWrapper>

        <CenteredVerticallyAndHorizontally>
            <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="center">
                Forgot Password
            </HeadingView>
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            {userReseted.loading && <Spinner/>}
            {userReseted.error && !userReseted.loading && <Messages>{userReseted.error}</Messages>}
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            <FormWrapper submit={handleSubmit}>

                <FlexWrapper>
                    <FlexItemWrapper width={`md:w-1/1`}>
                        <LabelView name={`Email Address`} forWhat={`email`} />
                        <TextInputView
                            id={`email`}
                            type={`email`}
                            name={`email`}
                            value={email}
                            change={(e) => setEmail(e.target.value)}
                            placeholder={`johndoe@gmail.com`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexItemWrapper width={`md:w-1/1`}>
                    <ButtonView type="submit" size="medium">
                        Reset
                    </ButtonView>
                </FlexItemWrapper>

            </FormWrapper>
        </CenteredVerticallyAndHorizontally>
    </AuthContainerWrapper>
  )
}