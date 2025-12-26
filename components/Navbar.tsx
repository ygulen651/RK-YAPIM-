'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between h-16" style={{ overflow: 'visible' }}>
          <Link href="/" style={{ overflow: 'visible', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/RK%C3%9C,.png"
              alt="Logo"
              style={{ 
                maxHeight: '48px',
                height: 'auto',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
                flexShrink: 0,
                margin: 0,
                padding: 0,
                verticalAlign: 'middle'
              }}
            />
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/studio"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Studio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

