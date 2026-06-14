import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import PledgeModal from './components/PledgeModal';
import SuccessModal from './components/SuccessModal';

export default function App() {
  // --- States (전역 프로젝트 상태 관리) ---
  const [backedAmount, setBackedAmount] = useState(89914);
  const [totalBackers, setTotalBackers] = useState(5007);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPledgeOpen, setIsPledgeOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState('no_reward');
  const [rewards, setRewards] = useState([
    {
      id: 'bamboo',
      name: 'Bamboo Stand',
      minPledge: 25,
      description: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      quantity: 101,
    },
    {
      id: 'black_edition',
      name: 'Black Edition Stand',
      minPledge: 75,
      description: "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 64,
    },
    {
      id: 'mahogany',
      name: 'Mahogany Special Edition',
      minPledge: 200,
      description: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      quantity: 0,
    }
  ]);

  // --- Handlers (핸들러 함수) ---
  const handleToggleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleBackProject = () => {
    setSelectedRewardId('no_reward');
    setIsPledgeOpen(true);
  };

  const handleSelectReward = (id) => {
    setSelectedRewardId(id);
    setIsPledgeOpen(true);
  };

  const handleConfirmPledge = (rewardId, amount) => {
    // 1. 모금액 및 기부자 수 업데이트
    setBackedAmount(prev => prev + amount);
    setTotalBackers(prev => prev + 1);

    // 2. 선택한 리워드 수량 감소 (리워드가 없는 기부가 아닌 경우)
    if (rewardId !== 'no_reward') {
      setRewards(prevRewards =>
        prevRewards.map(reward =>
          reward.id === rewardId
            ? { ...reward, quantity: Math.max(0, reward.quantity - 1) }
            : reward
        )
      );
    }

    // 3. 기부 모달을 닫고 성공 완료 안내 모달 열기
    setIsPledgeOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gray-50/50 pb-20 font-commissioner antialiased">
      {/* === Header Overlay (상단 헤더 네비게이션) === */}
      <Header />

      {/* === Hero Background Image (히어로 배경 이미지) === */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden z-0">
        <picture>
          <source srcSet="/images/image-hero-desktop.jpg" media="(min-min: 768px)" />
          <img
            src="/images/image-hero-mobile.jpg"
            alt="Bamboo Monitor Riser 배경 이미지"
            className="w-full h-full object-cover object-center md:hidden"
          />
        </picture>
        {/* Desktop Image explicitly rendered via tailwind utility for stability */}
        <img
          src="/images/image-hero-desktop.jpg"
          alt="Bamboo Monitor Riser 배경 이미지"
          className="hidden md:block w-full h-full object-cover object-center"
        />
      </div>

      {/* === Main Container (메인 컨텐츠 레이아웃) === */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 -mt-20 md:-mt-28 space-y-6">
        
        {/* Hero Product Info Card (제품 개요 카드) */}
        <Hero 
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onBackProject={handleBackProject}
        />

        {/* Campaign Stats Card (기부 모금 통계 카드) */}
        <Stats 
          backedAmount={backedAmount}
          totalBackers={totalBackers}
        />

        {/* Project About & Reward Selection Card (상세 설명 및 리워드 카드) */}
        <About 
          rewards={rewards}
          onSelectReward={handleSelectReward}
        />

      </main>



      {/* === Modals Layer (오버레이 모달 레이어) === */}
      <PledgeModal 
        isOpen={isPledgeOpen}
        onClose={() => setIsPledgeOpen(false)}
        rewards={rewards}
        selectedRewardId={selectedRewardId}
        onConfirmPledge={handleConfirmPledge}
      />

      <SuccessModal 
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
}
