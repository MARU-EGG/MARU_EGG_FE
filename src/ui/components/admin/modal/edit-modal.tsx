import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { AdminEditAnswer } from '../../../../api/admin-edit-answer';
import { AdminCheckQuestionAnswer } from '../../../../api/admin-check-question-answer';

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string;
  modalContent: string;
  modalContentId: number;
  questionId: number;
  isChecked: boolean;
}

const EditModal = ({
  open,
  setOpen,
  modalTitle,
  modalContent,
  modalContentId,
  questionId,
  isChecked,
}: CustomModalProps) => {
  const [editStatus, setEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(modalContent);

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
        await AdminEditAnswer(modalContentId, modalContent);
        await AdminCheckQuestionAnswer({ questionId, check: true });
        console.log('편집 및 확인 완료');
      });
    } catch (err) {
      setEditStatus(false);
      console.error(err);
    }
  };

  const handleCheckToggle = async () => {
    await executeWithLoading(async () => {
      await AdminCheckQuestionAnswer({ questionId, check: !isChecked });
      console.log('검토 상태 변경 완료');
    });
  };

  const handleClose = () => {
    setOpen(false);
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
      title={modalTitle}
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
      {editStatus ? <TextArea rows={25} value={content} onChange={handleChange} /> : <div>{modalContent}</div>}
    </Modal>
  );
};

export default EditModal;
