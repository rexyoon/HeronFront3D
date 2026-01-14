import React from 'react';
import { ChevronLeft, ChevronRight, Info, ShieldCheck } from 'lucide-react';
import Scene from '../components/Scene'; 
const CAR_LIST = [
  {
    id: 1,
    name: "포르쉐 911",
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
    <div className="w-full max-w-md mx-auto bg-white min-h-screen pb-10">
      {/*상단 헤더*/}
      <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-20 shadow-sm">
        <button className="p-1">
          <ChevronLeft size={24} color="#333" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">포르쉐 911</h1>
        <div className="w-6" /> 
      </header>
      {/* 
        핵심 수정 부분: 3D 모델링 영역 컨테이너 
        1. h-[350px]: 높이를 350px로 고정하여 화면 전체를 덮는 현상 방지
        2. relative: 내부 요소들이 이 박스 밖으로 나가지 않도록 기준점 설정
        3. z-0: 헤더보다 레이어를 낮게 설정
      */}
      <section className="relative w-full h-[350px] bg-gray-100 overflow-hidden z-0">
        <Scene />
      </section>
      {/*안내 메뉴 리스트*/}
      <div className="px-4 py-2 mt-2">
        <MenuLink icon={<Info size={20} />} text="렌터카 이용 가이드" />
        <MenuLink icon={<ShieldCheck size={20} />} text="보험 보장범위 안내" />
      </div>
      {/*필터 버튼 영역*/}
      <div className="flex gap-2 px-4 py-4 border-b border-gray-100">
        <FilterButton text="일반자차" isActive />
        <FilterButton text="연식" />
        <FilterButton text="유종" />
      </div>
      {/*배달료 안내 박스*/}
      <div className="px-4 py-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-600 border border-gray-100">
          배달료 별도 <span className="font-semibold text-gray-800">10,000원</span> / 편도
        </div>
      </div>
      {/*차량 리스트*/}
      <div className="px-4 space-y-3">
        {CAR_LIST.map((car) => (
          <div key={car.id} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:border-blue-400 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-bold text-gray-900">{car.name}</h3>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                {car.insuranceType}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-4">
              {car.year} | {car.fuel}
              <br />
              {car.shop}
            </div>

            <div className="flex justify-end items-center gap-2">
               <span className="text-xs text-red-500 font-bold">{car.discount}%</span>
               <span className="text-xs text-gray-400 line-through">
                 {car.originalPrice.toLocaleString()}원
               </span>
            </div>
             <div className="flex justify-end items-center gap-1">
               <span className="text-lg font-bold text-gray-900">
                 {car.price.toLocaleString()}원
               </span>
               <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const MenuLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
);
const FilterButton = ({ text, isActive = false }: { text: string; isActive?: boolean }) => (
  <button
    className={`px-3 py-1.5 text-xs font-medium rounded border flex items-center gap-1 transition-colors
      ${isActive 
        ? 'border-blue-500 text-blue-600 bg-blue-50' 
        : 'border-gray-300 text-gray-600 bg-white'
      }`} >
    {text}
    <ChevronRight size={12} className={`rotate-90 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
  </button>
);

export default CarInfo;
