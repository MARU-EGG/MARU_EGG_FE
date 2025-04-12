// src/ui/pages/maru-egg.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/molecule/header/header';
import useTypeStore from '../../store/type-category-store';
import ChatForm from '../components/molecule/chat-form/chat-form';
import ChatSection from '../components/molecule/chat-section/chat-section';
import Onboarding from '../components/molecule/onboarding/onboarding';
import { useUserDetailTypeStore } from '../../store/user-detail-type-store';

const MaruEgg: React.FC = () => {
  const { type } = useTypeStore();
  const { selectedName } = useUserDetailTypeStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // const isFirstVisit = localStorage.getItem('isFirstVisit') === null;
    // if (isFirstVisit) {
    //   setShowOnboarding(true);
    //   localStorage.setItem('isFirstVisit', 'false');
    // } else {
    //   setShowOnboarding(false);
    // }
    window.location.href = 'https://maruegg.framer.website';
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="flex h-svh items-center justify-center bg-gray-100">
      <div className="scrollbar-hide relative flex h-full w-full bg-background-default mobile:h-full mobile:min-h-[480px] mobile:min-w-[320px] mobile:rounded-none desktop:h-[780px] desktop:max-w-[390px] desktop:rounded-3xl desktop:border desktop:border-gray-200 desktop:shadow-2xl">
        {showOnboarding && <Onboarding onClose={handleCloseOnboarding} />}
        <Header type={type} />
        <ChatSection />
        {selectedName !== '' && (
          <div className="absolute bottom-0 w-full bg-white px-3 py-3 mobile:rounded-none desktop:rounded-bl-3xl desktop:rounded-br-3xl">
            <ChatForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaruEgg;
