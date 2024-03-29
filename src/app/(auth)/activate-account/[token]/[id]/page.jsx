'use client'
import { useEffect } from 'react';
import { useActivate } from '@/hooks';
import { AuthContainerWrapper, CenteredVerticallyAndHorizontally, HeadingView, Messages, Spinner } from '@/helpers';
import { useParams } from 'next/navigation';

export default function Activate() {
    const { token, id } = useParams();
    const { data: userActivated, activateUser } = useActivate('auth/activate-account');

    useEffect(() => {
        const handleActivation = async () => {
            activateUser(token, id, '/login');
        };
        handleActivation();
    }, [token, id]);

  return (
    <AuthContainerWrapper>

      <CenteredVerticallyAndHorizontally>
        <HeadingView size="3xl" fontWeight="bold" marginBottom={2} paddingTop={4} textLocation="center">
            Account Activation
        </HeadingView>
      </CenteredVerticallyAndHorizontally>

      <CenteredVerticallyAndHorizontally>
          {userActivated.loading && <Spinner/>}
          {userActivated.error && !userActivated.loading && <Messages>{userActivated.error}</Messages>}
      </CenteredVerticallyAndHorizontally>

    </AuthContainerWrapper>
  )
}