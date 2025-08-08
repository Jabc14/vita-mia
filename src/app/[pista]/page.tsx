"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PistaPage() {
  const router = useRouter();
  const params = useParams();

  // Como useParams puede devolver string | string[] | undefined,
  // normalizamos a string simple:
  const pista =
    typeof params?.pista === "string"
      ? params.pista
      : Array.isArray(params?.pista)
      ? params.pista[0]
      : "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPista = "amore-mio";
  const correctPassword = "VITA MIA";

  useEffect(() => {
    // Esperamos hasta que `pista` exista para comprobarla
    if (!pista) return;
    if (pista.toLowerCase() !== correctPista) {
      // replace evita que quede en el historial (mejor UX si es un acceso inválido)
      router.replace("/");
    }
  }, [pista, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword) {
      router.push("/start");
    } else {
      setError("💡 Las letras de arriba ocultan un secreto");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200 p-6">
      <motion.h1
        className="text-3xl font-bold mb-4 text-pink-700"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        🔐
      </motion.h1>

      <motion.p
        className="mb-4 text-center max-w-md"
        animate={{
          scale: [1.2, 1.5, 1.2],
          color: ["#db2777", "#ec4899", "#db2777"], // tonos rosas
          textShadow: [
            "0 0 0px rgba(236, 72, 153, 0)",
            "0 0 8px rgba(236, 72, 153, 0.8)",
            "0 0 0px rgba(236, 72, 153, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: 3,
          ease: "easeInOut",
        }}
      >
        IMAIATV
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Escribe la palabra secreta..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <motion.button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded cursor-pointer"
          whileHover={{ scale: 1.05, backgroundColor: "#db2777" }} // pink-600 hex approx
          transition={{ type: "spring", stiffness: 300 }}
        >
          Explorar
        </motion.button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </motion.form>
    </div>
  );
}
