import { Divider, Select, Table, TableProps, Tag, AutoComplete, Input, Button, Popconfirm } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { adminQuestionCheck } from '../../../api/admin/question-manage/admin-question-check';
import EditModal from '../../components/admin/modal/edit-modal';
import useCheckQuestionAnswerStore, { QuestionAnswerState } from '../../../store/admin/check-question-answer-store';
import { searchAutoComplete } from '../../../api/search-auto-complete';
import { SearchById } from '../../../api/admin/question-manage/admin-search-by-id';
import { adminDeleteQuestion } from '../../../api/admin/question-manage/admin-delete-question';

const QuestionCheck = () => {
  const { questionData, updateQuestionData, deleteQuestion } = useCheckQuestionAnswerStore();
  const [type, setType] = useState('SUSI');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<{ value: string; id: number }[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionAnswerState | null>(null);

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleRowClick = (record: QuestionAnswerState) => {
    setSelectedQuestion(record);
    setModalOpen(true);
  };

  const handleSearchChange = async (value: string) => {
    setSearchText(value);

    if (value) {
      try {
        const autoCompleteResults = await searchAutoComplete(value);
        const options = autoCompleteResults.data.map((item: any) => ({ value: item.content, id: item.id }));
        setAutoCompleteOptions(options);
      } catch (error) {
        console.error('Error fetching autocomplete data:', error);
      }
    } else {
      setAutoCompleteOptions([]);
    }
  };

  const handleSearchSelect = (value: string, option: any) => {
    setSearchText(value);
    setSelectedOptionId(option.id);
  };

  const handleSearch = async () => {
    if (selectedOptionId !== null) {
      try {
        const response = await SearchById(selectedOptionId);
        updateQuestionData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.warn('No search option selected');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteQuestion(id);
      deleteQuestion(id);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const columns: TableProps<QuestionAnswerState>['columns'] = useMemo(
    () => [
      {
        title: '질문내용',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '질문횟수',
        dataIndex: 'viewCount',
        key: 'viewCount',
        width: 140,
        sorter: (a, b) => +b.viewCount - +a.viewCount,
      },
      {
        title: '질문확인여부',
        dataIndex: 'isChecked',
        width: 140,
        key: 'isChecked',
        filters: [
          {
            text: '확인',
            value: true,
          },
          {
            text: '미확인',
            value: false,
          },
        ],
        onFilter: (value, record) => record.isChecked === value,
        render: (isChecked) => (isChecked ? <Tag color="green">확인</Tag> : <Tag color="red">미확인</Tag>),
      },
      {
        title: '편집',
        key: 'edit',
        width: 150,
        render: (text, record) => <Button onClick={() => handleRowClick(record)}>편집하기</Button>,
      },
      {
        title: '삭제',
        key: 'action',
        width: 150,
        render: (text, record) => (
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={() => handleDelete(record.id)}
            okText="예"
            cancelText="아니오"
          >
            <Button type="primary" danger>
              삭제
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [handleDelete],
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await adminQuestionCheck({ type, category });
        updateQuestionData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category, updateQuestionData]);

  return (
    <div className="w-full">
      <Divider orientation="left">챗봇 질문 내용-답변 확인</Divider>

      <div className="mx-8 mb-3 flex items-center">
        <AutoComplete
          style={{ width: 300 }}
          options={autoCompleteOptions}
          onSearch={handleSearchChange}
          onSelect={handleSearchSelect}
          value={searchText}
          onChange={setSearchText}
        >
          <Input.Search placeholder="질문 검색" enterButton onSearch={handleSearch} />
        </AutoComplete>
      </div>

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
        <Table columns={columns} dataSource={questionData} loading={loading} rowKey="id" />
      </div>

      {selectedQuestion && <EditModal open={modalOpen} setOpen={setModalOpen} questionId={selectedQuestion.id} />}
    </div>
  );
};

export default QuestionCheck;
