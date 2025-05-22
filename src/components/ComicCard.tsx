import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Comic } from '../types';
import { format, parseISO } from 'date-fns';

interface ComicCardProps {
  comic: Comic;
  isLatest?: boolean;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic, isLatest = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedDate = format(parseISO(comic.date), 'MMM d, yyyy');

  return (
    <>
      <div 
        className={`relative overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-[1.02] ${
          isLatest ? 'w-full mb-6' : 'w-full mb-4'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={comic.imageUrl} 
          alt="Generated comic" 
          className={`w-full ${isLatest ? 'aspect-[3/4]' : 'aspect-[1/1]'} object-cover rounded-lg`}
        />
        
        {isLatest && (
          <div className="p-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-[#C4C4C4]">{formattedDate}</p>
            </div>
            <p className="text-white text-sm whitespace-pre-line line-clamp-3">
              {comic.diaryText}
            </p>
          </div>
        )}
      </div>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-[#3B3B3B] rounded-lg shadow-xl">
                <div className="relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-full bg-[#2B2B2B] bg-opacity-50 p-1 text-white hover:bg-opacity-75 transition-colors z-10"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={20} />
                  </button>
                  <img 
                    src={comic.imageUrl} 
                    alt="Generated comic" 
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-[#C4C4C4]">{formattedDate}</p>
                  </div>
                  <p className="text-white text-sm whitespace-pre-line">
                    {comic.diaryText}
                  </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ComicCard;