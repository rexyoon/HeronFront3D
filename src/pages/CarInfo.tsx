import React from 'react';
import { ChevronLeft, ChevronRight, Info, ShieldCheck, ChevronDown } from 'lucide-react';
import Scene from '../components/Scene';
const CAR_LIST = [
  {
    id: 1,
    name: "포르쉐 911 카레라",
    year: "20년식",
    fuel: "휘발유",
    shop: "웨이렌터카 강남점",
    insuranceType: "일반자차",
    originalPrice: 40000,
    price: 36000,
    discount: 10,
  }
];
const CarInfo = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 bg-white z-10 sticky top-0">
        <button className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">포르쉐 911 카레라</h1>
        <div className="w-8" /> 
      </header>
      <section className="w-full h-[300px] bg-white relative flex items-center justify-center overflow-hidden">
        <Scene />
      </section>
      {/*안내 메뉴 리스트*/}
      <div className="px-4 py-2">
        <MenuRow icon={<Info size={20} />} text="렌터카 이용 가이드" />
        <MenuRow icon={<ShieldCheck size={20} />} text="보험 보장범위 안내" />
      </div>
      {/* 필터 버튼 영역 */}
      <div className="flex gap-2 px-4 py-4 mt-2">
        <FilterButton text="일반자차" isActive />
        <FilterButton text="연식" />
        <FilterButton text="유종" />
      </div>
      {/* 하단 리스트 영역 (회색 배경 시작) */}
      <div className="bg-gray-50 flex-1 px-4 py-6 min-h-[500px]">
        {/* 배달료 안내 박스 */}
        <div className="w-full bg-white border border-gray-200 rounded-lg py-3 text-center mb-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">
            배달료 별도 <span className="text-gray-900">10,000원</span> / 편도
          </p>
        </div>
        {/* 차량 카드 리스트 */}
        <div className="space-y-3">
          {CAR_LIST.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex justify-between items-start cursor-pointer hover:border-blue-400 transition-colors">
              {/* 왼쪽 정보 */}
              <div className="flex flex-col gap-1">
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                  {car.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {car.year} | {car.fuel}
                </p>
                <p className="text-xs text-gray-400">
                  {car.shop}
                </p>
              </div>
              {/* 오른쪽 가격 정보 */}
              <div className="flex flex-col items-end gap-1">
                {/* 뱃지 */}
                <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium mb-1">
                  {car.insuranceType}
                </span>
                
                {/* 가격 */}
                <div className="flex items-center gap-1">
                  <span className="text-[17px] font-bold text-gray-900">
                    {car.price.toLocaleString()}원
                  </span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>

                {/* 할인율/원가 */}
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-red-500 font-bold">{car.discount}%</span>
                  <span className="text-gray-300 line-through">
                    {car.originalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- 내부 소형 컴포넌트 ---
const MenuRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center justify-between py-3 cursor-pointer">
    <div className="flex items-center gap-2.5">
      <div className="text-gray-800">{icon}</div>
      <span className="text-[15px] font-normal text-gray-600">{text}</span>
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </div>
);
const FilterButton = ({ text, isActive = false }: { text: string; isActive?: boolean }) => (
  <button
    className={`
      px-3 py-2 text-[13px] rounded border flex items-center gap-1 transition-colors
      ${isActive 
        ? 'border-blue-500 text-blue-600 font-medium bg-white' 
        : 'border-gray-200 text-gray-600 bg-white' }`}>
    {text}
    <ChevronDown size={14} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
  </button>
);
export default CarInfo;
