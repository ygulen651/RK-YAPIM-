import { client } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/lib/image';
import VideoPlayer from '@/components/VideoPlayer';

interface PageProps {
  params: {
    type: string;
    slug: string;
  };
}

async function getContent(type: string, slug: string) {
  const content = await client.fetch(
    `*[_type == $type && slug.current == $slug][0] {
      _id,
      title,
      poster,
      description,
      releaseDate,
      genre,
      trailer,
      videos
    }`,
    { type, slug }
  );

  return content;
}

export default async function ContentPage({ params }: PageProps) {
  const content = await getContent(params.type, params.slug);

  if (!content) {
    notFound();
  }

  const imageUrl = content.poster ? urlFor(content.poster).width(800).height(1200).url() : '';

  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={content.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
          {content.genre && (
            <div className="flex flex-wrap gap-2 mb-4">
              {content.genre.map((g: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {content.description && (
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {content.description}
            </p>
          )}

          {content.trailer && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Fragman</h2>
              <VideoPlayer url={content.trailer} />
            </section>
          )}

          {content.videos && content.videos.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Videolar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.videos.map((video: any, idx: number) => (
                  <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden">
                    <VideoPlayer url={video.url} />
                    {video.title && (
                      <div className="p-4">
                        <h3 className="text-white font-semibold">{video.title}</h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

