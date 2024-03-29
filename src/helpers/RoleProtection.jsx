"use client"
import React, { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '@/state/AuthProvider';

const RoleProtection = (allowedRoles, redirectPath = '/login', unauthorizedPath = '/unauthorized') => (
  WrappedComponent
) => {
  return function ProtectedRouteWrapper(props) {
    const authContext = useContext(AuthContext) || {};
    const { userInfo } = authContext;
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkUserRoles = async () => {
        if (!userInfo) {
          localStorage.setItem('intendedDestination', pathname);
          return router.replace(redirectPath);
        }

        try {
          const decodedUser = jwtDecode(userInfo.user.accessToken);

          // If allowedRoles is empty, any authenticated user can access the component
          if (allowedRoles.length === 0) return;

          // Check if the user has any of the allowed roles
          const hasAllowedRoles = allowedRoles.some(role => decodedUser && decodedUser[`is${role}`]);

          if (!hasAllowedRoles) {
            router.replace(unauthorizedPath);
          }
        } catch (error) {
          router.replace(redirectPath);
        }
      };

      checkUserRoles();

    }, [userInfo, allowedRoles, redirectPath, unauthorizedPath, router, pathname]);

    if (!userInfo) {
      return null; // or render a loading state if needed
    }
    return <WrappedComponent {...props} />;
  };
};

export default RoleProtection;
