import { llm_axiosInstance } from '../utils/axios';

export const useHtmlFileSubmit = (type: string, category: string, html_file: File) => {
  const formdata = new FormData();
  formdata.append('type', type);
  formdata.append('category', category);
  formdata.append('html_file', html_file);

  const uploadData = async () => {
    console.log(formdata.get('type'));
    console.log(formdata.get('category'));
    console.log(formdata.get('html_file'));
    try {
      const response = await llm_axiosInstance.post('/upload_html/', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful', response.data);
      return response.data;
    } catch (error) {
      console.error('Upload Error', error);
      throw error;
    }
  };

  return uploadData;
};
