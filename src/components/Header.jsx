import { useState } from 'react';

export default function Header() {
  // --- States (상태 관리) ---
  const [isOpen, setIsOpen] = useState(false);

  // --- Handlers (핸들러 함수) ---
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-black/70 to-transparent transition-all duration-300">
      {/* === Navigation Bar (네비게이션 바) === */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center md:px-12 md:pt-[32px] md:pb-0 min-[1028px]:max-w-[1109px] min-[1028px]:pt-[48px]">
        <a href="/" className="z-50" aria-label="Crowdfund 홈">
          <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="Crowdfund 로고" className="h-5" />
        </a>

        {/* Desktop Menu (데스크탑 메뉴) */}
        <nav className="hidden lg:flex gap-8 text-white text-preset-6-medium min-[1028px]:w-[223px]" aria-label="데스크탑 주 메뉴">
          <a href="#about" className="min-[1028px]:hover:underline opacity-80 min-[1028px]:hover:opacity-100 transition-opacity min-[1028px]:text-preset-9">About</a>
          <a href="#discover" className="min-[1028px]:hover:underline opacity-80 min-[1028px]:hover:opacity-100 transition-opacity min-[1028px]:text-preset-9">Discover</a>
          <a href="#get-started" className="min-[1028px]:hover:underline opacity-80 min-[1028px]:hover:opacity-100 transition-opacity min-[1028px]:text-preset-9">Get Started</a>
        </nav>

        {/* Mobile Toggle Button (모바일 토글 버튼) */}
        <button
          className="lg:hidden z-50 focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          <img
            src={isOpen ? `${import.meta.env.BASE_URL}images/icon-close-menu.svg` : `${import.meta.env.BASE_URL}images/icon-hamburger.svg`}
            alt=""
            className="w-[16px] h-[16px] object-contain"
          />
        </button>
      </div>

      {/* === Mobile Overlay Navigation (모바일 오버레이 네비게이션) === */}
      {isOpen && (
        <>
          {/* Backdrop (배경 어둡게 처리) */}
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          
          {/* Menu Card (메뉴 카드) */}
          <nav
            id="mobile-nav"
            className="absolute top-[84px] left-1/2 -translate-x-1/2 w-[327px] md:w-[672px] bg-white rounded-lg shadow-xl z-40 flex flex-col divide-y divide-gray-950/10 overflow-hidden lg:hidden animate-fade-in py-[33.5px] md:py-[32px] px-[24px]"
            aria-label="모바일 주 메뉴"
          >
            <a
              href="#about"
              className="block w-[279px] p-0 pb-[24px] text-left text-preset-5-medium text-black transition-colors"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#discover"
              className="block w-[279px] p-0 py-[24px] text-left text-preset-5-medium text-black transition-colors"
              onClick={toggleMenu}
            >
              Discover
            </a>
            <a
              href="#get-started"
              className="block w-[279px] p-0 pt-[24px] text-left text-preset-5-medium text-black transition-colors"
              onClick={toggleMenu}
            >
              Get Started
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
