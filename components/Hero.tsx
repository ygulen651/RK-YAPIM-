'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface HeroProps {
  videoUrls?: string[];
  title?: string;
  subtitle?: string;
}

export default function Hero({ videoUrls, title, subtitle }: HeroProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());

  // Videoları yükle ve oynat
  useEffect(() => {
    if (!videoUrls || videoUrls.length === 0) return;

    let isMounted = true;

    const playVideo = async () => {
      // Önce tüm videoları durdur
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Kısa bir gecikme (DOM güncellemesi için)
      await new Promise((resolve) => setTimeout(resolve, 50));

      if (!isMounted) return;

      // Mevcut videoyu oynat
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo && videoUrls[currentVideoIndex]) {
        currentVideo.currentTime = 0;
        setIsVideoLoaded(false);
        
        try {
          const playPromise = currentVideo.play();
          if (playPromise !== undefined) {
            await playPromise;
            if (isMounted) {
              console.log(`▶️ Video ${currentVideoIndex} oynatılıyor`);
            }
          }
        } catch (error) {
          // AbortError normal bir durum (video geçişi sırasında olabilir)
          if (error instanceof Error && error.name === 'AbortError') {
            // Sessizce devam et
          } else {
            console.error('❌ Video oynatma hatası:', error);
          }
        }
      }
    };

    playVideo();

    return () => {
      isMounted = false;
    };
  }, [videoUrls, currentVideoIndex]);

  // Her video için ended event listener ekle
  useEffect(() => {
    if (!videoUrls || videoUrls.length <= 1) return;

    const currentVideo = videoRefs.current[currentVideoIndex];
    if (!currentVideo) return;

    let timeoutId: NodeJS.Timeout;

    const handleVideoEnd = () => {
      console.log(`🎬 Video ${currentVideoIndex} bitti, bir sonrakine geçiliyor...`);
      setIsVideoLoaded(false);
      
      // Kısa bir gecikme ile geçiş yap (daha yumuşak geçiş için)
      timeoutId = setTimeout(() => {
        const nextIndex = (currentVideoIndex + 1) % videoUrls.length;
        console.log(`➡️ Geçiş yapılıyor: ${currentVideoIndex} -> ${nextIndex}`);
        setCurrentVideoIndex(nextIndex);
      }, 300);
    };

    currentVideo.addEventListener('ended', handleVideoEnd);
    
    return () => {
      currentVideo.removeEventListener('ended', handleVideoEnd);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentVideoIndex, videoUrls]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Arka Plan */}
      {videoUrls && videoUrls.length > 0 ? (
        <>
          {videoUrls.map((url, index) => (
            <video
              key={`${url}-${index}`}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={url}
              loop={false}
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideoIndex && isVideoLoaded
                  ? 'opacity-100 z-0'
                  : 'opacity-0 z-[-1] pointer-events-none'
              }`}
              onLoadedData={() => {
                console.log(`✅ Video ${index} yüklendi:`, url);
                setLoadedVideos(prev => new Set(prev).add(index));
                if (index === currentVideoIndex) {
                  setIsVideoLoaded(true);
                }
              }}
              onPlay={() => {
                if (index === currentVideoIndex) {
                  setIsVideoLoaded(true);
                }
              }}
              onError={(e) => {
                console.error(`❌ Video ${index} yükleme hatası:`, e);
              }}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          ))}
          {/* Fallback görsel - video yüklenene kadar */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-30 z-[-2]" />
          )}
          {/* Video sayacı (opsiyonel - debug için) */}
          {videoUrls.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
              {videoUrls.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentVideoIndex
                      ? 'w-8 bg-yellow-400'
                      : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920')] bg-cover bg-center opacity-30" />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
      
      {/* İçerik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-4"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {title || 'Film & Dizi Yapımcısı'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          {subtitle || 'Modern sinema ve dizi dünyasının en iyi içeriklerini keşfedin'}
        </p>
      </motion.div>
    </section>
  );
}

