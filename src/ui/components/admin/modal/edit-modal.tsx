import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { AdminEditAnswer } from '../../../../api/admin/admin-edit-answer';
import { AdminCheckQuestionAnswer } from '../../../../api/admin/admin-check-question-answer';
import useCheckQuestionAnswerStore from '../../../../store/admin/check-question-answer-store';

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionId: number;
}

const EditModal = ({ open, setOpen, questionId }: CustomModalProps) => {
  const { questionData, updateCheck, updateAnswer } = useCheckQuestionAnswerStore();
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
  }, [questionId, open]);

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
    try {
      await executeWithLoading(async () => {
        await AdminEditAnswer(answer.id, content);
        updateAnswer(answer.id, content);
        if (!isChecked) {
          await AdminCheckQuestionAnswer({ questionId });
          updateCheck(questionId, true);
        }
        handleClose();
      });
    } catch (err) {
      setEditStatus(false);
      console.error(err);
    }
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

  const enableEditMode = () => {
    setEditStatus(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Modal
      open={open}
      title={`${modalTitle} - 질문 확인 상태: ${isChecked}`}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          닫기
        </Button>,
        !isChecked ? (
          <Button key="checked" onClick={handleCheckToggle} loading={loading} type="dashed">
            질문-답변 확인 상태 변경
          </Button>
        ) : (
          <Button key="checked" onClick={handleCheckToggle} loading={loading} type="dashed" danger>
            질문-답변 미확인 상태 변경
          </Button>
        ),
        editStatus ? (
          <Button key="submit" onClick={handleEditSubmit} loading={loading} type="primary">
            편집완료
          </Button>
        ) : (
          <Button key="edit" onClick={enableEditMode} type="primary">
            편집하기
          </Button>
        ),
      ]}
    >
      {editStatus ? <TextArea rows={25} value={content} onChange={handleChange} /> : <div>{answer.content}</div>}
    </Modal>
  );
};

export default EditModal;
