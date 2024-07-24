import { server_axiosInstance } from '../utils/axios';

export async function postQuestion(category: string, type: string, content: string): Promise<any> {
  try {
    const response = await server_axiosInstance.post(
      '/api/questions',
      {
        type: type,
        category: category,
        content: content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('upload success', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload Error', error);
    throw new Error(`Upload failed: ${(error as any).message}`);
  }
}
