// app/(brandMarketing)/footer.tsx
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-5 py-10">
        <div className="flex flex-col md:flex-row justify-around items-start">
          {/* Logo dan Sosial Media */}
          <div className="p-5 flex flex-col items-center md:items-start">
            <div className="mb-6 w-40 h-16 relative">
              <Image
                src="/images/Logo.png"
                alt="Logo ABC Fun Learn"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-green-500 transition-colors"
              >
                <Image
                  src="/images/Whatsapp.png"
                  alt="WhatsApp"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <Image
                  src="/images/Gmail.png"
                  alt="Email"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Image
                  src="/images/Alamat.png"
                  alt="Location"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="p-5">
            <p className="text-gray-800 font-bold text-2xl pb-4">Belajar</p>
            <ul className="text-gray-600 space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Huruf</li>
              <li className="hover:text-blue-500 cursor-pointer">Suku Kata</li>
              <li className="hover:text-blue-500 cursor-pointer">Kata</li>
            </ul>
          </div>

          {/* Company */}
          <div className="p-5">
            <p className="text-gray-800 font-bold text-2xl pb-4">Perusahaan</p>
            <ul className="text-gray-600 space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">
                Tentang Kami
              </li>
              <li className="hover:text-blue-500 cursor-pointer">Karir</li>
              <li className="hover:text-blue-500 cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* Support */}
          <div className="p-5">
            <p className="text-gray-800 font-bold text-2xl pb-4">Bantuan</p>
            <ul className="text-gray-600 space-y-2">
              <li className="hover:text-blue-500 cursor-pointer">Kontak</li>
              <li className="hover:text-blue-500 cursor-pointer">FAQ</li>
              <li className="hover:text-blue-500 cursor-pointer">Panduan</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-300 text-center">
          <p className="text-gray-700 text-lg">
            © 2025{" "}
            <span className="font-semibold text-gray-900">ABC Fun Learn</span>.
          </p>
          <p className="text-gray-600 mt-2">
            Belajar Membaca Menjadi Pengalaman yang Menyenangkan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
