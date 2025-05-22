import React, { useState } from 'react';
import { Diary } from '../types';
import { XCircle, Check } from 'lucide-react';

interface DiaryFormProps {
  initialValues?: Partial<Diary>;
  onSubmit: (values: Omit<Diary, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ 
  initialValues = { body: '', mind: '', note: '' },
  onSubmit,
  onCancel
}) => {
  const [values, setValues] = useState<Omit<Diary, 'id' | 'date'>>(
    initialValues as Omit<Diary, 'id' | 'date'>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#3B3B3B] p-4 rounded-lg mb-3 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="body" className="flex items-center gap-2 text-sm text-[#C4C4C4] mb-1">
            <span>📝</span>
            <span>Body condition</span>
          </label>
          <input
            type="text"
            id="body"
            name="body"
            value={values.body}
            onChange={handleChange}
            required
            placeholder="How does your body feel today?"
            className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF]"
          />
        </div>
        
        <div>
          <label htmlFor="mind" className="flex items-center gap-2 text-sm text-[#C4C4C4] mb-1">
            <span>💭</span>
            <span>Mind state</span>
          </label>
          <input
            type="text"
            id="mind"
            name="mind"
            value={values.mind}
            onChange={handleChange}
            required
            placeholder="How are you feeling mentally today?"
            className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF]"
          />
        </div>
        
        <div>
          <label htmlFor="note" className="flex items-center gap-2 text-sm text-[#C4C4C4] mb-1">
            <span>✏</span>
            <span>Notes</span>
          </label>
          <textarea
            id="note"
            name="note"
            value={values.note}
            onChange={handleChange}
            required
            placeholder="Any other thoughts or events from today..."
            rows={3}
            className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF] resize-none"
          />
        </div>
        
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#505050] text-[#C4C4C4] hover:bg-[#606060] transition-colors"
          >
            <XCircle size={16} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#0070FF] text-white hover:bg-blue-600 transition-colors"
          >
            <Check size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DiaryForm;