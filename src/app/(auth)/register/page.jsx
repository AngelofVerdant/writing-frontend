'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRegister } from '@/hooks';
import { AuthContainerWrapper, ButtonView, CenteredVerticallyAndHorizontally, FlexItemWrapper, FlexWrapper, FormWrapper, HeadingView, LabelView, Messages, ParagraphView, Spinner, TextInputView } from '@/helpers';

export default function RegisterPage() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { data: userRegistered, registerUser } = useRegister('auth/register');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            firstname,
            lastname,
            mobilenumber,
            email,
            password,
        };
        registerUser(newUser, '/');
    };

  return (
    <AuthContainerWrapper>

        <CenteredVerticallyAndHorizontally>
            <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="center">
                Create Account
            </HeadingView>
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            {userRegistered.loading && <Spinner/>}
            {userRegistered.error && !userRegistered.loading && <Messages>{userRegistered.error}</Messages>}
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            <FormWrapper submit={handleSubmit}>

                <FlexWrapper>
                    <FlexItemWrapper width={`md:w-1/1`}>
                        <LabelView name={`First Name`} forWhat={`firstname`} />
                        <TextInputView
                            id={`firstname`}
                            type={`text`}
                            name={`firstname`}
                            value={firstname}
                            change={(e) => setFirstName(e.target.value)}
                            placeholder={`John`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexWrapper>
                    <FlexItemWrapper width={`md:w-1/1`}>
                        <LabelView name={`Last Name`} forWhat={`lastname`} />
                        <TextInputView
                            id={`lastname`}
                            type={`text`}
                            name={`lastname`}
                            value={lastname}
                            change={(e) => setLastName(e.target.value)}
                            placeholder={`Doe`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexWrapper>
                    <FlexItemWrapper width={`md:w-1/1`}>
                        <LabelView name={`Mobile Number`} forWhat={`mobilenumber`} />
                        <TextInputView
                            id={`mobilenumber`}
                            type={`text`}
                            name={`mobilenumber`}
                            value={mobilenumber}
                            change={(e) => setMobileNumber(e.target.value)}
                            placeholder={`0702817040`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

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

                <FlexWrapper>
                    <FlexItemWrapper width={`md:w-1/1`}>
                        <LabelView name={`Password`} forWhat={`password`} />
                        <TextInputView
                            id={`password`}
                            type={`password`}
                            name={`password`}
                            preventDefaultPaste={true}
                            autoComplete={false}
                            value={password}
                            change={(e) => setPassword(e.target.value)}
                            placeholder={`Set your password`}
                        />
                    </FlexItemWrapper>
                </FlexWrapper>

                <FlexItemWrapper width={`md:w-1/1`}>
                    <ButtonView type="submit" size="medium">
                        Register
                    </ButtonView>
                </FlexItemWrapper>

                <FlexItemWrapper width={`md:w-1/1`}>
                    <ParagraphView>
                    Already have an account? <Link href={`/login`}>Sign-In</Link>
                    </ParagraphView>
                </FlexItemWrapper>

            </FormWrapper>
        </CenteredVerticallyAndHorizontally>
    </AuthContainerWrapper>
  )
}