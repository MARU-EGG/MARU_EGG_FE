import { Divider, List } from 'antd';
import React, { useState } from 'react';
import Uploader from '../../components/molecule/admin/uploader';

const FileList: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full">
      <Divider orientation="left">챗봇 관리 파일 리스트</Divider>
      <Uploader />
    </div>
  );
};
export default FileList;
