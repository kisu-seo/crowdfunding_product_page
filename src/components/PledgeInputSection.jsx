/* === PledgeInputSection (기부 금액 입력 영역 서브컴포넌트) === */
export default function PledgeInputSection({ min, value, onChange, onSubmit }) {
  // min: 최소 기부 가능 금액 | value: 현재 입력값 | onChange: 문자열 그대로 전달 | onSubmit: id 바인딩된 제출 핸들러
  return (
    <div className="py-[25px] px-6 md:py-[25px] md:px-[29px] border-t border-[#979797]/15 flex flex-col md:flex-row md:justify-between md:items-center gap-4 animate-fade-in">
      <span className="text-preset-8-regular md:text-preset-7-regular text-gray-500 text-center md:text-left">Enter your pledge</span>
      <div className="flex items-center justify-center gap-4 md:gap-4">
        <div className="w-[100px] h-[48px] md:w-[100px] md:h-[48px] relative flex items-center">
          <span className="absolute left-6 text-black/25 md:text-gray-300 text-preset-8-bold md:text-preset-8-bold">$</span>
          <input
            type="number"
            min={min}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full md:w-[100px] md:h-[48px] pl-9 pr-4 bg-white border border-gray-200 rounded-full text-preset-8-bold md:text-preset-8-bold text-black md:text-gray-950 focus:outline-none focus:border-green-400"
          />
        </div>
        <button
          onClick={onSubmit}
          className="w-[115px] h-[48px] flex items-center justify-center p-0 md:w-[107px] md:h-[48px] md:p-0 bg-green-400 min-[1028px]:hover:bg-green-700 text-white text-preset-8-bold md:text-preset-8-bold rounded-full transition-colors focus:outline-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
