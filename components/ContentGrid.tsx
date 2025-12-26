'use client';

import { useEffect, useState } from 'react';
import ContentCard from './ContentCard';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {films.length > 0 && (
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-white">Filmler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {films.map((film) => (
              <ContentCard key={film._id} content={film} />
            ))}
          </div>
        </section>
      )}

      {diziler.length > 0 && (
        <section>
          <h2 className="text-4xl font-bold mb-8 text-white">Diziler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {diziler.map((dizi) => (
              <ContentCard key={dizi._id} content={dizi} />
            ))}
          </div>
        </section>
      )}

      {films.length === 0 && diziler.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Henüz içerik eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}

