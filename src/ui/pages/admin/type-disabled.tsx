import * as React from 'react';
import { Button, message, Switch } from 'antd';
import { useTypeDisabledStore } from '../../../store/type-disabled-store';
import { getTypeStatus } from '../../../api/admin/question-type-status/get-type-status';
import { chnageTypeStatus } from '../../../api/admin/question-type-status/change-type-status';

const TypeDisabled = () => {
  const { activeSusi, activeJeongsi, activePyeonip, setJeongsiDisabled, setPyeonipDisabled, setSusiDisabled } =
    useTypeDisabledStore();

  const [defaults, setDefaults] = React.useState({
    susi: false,
    jeongsi: false,
    pyeonip: false,
  });

  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: 'success' | 'error', content: string) => {
    messageApi.open({ type, content });
  };

  const saveButtonClick = async () => {
    setLoading(true);
    try {
      const changeRequests = [];

      if (activeSusi !== defaults.susi) {
        changeRequests.push(chnageTypeStatus({ type: 'SUSI' }));
      }
      if (activeJeongsi !== defaults.jeongsi) {
        changeRequests.push(chnageTypeStatus({ type: 'JEONGSI' }));
      }
      if (activePyeonip !== defaults.pyeonip) {
        changeRequests.push(chnageTypeStatus({ type: 'PYEONIP' }));
      }

      await Promise.all(changeRequests);

      showMessage('success', '저장완료되었습니다!');
    } catch (e) {
      showMessage('error', '저장에 실패했습니다. 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTypeStatus();
        const newDefaults = {
          susi: false,
          jeongsi: false,
          pyeonip: false,
        };

        response.forEach((item: { type: 'SUSI' | 'JEONGSI' | 'PYEONIP'; isActivated: boolean }) => {
          if (item.type === 'SUSI') {
            newDefaults.susi = item.isActivated;
            setSusiDisabled(item.isActivated);
          } else if (item.type === 'JEONGSI') {
            newDefaults.jeongsi = item.isActivated;
            setJeongsiDisabled(item.isActivated);
          } else if (item.type === 'PYEONIP') {
            newDefaults.pyeonip = item.isActivated;
            setPyeonipDisabled(item.isActivated);
          }
        });

        setDefaults(newDefaults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderSwitch = (label: string, checked: boolean, onChange: () => void) => (
    <div>
      <div>{label} 버튼 비활성화/활성화</div>
      <Switch checked={checked} checkedChildren="활성화" unCheckedChildren="비활성화" onChange={onChange} />
    </div>
  );

  return (
    <div className="w-full">
      {contextHolder}
      {renderSwitch('수시', activeSusi, () => setSusiDisabled(!activeSusi))}
      {renderSwitch('정시', activeJeongsi, () => setJeongsiDisabled(!activeJeongsi))}
      {renderSwitch('편입', activePyeonip, () => setPyeonipDisabled(!activePyeonip))}
      <Button onClick={saveButtonClick} loading={loading}>
        저장
      </Button>
    </div>
  );
};

export default TypeDisabled;
