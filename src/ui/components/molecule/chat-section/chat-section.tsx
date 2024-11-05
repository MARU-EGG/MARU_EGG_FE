import * as React from 'react';
import ChatCard from '../../atom/chat-card/chat-card';
import useTypeStore from '../../../../store/type-category-store';
import useChatStore from '../../../../store/chat-store';
import { useTypeDisabledStore } from '../../../../store/type-disabled-store';
import { getTypeStatus } from '../../../../api/admin/question-type-status/get-type-status';
import useMessage from 'antd/es/message/useMessage';
import { TypePresetButtons } from '../../user-domain/type-preset-buttons';
import { QuestionPresetButtons } from '../../user-domain/question-preset-buttons';
import Dropdown from '../../atom/dropdown/dropdown';
import { getDetailType } from '../../../../api/get-admission-detail-type.query';
import { useUserDetailTypeStore } from '../../../../store/user-detail-type-store';

const ChatSection: React.FC = () => {
  const { type, category } = useTypeStore();
  const { messages, loading, referenceButtonDisabled } = useChatStore();
  const { activeSusi, activeJeongsi, activePyeonip, setSusiDisabled, setJeongsiDisabled, setPyeonipDisabled } =
    useTypeDisabledStore();
  const [messageApi, contextHolder] = useMessage();
  const { updateDetailTypeData, itemsArray, selectedName } = useUserDetailTypeStore();

  const messageEndRef = React.useRef<HTMLDivElement | null>(null);

  const showMessage = (type: 'info' | 'warning', content: string) => {
    messageApi.destroy();
    messageApi.open({
      type,
      content,
      duration: 3,
      style: {
        position: 'absolute',
        width: 'max-content',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '4rem',
      },
    });
  };

  const showCategoryStatus = () => {
    let contentMessage = '';
    if (!activeSusi && !activeJeongsi && !activePyeonip) {
      contentMessage = '현재는 모든 카테고리 이용이 가능해요.';
    } else if (!activeSusi && activeJeongsi && activePyeonip) {
      contentMessage = '현재는 수시 카테고리만 이용 가능해요.';
    } else if (activeSusi && !activeJeongsi && activePyeonip) {
      contentMessage = '현재는 정시 카테고리만 이용 가능해요.';
    } else if (activeSusi && activeJeongsi && !activePyeonip) {
      contentMessage = '현재는 편입 카테고리만 이용 가능해요.';
    } else if (!activeSusi && !activeJeongsi && activePyeonip) {
      contentMessage = '현재는 수시, 정시 카테고리만 이용 가능해요.';
    } else if (!activeSusi && activeJeongsi && !activePyeonip) {
      contentMessage = '현재는 수시, 편입 카테고리만 이용 가능해요';
    } else if (activeSusi && !activeJeongsi && !activePyeonip) {
      contentMessage = '현재는 정시, 편입 카테고리만 이용 가능해요.';
    }

    if (contentMessage) {
      showMessage('warning', contentMessage);
    }
  };

  const updateCategoryStatus = async () => {
    try {
      const response = await getTypeStatus();
      response.forEach((item: { type: 'SUSI' | 'JEONGSI' | 'PYEONIP'; isActivated: boolean }) => {
        switch (item.type) {
          case 'SUSI':
            setSusiDisabled(!item.isActivated);
            break;
          case 'JEONGSI':
            setJeongsiDisabled(!item.isActivated);
            break;
          case 'PYEONIP':
            setPyeonipDisabled(!item.isActivated);
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    if (category && messages[messages.length - 1]?.role === 'system' && !loading) {
      showMessage('info', '반드시 첨부자료를 통해 정확한 정보를 확인하세요');
    }
  }, [messages, category, loading]);

  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, category, referenceButtonDisabled]);

  React.useEffect(() => {
    updateCategoryStatus();
  }, []);

  React.useEffect(() => {
    const fetchDetailType = async () => {
      try {
        if (type !== undefined) {
          const response = await getDetailType({ type });
          updateDetailTypeData(response);
        }
      } catch (error) {
        console.error('Fetching Failed', error);
      }
    };

    fetchDetailType();
  }, [type]);

  React.useEffect(() => {
    showCategoryStatus();
  }, [activeSusi, activeJeongsi, activePyeonip]);

  return (
    <div className="max-h-100vh w-full overflow-y-auto px-4 pb-24 pt-16">
      {contextHolder}
      <ChatCard
        content={`안녕하세요.       
        명지대학교 입학 AI챗봇 마루에그입니다!           
        문의사항은 아래 전형 중 하나를 선택해주시면            
        안내 도와드릴게요!`}
        role="system"
      />
      <TypePresetButtons />
      {type && (
        <>
          <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />
          <ChatCard
            role="system"
            content={`어떤 세부 학과가 궁금하신가요? 아래에서 세부 전형을 선택해주세요!`}
          ></ChatCard>
          <div>{selectedName ? <></> : <Dropdown type={type} items={itemsArray} />}</div>
        </>
      )}

      {messages.map((msg, index) => (
        <ChatCard key={index} content={msg.content} role={msg.role} />
      ))}
      {selectedName && <QuestionPresetButtons />}
      <div className="h-6" ref={messageEndRef}></div>
    </div>
  );
};

export default ChatSection;
