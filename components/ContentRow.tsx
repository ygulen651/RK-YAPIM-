'use client';

import { useRef } from 'react';
import ContentCard from './ContentCard';

interface Content {
  _id: string;
  title: string;
  poster: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: {
    current: string;
  };
  _type: 'film' | 'dizi';
}

interface ContentRowProps {
  title: string;
  items: Content[];
  id?: string;
}

export default function ContentRow({ title, items, id }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Ekran genişliğine göre kaydırma miktarı
      const scrollAmount = window.innerWidth * 0.7; // Ekranın %70'i kadar kaydır
      const targetScroll = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
        
      current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <section id={id} className="mb-16 relative group scroll-mt-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white px-4 md:px-0">{title}</h2>
      
      <div className="relative group/slider">
        {/* Sol Buton */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 -ml-2 md:-ml-6 disabled:opacity-0 backdrop-blur-sm"
          aria-label="Sola kaydır"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Liste */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 px-4 md:px-0 scrollbar-hide scroll-smooth" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          {items.map((item) => (
            <div key={item._id} className="snap-start shrink-0 w-40 sm:w-48 md:w-56 transition-transform hover:scale-105 duration-300">
              <ContentCard content={item} />
            </div>
          ))}
        </div>

        {/* Sağ Buton */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 -mr-2 md:-mr-6 disabled:opacity-0 backdrop-blur-sm"
          aria-label="Sağa kaydır"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
