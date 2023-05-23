import axios from 'axios';

const API_URL = '/auth';

const login = (email, password) =>
  axios.post(
    API_URL + '/signin',
    { email, password },
    {
      withCredentials: true,
    }
  );
//   if (response.data.sender) {
//     localStorage.setItem('user', JSON.stringify(response.data));
//   }

const logout = async () => {
  const response = await axios.get(API_URL + '/signout', {
    withCredentials: true,
  });
  localStorage.removeItem('user');
  return response.data;
};

const validate = () =>
  axios.get(API_URL + '/validate', {
    withCredentials: true,
  });

const getToken = () => {
  const tokenName = 'YWS';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(tokenName + '=')) {
      return cookie.substring(tokenName.length + 1);
    }
  }
  return null;
};

// const deleteCookie = cookieName => {
//   document.cookie =
//     cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// };

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  login,
  logout,
  validate,
  getCurrentUser,
  getToken,
};

export default AuthService;
