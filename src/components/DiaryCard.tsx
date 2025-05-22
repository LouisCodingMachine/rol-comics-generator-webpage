import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Diary } from '../types';
import DiaryForm from './DiaryForm';

interface DiaryCardProps {
  diary: Diary;
  onUpdate: (id: string, data: Partial<Diary>) => void;
  onDelete: (id: string) => void;
}

const DiaryCard: React.FC<DiaryCardProps> = ({ diary, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <DiaryForm 
        initialValues={diary}
        onSubmit={(values) => {
          onUpdate(diary.id, values);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-[#3B3B3B] p-4 rounded-lg mb-3 animate-fadeIn">
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C4C4C4]">📝</span>
            <span className="text-sm text-[#C4C4C4]">Body:</span>
          </div>
          <p className="text-white pl-6">{diary.body}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C4C4C4]">💭</span>
            <span className="text-sm text-[#C4C4C4]">Mind:</span>
          </div>
          <p className="text-white pl-6">{diary.mind}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#C4C4C4]">✏</span>
            <span className="text-sm text-[#C4C4C4]">Note:</span>
          </div>
          <p className="text-white pl-6 whitespace-pre-line">{diary.note}</p>
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#505050] text-[#C4C4C4] hover:bg-[#606060] transition-colors"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(diary.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#505050] text-[#C4C4C4] hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;