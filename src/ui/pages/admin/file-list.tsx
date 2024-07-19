import { Button, Divider, Select } from 'antd';
import React, { useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import Uploader from '../../components/molecule/admin/uploader';
import { useForm } from '../../../hooks/useForm';

const FileList: React.FC = () => {
  const [category, setCategory] = useState('모집요강');
  const [type, setType] = useState('수시');
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as File; // 여기서 실제 File 객체를 가져옵니다.
        const uploadData = useForm(type, category, file);
        await uploadData();
        console.log('success');
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
    setUploading(false);
  };

  return (
    <div className="w-full">
      <Divider orientation="left">챗봇 관리 파일 리스트</Divider>
      <div className="mx-8">
        <div className="my-5">
          <div className="mt-2">
            전형방법:
            <Select
              defaultValue="수시"
              className="ml-2 w-40"
              onChange={handleTypeChange}
              options={[
                { value: '수시', label: '수시' },
                { value: '정시', label: '정시' },
                { value: '편입학', label: '편입학' },
              ]}
            />
          </div>
          <div className="mt-2">
            카테고리:
            <Select
              defaultValue="모집요강"
              className="ml-2 w-40"
              onChange={handleCategoryChange}
              options={[
                { value: '모집요강', label: '모집요강' },
                { value: '입시결과', label: '입시결과' },
                { value: '기출문제', label: '기출문제' },
                { value: '대학생활', label: '대학생활' },
                { value: '면접/실기', label: '면접/실기' },
              ]}
            />
          </div>
        </div>
        <Uploader setFileList={setFileList} fileList={fileList} />
        <Button
          type="primary"
          className="mt-4"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    </div>
  );
};

export default FileList;
