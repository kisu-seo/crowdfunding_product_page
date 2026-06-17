import { useState } from 'react';
import { INITIAL_REWARDS } from '../data/rewards';

/* === Custom Hook (프로젝트 전역 상태 관리 훅) === */
// 모금액·후원자·모달 개폐·리워드 수량을 단일 훅으로 관리
export function useProjectState() {
  // --- States (전역 프로젝트 상태 관리) ---
  const [backedAmount, setBackedAmount] = useState(89914);
  const [totalBackers, setTotalBackers] = useState(5007);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPledgeOpen, setIsPledgeOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState('no_reward');
  const [rewards, setRewards] = useState(INITIAL_REWARDS);

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

  // --- Modal Close Handlers ---
  const handleClosePledge = () => setIsPledgeOpen(false);
  const handleCloseSuccess = () => setIsSuccessOpen(false);

  return {
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
  };
}
