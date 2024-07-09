import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import useUploader from '../../../../hooks/useUploder';

const { Dragger } = Upload;

const Uploader: React.FC = () => {
  const { fileList, uploading, handleUpload, uploadProps } = useUploader();

  return (
    <>
      <Dragger className="w-full" {...uploadProps}>
        <p className="text-blue-600 text-6xl">
          <InboxOutlined />
        </p>
        <p className="text-xl">파일을 드래그해주세요</p>
      </Dragger>
      <Button
        type="primary"
        className="mt-4"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default Uploader;
