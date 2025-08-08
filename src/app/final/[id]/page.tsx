import { notFound } from "next/navigation";

const finales: Record<string, string> = {
  "final-romantico": "💖 Me miras con ternura y me dices: 'Tú eres mi todo'.",
  "final-poetico":
    "📜 La carta dice: 'Amarte es mi destino, mi camino, mi verdad.'",
  "final-aventura":
    "🎡 Desde lo alto vemos la ciudad, y juras que siempre estarás a mi lado.",
  "final-dulce":
    "🍬 Entre risas y caramelos, siento que no hay lugar más dulce que tus brazos.",
};

export default function FinalPage({ params }: { params: { id: string } }) {
  const mensaje = finales[params.id];
  if (!mensaje) return notFound();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-red-400 p-6 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">¡Final alcanzado!</h1>
      <p className="bg-white p-4 rounded-xl shadow-lg max-w-md">{mensaje}</p>
    </div>
  );
}
