import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import React, { useState } from 'react';

const { Dragger } = Upload;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const Uploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as FileType);
    });
    setUploading(true);
  };
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Dragger className=" w-full" {...props}>
        <p className=" text-blue-600 text-6xl">
          <InboxOutlined />
        </p>

        <p className=" text-xl">파일을 드래그해주세요</p>
      </Dragger>
      <Button
        type="primary"
        className=" mt-4  "
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
