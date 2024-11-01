import { server_axiosInstance } from '../../../utils/axios';

export async function getTypeStatus() {
  try {
    const response = await server_axiosInstance.get('/api/admissions/details');
    return response.data;
  } catch (error: any) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}
