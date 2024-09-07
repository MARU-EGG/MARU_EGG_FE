import * as React from 'react';
import ChatCard from '../../atom/chat-card/chat-card';
import PresetButton from '../../atom/preset/preset-button';
import useTypeStore from '../../../../store/type-category-store';
import useChatStore from '../../../../store/chat-store';
import useChatSection from '../../../../hooks/use-chat-section.hooks';
import { useTypeDisabledStore } from '../../../../store/type-disabled-store';
import { getTypeStatus } from '../../../../api/admin/question-type-status/get-type-status';
import useMessage from 'antd/es/message/useMessage';
import { TypePresetButtons } from '../../user-domain/type-preset-buttons';
import { CategoryPresetButtons } from '../../user-domain/category-preset-buttons';
import { QuestionPresetButtons } from '../../user-domain/question-preset-buttons';
import { relative } from 'path';

const ChatSection: React.FC = () => {
  const { type, category } = useTypeStore();
  const { messages, loading } = useChatStore();
  const { selectedCategoryButton } = useChatSection();
  const { activeSusi, activeJeongsi, activePyeonip, setSusiDisabled, setJeongsiDisabled, setPyeonipDisabled } =
    useTypeDisabledStore();
  const [messageApi, contextHolder] = useMessage();
  const messageEndRef = React.useRef<HTMLDivElement | null>(null);

  const showMessage = (type: 'info' | 'warning', content: string) => {
    messageApi.destroy();
    messageApi.open({
      type,
      content,
      duration: 300,
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
      contentMessage = '현재 모든 카테고리 이용이 가능합니다.';
    } else if (!activeSusi && activeJeongsi && activePyeonip) {
      contentMessage = '현재 수시 카테고리만 이용 가능합니다.';
    } else if (activeSusi && !activeJeongsi && activePyeonip) {
      contentMessage = '현재 정시 카테고리만 이용 가능합니다.';
    } else if (activeSusi && activeJeongsi && !activePyeonip) {
      contentMessage = '현재 편입 카테고리만 이용 가능합니다.';
    } else if (!activeSusi && !activeJeongsi && activePyeonip) {
      contentMessage = '현재 수시, 정시 카테고리만 이용 가능합니다.';
    } else if (!activeSusi && activeJeongsi && !activePyeonip) {
      contentMessage = '현재 수시, 편입 카테고리만 이용 가능합니다.';
    } else if (activeSusi && !activeJeongsi && !activePyeonip) {
      contentMessage = '현재 정시, 편입 카테고리만 이용 가능합니다.';
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
  }, [messages, selectedCategoryButton]);

  React.useEffect(() => {
    updateCategoryStatus();
  }, []);

  React.useEffect(() => {
    showCategoryStatus();
  }, [activeSusi, activeJeongsi, activePyeonip]);

  return (
    <div className="max-h-100vh w-full overflow-y-auto px-4 pb-24 pt-16">
      {contextHolder}
      <ChatCard
        content={`안녕하세요 입학처 챗봇 MARU-EGG입니다!  
        궁금하신 내용 안내 도와드리겠습니다.  
        알아보고 싶은 전형을 선택해주세요!`}
        role="system"
      />
      <TypePresetButtons />
      {type && <ChatCard role="user" content={type === 'SUSI' ? '수시' : type === 'JEONGSI' ? '정시' : '편입'} />}
      {type && (
        <>
          <ChatCard content="알고싶은 내용을 선택해주세요" role="system" />
          <CategoryPresetButtons />
        </>
      )}
      {category && (
        <ChatCard
          role="user"
          content={
            category === 'ADMISSION_GUIDELINE'
              ? '모집관련내용'
              : category === 'PASSING_RESULT'
                ? '전년도 입시결과'
                : '면접 등 기출문제'
          }
        />
      )}
      {type && category && (
        <ChatCard role="system" content="안녕하세요 입학처 챗봇 MARU-EGG입니다! 궁금하신 내용 안내 도와드리겠습니다." />
      )}
      {messages.map((msg, index) => (
        <ChatCard key={index} content={msg.content} role={msg.role} />
      ))}
      {category && messages[messages.length - 1]?.role === 'system' && <QuestionPresetButtons />}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default ChatSection;
