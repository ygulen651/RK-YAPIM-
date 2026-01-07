'use client';

import { useEffect, useState } from 'react';
import ContentRow from './ContentRow';
import { client } from '@/lib/sanity';

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

export default function ContentGrid() {
  const [films, setFilms] = useState<Content[]>([]);
  const [diziler, setDiziler] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const [filmData, diziData] = await Promise.all([
          client.fetch<Content[]>(`*[_type == "film"] | order(releaseDate desc) {
            _id,
            title,
            poster,
            slug,
            _type
          }`),
          client.fetch<Content[]>(`*[_type == "dizi"] | order(releaseDate desc) {
            _id,
            title,
            poster,
            slug,
            _type
          }`),
        ]);
        setFilms(filmData);
        setDiziler(diziData);
      } catch (error) {
        console.error('İçerik yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <ContentRow id="filmler" title="Filmler" items={films} />
      <ContentRow id="diziler" title="Diziler" items={diziler} />

      {films.length === 0 && diziler.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Henüz içerik eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}

