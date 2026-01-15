import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-5 
        shadow-[0_2px_8px_rgba(0,0,0,0.08)] 
        border border-gray-100 
        hover:border-blue-300 transition-colors 
        ${onClick ? "cursor-pointer" : ""} 
        ${className}`}>
    {children}
    </div>
  );
};
export default Card;
