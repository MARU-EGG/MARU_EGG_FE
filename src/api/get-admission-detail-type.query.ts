import { server_axiosInstance } from '../utils/axios';
import { TypeStatusProps } from './admin/question-type-status/change-type-status';

export const getAllDetailType = async () => {
  try {
    const response = await server_axiosInstance.get('/api/admissions/details');
    return response.data;
  } catch (error: any) {
    throw new Error('get all detail type fail', error);
  }
};

export const getDetailType = async ({ type }: TypeStatusProps) => {
  try {
    const response = await server_axiosInstance.get(`/api/admissions/details/${type}`);
    return response.data;
  } catch (error: any) {
    throw new Error('get all detail type fail', error);
  }
};
