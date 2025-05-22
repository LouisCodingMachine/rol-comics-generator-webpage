import React, { useState } from 'react';
import { Routine } from '../types';
import { XCircle, Check } from 'lucide-react';

interface RoutineFormProps {
  initialValues?: Partial<Routine>;
  onSubmit: (values: Omit<Routine, 'id'>) => void;
  onCancel: () => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({ 
  initialValues = { time: '', title: '', frequency: 'EVERY', done: false },
  onSubmit,
  onCancel
}) => {
  const [values, setValues] = useState<Omit<Routine, 'id'>>(initialValues as Omit<Routine, 'id'>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#3B3B3B] p-4 rounded-lg mb-3 animate-fadeIn">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="time" className="block text-xs text-[#C4C4C4] mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={values.time}
              onChange={handleChange}
              required
              className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF]"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="title" className="block text-xs text-[#C4C4C4] mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              placeholder="Routine title"
              className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF]"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="frequency" className="block text-xs text-[#C4C4C4] mb-1">
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            value={values.frequency}
            onChange={handleChange}
            className="w-full bg-[#505050] text-white rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#0070FF]"
          >
            <option value="EVERY">EVERY</option>
            <option value="WEEKDAY">WEEKDAY</option>
            <option value="WEEKEND">WEEKEND</option>
          </select>
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

export default RoutineForm;