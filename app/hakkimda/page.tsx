'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HakkimdaPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
            alt="Film Seti"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/80 to-neutral-900" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-red-600 mb-6"
          >
            RK YAPIM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            "Rahmi Kukul tarafından İstanbul’da kurulan, sinemanın kalbine yolculuk."
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-24">
        
        {/* Vizyon & Tecrübe */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-3xl font-bold text-red-500">15 Yıllık Tecrübe, Yeni Bir Soluk</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              15 yıllık iş tecrübesi sonrası, yeni RK Film ve Yapım markamıza yeni bir soluk getirdik. 
              Geride bıraktığımız 15 yıldan fazla sürede sahip olduğumuz yurtiçi ve yurtdışı prodüksiyon tecrübesi, 
              dinamik çalışanlarımız ve kendini her zaman yenileyen vizyonumuzla geleceğe odaklıyız.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative h-80 rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20">
             <Image
                src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop"
                alt="Kamera Arkası"
                fill
                className="object-cover"
             />
          </motion.div>
        </motion.section>

        {/* Faaliyet Alanları */}
        <section className="bg-neutral-800/50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Neler Yapıyoruz?</h2>
            <p className="text-gray-400">Ulusal ve uluslararası projelerde imzamız var.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {['Sinema Filmi', 'TV Dizi', 'Reklam & Tanıtım', 'Belgesel'].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-neutral-900 rounded-xl hover:bg-red-900/20 transition-colors border border-neutral-800"
              >
                <span className="text-xl font-semibold text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prensiplerimiz */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
          <p className="text-2xl font-light italic text-gray-200">
            "Bütçe ve koşulları ayırt etmeksizin bütün işlerimize profesyonellikle eğiliyoruz."
          </p>
          <p className="text-gray-400 leading-relaxed">
            Müşteri memnuniyetini ön planda tutan çalışma prensibimiz, her projeyi kendi içinde değerlendirmeye 
            ve müşterinin ihtiyaçlarını en doğru şekilde karşılamaya iter. Müşterilerimizle kurduğumuz sıkı bağlar 
            bu prensibin en doğal sonucudur.
          </p>
        </motion.section>

        {/* Kapanış Mesajı */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-neutral-800"
        >
          <p className="text-xl text-gray-300 mb-6">
            Attığımız bu adımda yeni dostluklar kurmanın heyecanı ile...
          </p>
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-8">
            "Gülümseyerek ve gururla anımsayabileceğimiz işler ortaya koymak, var olma hedefimizin en büyüğüdür."
          </h3>
          <p className="text-red-500 font-bold tracking-widest uppercase">
            Önümüzdeki nice 15 senelerde beraber çalışmak dileğiyle!
          </p>
        </motion.section>

      </div>
    </main>
  );
}
