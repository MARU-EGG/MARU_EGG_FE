import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { AdminEditAnswer } from '../../../../api/admin/question-manage/admin-edit-answer';
import { AdminCheckQuestionAnswer } from '../../../../api/admin/question-manage/admin-check-question-answer';
import useCheckQuestionAnswerStore from '../../../../store/admin/check-question-answer-store';
import { adminDeleteQuestion } from '../../../../api/admin/question-manage/admin-delete-question';

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: number;
}

const EditModal = ({ open, setOpen, questionId }: CustomModalProps) => {
  const { questionData, updateCheck, updateAnswer, deleteQuestion } = useCheckQuestionAnswerStore();
  const question = questionData.find((question) => question.id === questionId);
  if (!question) {
    return null;
  }

  const { content: modalTitle, answer, isChecked } = question;
  const [editStatus, setEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(answer.content);

  useEffect(() => {
    if (question) {
      setContent(answer.content);
    }
  }, [answer.content]);

  const executeWithLoading = async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    await executeWithLoading(async () => {
      try {
        await AdminEditAnswer(answer.id, content);
        updateAnswer(answer.id, content);
        if (!isChecked) {
          await AdminCheckQuestionAnswer({ questionId });
          updateCheck(questionId, true);
        }
        handleClose();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }).catch(() => setEditStatus(false));
  };

  const handleCheckToggle = async () => {
    const newCheckStatus = !isChecked;
    await executeWithLoading(async () => {
      await AdminCheckQuestionAnswer({ questionId });
      updateCheck(questionId, newCheckStatus);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditStatus(false);
  };

  const handleDelete = async () => {
    await adminDeleteQuestion(question.id);
    deleteQuestion(question.id);
    handleClose();
  };

  const enableEditMode = () => {
    setEditStatus(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Modal
      open={open}
      title={`${modalTitle} - ${isChecked ? '질문 확인됨' : '질문 미확인'}`}
      onCancel={handleClose}
      footer={[
        editStatus ? (
          <Button key="submit" onClick={handleEditSubmit} loading={loading} type="primary">
            편집완료
          </Button>
        ) : (
          <Button key="edit" onClick={enableEditMode} type="primary">
            편집하기
          </Button>
        ),
        !isChecked ? (
          <Button key="checked" onClick={handleCheckToggle} loading={loading} type="dashed">
            질문-답변 확인 상태 변경
          </Button>
        ) : (
          <Button key="checked" onClick={handleCheckToggle} loading={loading} type="dashed" danger>
            질문-답변 미확인 상태 변경
          </Button>
        ),
        <Button key="close" onClick={handleDelete} danger>
          질문삭제하기
        </Button>,
      ]}
    >
      {editStatus ? <TextArea rows={25} value={content} onChange={handleChange} /> : <div>{answer.content}</div>}
    </Modal>
  );
};

export default EditModal;
