import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  const daftarFitur = [
    {
      id: "huruf",
      gambar: "/images/Huruf.png",
      judul: "Huruf",
      deskripsi:
        "Belajar huruf A-Z dengan suara pelafalan yang jelas dan ilustrasi menarik. Anak dapat mengenali huruf sambil mendengar dan menirukan bunyinya.",
    },
    {
      id: "suku-kata",
      gambar: "/images/SukuKata.png",
      judul: "Suku Kata",
      deskripsi:
        "Belajar membaca suku kata dengan cara menyenangkan. Anak mendengar huruf dan menyusun suku kata untuk memahami dasar membaca lebih cepat.",
    },
    {
      id: "kata",
      gambar: "/images/Kata.png",
      judul: "Kata",
      deskripsi:
        "Belajar membaca kata dengan huruf, gambar, dan audio. Anak dapat mengenali kata sambil melihat visual dan mendengar cara pengucapannya.",
    },
  ];

  const daftarKartuTentang = [
    {
      id: "visi",
      judul: "Visi Kami",
      deskripsi:
        "ABC Fun Land adalah platform game edukasi yang dirancang untuk membantu anak belajar membaca dengan metode yang menyenangkan, interaktif, dan mudah dipahami.",
    },
    {
      id: "metode",
      judul: "Metode Digital Edutainment",
      deskripsi:
        "Aplikasi ini berfokus pada konsep Digital Edutainment, yaitu menggabungkan pembelajaran dengan unsur hiburan agar proses belajar terasa seperti bermain.",
    },
    {
      id: "efektif",
      judul: "Efektif & Ramah Anak",
      deskripsi:
        "Dengan visual yang menarik, audio pelafalan yang jelas, serta mini kuis pendukung, kami menciptakan pengalaman belajar membaca yang efektif dan ramah anak.",
    },
  ];

  const daftarFounder = Array(4).fill({
    gambar: "/images/Profile.png",
    nama: "Nama Founder",
    peran: "Role Founder",
    deskripsi:
      "Bertanggung jawab dalam pengembangan konten edukasi dan desain interaktif.",
  });

  const daftarKontak = [
    {
     id: "telepon",
     gambar: "/images/Whatsapp.png",
     judul: "Telepon/WhatsApp",
     deskripsi:
       "Jika membutuhkan respon cepat, hubungi kami melalui telepon atau WhatsApp.",
     detail: "(+62) 812-3456-7890",
     href: "https://wa.me/6281995377860",
   },
   {
    id: "email",
    gambar: "/images/Gmail.png",
    judul: "Email",
    deskripsi: "Untuk pertanyaan umum, kerja sama, atau dukungan teknis.",
    detail: "ABCFunLand@edu.ac.id",
    href: "mailto:ABCFunLand@edu.ac.id",
   },
   {
     id: "alamat",
     gambar: "/images/Alamat.png",
     judul: "Alamat",
     deskripsi: "Kunjungi kantor kami untuk konsultasi langsung.",
     detail:
       "Jl. Raya Kampus Udayana, Jimbaran, Kec. Kuta Sel., Kabupaten Badung, Bali",
     href: "https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Kampus+Udayana+Jimbaran+Bali",
   },
  ];
  const daftarTestimoni = [
    {
      id: 1,
      nama: "Sarah Johnson",
      peran: "Ibu dari Andi (5 tahun)",
      testimoni:
        "Anak saya yang tadinya malas belajar membaca, sekarang justru minta diajak belajar tiap hari! Metode pembelajarannya sangat menarik.",
      bintang: 5, // Tambahkan properti bintang
    },
    {
      id: 2,
      nama: "Budi Santoso",
      peran: "Ayah dari Maya (6 tahun)",
      testimoni:
        "Platform yang sangat membantu untuk pembelajaran awal anak saya. Metode belajarnya menyenangkan dan tidak membosankan.",
      bintang: 5, // Tambahkan properti bintang
    },
    {
      id: 3,
      nama: "Lisa Wijaya",
      peran: "Guru TK Mutiara",
      testimoni:
        "Saya rekomendasikan aplikasi ini untuk semua orang tua. Visualnya menarik, suara jelas, dan anak-anak sangat antusias.",
      bintang: 5, // Tambahkan properti bintang
    },
  ];

  return (
    <main className="font-normal">
      {/* Hero Section */}
      <section id="beranda" className="pt-20 lg:pt-28 pb-10 lg:pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          {/* Text Content - Sebelah Kiri */}
          <div className="grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
            <div className="lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold lg:font-extrabold leading-snug md:leading-tight lg:leading-snug normal-case">
                Belajar Huruf, Suku Kata, dan Kata
                <br className="hidden sm:block" />
                <span className="text-blue-600">
                  {" "}
                  dengan Suara dan Kuis Seru!
                </span>
              </h1>

              <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                Platform edukasi yang membantu anak belajar huruf, suku kata,
                dan kata dengan cara yang seru dan mudah dipahami. Kami
                mendampingi anak belajar membaca dari nol melalui tampilan huruf
                yang menarik, suara otomatis yang berulang, dan kuis interaktif
                yang melatih pengenalan huruf hingga kata.
              </p>

              <div className="mt-6 sm:mt-7 lg:mt-8">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <Button
                    variant="primaryAccent"
                    size="default"
                    asChild
                    className="normal-case text-sm sm:text-base px-5 sm:px-6 py-3 w-full sm:w-auto"
                  >
                    <Link href="/learn" className="text-center w-full">
                      Mulai Belajar Gratis
                    </Link>
                  </Button>

                  <Button
                    variant="secondaryAccent"
                    size="default"
                    asChild
                    className="normal-case text-sm sm:text-base px-5 sm:px-6 py-3 w-full sm:w-auto"
                  >
                    <a href="#fitur" className="text-center w-full">
                      Lihat Fitur
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Gambar - Sebelah Kanan */}
            <div className="lg:order-2 mt-8 sm:mt-10 lg:mt-0">
              <div className="relative w-full">
                <div className="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[6/4]">
                  <div className="relative w-full h-[400px]">
                    <Image
                      src="/images/KidsLearning.png"
                      alt="Kids Learning"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-12 lg:py-20 bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 normal-case">
              Fitur
            </h2>
            <p className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto">
              Aplikasi belajar membaca yang dirancang khusus untuk anak dengan
              tampilan ramah anak dan interaktif, sehingga proses belajar terasa
              menyenangkan seperti bermain.
            </p>
          </div>

          <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {daftarFitur.map((fitur) => (
              <div
                key={fitur.id}
                className="bg-white p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24">
                    <Image
                      src={fitur.gambar}
                      alt={fitur.judul}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-center mb-4 normal-case">
                  {fitur.judul}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 text-center leading-relaxed">
                  {fitur.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-12 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8 lg:mb-12 normal-case">
            Tentang Kami
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {daftarKartuTentang.map((kartu) => (
              <div
                key={kartu.id}
                className="bg-blue-40 p-6 lg:p-8 bg-gray-50 rounded-2xl shadow-md border-2 border-blue-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-blue-600 mb-4 normal-case text-center">
                  {kartu.judul}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed text-center">
                  {kartu.deskripsi}
                </p>
              </div>
            ))}
          </div>
          {/* Founder Section */}
          <div className="mt-16 lg:mt-20">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-8 lg:mb-12 normal-case">
              Founder
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {daftarFounder.map((founder, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-24 lg:w-28 lg:h-28">
                      <Image
                        src={founder.gambar}
                        alt={`Founder ${index + 1}`}
                        fill
                        sizes="112px"
                        className="object-cover rounded-full border-4 border-white"
                      />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-1 normal-case">
                    {founder.nama}
                  </h4>
                  <p className="text-sm text-blue-600 text-center font-medium normal-case mb-2">
                    {founder.peran}
                  </p>
                  {/* Deskripsi Founder */}
                  <p className="text-sm text-gray-600 text-center leading-relaxed mt-1 flex-grow mb-3">
                    {founder.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-12 lg:py-20 bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 normal-case">
              Hubungi Kami
            </h2>
            <p className="text-sm lg:text-base max-w-3xl mx-auto">
              Butuh bantuan atau punya pertanyaan? Tim kami siap membantu kapan
              saja. Silakan hubungi kami melalui kontak berikut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {daftarKontak.map((kontak) => (
              <div
                key={kontak.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="relative w-8 h-8 lg:w-9 lg:h-9">
                      <div className="relative w-8 h-8 lg:w-9 lg:h-9">
                        <Image
                          src={kontak.gambar}
                          alt={kontak.judul}
                          fill
                          sizes="36px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 text-center mb-3 normal-case">
                  {kontak.judul}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 text-center mb-4">
                  {kontak.deskripsi}
                </p>
                <p className="text-sm lg:text-base font-semibold text-center bg-gray-200 py-3 px-4 rounded-lg normal-case">
                  {kontak.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Testimoni */}
      <section id="testimoni" className="py-12 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 normal-case">
              Testimoni
            </h2>
            <p className="text-sm lg:text-base text-gray-600 max-w-3xl mx-auto">
              Apa kata orang tua dan guru tentang pengalaman mereka menggunakan
              ABC Fun Land
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {daftarTestimoni.map((testimoni) => (
              <div
                key={testimoni.id}
                className="bg-white p-6 lg:p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Informasi pengguna */}
                <div>
                  <div className="flex items-center">
                    {/* Avatar/icon placeholder */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {testimoni.peran.includes("Ibu") ? (
                          <span className="text-blue-600"></span>
                        ) : testimoni.peran.includes("Ayah") ? (
                          <span className="text-blue-600"></span>
                        ) : (
                          <span className="text-blue-600"></span>
                        )}
                      </div>
                    </div>

                    {/* Info detail */}
                    <div className="flex-grow mb-4">
                      <p className="font-semibold text-gray-900 text-sm lg:text-base">
                        {testimoni.nama}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">
                        {testimoni.peran}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Bintang rating */}
                <div className="flex justify-center mb-4 border-t pt-4">
                  {Array.from({ length: testimoni.bintang }).map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-lg lg:text-xl"
                    >
                      ★
                    </span>
                  ))}
                </div>
                {/* Kutipan testimoni */}
                <div className="flex-grow mb-6">
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 text-3xl text-blue-300">
                      "
                    </span>
                    <p className="text-sm lg:text-base text-gray-600 italic leading-relaxed pl-4">
                      {testimoni.testimoni}
                    </p>
                    <span className="absolute -bottom-2 -right-2 text-3xl text-blue-300">
                      "
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
