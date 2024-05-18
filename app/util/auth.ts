import Cookies from 'js-cookie';

export function useAuth() {
  const isAuthenticated = !!Cookies.get('data'); // Check if the 'data' cookie exists
  return isAuthenticated;
}
