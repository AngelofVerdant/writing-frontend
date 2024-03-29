'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLogin } from '@/hooks';
import { ButtonView, CenteredVerticallyAndHorizontally, AuthContainerWrapper, FlexItemWrapper, FlexWrapper, FormWrapper, HeadingView, LabelView, Messages, ParagraphView, Spinner, Tex, TestContainertInputView, TextInputView } from '@/helpers';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { data: userCreated, createUser } = useLogin('auth/login');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backUser = {
            email,
            password,
        };
        const intendedDestination = localStorage.getItem('intendedDestination');
        createUser(backUser, intendedDestination);
    };

    useEffect(() => {
        if (userCreated.success) {
            const intendedDestination = localStorage.getItem('intendedDestination');
            if (intendedDestination) {
                localStorage.removeItem('intendedDestination');
                router.replace(intendedDestination); // Redirect user to intended destination after successful login
            } else {
                router.replace('/');
            }
        }
    }, [userCreated.success]);

  return (
    <AuthContainerWrapper>

        <CenteredVerticallyAndHorizontally>
            <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="center">
                Sign in
            </HeadingView>
        </CenteredVerticallyAndHorizontally>

        <CenteredVerticallyAndHorizontally>
            {userCreated.loading && <Spinner/>}
            {userCreated.error && !userCreated.loading && <Messages>{userCreated.error}</Messages>}
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
                                placeholder={`Enter your password`}
                            />
                        </FlexItemWrapper>
                        <FlexItemWrapper width={`md:w-1/1`}>
                            <ButtonView type="submit" size="medium">
                                Login
                            </ButtonView>
                        </FlexItemWrapper>
                        <FlexItemWrapper width={`md:w-1/1`}>
                            <ParagraphView>
                                New user? <Link href={`/register`}>Create your account</Link>
                            </ParagraphView>
                        </FlexItemWrapper>
                        <FlexItemWrapper width={`md:w-1/1`}>
                            <ParagraphView>
                                <Link href={`/forgot-password`}>
                                    Forgot Password?
                                </Link>
                            </ParagraphView>
                        </FlexItemWrapper>
                    </FlexWrapper>
            </FormWrapper>
        </CenteredVerticallyAndHorizontally>
    </AuthContainerWrapper>
  )
}