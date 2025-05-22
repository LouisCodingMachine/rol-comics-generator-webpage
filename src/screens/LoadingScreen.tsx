import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#2B2B2B] flex flex-col items-center justify-center px-4">
      <Sparkles 
        size={96} 
        className="text-[#0070FF] animate-spin mb-8" 
      />
      
      <h1 className="text-white text-xl font-bold tracking-wide mb-2">
        ROL TOON MAKER GENERATING
      </h1>
      
      <p className="text-[#C4C4C4] text-sm">
        It takes about 10 ~ 30 seconds
      </p>
      
      <div aria-busy="true" className="sr-only">
        Loading...
      </div>
    </div>
  );
};

export default LoadingScreen;