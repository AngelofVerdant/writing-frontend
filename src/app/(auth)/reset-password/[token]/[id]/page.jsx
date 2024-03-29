'use client'
import { useState } from 'react';
import { useReset } from '@/hooks';
import { AuthContainerWrapper, ButtonView, CenteredVerticallyAndHorizontally, FlexItemWrapper, FlexWrapper, FormWrapper, HeadingView, LabelView, Messages, Spinner, TextInputView } from '@/helpers';
import { useParams } from 'next/navigation';

export default function Reset() {
    const { token, id } = useParams();
    const { data: userReseted, resetUser } = useReset('auth/reset-password');

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            return window.alert("Password should match");
        }
        const backUser = {
            password,
        };
        resetUser(backUser, token, id, '/login');
    };

  return (
    <AuthContainerWrapper>

        <CenteredVerticallyAndHorizontally>
            <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="center">
                Reset Passoword
            </HeadingView>
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            {userReseted.loading && <Spinner/>}
            {userReseted.error && !userReseted.loading && <Messages>{userReseted.error}</Messages>}
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            <FormWrapper submit={handleSubmit}>

                <FlexWrapper>
                    <FlexItemWrapper>
                        <LabelView name={`Password`} forWhat={`password`} />
                        <TextInputView
                            id={`password`}
                            type={`password`}
                            name={`password`}
                            value={password}
                            change={(e) => setPassword(e.target.value)}
                            placeholder={`Enter new password`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexWrapper>
                    <FlexItemWrapper>
                        <LabelView name={`Confirm Password`} forWhat={`confirmpassword`} />
                        <TextInputView
                            id={`confirmpassword`}
                            type={`password`}
                            name={`confirmpassword`}
                            value={confirmpassword}
                            change={(e) => setConfirmPassword(e.target.value)}
                            placeholder={`Confirm the password`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexItemWrapper width={`md:w-1/1`}>
                    <ButtonView type="submit" size="medium">
                        Reset Password
                    </ButtonView>
                </FlexItemWrapper>
                
            </FormWrapper>
        </CenteredVerticallyAndHorizontally>

    </AuthContainerWrapper>
  )
}