import { useProjectState } from './hooks/useProjectState';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import PledgeModal from './components/PledgeModal';
import SuccessModal from './components/SuccessModal';

export default function App() {
  // --- State & Handlers (커스텀 훅에서 전역 상태 및 핸들러 가져오기) ---
  const {
    backedAmount,
    totalBackers,
    isBookmarked,
    isPledgeOpen,
    isSuccessOpen,
    selectedRewardId,
    rewards,
    handleToggleBookmark,
    handleBackProject,
    handleSelectReward,
    handleConfirmPledge,
    handleClosePledge,
    handleCloseSuccess,
  } = useProjectState();

  return (
    <div className="relative min-h-screen bg-gray-50/50 pb-[76px] font-commissioner antialiased">
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
        {/* 모바일/데스크탑 분기를 Tailwind md:hidden 으로 처리하기 위해 img 태그를 별도 선언 */}
        <img
          src="/images/image-hero-desktop.jpg"
          alt="Bamboo Monitor Riser 배경 이미지"
          className="hidden md:block w-full h-full object-cover object-center"
        />
      </div>

      {/* === Main Container (메인 컨텐츠 레이아웃) === */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 md:px-0 -mt-[56px] md:-mt-[96px] min-[1028px]:-mt-[92px] min-[1028px]:max-w-[730px] space-y-6">

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
        onClose={handleClosePledge}
        rewards={rewards}
        selectedRewardId={selectedRewardId}
        onConfirmPledge={handleConfirmPledge}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
      />
    </div>
  );
}
