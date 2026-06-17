export default function Stats({ backedAmount, totalBackers, targetAmount = 100000, daysLeft = 56 }) {
  // --- Helpers (포맷팅 및 진행률 계산 헬퍼 함수) ---
  const formatNumber = (num) => num.toLocaleString('en-US');
  const progressPercent = Math.min((backedAmount / targetAmount) * 100, 100);

  return (
    <section className="bg-white rounded-lg border border-gray-200 px-6 py-[33.5px] md:p-12" aria-label="프로젝트 모금 통계">
      {/* === Statistics Grid (통계 데이터 그리드) === */}
      <div className="flex flex-col md:flex-row md:text-left gap-[24px] md:gap-0 items-center justify-between text-center md:w-[584px] md:mx-auto min-[1028px]:!w-[634px] min-[1028px]:!gap-0 min-[1028px]:!justify-start">
        {/* Backed Amount (총 모금액) */}
        <div className="md:w-1/3 md:pr-[24px] min-[1028px]:!w-[179px] min-[1028px]:!pr-0">
          <p className="text-preset-3 md:text-preset-1 text-black">${formatNumber(backedAmount)}</p>
          <p className="mt-2 md:mt-0 text-preset-7-regular md:text-preset-7-regular text-gray-500">of ${formatNumber(targetAmount)} backed</p>
        </div>
        
        {/* Mobile Separator (모바일 구분선) */}
        <div className="w-20 h-px bg-gray-200 md:hidden" aria-hidden="true" />
        {/* Desktop Vertical Separator (데스크탑 세로선) */}
        <div className="hidden md:block w-px h-16 bg-gray-200 md:bg-[#979797]/15" aria-hidden="true" />

        {/* Total Backers (총 후원자 수) */}
        <div className="md:w-1/3 md:pl-[48px] md:pr-[56px] min-[1028px]:!pr-0">
          <p className="text-preset-3 md:text-preset-1 text-black min-[1028px]:!w-[180px]">{formatNumber(totalBackers)}</p>
          <p className="mt-2 md:mt-0 text-preset-7-regular md:text-preset-7-regular text-gray-500 min-[1028px]:!w-[180px]">total backers</p>
        </div>

        {/* Mobile Separator (모바일 구분선) */}
        <div className="w-20 h-px bg-gray-200 md:hidden" aria-hidden="true" />
        {/* Desktop Vertical Separator (데스크탑 세로선) */}
        <div className="hidden md:block w-px h-16 bg-gray-200 md:bg-[#979797]/15" aria-hidden="true" />

        {/* Days Left (남은 일수) */}
        <div className="md:w-1/3 md:pl-[48px]">
          <p className="text-preset-3 md:text-preset-1 text-black">{daysLeft}</p>
          <p className="mt-2 md:mt-0 text-preset-7-regular md:text-preset-7-regular text-gray-500">days left</p>
        </div>
      </div>

      {/* === Progress Bar (모금 진행률 바) === */}
      <div className="mt-8 md:mt-10 w-full md:w-[584px] md:mx-auto min-[1028px]:!w-[634px] h-3 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
        {/* 디자인 목업 고정값. progressPercent 변수는 위에서 계산되나 아직 연결되지 않음 */}
        <div
          className="h-full bg-green-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: '78%' }}
        />
      </div>
    </section>
  );
}
