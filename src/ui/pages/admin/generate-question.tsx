import React, { useState } from 'react';
import { Button, Divider, Input, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AdminGenerateQuestion } from '../../../api/admin-generate-question';
const GenerateQuestion = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('질문과 답변이 저장되었습니다.');
  };

  const [type, setType] = useState('SUSI');
  const [category, setCategory] = useState('ADMISSION_GUIDELINE');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await AdminGenerateQuestion({ category, type, questionContent: question, answerContent: answer });
      setQuestion('');
      setAnswer('');
      messageApi.info('질문과 답변이 저장되었습니다.');
    } catch (error) {
      messageApi.error('질문-답변 내용이 저장되지 않았습니다. 재로그인 후 다시 시도해주세요.');
    }
  };
  return (
    <div className="w-full">
      {contextHolder}
      <Divider orientation="left">챗봇 질문-답변 생성하기</Divider>
      <div className="mx-8 my-2">
        전형선택
        <Select
          defaultValue="수시"
          className="ml-10 w-40"
          onChange={handleTypeChange}
          options={[
            { value: 'SUSI', label: '수시' },
            { value: 'JEONGSI', label: '정시' },
            { value: 'PYEONIP', label: '편입학' },
          ]}
        />
      </div>
      <div className="mx-8 my-2">
        카테고리 선택
        <Select
          defaultValue="모집요강"
          className="ml-3 w-40"
          onChange={handleCategoryChange}
          options={[
            { value: 'ADMISSION_GUIDELINE', label: '모집요강' },
            { value: 'PASSING_RESULT', label: '입시결과' },
            { value: 'PAST_QUESTIONS', label: '기출문제' },
            { value: 'INTERVIEW_PRACTICAL_TEST', label: '면접/실기' },
          ]}
        />
      </div>
      <Divider orientation="left">질문 내용</Divider>
      <Input
        value={question}
        onChange={handleQuestionInputChange}
        placeholder="질문 내용을 적어주세요 (ex. 수시 모집요강 요약해줘)"
      />
      <Divider orientation="left">답변 내용</Divider>
      <TextArea value={answer} rows={10} onChange={handleAnswerInputChange} placeholder="답변 내용을 적어주세요" />
      <Button className="my-3" type="primary" onClick={handleSubmit}>
        답변 생성하기
      </Button>
    </div>
  );
};

export default GenerateQuestion;
