import axios from 'axios';
import useSWR, { mutate } from 'swr';

interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('경로변경넣어야됌', { email, password }, { withCredentials: true });
  return response.data;
}

export function useUser() {
  const { data, error } = useSWR<LoginResponse>('경로넣어야행', fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function handleLogin(email: string, password: string): Promise<void> {
  try {
    const userData = await login(email, password);
    mutate('경로헤헿콩', userData, false);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
