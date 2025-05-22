import React, { useState } from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Routine } from '../types';
import RoutineForm from './RoutineForm';

interface RoutineCardProps {
  routine: Routine;
  onToggleDone: (id: string) => void;
  onUpdate: (id: string, data: Partial<Routine>) => void;
  onDelete: (id: string) => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ 
  routine, 
  onToggleDone, 
  onUpdate, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <RoutineForm 
        initialValues={routine}
        onSubmit={(values) => {
          onUpdate(routine.id, values);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-[#3B3B3B] p-4 rounded-lg mb-3 flex items-center justify-between animate-fadeIn">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-[#C4C4C4] text-sm">{routine.time}</span>
          <span className={`text-white ${routine.done ? 'line-through opacity-70' : ''}`}>
            {routine.title}
          </span>
          <span className="text-xs text-[#C4C4C4] bg-[#505050] py-0.5 px-2 rounded-full">
            {routine.frequency}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onToggleDone(routine.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            routine.done ? 'bg-[#0070FF] text-white' : 'bg-[#505050] text-[#C4C4C4]'
          }`}
        >
          <Check size={16} />
        </button>
        <button 
          onClick={() => setIsEditing(true)}
          className="w-8 h-8 rounded-full bg-[#505050] flex items-center justify-center text-[#C4C4C4] hover:bg-[#606060] transition-colors"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(routine.id)}
          className="w-8 h-8 rounded-full bg-[#505050] flex items-center justify-center text-[#C4C4C4] hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;