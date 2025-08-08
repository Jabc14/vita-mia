"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PistaPage({ params }: { params: { pista: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPista = "rosas"; // la pista que debe adivinar de la imagen
  const correctPassword = "CORAZONLIRICO";

  useEffect(() => {
    if (params.pista.toLowerCase() !== correctPista) {
      router.push("/"); // redirige si la pista no es correcta
    }
  }, [params.pista, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword) {
      router.push("/game");
    } else {
      setError("💡 Pista: Revisa el anagrama otra vez: 'RICO CORAZÓN LI'");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">🔐 Acceso</h1>
      <p className="mb-4 text-center max-w-md">
        Pista: RICO CORAZÓN LI — ¿qué frase romántica oculta este anagrama?
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Escribe la clave..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          Entrar
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
}
