import { Button, Divider, Popconfirm, Table, TableProps } from 'antd';
import react, { useMemo } from 'react';
import useAdmissionDetailTypeStore, {
  AdmissionDetailTypeState,
} from '../../../store/admin/admission-detail-type-store';
import React from 'react';

const DetailTypeCheck = () => {
  const { detailTypeData, updateDetailTypeData, deleteDetailType } = useAdmissionDetailTypeStore();
  const columns: TableProps<AdmissionDetailTypeState>['columns'] = useMemo(
    () => [
      {
        title: '대전형',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '세부전형',
        dataIndex: 'detail-type',
        key: 'detail-type',
      },
      {
        title: '수정',
        key: 'edit',
        width: 150,
        render: () => <Button>이름 수정하기</Button>,
      },
      {
        title: '삭제',
        key: 'action',
        width: 150,
        render: () => (
          <Popconfirm title="정말 삭제하시겠습니까?" okText="예" cancelText="아니오">
            <Button type="primary" danger>
              삭제
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [],
  );

  return (
    <div className="w-full">
      <Divider orientation="left">세부 전형 설정</Divider>
      <div>
        <Table columns={columns} dataSource={detailTypeData} />
      </div>
    </div>
  );
};

export default DetailTypeCheck;
