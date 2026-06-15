export default function About({ rewards, onSelectReward }) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 px-6 py-[42px] md:px-12" id="about" aria-labelledby="about-title">
      {/* === Project Detail Heading (프로젝트 상세 설명 제목) === */}
      <h2 id="about-title" className="text-[18px] font-bold text-gray-950">
        About this project
      </h2>
      
      {/* === Project Detail Paragraphs (프로젝트 상세 설명 본문) === */}
      <div className="mt-[16px] text-[14px] font-normal text-gray-500 space-y-6">
        <p>
          The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen
          to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve
          your posture and make you more comfortable while at work, helping you stay focused on the task at hand.
        </p>
        <p>
          Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer
          to allow notepads, pens, and USB sticks to be stored under the stand.
        </p>
      </div>

      {/* === Reward Cards Container (리워드 카드 목록 컨테이너) === */}
      <div className="mt-[24px] space-y-6">
        {rewards.map((reward) => {
          const isOutOfStock = reward.quantity === 0;

          return (
            <article
              key={reward.id}
              className={`p-6 md:p-8 rounded-lg border text-left transition-all duration-200 ${
                isOutOfStock 
                  ? "border-gray-200 opacity-50 select-none" 
                  : "border-gray-200/80 hover:border-green-400"
              }`}
            >
              {/* Header Info (리워드 타이틀 및 최소 기부액) */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h3 className="text-[14px] font-bold text-black">{reward.name}</h3>
                <span className="font-medium text-[14px] leading-[1.2] tracking-[0px] text-green-400">Pledge ${reward.minPledge} or more</span>
              </div>
 
              {/* Description (설명 본문) */}
              <p className="mt-[16px] font-normal text-[14px] leading-[2.0] tracking-[0px] text-gray-500">{reward.description}</p>

              {/* Footer Info (남은 개수 및 선택 버튼) */}
              <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[32px] leading-[1.2] tracking-[0px] text-black">{reward.quantity}</span>
                  <span className="text-preset-6-regular text-gray-500">left</span>
                </div>
 
                <button
                  disabled={isOutOfStock}
                  onClick={() => onSelectReward(reward.id)}
                  className={`w-[157px] h-[48px] flex items-center justify-center rounded-full font-bold text-[14px] leading-[1.2] tracking-[0px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/50 ${
                    isOutOfStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-green-400 hover:bg-green-700 text-white"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : "Select Reward"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
