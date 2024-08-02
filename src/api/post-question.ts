import { server_axiosInstance } from '../utils/axios';

export async function postQuestion(category: string | undefined, type: string, content: string): Promise<any> {
  const data = {
    type,
    category,
    content,
  };
  try {
    const response = await server_axiosInstance.post('/api/questions', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('upload success', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Upload Error', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}
