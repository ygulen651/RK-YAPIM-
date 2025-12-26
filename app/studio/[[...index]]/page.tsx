'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '@/sanity/schema';

export default function StudioPage() {
  // Environment variable'ları oku
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7dld0l78';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId || projectId === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Hata: Sanity Project ID Bulunamadı</h1>
          <p className="mb-4 text-gray-300">
            Lütfen <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> dosyasında{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">NEXT_PUBLIC_SANITY_PROJECT_ID</code> değerini ayarlayın.
          </p>
          <div className="bg-gray-900 p-4 rounded mb-4 text-left">
            <p className="text-sm text-gray-400 mb-2">Örnek .env.local dosyası:</p>
            <code className="text-green-400">
              NEXT_PUBLIC_SANITY_PROJECT_ID=7dld0l78<br />
              NEXT_PUBLIC_SANITY_DATASET=production
            </code>
          </div>
          <p className="text-gray-400 text-sm">
            Dosyayı kaydettikten sonra sunucuyu yeniden başlatın (Ctrl+C sonra npm run dev)
          </p>
        </div>
      </div>
    );
  }

  const config = defineConfig({
    name: 'default',
    title: 'Film & Dizi Yapımcısı',
    projectId: projectId,
    dataset: dataset,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  });

  return <NextStudio config={config} />;
}

