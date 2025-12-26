# Sanity CMS Kurulum Rehberi

## Adım 1: Sanity CLI Kurulumu

Terminal'de şu komutu çalıştırın:
```bash
npm install -g @sanity/cli
```

## Adım 2: Sanity Hesabı Oluşturma

1. [https://sanity.io](https://sanity.io) adresine gidin
2. "Get started for free" butonuna tıklayın
3. GitHub, Google veya email ile giriş yapın

## Adım 3: Yeni Proje Oluşturma

Terminal'de proje klasörünüzde şu komutu çalıştırın:
```bash
sanity init
```

Komut çalıştığında:
1. "Create new project" seçeneğini seçin
2. Proje adını girin (örn: "film-dizi-yapimcisi")
3. Dataset adını seçin (varsayılan: "production" - Enter'a basabilirsiniz)
4. Output path için Enter'a basın (mevcut klasörü kullanır)

## Adım 4: Project ID ve Dataset Bilgilerini Bulma

### Yöntem 1: Sanity Dashboard'dan
1. [https://sanity.io/manage](https://sanity.io/manage) adresine gidin
2. Projenizi seçin
3. "API" sekmesine tıklayın
4. Orada **Project ID** ve **Dataset** bilgilerini göreceksiniz

### Yöntem 2: Terminal'den
```bash
sanity projects list
```

### Yöntem 3: Sanity Studio'dan
Studio'yu açtığınızda, tarayıcı konsolunda (F12) veya URL'de project ID'yi görebilirsiniz.

## Adım 5: .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun ve şu bilgileri ekleyin:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

**Önemli:** `your_project_id_here` yerine gerçek Project ID'nizi yazın!

## Dataset Değeri Hakkında

- Varsayılan dataset adı genellikle **"production"**'dır
- Eğer farklı bir dataset adı kullandıysanız, o adı yazın
- Yeni bir dataset oluşturmak için Sanity Dashboard'dan "Datasets" bölümüne gidebilirsiniz

## Hızlı Başlangıç (Alternatif)

Eğer Sanity CLI ile sorun yaşıyorsanız:

1. [https://sanity.io/manage](https://sanity.io/manage) adresine gidin
2. "Create project" butonuna tıklayın
3. Proje adını girin ve oluşturun
4. Proje oluşturulduktan sonra "API" sekmesinden Project ID'yi kopyalayın
5. `.env.local` dosyasını oluşturup Project ID'yi ekleyin

