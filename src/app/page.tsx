"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import flower from "../../public/flower.jpg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-200 p-6">
      <motion.h1
        className="text-3xl font-bold text-pink-700 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌸 Encuentra el camino
      </motion.h1>

      <motion.p
        className="mb-6 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Preciosa, hay un mensaje oculto que debes agregar a la barra de
        direcciones de tu navegador.
        <br />
        Ejemplo:{" "}
        <span className="bg-white px-2 py-1 rounded">/mensaje-secreto</span>
      </motion.p>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <Image
          src={flower}
          alt="Flor con pista"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
}
