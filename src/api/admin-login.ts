import { server_axiosInstance } from '../utils/axios';
import { getCookie, removeCookie, setCookie } from '../utils/cookies';

export async function AdminLogin(email: string, password: string) {
  const data = {
    email,
    password,
  };

  try {
    if (getCookie('accessToken')) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }

    const response = await server_axiosInstance.post('/api/auth/sign-in', data);
    const accessToken: string = response.headers['authorization'];
    const refreshToken: string = response.headers['authorization-refresh'];

    setCookie('accessToken', accessToken.split(' ')[1], { path: '/admin', secure: true, sameSite: 'lax' });
    setCookie('refreshToken', refreshToken.split(' ')[1], { path: '/admin', secure: true, sameSite: 'lax' });
  } catch (error: any) {
    throw new Error('Login Failed - Server network failed');
  }
}

export function AdminLogout() {
  removeCookie('accessToken', { path: '/admin', secure: true, sameSite: 'lax' });
  removeCookie('refreshToken', { path: '/admin', secure: true, sameSite: 'lax' });
}
