import { defineField, defineType } from 'sanity';

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Afiş',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Yayın Tarihi',
      type: 'date',
    }),
    defineField({
      name: 'genre',
      title: 'Tür',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'trailer',
      title: 'Fragman URL',
      type: 'url',
    }),
    defineField({
      name: 'videos',
      title: 'Videolar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Video Başlığı', type: 'string' },
            { name: 'url', title: 'Video URL', type: 'url' },
            { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
    },
  },
});

export const dizi = defineType({
  name: 'dizi',
  title: 'Dizi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Afiş',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Yayın Tarihi',
      type: 'date',
    }),
    defineField({
      name: 'genre',
      title: 'Tür',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'trailer',
      title: 'Fragman URL',
      type: 'url',
    }),
    defineField({
      name: 'videos',
      title: 'Videolar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Video Başlığı', type: 'string' },
            { name: 'url', title: 'Video URL', type: 'url' },
            { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster',
    },
  },
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Başlığı',
      type: 'string',
      initialValue: 'Film & Dizi Yapımcısı',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Site logosu (Navbar\'da gösterilir)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Başlık',
      type: 'string',
      description: 'Ana sayfa Hero bölümündeki büyük başlık',
      initialValue: 'Film & Dizi Yapımcısı',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Alt Başlık',
      type: 'text',
      description: 'Ana sayfa Hero bölümündeki alt başlık/açıklama',
      initialValue: 'Modern sinema ve dizi dünyasının en iyi içeriklerini keşfedin',
    }),
    defineField({
      name: 'heroVideos',
      title: 'Hero Videolar',
      type: 'array',
      description: 'Ana sayfa Hero bölümünde gösterilecek videolar (2-3 video önerilir)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'video',
              title: 'Video Dosyası',
              type: 'file',
              options: {
                accept: 'video/mp4,video/webm,video/ogg',
              },
            },
            {
              name: 'videoUrl',
              title: 'Video URL (Alternatif)',
              type: 'url',
              description: 'Video dosyası yerine URL kullanmak isterseniz (YouTube, Vimeo vb.)',
            },
          ],
          preview: {
            select: {
              title: 'video.asset.originalFilename',
              url: 'videoUrl',
            },
            prepare({ title, url }) {
              return {
                title: title || url || 'Video',
              };
            },
          },
        },
      ],
    }),
    // Geriye dönük uyumluluk için eski alanlar (opsiyonel)
    defineField({
      name: 'heroVideo',
      title: 'Hero Video (Eski - Kullanılmayacak)',
      type: 'file',
      description: 'Lütfen "Hero Videolar" alanını kullanın',
      hidden: true,
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL (Eski - Kullanılmayacak)',
      type: 'url',
      description: 'Lütfen "Hero Videolar" alanını kullanın',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Ayarları',
      };
    },
  },
});

export const schemaTypes = [film, dizi, siteSettings];

