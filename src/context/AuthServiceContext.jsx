import axios from 'axios';
import { createContext, useCallback, useContext, useRef } from 'react';

const API_URL = '/auth';

export const AuthServiceContext = createContext(AuthServiceProvider);

export function useAuthService() {
  return useContext(AuthServiceContext);
}

export default function AuthServiceProvider({ children }) {
  //   const websocketUrl = useRef(null);

  const login = useCallback(
    (email, password) =>
      axios.post(
        API_URL + '/signin',
        { email, password },
        {
          withCredentials: true,
        }
      ),
    []
  );

  const logout = useCallback(() => {
    const response = axios.get(API_URL + '/signout', {
      withCredentials: true,
    });
    // localStorage.removeItem('user');
    return response.data;
  }, []);

  const validate = useCallback(
    () =>
      axios.get(API_URL + '/validate', {
        withCredentials: true,
      }),
    []
  );

  return (
    <AuthServiceContext.Provider value={{ login, logout, validate }}>
      {children}
    </AuthServiceContext.Provider>
  );
}
