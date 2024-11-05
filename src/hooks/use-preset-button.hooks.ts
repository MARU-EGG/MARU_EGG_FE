import useChatStore, { referenceState } from '../store/chat-store';
import useTypeStore from '../store/type-category-store';
import { postQuestion } from '../api/post-question';

const usePresetButton = () => {
  const { type, category } = useTypeStore();
  const { addMessage, setLoading, updateLastMessage, updateLastReference, updateReferenceDisabled } = useChatStore();

  const handleReferenceButtonClick = (references: referenceState[]) => {
    let content = '답변 출처를 알려드릴게요!\n';
    // references가 null, undefined, 또는 길이가 0인 경우 체크
    if (!references || references.length === 0) {
      addMessage({ content: '출처 정보가 없습니다.', role: 'system' });
      return;
    }
    references.map((reference, index) => {
      content += `\n출처${index + 1}번: ${reference.link}\n`;
    });
    content += '\n**답변을 꼭 확인해주세요!**';
    addMessage({ content: content, role: 'system' });
    updateReferenceDisabled(true);
  };

  const fetchResponse = async (question: string) => {
    return await postQuestion(category, type, question);
  };

  const updateStateWithResponse = (response: any) => {
    updateLastMessage(response.answer.content);
    updateLastReference(response.references);
    updateReferenceDisabled(false);
    setLoading(false);
  };

  const handleButtonClick = async (question: string) => {
    try {
      addMessage({ content: question, role: 'user' });
      addMessage({ content: 'loading', role: 'system' });
      setLoading(true);

      const response = await fetchResponse(question);
      updateStateWithResponse(response);
    } catch (error) {
      setLoading(false);
      updateLastMessage('답변 생성에 실패했습니다. 새로고침해주세요');
    }
  };

  const handleDetailTypeButtonClick = async (detailTypeName: string) => {
    try {
      addMessage({ content: detailTypeName, role: 'user' });
      addMessage({ content: 'loading', role: 'system' });
      setLoading(true);

      const response = await fetchResponse(`${detailTypeName}에 대해 설명해줘`);
      updateStateWithResponse(response);
    } catch (error) {
      setLoading(false);
      updateLastMessage('답변 생성에 실패했습니다. 새로고침해주세요');
    }
  };

  return {
    handleReferenceButtonClick,
    handleButtonClick,
    handleDetailTypeButtonClick,
  };
};

export default usePresetButton;
