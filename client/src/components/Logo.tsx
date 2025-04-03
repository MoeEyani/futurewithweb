import React from 'react';
import logoImage from '@assets/Future with (Final Logo) transparent background with slogan-01.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', withText = false }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="Future With Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      
      {withText && (
        <div className="ml-2 font-space font-bold text-white text-xl md:text-2xl">
          Future With
        </div>
      )}
    </div>
  );
};

export default Logo;
