import { Button, Modal, Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  generateAdmissionTypeDetail,
  updateAdmissionTypeDetail,
} from '../../../../api/admin/admin-admission-type-detail.query';
import { AdmissionDetailTypeState } from '../../../../store/admin/admission-detail-type-store';

interface CustomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
  selectedDetailType?: AdmissionDetailTypeState;
  updateDetailTypeData: (data: AdmissionDetailTypeState[]) => void;
}

const CustomModal = ({ open, setOpen, isEditMode, selectedDetailType }: CustomModalProps) => {
  const [loading, setLoading] = useState(false);
  const [detailTypeName, setDetailTypeName] = useState('');
  const [selectedType, setSelectedType] = useState<'SUSI' | 'JEONGSI' | 'PYEONIP'>('SUSI');

  useEffect(() => {
    if (isEditMode && selectedDetailType) {
      setDetailTypeName(selectedDetailType.name || '');
      setSelectedType(selectedDetailType.type || 'SUSI');
    } else {
      setDetailTypeName('');
      setSelectedType('SUSI');
    }
  }, [isEditMode, selectedDetailType]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEditMode && selectedDetailType) {
        await updateAdmissionTypeDetail({
          id: selectedDetailType.id,
          name: detailTypeName,
        });
      } else {
        await generateAdmissionTypeDetail({ type: selectedType, name: detailTypeName });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      title={isEditMode ? '세부 전형 수정' : '세부 전형 생성'}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setOpen(false)}>
          취소
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          {isEditMode ? '수정하기' : '생성하기'}
        </Button>,
      ]}
    >
      <div>
        전형 선택:
        <Select
          className="ml-5"
          value={selectedType}
          onChange={(value) => setSelectedType(value)}
          options={[
            { value: 'SUSI', label: '수시' },
            { value: 'JEONGSI', label: '정시' },
            { value: 'PYEONIP', label: '편입' },
          ]}
        />
      </div>
      <div className="mt-3 flex flex-col">
        세부 전형 입력
        <Input
          className="mt-1 rounded-md border py-1 pl-2"
          placeholder="세부 전형을 입력해주세요 ex) 학생부교과(학교장추천전형)"
          value={detailTypeName}
          onChange={(e) => setDetailTypeName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CustomModal;
