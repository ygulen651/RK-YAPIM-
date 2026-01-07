'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/image';

interface ContentCardProps {
  content: {
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
  };
}

export default function ContentCard({ content }: ContentCardProps) {
  const imageUrl = content.poster ? urlFor(content.poster).width(400).height(600).url() : '';

  return (
    <Link href={`/${content._type}/${content.slug.current}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 ring-0 hover:ring-2 ring-red-600/50"
      >
        <div className="relative aspect-[2/3] bg-gray-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={content.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
              <span className="text-xs uppercase tracking-widest">Afiş Yok</span>
            </div>
          )}
          
          {/* Gradient Overlay - Hover'da görünür */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* İçerik Bilgileri - Hover'da yukarı kayar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-md">
              {content.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-red-500 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wider">
                {content._type}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

