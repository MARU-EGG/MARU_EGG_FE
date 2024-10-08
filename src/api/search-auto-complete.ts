import { server_axiosInstance } from '../utils/axios';

export async function searchAutoComplete(content: string, category?: string, type?: string): Promise<any> {
  try {
    const response = await server_axiosInstance.get('/api/questions/search', {
      params: {
        content: content,
        size: 5,
        type: type,
        category: category,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Auto complete Error', error);
    throw new Error(`AutoComplete failed: ${error.message}`);
  }
}
