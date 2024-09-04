import { llm_axiosInstance } from '../../utils/axios';

interface AdminLLMFileProps {
  type?: string;
  category?: string;
}

export async function adminRetrieveFile({ type, category }: AdminLLMFileProps) {
  try {
    const response = await llm_axiosInstance.get('/retrieve_documents', {
      params: {
        type,
        category,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export async function adminDeleteFile({ type, category }: AdminLLMFileProps) {
  try {
    const response = await llm_axiosInstance.delete('/delete_documents', {
      params: {
        type,
        category,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error('Delete failed');
  }
}
