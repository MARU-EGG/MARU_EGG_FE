import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, Button, Select } from 'antd';
import { useDragger } from '../../../../hooks/useDragger';

const { Dragger } = Upload;

const Uploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [uploading, setUploading] = useState(false);
  const handleDragger = useDragger(fileList, setFileList);

  const handleTypeChange = (value: string) => {
    setType(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleUpload = () => {
    setUploading(true);
    // 업로드 로직넣기
    setTimeout(() => {
      setUploading(false);
      setFileList([]);
    }, 2000);
  };

  return (
    <div className=" w-screen ml-5">
      <div className=" my-5">
        <div className=" mt-2">
          전형방법:
          <Select
            defaultValue="수시"
            className=" ml-2 w-40"
            onChange={handleTypeChange}
            options={[
              { value: '수시', label: '수시' },
              { value: '정시', label: '정시' },
              { value: '편입학', label: '편입학' },
            ]}
          />
        </div>
        <div className=" mt-2">
          카테고리:
          <Select
            defaultValue="모집요강"
            className=" ml-2 w-40"
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
      <Upload className=" w-full" {...handleDragger}>
        <Dragger {...handleDragger}>
          <p className="text-blue-600 text-6xl">
            <InboxOutlined />
          </p>
          <p className="text-xl">파일을 드래그해주세요</p>
        </Dragger>
      </Upload>

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
  );
};

export default Uploader;
