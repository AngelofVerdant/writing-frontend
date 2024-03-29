import { useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '@/helpers';
import { useCookies, useLocalStorage } from '@/hooks';
import { AuthContext } from '@/state/AuthProvider';

const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { dispatch } = authContext;

  const [storedUserInfo, setStoredUserInfo, removeStoredUserInfo] = useLocalStorage('userInfo');
  // const [accessCookieValue, setAccessCookieValue, removeAccessCookieValue] = useCookies('_access');
  // const [refreshCookieValue, setRefreshCookieValue, removeRefreshCookieValue] = useCookies('_refresh');

  const { user } = storedUserInfo || {};
  const { accessToken, refreshToken } = user || {};

  const axiosInstance = axios.create({
    BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const tokenExpiration = jwtDecode(accessToken)?.exp;
    const userId = jwtDecode(accessToken)?.id;
    const currentTime = Math.floor(Date.now() / 1000);

    const isExpired = tokenExpiration < currentTime;
    if (!isExpired) return req;

    try {
      const refreshTokenData = jwtDecode(refreshToken);
      const refreshExpiration = refreshTokenData.exp;

      const isRefreshExpired = refreshExpiration < currentTime;
      if (isRefreshExpired) {
        dispatch({ type: 'LOGOUT' });
        removeStoredUserInfo();
        // removeAccessCookieValue();
        // removeRefreshCookieValue();
        window.location.href = '/login';
        return Promise.reject('Refresh token expired');
      }

      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refresh: refreshToken,
        id: userId,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.user;

      setStoredUserInfo({...storedUserInfo, user: { accessToken: newAccessToken, refreshToken: newRefreshToken }});
      // setAccessCookieValue({'_access': newAccessToken});
      // setRefreshCookieValue({'_refresh': newRefreshToken});

      req.headers.Authorization = `Bearer ${newAccessToken}`;
      return req;
    } catch (error) {
      dispatch({ type: 'LOGOUT' });
      return Promise.reject(error);
    }
  });

  return { axiosInstance };
};

export default useAuth;