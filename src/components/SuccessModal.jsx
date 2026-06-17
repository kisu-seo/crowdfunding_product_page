export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="success-title">
      {/* === Backdrop Overlay (모달 배경 오버레이) === */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* === Modal Content Card (모달 콘텐츠 카드) === */}
      <div className="flex min-h-screen items-center md:items-start justify-center p-6 md:pt-[460px] md:pb-6">
        <div className="relative w-full max-w-md md:max-w-[540px] md:w-[540px] bg-white rounded-lg py-[34px] px-[24px] md:py-[52.5px] md:px-[48px] shadow-2xl z-10 text-center transition-all transform duration-300 animate-fade-in">
          
          <div className="flex justify-center mb-8">
            <img src="/images/icon-check.svg" alt="성공 체크 표시" className="w-16 h-16 md:w-[90px] md:h-[90px]" />
          </div>

          <h2 id="success-title" className="text-preset-5-bold md:text-preset-3 text-black">
            Thanks for your support!
          </h2>

          <p className="mt-4 text-preset-8-regular md:text-preset-6-regular text-gray-500 md:w-[444px] md:mx-auto">
            Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
            an email once our campaign is completed.
          </p>

          <div className="mt-8">
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-green-400 min-[1028px]:hover:bg-green-700 text-white text-preset-7-medium md:text-preset-8-bold font-bold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            >
              Got it!
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
