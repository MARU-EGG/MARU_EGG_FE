import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import useCheckQuestionAnswerStore from '../../../../store/admin/check-question-answer-store';
import { adminEditQuestion } from '../../../../api/admin/question-manage/admin-edit-question';
import { AdminEditAnswer } from '../../../../api/admin/question-manage/admin-edit-answer';
import { AdminCheckQuestionAnswer } from '../../../../api/admin/question-manage/admin-check-question-answer';

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: number;
}

const EditModal = ({ open, setOpen, questionId }: CustomModalProps) => {
  const { findQuestion, updateQuestion, updateAnswer, updateIsChecked } = useCheckQuestionAnswerStore();
  const question = findQuestion(questionId);

  const [loading, setLoading] = useState(false);
  const [questionContent, setQuestionContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');

  useEffect(() => {
    if (question) {
      setQuestionContent(question.content);
      setAnswerContent(question.answer.content);
    }
  }, [question]);

  const handleEditSubmit = async () => {
    if (question?.id !== undefined && question?.answer.id !== undefined) {
      setLoading(true);
      try {
        await adminEditQuestion(question.id, questionContent);
        await AdminEditAnswer(question.answer.id, answerContent);
        updateQuestion(question.id, questionContent);
        updateAnswer(question.answer.id, answerContent);
        setOpen(false);
      } catch (error) {
        console.error('Error editing question/answer:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleQuestionStatusSubmit = async () => {
    if (question?.id !== undefined) {
      setLoading(true);
      try {
        await AdminCheckQuestionAnswer({ questionId });
        updateIsChecked(questionId);
        setOpen(false);
      } catch (error) {
        console.error('Error check status failed', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return question ? (
    <Modal
      open={open}
      title="질문 및 답변 수정"
      onCancel={handleClose}
      footer={[
        <Button key="submit" onClick={handleQuestionStatusSubmit} loading={loading} type="dashed">
          질문 확인 완료
        </Button>,
        <Button key="submit" onClick={handleEditSubmit} loading={loading} type="primary">
          수정 완료
        </Button>,
      ]}
    >
      <div>
        <h3>질문 수정</h3>
        <TextArea
          rows={4}
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          placeholder="질문 내용을 수정하세요"
        />
        <h3 className="mt-4">답변 수정</h3>
        <TextArea
          rows={4}
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          placeholder="답변 내용을 수정하세요"
        />
      </div>
    </Modal>
  ) : null;
};

export default EditModal;
