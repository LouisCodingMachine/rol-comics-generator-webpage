import React from 'react';
import { Plus } from 'lucide-react';
import useAppStore from '../store';

interface HeaderProps {
  showAddButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAddButton = false }) => {
  const setView = useAppStore(state => state.setView);
  
  return (
    <header className="sticky top-0 z-10 bg-[#2B2B2B] py-4 px-4 flex items-center justify-between border-b border-[#505050]">
      <div className="w-8"></div>
      <h1 className="text-xl font-semibold text-white">
        <span className="text-[#0070FF]">Archive</span>
      </h1>
      {showAddButton ? (
        <button 
          onClick={() => setView('editor')}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-[#505050] transition-colors"
        >
          <Plus size={20} />
        </button>
      ) : (
        <div className="w-8"></div>
      )}
    </header>
  );
};

export default Header;