import React from 'react';
import { format, parseISO, subYears, isAfter } from 'date-fns';
import useAppStore from '../store';
import Header from '../components/Header';
import ComicCard from '../components/ComicCard';

const FeedScreen: React.FC = () => {
  const { comics } = useAppStore();

  const sortedComics = [...comics].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );
  
  const latestComic = sortedComics[0] || null;
  const previousComics = sortedComics.slice(1); // 최신 제외 나머지

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
        {previousComics.length > 0 && (
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-[#505050]"></div>
            <div className="px-4 text-sm text-[#C4C4C4]">Previous</div>
            <div className="flex-grow h-px bg-[#505050]"></div>
          </div>
        )}

        {/* Previous Comics */}
        {previousComics.length > 0 && (
          <section>
            <div className="grid grid-cols-2 gap-4">
              {previousComics.map(comic => (
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