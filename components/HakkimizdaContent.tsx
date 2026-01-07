'use client';

import { motion } from "framer-motion";

export default function HakkimizdaContent() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-black to-gray-950 text-white">
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Hakkımızda
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
        >
          RK Yapım; sinema, dizi, belgesel ve dijital içerik alanlarında yaratıcı, özgün ve etkileyici
          projeler üreten modern bir yapım şirketidir. İzleyiciye sadece hikâye değil, unutulmaz bir
          deneyim sunmayı hedefliyoruz.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-3">Vizyonumuz</h2>
            <p className="text-sm text-gray-300">
              Yerel hikâyeleri evrensel bir dil ile buluşturarak, ulusal ve uluslararası arenada
              güçlü yapımlara imza atmak.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-3">Misyonumuz</h2>
            <p className="text-sm text-gray-300">
              Yapım sürecinin her aşamasında kalite, disiplin ve yaratıcılığı merkeze alarak,
              markalar ve izleyiciler için kalıcı değer üretmek.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-3">Neler Yapıyoruz?</h2>
            <p className="text-sm text-gray-300">
              Dizi & film projeleri, tanıtım filmleri, klip çekimleri, sosyal medya içerikleri ve
              markalara özel yaratıcı video prodüksiyon çözümleri.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-red-600/80 to-red-500/80 rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-3">Birlikte Çalışalım</h2>
          <p className="text-sm md:text-base text-white/90 mb-4">
            Yeni bir proje fikriniz, markanız için video ihtiyacınız ya da hayata geçirmek istediğiniz
            bir hikâyeniz mi var? RK Yapım ekibi olarak kreatif süreçten çekim ve post prodüksiyona
            kadar yanınızdayız.
          </p>
          <p className="text-sm text-white/80">
            İletişim bilgilerinizi daha sonra ekleyebiliriz (e-posta, telefon, sosyal medya linkleri).
          </p>
        </motion.div>
      </section>
    </main>
  );
}


