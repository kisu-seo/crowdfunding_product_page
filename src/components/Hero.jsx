export default function Hero({ isBookmarked, onToggleBookmark, onBackProject }) {
  return (
    <section className="relative bg-white rounded-lg border border-gray-200 px-6 pb-[36px] text-center md:px-[44px] md:pb-[46px]" aria-labelledby="hero-title">
      {/* === Mastercraft Logo Emblem (마스터크래프트 로고 엠블럼) === */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
        <img src="/images/logo-mastercraft.svg" alt="Mastercraft 엠블럼" className="w-14 h-14" />
      </div>

      {/* === Product Title & Description (제품 타이틀 및 설명) === */}
      <div className="pt-[52px] pb-[24px] md:pt-[60px] md:pb-[32px]">
        <h1 id="hero-title" className="text-preset-4 md:text-preset-2 text-black md:whitespace-nowrap">
          Mastercraft Bamboo <br className="md:hidden" /> Monitor Riser
        </h1>
        <p className="mt-4 md:mt-[8px] text-[14px] md:text-[16px] font-normal text-gray-500">
          A beautiful & handcrafted monitor stand to reduce neck and eye strain.
        </p>
      </div>

      {/* === Call to Actions (주요 동작 버튼 영역) === */}
      <div className="flex items-center justify-between gap-4">
        {/* Back this project Button (프로젝트 후원하기 버튼) */}
        <button
          onClick={onBackProject}
          className="flex-none w-[214px] h-[56px] flex items-center justify-center p-0 md:w-[204px] md:h-[56px] bg-green-400 hover:bg-green-700 text-white text-preset-6-bold md:text-[16px] md:font-bold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50"
        >
          Back this project
        </button>

        {/* Bookmark Toggle Button (북마크 토글 버튼) */}
        <button
          onClick={onToggleBookmark}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? "북마크됨" : "북마크하기"}
          className="group flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50 bg-gray-100 md:bg-gray-200 hover:opacity-90"
        >
          {/* Bookmark Icon SVG (북마크 아이콘) */}
          <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                {/* Bookmarked 상태에 따라 배경 원 색상 변경 */}
                <circle 
                  className="transition-colors duration-200"
                  fill={isBookmarked ? "#147A73" : "#2F2F2F"} 
                  cx="28" 
                  cy="28" 
                  r="28"
                />
                {/* Bookmarked 상태에 따라 리본 색상 변경 */}
                <path 
                  className="transition-colors duration-200"
                  fill={isBookmarked ? "#FFFFFF" : "#B1B1B1"} 
                  d="M23 19v18l5-5.058L33 37V19z"
                />
              </g>
            </svg>
          </div>
          
          {/* Bookmark Text (북마크 텍스트 - 데스크탑에만 노출) */}
          <span 
            className={`hidden md:inline pl-4 pr-6 text-preset-6-bold transition-colors duration-200 ${
              isBookmarked ? "text-green-700" : "text-gray-500"
            }`}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </button>
      </div>
    </section>
  );
}
