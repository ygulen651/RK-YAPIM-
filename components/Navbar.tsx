'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-xl py-2' : 'bg-white/95 py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img
              src="/RK%C3%9C,.png"
              alt="Logo"
              className={`transition-all duration-300 object-contain ${
                scrolled ? 'h-12' : 'h-16'
              }`}
            />
          </Link>
          
          <div className="flex gap-8 items-center">
            <Link
              href="/hakkimda"
              className="text-gray-900 hover:text-red-600 transition-all font-bold text-lg tracking-tight"
            >
              Hakkımızda
            </Link>
            <Link
              href="/diziler"
              className="text-gray-900 hover:text-red-600 transition-all font-bold text-lg tracking-tight"
            >
              Diziler
            </Link>
            <Link
              href="/filmler"
              className="text-gray-900 hover:text-red-600 transition-all font-bold text-lg tracking-tight"
            >
              Filmler
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}