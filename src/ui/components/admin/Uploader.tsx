import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

interface UploaderProps {
  fileList: UploadFile<File>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<File>[]>>;
}

const Uploader: React.FC<UploaderProps> = ({ fileList, setFileList }) => {
  const handleRemove = (file: UploadFile<File>) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
  };

  const handleBeforeUpload = (file: File) => {
    setFileList((prevList) => [...prevList, { ...file, originFileObj: file } as unknown as UploadFile<File>]);
    return false;
  };

  const uploadProps: UploadProps = {
    onRemove: handleRemove,
    beforeUpload: handleBeforeUpload,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
    fileList,
    maxCount: 5,
  };

  return (
    <div className="w-full">
      <Dragger className="w-full" {...uploadProps}>
        <p className="text-6xl text-blue-600">
          <InboxOutlined />
        </p>
        <p className="text-xl">파일을 드래그해주세요</p>
      </Dragger>
    </div>
  );
};

export default Uploader;
