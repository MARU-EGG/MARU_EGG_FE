import React, { useState } from 'react';
import onboarding_0 from '../../../../assets/onboarding_0.png';
import onboarding_1 from '../../../../assets/onboarding_1.png';
import onboarding_2 from '../../../../assets/onboarding_2.png';
import onboarding_3 from '../../../../assets/onboarding_3.png';
import onboarding_4 from '../../../../assets/onboarding_4.png';

interface OnboardingProps {
  onClose: () => void;
}

const Onboarding = ({ onClose }: OnboardingProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      image: onboarding_0,
      title: '명지대학교 AI 입학문의 챗봇,',
      subtitle: '마루에그에 오신 것을 환영합니다!',
      description: '1분만에 마루에그의 모든 기능을 알려드려요',
      button1Text: '건너뛰기',
      button2Text: '시작하기',
    },
    {
      image: onboarding_1,
      title: '수시/정시/편입 타입 지정',
      subtitle: '',
      description: '클릭 1번으로 필요한 입력 정보를 알려드려요',
      button1Text: '건너뛰기',
      button2Text: '다음',
    },
    {
      image: onboarding_2,
      title: 'FAQ · 입시결과 · 모집요강 바로가기',
      subtitle: '',
      description: '자주 가는 페이지는 빠르게 접근할 수 있도록 만들었어요',
      button1Text: '건너뛰기',
      button2Text: '다음',
    },
    {
      image: onboarding_3,
      title: '모집요강에 있는 정보들을 한번에',
      subtitle: '',
      description: '질문을 하며 참고할 수 있는 정보를 한곳에 모아놨어요',
      button1Text: '건너뛰기',
      button2Text: '다음',
    },
    {
      image: onboarding_4,
      title: '질문내용에 적합한 참고자료도 함께',
      subtitle: '',
      description: '질문을 하며 참고할 수 있는 자료들을 함께 알려드려요',
      button1Text: '건너뛰기',
      button2Text: '다음',
    },
    {
      image: onboarding_0,
      title: '마루에그와 함께 입학문의로 보다 쉽게',
      subtitle: '',
      description: '마루에그에 대한 정보가 더 궁금하다면?',
      button1Text: '다시보기',
      button2Text: '문의하러 가기',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleRestart = () => {
    setStep(0);
  };

  return (
    <div className="absolute z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-40 mobile:rounded-none desktop:rounded-3xl">
      <div className="relative h-[411px] w-[324px] items-center justify-center rounded-2xl bg-white">
        <div className="flex flex-col">
          {/* Image */}
          <div className="flex h-[232px] w-full items-center justify-center rounded-b-none rounded-t-2xl bg-[#DFE5EE]">
            <img src={steps[step].image} alt="onboarding-step" className="object-contain" />
          </div>
          {/* Text */}
          <div className="space-y-1 py-8">
            <p className="text-center font-pretendard text-sm font-medium">
              {steps[step].title}
              <br />
              {steps[step].subtitle}
            </p>
            <p className="text-center font-pretendard text-xs font-normal text-[#8B8B8B]">{steps[step].description}</p>
          </div>
          {/* CTA */}
          <div className="absolute bottom-0 flex w-full items-center justify-between rounded-b-2xl bg-white">
            <button
              onClick={step === steps.length - 1 ? handleRestart : onClose}
              className="w-2/5 rounded-bl-2xl bg-[#ECECEC] p-5"
            >
              <p className="font-pretendard text-sm font-medium text-[#747474]">{steps[step].button1Text}</p>
            </button>
            <button onClick={handleNext} className="w-3/5 rounded-br-2xl bg-primary-blue p-5">
              <p className="font-pretendard text-sm font-medium text-white">{steps[step].button2Text}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
