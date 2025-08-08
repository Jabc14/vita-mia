"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InicioPage() {
  const router = useRouter();

  const starts = [
    { id: "castillo", text: "🏰 Un castillo encantado" },
    { id: "bosque", text: "🌲 Un bosque místico" },
    { id: "estrella", text: "🌌 Una colina estrellada" },
    { id: "torre", text: "🗼 Una torre alta" },
    { id: "rio", text: "🌊 Un río cristalino" },
    { id: "cueva", text: "🏔️ Una cueva mágica" },
    { id: "jardin", text: "🌷 Un jardín secreto" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-100 to-red-300 p-6">
      <h1 className="text-3xl font-bold mb-4 text-pink-700 text-center">
        Elige el comienzo de nuestra historia de amor... O tragedia, mi
        muñequita
      </h1>
      <div className="flex flex-col gap-3">
        {starts.map((start) => (
          <motion.button
            key={start.id}
            onClick={() => router.push(`/game?start=${start.id}`)}
            className="bg-white border border-pink-300 px-4 py-2 rounded-lg shadow hover:bg-pink-50 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {start.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
