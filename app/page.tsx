import Hero from "@/components/Hero";
import ContentGrid from "@/components/ContentGrid";
import { client } from "@/lib/sanity";

export const revalidate = 0;

async function getSiteSettings() {
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0] {
        heroTitle,
        heroSubtitle,
        heroVideos[] {
          video {
            asset-> {
              _id,
              url,
              originalFilename,
              mimeType
            }
          },
          videoUrl
        },
        // Geriye dönük uyumluluk
        heroVideoUrl,
        heroVideo {
          asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      }`
    );
    
    console.log('🔍 Site Settings:', JSON.stringify(settings, null, 2));
    return settings;
  } catch (error) {
    console.error('❌ Site settings çekme hatası:', error);
    return null;
  }
}

export default async function Home() {
  const settings = await getSiteSettings();
  
  // Birden fazla video URL'ini topla
  const videoUrls: string[] = [];
  
  // Yeni heroVideos array'inden videoları al
  if (settings?.heroVideos && Array.isArray(settings.heroVideos)) {
    settings.heroVideos.forEach((item: any) => {
      if (item.videoUrl) {
        videoUrls.push(item.videoUrl);
      } else if (item.video?.asset?.url) {
        videoUrls.push(item.video.asset.url);
      }
    });
  }
  
  // Geriye dönük uyumluluk - eski tek video
  if (videoUrls.length === 0) {
    if (settings?.heroVideoUrl) {
      videoUrls.push(settings.heroVideoUrl);
    } else if (settings?.heroVideo?.asset?.url) {
      videoUrls.push(settings.heroVideo.asset.url);
    }
  }
  
  // Fallback: Environment variable
  if (videoUrls.length === 0 && process.env.NEXT_PUBLIC_HERO_VIDEO_URL) {
    videoUrls.push(process.env.NEXT_PUBLIC_HERO_VIDEO_URL);
  }

  return (
    <main className="min-h-screen">
      <Hero 
        videoUrls={videoUrls.length > 0 ? videoUrls : undefined}
        title={settings?.heroTitle || 'Film & Dizi Yapımcısı'}
        subtitle={settings?.heroSubtitle || 'Modern sinema ve dizi dünyasının en iyi içeriklerini keşfedin'}
      />
      <ContentGrid />
    </main>
  );
}

