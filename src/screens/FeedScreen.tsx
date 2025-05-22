import React from 'react';
import { format, parseISO, subYears, isAfter } from 'date-fns';
import useAppStore from '../store';
import Header from '../components/Header';
import ComicCard from '../components/ComicCard';

const FeedScreen: React.FC = () => {
  const { comics } = useAppStore();

  // Sort comics by date (newest first)
  const sortedComics = [...comics].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );

  // Get the latest comic (first in the sorted array)
  const latestComic = sortedComics.length > 0 ? sortedComics[0] : null;
  
  // Filter comics from a year ago (excluding the latest)
  const now = new Date();
  const yearAgo = subYears(now, 1);
  const yearAgoComics = sortedComics
    .filter(comic => comic !== latestComic)
    .filter(comic => {
      const comicDate = parseISO(comic.date);
      // Check if comic date is within a 15-day window around 1 year ago
      const yearAgoLower = subYears(comicDate, 1);
      const yearAgoUpper = subYears(comicDate, 1);
      yearAgoLower.setDate(yearAgoLower.getDate() - 7);
      yearAgoUpper.setDate(yearAgoUpper.getDate() + 7);
      
      return isAfter(comicDate, yearAgoLower) && !isAfter(comicDate, yearAgoUpper);
    });

  // Other comics (not latest and not from a year ago)
  const otherComics = sortedComics
    .filter(comic => comic !== latestComic)
    .filter(comic => !yearAgoComics.includes(comic));

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-white">
      <Header showAddButton={true} />
      
      <main className="container mx-auto max-w-md px-4 py-6">
        {/* Latest Comic */}
        {latestComic ? (
          <section className="mb-8">
            <ComicCard comic={latestComic} isLatest={true} />
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#C4C4C4]">No comics generated yet</p>
          </div>
        )}
        
        {/* Divider */}
        {(yearAgoComics.length > 0 || otherComics.length > 0) && (
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-[#505050]"></div>
            <div className="px-4 text-sm text-[#C4C4C4]">A year ago</div>
            <div className="flex-grow h-px bg-[#505050]"></div>
          </div>
        )}
        
        {/* Year Ago Comics */}
        {yearAgoComics.length > 0 && (
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              {yearAgoComics.map(comic => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          </section>
        )}
        
        {/* Other Comics */}
        {otherComics.length > 0 && (
          <section>
            <div className="grid grid-cols-2 gap-4">
              {otherComics.map(comic => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default FeedScreen;