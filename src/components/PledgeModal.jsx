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
      <div className="flex min-h-screen items-start md:items-center justify-center px-6 pb-6 pt-[120px] md:py-24">
        <div className="relative w-full max-w-2xl bg-white rounded-lg py-[30px] px-6 md:pt-[47px] md:pb-[44px] md:px-[44px] shadow-2xl z-10 transition-all transform duration-300">
          
          {/* Header & Close Button (헤더 및 닫기 버튼) */}
          <div className="flex justify-between items-center">
            <h2 id="modal-title" className="text-preset-5-bold md:text-preset-3 text-gray-950">
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

          <p className="mt-4 text-preset-8-regular text-gray-500 md:text-preset-6-regular">
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
                className="w-[279px] md:w-full py-[30.5px] px-6 md:py-[31.5px] md:px-[29px] grid grid-cols-[24px_1fr] gap-x-4 md:gap-x-6 gap-y-4 rounded-[8px] cursor-pointer hover:bg-gray-50/50"
                onClick={() => handleSelectReward('no_reward')}
              >
                {/* 좌측: 라디오 버튼 */}
                <div className="relative w-[24px] h-[24px] shrink-0 flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 mt-0.5">
                  <input
                    type="radio"
                    id="pledge-no-reward"
                    name="pledge-option"
                    checked={activeRewardId === 'no_reward'}
                    onChange={() => handleSelectReward('no_reward')}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-[24px] h-[24px] rounded-full border border-gray-200 flex items-center justify-center transition-colors">
                    {activeRewardId === 'no_reward' && (
                      <div className="w-[12px] h-[12px] rounded-full bg-green-400" />
                    )}
                  </div>
                </div>

                {/* 우측: 컨텐츠 영역 */}
                <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex items-center">
                  <label htmlFor="pledge-no-reward" className="text-preset-8-bold md:text-preset-6-bold text-black hover:text-green-400 cursor-pointer transition-colors block">
                    Pledge with no reward
                  </label>
                </div>
                <p className="col-span-2 md:col-start-2 md:col-span-1 font-commissioner text-preset-8-regular md:text-preset-7-regular text-gray-500 w-full">
                  Choose to support us without a reward if you simply believe in our project. As a backer,
                  you will be signed up to receive product updates via email.
                </p>
              </div>

              {/* Input section (결제 금액 인풋 영역) */}
              {activeRewardId === 'no_reward' && (
                <div className="py-[25px] px-6 md:p-6 border-t border-[#979797]/15 flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
                  <span className="text-preset-8-regular md:text-preset-7-regular text-gray-500 text-center md:text-left">Enter your pledge</span>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-[100px] h-[48px] md:w-28 md:h-auto relative flex items-center">
                      <span className="absolute left-6 text-black/25 md:text-gray-300 text-preset-8-bold md:text-preset-7-medium md:font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        value={pledgeValues.no_reward}
                        onChange={(e) => handleInputChange('no_reward', e.target.value)}
                        className="w-full h-full md:w-28 md:py-3 pl-9 pr-4 bg-white border border-gray-200 rounded-full text-preset-8-bold md:text-preset-6-bold text-black md:text-gray-950 focus:outline-none focus:border-green-400"
                      />
                    </div>
                    <button
                      onClick={() => handlePledgeSubmit('no_reward')}
                      className="w-[115px] h-[48px] flex items-center justify-center p-0 md:w-auto md:h-auto md:px-6 md:py-3 bg-green-400 hover:bg-green-700 text-white text-preset-8-bold md:text-preset-6-bold rounded-full transition-colors focus:outline-none"
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
                    className={`w-[279px] md:w-full py-[30.5px] px-6 md:py-[31.5px] md:px-[29px] grid grid-cols-[24px_1fr] gap-x-4 md:gap-x-6 gap-y-4 rounded-[8px] ${
                      isOutOfStock ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-50/50"
                    }`}
                    onClick={() => !isOutOfStock && handleSelectReward(reward.id)}
                  >
                    {/* 좌측: 라디오 버튼 */}
                    <div className="relative w-[24px] h-[24px] shrink-0 flex items-center justify-center col-start-1 col-end-2 row-start-1 row-end-2 mt-1">
                      <input
                        type="radio"
                        id={`pledge-${reward.id}`}
                        name="pledge-option"
                        disabled={isOutOfStock}
                        checked={isSelected}
                        onChange={() => !isOutOfStock && handleSelectReward(reward.id)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                      />
                      <div className={`w-[24px] h-[24px] rounded-full border flex items-center justify-center transition-colors ${
                        isOutOfStock
                          ? "border-gray-200/50"
                          : "border-gray-200"
                      }`}>
                        {isSelected && !isOutOfStock && (
                          <div className="w-[12px] h-[12px] rounded-full bg-green-400" />
                        )}
                      </div>
                    </div>

                    {/* 우측: 컨텐츠 영역 - 타이틀 정보 및 데스크탑 수량 */}
                    <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-x-2 gap-y-1">
                        <label 
                          htmlFor={`pledge-${reward.id}`} 
                          className={`text-preset-8-bold md:text-preset-6-bold text-black transition-colors block ${
                            isOutOfStock ? "cursor-not-allowed" : "hover:text-green-400 cursor-pointer"
                          }`}
                        >
                          {reward.name}
                        </label>
                        <span className="text-preset-8-medium md:text-preset-6-bold text-green-400">Pledge ${reward.minPledge} or more</span>
                      </div>
                      
                      {/* Desktop Count (우측에 노출되는 수량 표시) */}
                      <div className="hidden md:flex items-center gap-1.5">
                        <span className="text-preset-7-medium font-bold text-gray-950">{reward.quantity}</span>
                        <span className="text-preset-7-regular text-gray-500">left</span>
                      </div>
                    </div>

                    {/* 설명 본문 */}
                    <p className="col-span-2 md:col-start-2 md:col-span-1 font-commissioner text-preset-8-regular md:text-preset-7-regular text-gray-500 w-full">
                      {reward.description}
                    </p>

                    {/* Mobile Count (모바일 하단에 노출되는 수량 표시) */}
                    <div className="col-span-2 md:hidden flex items-center gap-1.5">
                      <span className="text-preset-5-bold text-black">{reward.quantity}</span>
                      <span className="text-preset-7-regular text-gray-500">left</span>
                    </div>
                  </div>

                  {/* Input section (결제 금액 인풋 영역) */}
                  {isSelected && !isOutOfStock && (
                    <div className="py-[25px] px-6 md:p-6 border-t border-[#979797]/15 flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
                      <span className="text-preset-8-regular md:text-preset-7-regular text-gray-500 text-center md:text-left">Enter your pledge</span>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-[100px] h-[48px] md:w-28 md:h-auto relative flex items-center">
                          <span className="absolute left-6 text-black/25 md:text-gray-300 text-preset-8-bold md:text-preset-7-medium md:font-bold">$</span>
                          <input
                            type="number"
                            min={reward.minPledge}
                            value={pledgeValues[reward.id]}
                            onChange={(e) => handleInputChange(reward.id, e.target.value)}
                            className="w-full h-full md:w-28 md:py-3 pl-9 pr-4 bg-white border border-gray-200 rounded-full text-preset-8-bold md:text-preset-6-bold text-black md:text-gray-950 focus:outline-none focus:border-green-400"
                          />
                        </div>
                        <button
                          onClick={() => handlePledgeSubmit(reward.id)}
                          className="w-[115px] h-[48px] flex items-center justify-center p-0 md:w-auto md:h-auto md:px-6 md:py-3 bg-green-400 hover:bg-green-700 text-white text-preset-8-bold md:text-preset-6-bold rounded-full transition-colors focus:outline-none"
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
