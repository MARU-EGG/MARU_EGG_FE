import { AdmissionDetailTypeState } from '../../store/admin/admission-detail-type-store';
import { server_axiosInstance } from '../../utils/axios';
import { getCookie } from '../../utils/cookies';

export const updateAdmissionTypeDetail = async ({ detailTypeId, detailTypeName }: AdmissionDetailTypeState) => {
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

export const deleteAdmissionTypeDetail = async ({ detailTypeId }: AdmissionDetailTypeState) => {
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

export const generateAdmissionTypeDetail = async ({ type, detailTypeName }: AdmissionDetailTypeState) => {
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
