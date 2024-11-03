import { Button, Divider, Popconfirm, Table, TableProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import useAdmissionDetailTypeStore, {
  AdmissionDetailTypeState,
} from '../../../../store/admin/admission-detail-type-store';
import { getAllDetailType } from '../../../../api/get-admission-detail-type.query';
import CustomModal from './modal';
import { deleteAdmissionTypeDetail } from '../../../../api/admin/admin-admission-type-detail.query';

const DetailTypeCheck = () => {
  const { detailTypeData, deleteDetailType, updateDetailTypeData, loading, setLoading } = useAdmissionDetailTypeStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDetailType, setSelectedDetailType] = useState<AdmissionDetailTypeState | undefined>(undefined);

  const handleDelete = async (id: number) => {
    try {
      await deleteAdmissionTypeDetail(id);
      deleteDetailType(id);
    } catch (error) {
      console.error('delete failed', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (setLoading) setLoading(true);
      try {
        const response = await getAllDetailType();
        updateDetailTypeData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (setLoading) setLoading(false);
      }
    };

    fetchData();
  }, [modalOpen]);

  const typeMapping: Record<string, string> = {
    SUSI: '수시',
    JEONGSI: '정시',
    PYEONIP: '편입',
  };

  const columns: TableProps<AdmissionDetailTypeState>['columns'] = useMemo(
    () => [
      {
        title: '전형분류',
        dataIndex: 'type',
        key: 'type',
        width: 150,
        render: (type: string) => typeMapping[type] || type,
        filters: [
          {
            text: '수시',
            value: 'SUSI',
          },
          {
            text: '정시',
            value: 'JEONGSI',
          },
          {
            text: '편입',
            value: 'PYEONIP',
          },
        ],
        onFilter: (value, record) => record.type === value,
      },
      {
        title: '세부전형',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      },
      {
        title: '수정',
        key: 'edit',
        render: (record: AdmissionDetailTypeState) => (
          <Button
            onClick={() => {
              setSelectedDetailType(record);
              setIsEditMode(true);
              setModalOpen(true);
            }}
          >
            이름 수정하기
          </Button>
        ),
        width: 250,
      },
      {
        title: '삭제',
        key: 'action',
        width: 250,
        render: (record: AdmissionDetailTypeState) => (
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            okText="예"
            cancelText="아니오"
            onConfirm={() => {
              console.log(record.id);
              if (record.id !== undefined) {
                handleDelete(record.id);
              }
            }}
          >
            <Button type="primary" danger>
              삭제
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [deleteDetailType],
  );

  return (
    <div className="w-full">
      <Divider orientation="left">세부 전형 설정</Divider>
      <Button
        type="primary"
        className="m-3 p-5 font-pretendard text-lg"
        onClick={() => {
          setSelectedDetailType(undefined);
          setIsEditMode(false);
          setModalOpen(true);
        }}
      >
        새로운 전형 생성하기
      </Button>
      <div>
        <Table
          columns={columns}
          dataSource={detailTypeData.map((item) => ({ ...item, key: item.id }))}
          loading={loading}
        />
      </div>
      <CustomModal
        open={modalOpen}
        setOpen={setModalOpen}
        isEditMode={isEditMode}
        selectedDetailType={selectedDetailType}
        updateDetailTypeData={updateDetailTypeData}
      />
    </div>
  );
};

export default DetailTypeCheck;
