import { useState, useEffect } from 'react';

export default function PledgeModal({ isOpen, onClose, rewards, selectedRewardId, onConfirmPledge }) {
  // --- States (상태 관리) ---
  const [activeRewardId, setActiveRewardId] = useState(null);
  const [pledgeValues, setPledgeValues] = useState({
    no_reward: 1,
    bamboo: 25,
    black_edition: 75,
    mahogany: 200,
  });
  const [validationError, setValidationError] = useState('');

  // --- Effects (부수 효과 처리) ---
  // 모달이 열리거나 외부에서 특정 리워드가 선택되면 활성화된 리워드 아이디를 맞춥니다.
  useEffect(() => {
    if (isOpen) {
      setActiveRewardId(selectedRewardId);
      setValidationError('');
    }
  }, [isOpen, selectedRewardId]);

  if (!isOpen) return null;

  // --- Handlers (핸들러 함수) ---
  const handleSelectReward = (id) => {
    const targetReward = rewards.find(r => r.id === id);
    // 품절된 경우(수량이 0인 경우) 선택 불가
    if (targetReward && targetReward.quantity === 0) return;
    
    setActiveRewardId(id);
    setValidationError('');
  };

  const handleInputChange = (id, val) => {
    const parsed = parseInt(val, 10) || 0;
    setPledgeValues(prev => ({
      ...prev,
      [id]: parsed
    }));
  };

  const handlePledgeSubmit = (id) => {
    const pledgeAmount = pledgeValues[id] || 0;

    // Validation (금액 최소값 유효성 검사)
    if (id === 'no_reward') {
      if (pledgeAmount < 1) {
        setValidationError('기부금은 최소 $1 이상이어야 합니다.');
        return;
      }
    } else {
      const targetReward = rewards.find(r => r.id === id);
      if (targetReward && pledgeAmount < targetReward.minPledge) {
        setValidationError(`최소 기부액인 $${targetReward.minPledge} 이상 입력해야 합니다.`);
        return;
      }
    }

    setValidationError('');
    onConfirmPledge(id, pledgeAmount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* === Backdrop Overlay (모달 배경 오버레이) === */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* === Modal Content Card (모달 콘텐츠 카드) === */}
      <div className="flex min-h-screen items-center justify-center p-6 md:py-24">
        <div className="relative w-full max-w-2xl bg-white rounded-lg p-6 md:p-10 shadow-2xl z-10 transition-all transform duration-300">
          
          {/* Header & Close Button (헤더 및 닫기 버튼) */}
          <div className="flex justify-between items-center">
            <h2 id="modal-title" className="text-preset-4 text-gray-950">
              Back this project
            </h2>
            <button 
              onClick={onClose} 
              className="hover:scale-110 transition-transform p-2 focus:outline-none"
              aria-label="모달 창 닫기"
            >
              <img src="/images/icon-close-modal.svg" alt="닫기 아이콘" className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-4 text-preset-7-regular text-gray-500 md:text-preset-6-regular">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?
          </p>

          {/* Validation Error Message (경고 메시지 출력) */}
          {validationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-preset-7-medium text-red-500 rounded-lg animate-fade-in">
              ⚠️ {validationError}
            </div>
          )}

          {/* === Pledge Selection Cards (기부 옵션 카드 목록) === */}
          <div className="mt-8 space-y-6">
            
            {/* Card 1: Pledge with no reward (리워드 없는 후원) */}
            <article 
              className={`rounded-lg border text-left overflow-hidden transition-all duration-200 ${
                activeRewardId === 'no_reward' 
                  ? "border-green-400 ring-1 ring-green-400" 
                  : "border-gray-200"
              }`}
            >
              <div 
                className="p-6 flex gap-4 cursor-pointer hover:bg-gray-50/50"
                onClick={() => handleSelectReward('no_reward')}
              >
                <input
                  type="radio"
                  id="pledge-no-reward"
                  name="pledge-option"
                  checked={activeRewardId === 'no_reward'}
                  onChange={() => handleSelectReward('no_reward')}
                  className="mt-1 w-5 h-5 accent-green-400 cursor-pointer"
                />
                <div>
                  <label htmlFor="pledge-no-reward" className="text-preset-6-bold md:text-preset-5-bold text-gray-950 hover:text-green-400 cursor-pointer transition-colors block">
                    Pledge with no reward
                  </label>
                  <p className="mt-3 text-preset-7-regular text-gray-500 md:text-preset-6-regular">
                    Choose to support us without a reward if you simply believe in our project. As a backer,
                    you will be signed up to receive product updates via email.
                  </p>
                </div>
              </div>

              {/* Input section (결제 금액 인풋 영역) */}
              {activeRewardId === 'no_reward' && (
                <div className="bg-gray-50/80 p-6 border-t border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
                  <span className="text-preset-7-regular text-gray-500 md:text-preset-6-regular text-center md:text-left">Enter your pledge</span>
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative flex items-center">
                      <span className="absolute left-6 text-gray-300 font-bold text-sm">$</span>
                      <input
                        type="number"
                        min="1"
                        value={pledgeValues.no_reward}
                        onChange={(e) => handleInputChange('no_reward', e.target.value)}
                        className="pl-9 pr-4 py-3 w-28 bg-white border border-gray-200 rounded-full text-preset-6-bold text-gray-950 focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <button
                      onClick={() => handlePledgeSubmit('no_reward')}
                      className="px-6 py-3 bg-green-400 hover:bg-green-700 text-white text-preset-6-bold rounded-full transition-colors focus:outline-none"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </article>

            {/* Dynamic Reward Cards (동적 리워드 카드 리스트) */}
            {rewards.map((reward) => {
              const isSelected = activeRewardId === reward.id;
              const isOutOfStock = reward.quantity === 0;

              return (
                <article
                  key={reward.id}
                  className={`rounded-lg border text-left overflow-hidden transition-all duration-200 ${
                    isOutOfStock 
                      ? "border-gray-200 opacity-50 select-none" 
                      : isSelected
                        ? "border-green-400 ring-1 ring-green-400" 
                        : "border-gray-200 hover:border-green-400/50"
                  }`}
                >
                  <div 
                    className={`p-6 flex gap-4 ${isOutOfStock ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-50/50"}`}
                    onClick={() => !isOutOfStock && handleSelectReward(reward.id)}
                  >
                    <input
                      type="radio"
                      id={`pledge-${reward.id}`}
                      name="pledge-option"
                      disabled={isOutOfStock}
                      checked={isSelected}
                      onChange={() => !isOutOfStock && handleSelectReward(reward.id)}
                      className="mt-1 w-5 h-5 accent-green-400 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className="flex-1">
                      {/* Name and Pledge Limit */}
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <label 
                          htmlFor={`pledge-${reward.id}`} 
                          className={`text-preset-6-bold md:text-preset-5-bold text-gray-950 transition-colors block ${
                            isOutOfStock ? "cursor-not-allowed" : "hover:text-green-400 cursor-pointer"
                          }`}
                        >
                          {reward.name}
                        </label>
                        <span className="text-preset-7-medium md:text-preset-6-medium text-green-400">Pledge ${reward.minPledge} or more</span>
                        
                        {/* Desktop Count (우측에 노출되는 수량 표시) */}
                        <div className="hidden md:flex items-center gap-1.5 ml-auto">
                          <span className="text-preset-5-bold text-gray-950">{reward.quantity}</span>
                          <span className="text-preset-7-regular text-gray-500">left</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-preset-7-regular text-gray-500 md:text-preset-6-regular">
                        {reward.description}
                      </p>

                      {/* Mobile Count (모바일 하단에 노출되는 수량 표시) */}
                      <div className="mt-4 flex items-center gap-1.5 md:hidden">
                        <span className="text-preset-4 text-gray-950">{reward.quantity}</span>
                        <span className="text-preset-7-regular text-gray-500">left</span>
                      </div>
                    </div>
                  </div>

                  {/* Input section (결제 금액 인풋 영역) */}
                  {isSelected && !isOutOfStock && (
                    <div className="bg-gray-50/80 p-6 border-t border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
                      <span className="text-preset-7-regular text-gray-500 md:text-preset-6-regular text-center md:text-left">Enter your pledge</span>
                      <div className="flex items-center justify-center gap-4">
                        <div className="relative flex items-center">
                          <span className="absolute left-6 text-gray-300 font-bold text-sm">$</span>
                          <input
                            type="number"
                            min={reward.minPledge}
                            value={pledgeValues[reward.id]}
                            onChange={(e) => handleInputChange(reward.id, e.target.value)}
                            className="pl-9 pr-4 py-3 w-28 bg-white border border-gray-200 rounded-full text-preset-6-bold text-gray-950 focus:outline-none focus:border-green-400"
                          />
                        </div>
                        <button
                          onClick={() => handlePledgeSubmit(reward.id)}
                          className="px-6 py-3 bg-green-400 hover:bg-green-700 text-white text-preset-6-bold rounded-full transition-colors focus:outline-none"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

          </div>

        </div>
      </div>
    </div>
  );
}
