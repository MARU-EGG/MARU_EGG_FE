import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';

const { Dragger } = Upload;

interface UploaderProps {
  fileList: UploadFile<File>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<File>[]>>;
}

const Uploader: React.FC<UploaderProps> = ({ fileList, setFileList }) => {
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, { ...file, originFileObj: file }]);

      return false;
    },

    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
    fileList,
  };

  return (
    <div className="w-full">
      <Dragger className="w-full" maxCount={1} {...props}>
        <p className="6xl·text-blue-600">
          <InboxOutlined />
        </p>
        <p className="text-xl">파일을 드래그해주세요</p>
      </Dragger>
    </div>
  );
};

export default Uploader;
