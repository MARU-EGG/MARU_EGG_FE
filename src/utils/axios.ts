import axios from 'axios';

export const llm_axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LLM_SERVER_API_ADDRESS,
  timeout: 10000,
  withCredentials: false,
});

export const server_axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SPRING_SERVER_API_ADDRESS,
  timeout: 1000,
  withCredentials: false,
});
