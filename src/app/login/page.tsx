"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const correctPassword = "CORAZONLIRICO"; // Aquí va la clave correcta

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === correctPassword) {
      router.push("/game");
    } else {
      setError("💡 Pista: Revisa el anagrama otra vez...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-200 p-6">
      <h1 className="text-3xl font-bold mb-4 text-pink-700">
        💌 Acceso al regalo
      </h1>
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
