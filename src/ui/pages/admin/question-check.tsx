import { Divider, Select, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { adminQuestionCheck } from '../../../api/admin-question-check';

interface DataType {
  questionContent: string;
  viewCount: string;
  isChecked: boolean;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '질문내용',
    dataIndex: 'questionContent',
    key: 'question_content',
  },
  {
    title: '질문횟수',
    dataIndex: 'viewCount',
    key: 'viewCount',
  },
  {
    title: '질문확인여부',
    dataIndex: 'isChecked',
    key: 'isChecked',
    render: (isChecked) => (isChecked ? '확인됨' : '미확인'),
  },
];

const QuestionCheck = () => {
  const [type, setType] = useState('SUSI');
  const [category, setCategory] = useState('');
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await adminQuestionCheck({ type, category });
        const formattedData = response.map((item: any) => ({
          questionContent: item.content,
          viewCount: item.viewCount.toString(),
          isChecked: item.isChecked,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category]);

  return (
    <div className="w-full">
      <Divider orientation="left">챗봇 질문 내용-답변 확인</Divider>
      <div className="mx-8">
        전형선택
        <Select
          defaultValue="SUSI"
          className="ml-10 w-40"
          onChange={handleTypeChange}
          options={[
            { value: 'SUSI', label: '수시' },
            { value: 'JEONGSI', label: '정시' },
            { value: 'PYEONIP', label: '편입학' },
          ]}
        />
      </div>
      <div className="mx-8">
        카테고리 선택
        <Select
          defaultValue="전체보기"
          className="ml-3 w-40"
          onChange={handleCategoryChange}
          options={[
            { value: '', label: '전체보기' },
            { value: 'ADMISSION_GUIDELINE', label: '모집요강' },
            { value: 'PASSING_RESULT', label: '입시결과' },
            { value: 'PAST_QUESTIONS', label: '기출문제' },
            { value: 'INTERVIEW_PRACTICAL_TEST', label: '면접/실기' },
          ]}
        />
      </div>
      <div className="mx-8 my-3">
        <Table columns={columns} dataSource={data} loading={loading} rowKey="questionContent" />
      </div>
    </div>
  );
};

export default QuestionCheck;
