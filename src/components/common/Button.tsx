import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = 'me-1 my-1',
  ...props
}) => {
  const baseStyles =
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-opacity-90 ',
    secondary:
      'bg-secondary text-white hover:bg-opacity-90  ',
    danger:
      'bg-red-600 text-white hover:bg-opacity-90  ',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
