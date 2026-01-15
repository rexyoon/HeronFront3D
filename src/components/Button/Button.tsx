import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"; 
  fullWidth?: boolean; 
  icon?: React.ReactNode; 
}

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : "w-auto"} ${className}`}
      {...props} >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
