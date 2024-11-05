import { AdmissionDetailTypeState } from '../../store/admin/admission-detail-type-store';
import { server_axiosInstance } from '../../utils/axios';
import { getCookie } from '../../utils/cookies';

export const updateAdmissionTypeDetail = async ({ id, name }: AdmissionDetailTypeState) => {
  try {
    const response = server_axiosInstance.put(
      `/api/admin/admissions/${id}`,
      {
        name,
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

export const deleteAdmissionTypeDetail = async (id: number) => {
  try {
    const response = server_axiosInstance.delete(`/api/admin/admissions/${id}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return (await response).data;
  } catch (error: any) {
    throw new Error('Delete Failed', error);
  }
};

export const generateAdmissionTypeDetail = async ({ type, name }: AdmissionDetailTypeState) => {
  try {
    const response = server_axiosInstance.post(
      `/api/admin/admissions/detail`,
      {
        detail: name,
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
