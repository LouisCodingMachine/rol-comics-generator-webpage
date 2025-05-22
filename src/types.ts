export interface Routine {
  id: string;
  time: string;
  title: string;
  frequency: 'EVERY' | 'WEEKDAY' | 'WEEKEND';
  done: boolean;
}

export interface Diary {
  id: string;
  body: string;
  mind: string;
  note: string;
  date: string;
}

export interface Comic {
  id: string;
  imageUrl: string;
  diaryText: string;
  routineSummary: string;
  date: string;
}

export type ViewType = 'editor' | 'loading' | 'feed';