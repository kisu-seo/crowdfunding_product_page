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
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="relative w-full max-w-md bg-white rounded-lg py-[34px] px-[24px] shadow-2xl z-10 text-center transition-all transform duration-300 animate-fade-in">
          
          {/* Check Icon (체크 마크 아이콘) */}
          <div className="flex justify-center mb-8">
            <img src="/images/icon-check.svg" alt="성공 체크 표시" className="w-16 h-16" />
          </div>

          {/* Heading (완료 헤더) */}
          <h2 id="success-title" className="text-[18px] font-bold text-black">
            Thanks for your support!
          </h2>

          {/* Info Text (안내 본문) */}
          <p className="mt-4 text-[14px] font-normal leading-[2.0] text-gray-500">
            Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
            an email once our campaign is completed.
          </p>

          {/* Button (확인 버튼) */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-green-400 hover:bg-green-700 text-white text-[14px] font-bold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50"
            >
              Got it!
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
