import { Button, Divider, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import Uploader from '../../components/admin/Uploader';
import { useHtmlFileSubmit } from '../../../hooks/use-html-file-submit.hooks';
import { adminDeleteFile, adminRetrieveFile } from '../../../api/admin-llm-file';

interface DataListType {
  key: string;
  title: string;
  createdAt: string;
}

const FileList: React.FC = () => {
  const [category, setCategory] = useState('모집요강');
  const [type, setType] = useState('수시');
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<DataListType[]>([]);

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
        const file = fileList[0].originFileObj as File;
        const uploadData = useHtmlFileSubmit(type, category, file);
        await uploadData();
        console.log('success');
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
    setUploading(false);
    setFileList([]);
  };

  const handleDelete = async (record: DataListType) => {
    try {
      await adminDeleteFile({ type, category });
      setDataList((prevData) => prevData.filter((item) => item.key !== record.key));
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await adminRetrieveFile({ type, category });
        const formattedData: DataListType[] = [];

        Object.keys(response.documents).forEach((key) => {
          const documentsArray = response.documents[key];

          documentsArray.forEach((item: any, index: number) => {
            const exists = formattedData.find((data) => data.title === item.title);
            if (!exists) {
              formattedData.push({
                key: `${key}-${index}`,
                title: item.title,
                createdAt: item.created_at,
              });
            }
          });
        });

        setDataList(formattedData);
      } catch (error) {
        console.error('다운로드 에러', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category]);

  const columns = [
    {
      title: '파일 이름',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '업로드 날짜',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '삭제',
      key: 'action',
      render: (text: any, record: DataListType) => (
        <Button type="link" danger onClick={() => handleDelete(record)}>
          삭제
        </Button>
      ),
    },
  ];

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

      <Divider orientation="left">업로드된 파일 확인하기</Divider>
      <div className="mx-8">
        <Table columns={columns} dataSource={dataList} loading={loading} />
      </div>
    </div>
  );
};

export default FileList;
