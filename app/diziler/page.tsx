import ContentCard from '@/components/ContentCard';
import { client } from '@/lib/sanity';

// 60 saniyede bir veriyi yenile (ISR)
export const revalidate = 60;

async function getDiziler() {
  try {
    return await client.fetch(`*[_type == "dizi"] | order(releaseDate desc) {
      _id,
      title,
      poster,
      slug,
      _type
    }`);
  } catch (error) {
    console.error('Diziler yüklenirken hata:', error);
    return [];
  }
}

export default async function DizilerPage() {
  const diziler = await getDiziler();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Diziler</h1>
      
      {diziler.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {diziler.map((dizi: any) => (
            <div key={dizi._id} className="transition-transform hover:scale-105 duration-300">
              <ContentCard content={dizi} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Henüz dizi eklenmemiş.</p>
        </div>
      )}
    </main>
  );
}
