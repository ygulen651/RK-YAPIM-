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
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer"
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={content.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
              <span>Resim Yok</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="mt-3">
          <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-yellow-400 transition-colors">
            {content.title}
          </h3>
          <span className="text-sm text-gray-400 capitalize">{content._type}</span>
        </div>
      </motion.div>
    </Link>
  );
}

