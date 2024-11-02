import { server_axiosInstance } from '../../utils/axios';
import { getCookie } from '../../utils/cookies';
import { TypeStatusProps } from './question-type-status/change-type-status';

export interface AdmissionTypeDetailProps extends TypeStatusProps {
  detailTypeId: number;
  detailTypeName: string;
}

export const updateAdmissionTypeDetail = async ({ detailTypeId, detailTypeName }: AdmissionTypeDetailProps) => {
  try {
    const response = server_axiosInstance.put(
      `/api/admin/admissions/${detailTypeId}`,
      {
        detailTypeName,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    return (await response).data;
  } catch (error: any) {
    throw new Error('updated Failed', error);
  }
};

export const deleteAdmissionTypeDetail = async ({ detailTypeId }: AdmissionTypeDetailProps) => {
  try {
    const response = server_axiosInstance.delete(`/api/admin/admission/${detailTypeId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return (await response).data;
  } catch (error: any) {
    throw new Error('Delete Failed', error);
  }
};

export const generateAdmissionTypeDetail = async ({ type, detailTypeName }: AdmissionTypeDetailProps) => {
  try {
    const response = server_axiosInstance.put(
      `/api/admin/admissions/detail`,
      {
        detail: detailTypeName,
        type: type,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    return (await response).data;
  } catch (error: any) {
    throw new Error('updated Failed', error);
  }
};
