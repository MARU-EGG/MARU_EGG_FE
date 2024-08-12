import React, { useState } from 'react';
import { Button, Divider, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AdminGenerateQuestion } from '../../../api/admin-generate-question';

const GenerateQuestion = () => {
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
  return (
    <div className="w-full">
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
      <Input onChange={handleQuestionInputChange} placeholder="질문 내용을 적어주세요 (ex. 수시 모집요강 요약해줘)" />
      <Divider orientation="left">답변 내용</Divider>
      <div className="mb-5 text-xl">볼드체: **볼드단어**</div>
      <TextArea rows={10} onChange={handleAnswerInputChange} placeholder="답변 내용을 적어주세요" />
      <Button
        className="my-3"
        type="primary"
        onClick={() => AdminGenerateQuestion({ category, type, questionContent: question, answerContent: answer })}
      >
        답변 생성하기
      </Button>
    </div>
  );
};

export default GenerateQuestion;
