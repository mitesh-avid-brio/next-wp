// CardContent.tsx
import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={`text-gray-700 ${className}`}>
      {children}
    </div>
  );
};
