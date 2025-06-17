'use client';

import { motion } from 'framer-motion';
import CryptoDetails from '@/src/components/CryptoDetails';
import CurrentWeather from '@/src/components/CurrentWeather';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Crypto Weather Nexus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CryptoDetails />
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CurrentWeather />
        </motion.div>
      </div>
    </main>
  );
}
