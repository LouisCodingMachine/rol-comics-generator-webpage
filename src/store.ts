import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import { Routine, Diary, Comic, ViewType } from './types';

interface AppState {
  view: ViewType;
  routines: Routine[];
  diaries: Diary[];
  comics: Comic[];
  setView: (view: ViewType) => void;
  addRoutine: (routine: Omit<Routine, 'id'>) => void;
  updateRoutine: (id: string, data: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  toggleRoutineDone: (id: string) => void;
  addDiary: (diary: Omit<Diary, 'id' | 'date'>) => void;
  updateDiary: (id: string, data: Partial<Diary>) => void;
  deleteDiary: (id: string) => void;
  addComic: (imageUrl: string, diaryText: string) => void;
  deleteComic: (id: string) => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      view: 'editor',
      routines: [],
      diaries: [],
      comics: [],
      
      setView: (view) => set({ view }),
      
      addRoutine: (routine) => set((state) => ({
        routines: [...state.routines, { 
          ...routine, 
          id: crypto.randomUUID(),
        }]
      })),
      
      updateRoutine: (id, data) => set((state) => ({
        routines: state.routines.map(routine => 
          routine.id === id ? { ...routine, ...data } : routine
        )
      })),
      
      deleteRoutine: (id) => set((state) => ({
        routines: state.routines.filter(routine => routine.id !== id)
      })),
      
      toggleRoutineDone: (id) => set((state) => ({
        routines: state.routines.map(routine => 
          routine.id === id ? { ...routine, done: !routine.done } : routine
        )
      })),
      
      addDiary: (diary) => set((state) => ({
        diaries: [...state.diaries, { 
          ...diary, 
          id: crypto.randomUUID(), 
          date: format(new Date(), 'yyyy-MM-dd') 
        }]
      })),
      
      updateDiary: (id, data) => set((state) => ({
        diaries: state.diaries.map(diary => 
          diary.id === id ? { ...diary, ...data } : diary
        )
      })),
      
      deleteDiary: (id) => set((state) => ({
        diaries: state.diaries.filter(diary => diary.id !== id)
      })),
      
      addComic: (imageUrl, diaryText) => set((state) => ({
        comics: [...state.comics, { 
          id: crypto.randomUUID(), 
          imageUrl, 
          diaryText, 
          date: new Date().toISOString()
        }]
      })),
      
      deleteComic: (id) => set((state) => ({
        comics: state.comics.filter(comic => comic.id !== id)
      })),
    }),
    {
      name: 'daily-routine-comic-app',
    }
  )
);

export default useAppStore;