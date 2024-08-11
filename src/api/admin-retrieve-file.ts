import { llm_axiosInstance } from '../utils/axios';

interface AdminRetrieveFileProps {
  type?: string;
  category?: string;
}

export async function adminRetrieveFile({ type, category }: AdminRetrieveFileProps) {
  try {
    const response = await llm_axiosInstance.get('/retrieve_documents_by_type_and_category', {
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
