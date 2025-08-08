"use client";

import ResetButton from "@/app/components/ResetButton";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const finales: Record<string, string> = {
  "final-romantico":
    '💖 Bajo un cielo cuajado de estrellas que parecen susurrar nuestro destino, te tomo entre mis brazos, mi reina, sintiendo tu calidez contra mi pecho. "Maite zaitut per sempre, mi amor, eres mi todo", declaro con firmeza, mientras mis labios buscan los tuyos en un beso que detiene el tiempo. La luna nos envuelve con su luz plateada, y juro protegerte eternamente, mi principessita, en un amor que ningún hechizo puede romper.',
  "final-poetico":
    '📜 En un rincón secreto del castillo, encuentro un libro antiguo que parece esperar nuestra historia. Te miro, mi doncella, y con un susurro apasionado digo: "Maite zaitut, vita mia, escribamos nuestro amor para la eternidad." Juntos, tejemos versos que resuenan como un canto al universo, cada palabra sellada con la promesa de mi corazón. Las estrellas llevan nuestro poema al cielo, y nuestro amor vivirá para siempre, amor de mi vida.',
  "final-aventura":
    '🎡 Tras enfrentar mil peligros, llegamos al corazón de un reino mágico, mi vida. Te tomo de la mano con fuerza, jurando: "Mi muñequita, maite zaitut, y juntos conquistaremos el mundo." Nuestra valentía enciende el horizonte, y mientras te abrazo bajo un cielo dorado, prometo que nuestro amor será una leyenda que resonará por generaciones, un lazo más fuerte que cualquier dragón, mi trébol de 4 hojas.',
  "final-dulce":
    '🍬 En un claro encantado, rodeados de flores que brillan como gemas, te ofrezco un caramelo mágico, mi damisela, diciendo: "Maite zaitut per sempre, mi principessa, cada instante contigo es un sueño." Tu risa ilumina mi mundo mientras te abrazo con ternura, y en este edén, cada caricia es un hechizo que nos une. Eres mi razón de amar, y este momento dulce será nuestro para siempre.',
  "final-deseo":
    '🌟 Bajo un cielo donde las estrellas danzan para nosotros, te miro a los ojos, mi amor, y digo: "Maite zaitut, amor mio, eres la mujer de mis sueños." Tomo tu mano y pido un deseo que une nuestras almas, la magia del momento nos envuelve como un manto. Nuestro amor se convierte en una constelación eterna, un faro que brillará por siempre, mi vida.',
  "final-danza":
    '💃 Frente a la luna llena, te invito a danzar, mi principessita, tomando tus manos con decisión. "Maite zaitut per sempre, muñequita de porcelana", susurro mientras nuestros cuerpos se entrelazan en una danza que desafía el tiempo. Cada paso es un juramento, cada giro una caricia que enciende mi alma. Nuestro amor es la melodía que resonará eternamente, mi reina.',
  "final-reino":
    '👑 En un palacio de cristal, te corono como mi reina, mi amor, diciendo: "Maite zaitut, mi doncella, y nuestro amor reinará para siempre." Tomo tu mano con firmeza, y juntos juramos proteger este reino donde nuestro amor es la ley. Tu sonrisa brilla más que cualquier corona, y mientras te abrazo, sé que eres mi vida, mi todo, en un cuento de hadas sin fin.',
  "final-luz":
    '✨ La luz de nuestra pasión ilumina la noche, mi trébol de 4 hojas. Te abrazo con fuerza, susurrando: "Maite zaitut, mi principessa, eres mi razón de amar." Cada roce enciende un fuego eterno, y en este claro mágico, nuestro amor se convierte en una estrella que guiará a los amantes por siglos. Beso tus labios con devoción, sellando un amor sensual y eterno, amor de mi vida.',
  "final-tragico":
    '😢 Un hechizo cruel nos separa, mi amor, pero antes de que la oscuridad nos envuelva, te abrazo con desesperación y digo: "Maite zaitut per sempre, mi damisela, siempre serás mi todo." Mis palabras resuenan mientras el destino nos arranca el uno del otro, pero juro que nuestro amor vivirá en los cuentos, un eco eterno de mi devoción por ti, mi reina, aunque el dolor me quiebre.',
  "final-perdido":
    '🌑 La magia oscura nos envuelve, mi vida, y aunque trato de tomarte entre mis brazos, nuestras manos no se encuentran. "Maite zaitut, mi principessita", grito al abismo, pero el velo de sombras nos separa. Tu risa sigue siendo mi faro, un recuerdo que ni la noche más profunda apagará, mi amor, aunque nuestro destino se pierda en este sueño roto.',
};

export default function FinalPage() {
  const params = useParams();
  const id = params?.id as string;
  const mensaje = finales[id];
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!mensaje) {
    notFound();
  }

  useEffect(() => {
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Error al reproducir sonido:", e));
      }
    };

    playSound();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-red-400 p-6 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">¡Fin!</h1>
      <p className="bg-white p-4 rounded-xl shadow-lg max-w-md">{mensaje}</p>

      <ResetButton />
      <audio ref={audioRef} src="/click.m4a" preload="auto" />
    </div>
  );
}
