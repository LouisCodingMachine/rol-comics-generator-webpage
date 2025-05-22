import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import useAppStore from '../store';
import Header from '../components/Header';
import RoutineCard from '../components/RoutineCard';
import RoutineForm from '../components/RoutineForm';
import DiaryCard from '../components/DiaryCard';
import DiaryForm from '../components/DiaryForm';
import axios from 'axios';

const EditorScreen: React.FC = () => {
  const { 
    routines,
    diaries,
    addRoutine, 
    updateRoutine, 
    deleteRoutine, 
    toggleRoutineDone,
    addDiary,
    updateDiary,
    deleteDiary,
    setView,
    addComic
  } = useAppStore();
  
  const [isAddingRoutine, setIsAddingRoutine] = useState(false);
  const [isAddingDiary, setIsAddingDiary] = useState(false);

  const handleGenerateComic = async () => {
    if (diaries.length === 0) return;

    try {
      // Prepare the diary text
      const routineSummary = routines
        .filter(r => r.done)
        .map(r => `${r.time} ${r.title}`)
        .join(', ');

      const diaryParagraph = diaries
        .map(d => `몸컨디션:${d.body} 마음:${d.mind}\n${d.note}`)
        .join('\n\n');

      const diaryText = `${routineSummary}\n\n${diaryParagraph}`;

      // Set loading view first
      setView('loading');

      // Make API request
      const response = await axios.post(
        'https://www.movesports.kr/comic',
        { diary: diaryText },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJ1c2VybmFtZSI6ImtrdDc1MiIsImlhdCI6MTc0NzY1OTcyMSwiZXhwIjoxNzc5MTk1NzIxfQ.tpcuW7ACWS_VrjcQle4lD1ARAcFhCcQjOGWxQicLHK0'
          }
        }
      );

      // Add the comic to the store
      addComic(response.data.url, diaryText);
      
      // Navigate to feed view
      setView('feed');
      
    } catch (error) {
      console.error('Error generating comic:', error);
      alert('Failed to generate comic. Please try again.');
      setView('editor');
    }
  };

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-white">
      <Header />
      
      <main className="container mx-auto max-w-md px-4 py-6">
        {/* Routines Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ROUTINES</h2>
            <button 
              onClick={() => setIsAddingRoutine(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#505050] text-white hover:bg-[#606060] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          
          {isAddingRoutine && (
            <RoutineForm 
              onSubmit={(values) => {
                addRoutine(values);
                setIsAddingRoutine(false);
              }}
              onCancel={() => setIsAddingRoutine(false)}
            />
          )}
          
          <div className="space-y-3">
            {routines.length === 0 ? (
              <p className="text-[#C4C4C4] text-center py-6">No routines added yet</p>
            ) : (
              routines.map(routine => (
                <RoutineCard 
                  key={routine.id}
                  routine={routine}
                  onToggleDone={toggleRoutineDone}
                  onUpdate={updateRoutine}
                  onDelete={deleteRoutine}
                />
              ))
            )}
          </div>
        </section>
        
        {/* Diary Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">DIARY</h2>
            <button 
              onClick={() => setIsAddingDiary(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#505050] text-white hover:bg-[#606060] transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          
          {isAddingDiary && (
            <DiaryForm 
              onSubmit={(values) => {
                addDiary(values);
                setIsAddingDiary(false);
              }}
              onCancel={() => setIsAddingDiary(false)}
            />
          )}
          
          <div className="space-y-3">
            {diaries.length === 0 ? (
              <p className="text-[#C4C4C4] text-center py-6">No diary entries added yet</p>
            ) : (
              diaries.map(diary => (
                <DiaryCard 
                  key={diary.id}
                  diary={diary}
                  onUpdate={updateDiary}
                  onDelete={deleteDiary}
                />
              ))
            )}
          </div>
        </section>
        
        {/* Generate Comic Button */}
        <button
          onClick={handleGenerateComic}
          disabled={diaries.length === 0}
          className={`w-full py-3 rounded-lg text-center font-medium transition-colors ${
            diaries.length === 0 
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
              : 'bg-[#0070FF] text-white hover:bg-blue-600 active:bg-blue-700'
          }`}
        >
          Capture your day as a comic
        </button>
      </main>
    </div>
  );
};

export default EditorScreen;