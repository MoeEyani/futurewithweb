import React from 'react';

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
      <svg
        viewBox="0 0 600 400"
        className={`${sizeClasses[size]}`}
        role="img"
        aria-label="Future With Logo"
      >
        <g>
          <rect x="180" y="200" width="60" height="120" rx="10" fill="#F05454" />
          <rect x="260" y="240" width="60" height="80" rx="10" fill="#FFD166" />
          <rect x="260" y="160" width="60" height="60" rx="10" fill="#FFD166" />
          <rect x="340" y="160" width="60" height="60" rx="10" fill="#4CAF50" />
          <rect x="340" y="240" width="60" height="60" rx="10" fill="#4CAF50" />
          <rect x="340" y="320" width="60" height="60" rx="10" fill="#4CAF50" />
          <rect x="420" y="80" width="60" height="240" rx="10" fill="#4E89AE" />
        </g>
      </svg>
      
      {withText && (
        <div className="ml-2 font-space font-bold text-white text-xl md:text-2xl">
          Future With
        </div>
      )}
    </div>
  );
};

export default Logo;
