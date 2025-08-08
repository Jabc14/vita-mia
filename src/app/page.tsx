import Image from "next/image";
import flower from "../../public/flower.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-200 p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">
        🌸 Encuentra el camino
      </h1>
      <p className="mb-6 text-center max-w-md">
        Observa bien... cada pétalo guarda una letra. Júntalas para encontrar la
        palabra mágica y escribe esa palabra al final de la URL para continuar.
        <br />
        Ejemplo: <span className="bg-white px-2 py-1 rounded">/TUPALABRA</span>
      </p>
      <Image
        src={flower}
        alt="Flor con pista"
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
