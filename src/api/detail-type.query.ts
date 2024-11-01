import { server_axiosInstance } from '../utils/axios';
import { getCookie } from '../utils/cookies';
import { TypeStatusProps } from './admin/question-type-status/change-type-status';

export interface DetailTypeProps extends TypeStatusProps {
  detailId?: number;
  detailName?: string;
}

export const getDetailedType = async ({ type }: TypeStatusProps) => {
  try {
    const response = await server_axiosInstance.get(`/api/admissions/details/${type}`);
    return response.data;
  } catch (error: any) {
    throw new Error('get Detailed type failed');
  }
};

export const postDetailedType = async ({ detailName, type }: DetailTypeProps) => {
  try {
    const response = await server_axiosInstance.post(
      `/api/admin/admissions/detail`,
      {
        detail: detailName,
        type: type,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error('post detailed Type failed');
  }
};

export const deleteDetailType = async ({ detailId }: DetailTypeProps) => {
  try {
    const response = await server_axiosInstance.delete(`/api/admin/admissions/${detailId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('delete failed');
  }
};

export const updateDetailType = async ({ detailId, detailName }: DetailTypeProps) => {
  try {
    const response = await server_axiosInstance.put(
      `/api/admin/admissions/${detailId}`,
      {
        detailName,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error('updated failed');
  }
};
