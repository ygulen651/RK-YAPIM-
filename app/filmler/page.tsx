import ContentCard from '@/components/ContentCard';
import { client } from '@/lib/sanity';

// 60 saniyede bir veriyi yenile (ISR)
export const revalidate = 60;

async function getFilms() {
  try {
    return await client.fetch(`*[_type == "film"] | order(releaseDate desc) {
      _id,
      title,
      poster,
      slug,
      _type
    }`);
  } catch (error) {
    console.error('Filmler yüklenirken hata:', error);
    return [];
  }
}

export default async function FilmlerPage() {
  const films = await getFilms();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Filmler</h1>
      
      {films.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {films.map((film: any) => (
            <div key={film._id} className="transition-transform hover:scale-105 duration-300">
              <ContentCard content={film} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">Henüz film eklenmemiş.</p>
        </div>
      )}
    </main>
  );
}
