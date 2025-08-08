"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

type Question = {
  id: string;
  text: string;
  options: { answer: string; next: string }[];
};

const questions: Record<string, Question> = {
  castillo: {
    id: "castillo",
    text: 'Mi amor, te llevo a un majestuoso castillo encantado, donde los vitrales brillan bajo la luz de la luna y el aire susurra nuestro destino. Con una sonrisa, te digo: "Mi principessita, esta noche es nuestra." ¿A dónde te guío en esta aventura mágica?',
    options: [
      {
        answer:
          "💃 Al gran salón de baile, donde te invitaré a danzar bajo candelabros de cristal.",
        next: "baile",
      },
      {
        answer:
          "🌹 A los jardines encantados, para caminar entre flores que brillan con nuestro amor.",
        next: "jardines",
      },
    ],
  },
  bosque: {
    id: "bosque",
    text: "Te guío a un bosque místico, mi reina, donde los árboles susurran secretos antiguos y las luciérnagas danzan a nuestro alrededor. Te tomo de la mano. ¿Qué sendero elijo para nuestra aventura?",
    options: [
      {
        answer:
          "✨ Seguir el sendero de luciérnagas, confiando en que nos llevará a un lugar mágico.",
        next: "luciernagas",
      },
      {
        answer:
          "🌊 Buscar un lago encantado, cuyas aguas reflejan nuestro amor eterno.",
        next: "lago",
      },
    ],
  },
  estrella: {
    id: "estrella",
    text: "Bajo un cielo estrellado en una colina mágica, mi amor, te miro a los ojos mientras las estrellas parecen bendecirnos. ¿Qué hago para hacer esta noche inolvidable?",
    options: [
      {
        answer:
          "🌌 Acostarnos en la hierba suave, contemplando las estrellas que narran nuestro amor.",
        next: "estrellas",
      },
      {
        answer: "🔥 Encender una hoguera mágica, cuyo calor nos unirá aún más.",
        next: "hoguera",
      },
    ],
  },
  torre: {
    id: "torre",
    text: "Te llevo a lo alto de una torre antigua, mi damisela, donde el viento canta nuestro amor. La luna ilumina nuestro destino. ¿Qué elijo para nosotros en esta noche mágica?",
    options: [
      {
        answer:
          "📜 Abrir un libro antiguo, para descubrir secretos que sellen nuestro amor.",
        next: "libro",
      },
      {
        answer:
          "🌬️ Asomarnos al balcón, donde el viento llevará mis palabras de amor al reino.",
        next: "balcon",
      },
    ],
  },
  rio: {
    id: "rio",
    text: "Te guío a un río cristalino, mi vida, donde las aguas cantan una melodía para nosotros. La luna refleja nuestro amor. ¿Qué aventura elijo para ti, mi amor?",
    options: [
      {
        answer:
          "🚤 Subir a un bote mágico, para navegar juntos hacia un destino encantado.",
        next: "bote",
      },
      {
        answer:
          "🌸 Caminar por la orilla, donde las flores brillan bajo nuestro amor.",
        next: "orilla",
      },
    ],
  },
  cueva: {
    id: "cueva",
    text: "Te llevo a una cueva iluminada por cristales mágicos, mi reina, donde cada destello refleja tu belleza. ¿Qué hago en este santuario de nuestro amor?",
    options: [
      {
        answer:
          "🔮 Explorar los cristales, buscando el secreto de nuestro destino juntos.",
        next: "cristales",
      },
      {
        answer:
          "🕯️ Encender una vela mágica, cuya llama iluminará nuestro camino.",
        next: "vela",
      },
    ],
  },
  jardin: {
    id: "jardin",
    text: "Te guío a un jardín secreto, mi principessita, donde las flores luminosas cantan nuestro amor  mientras la fragancia nos envuelve. ¿Qué elijo para hacer esta noche eterna?",
    options: [
      {
        answer:
          "🌷 Recoger una flor mágica, para ofrecértela como símbolo de mi amor.",
        next: "flor",
      },
      {
        answer:
          "🦋 Seguir a una mariposa encantada, que nos llevará a un destino mágico.",
        next: "mariposa",
      },
    ],
  },

  // Etapa 2
  baile: {
    id: "baile",
    text: "En el salón de baile, mi amor, los candelabros dorados iluminan nuestro camino. Te tomo de la cintura. La música nos envuelve en un hechizo. ¿Qué elijo para nuestro momento mágico?",
    options: [
      {
        answer:
          "💃 Invitarte a un vals apasionado, guiándote en cada giro con mi amor.",
        next: "vals",
      },
      {
        answer:
          "🍷 Ofrecerte un elixir mágico, cuyo sabor sellará nuestro amor eterno.",
        next: "elixir",
      },
    ],
  },
  jardines: {
    id: "jardines",
    text: "En los jardines encantados, mi reina, las flores brillan bajo la luna, reflejando tu belleza. ¿Qué hago para hacer este momento inolvidable?",
    options: [
      {
        answer:
          "🌹 Regalarte una rosa encantada, cuyo perfume llevará mi amor eterno.",
        next: "rosa",
      },
      {
        answer:
          "🌙 Sentarnos bajo la luna, donde mis palabras de amor te envolverán.",
        next: "luna",
      },
    ],
  },
  luciernagas: {
    id: "luciernagas",
    text: "Las luciérnagas iluminan un sendero mágico, mi amor. Tu mano en la mía hace latir mi corazón. ¿Qué elijo para nuestra aventura?",
    options: [
      {
        answer:
          "✨ Guiarte por el sendero de luciérnagas, hacia un destino lleno de magia.",
        next: "luz",
      },
      {
        answer:
          "🦋 Capturar una luciérnaga suavemente, como un símbolo de nuestro amor.",
        next: "captura",
      },
    ],
  },
  lago: {
    id: "lago",
    text: "El lago encantado refleja las estrellas, mi principessita. Tu sonrisa ilumina la noche. ¿Qué elijo para nuestro refugio de amor?",
    options: [
      {
        answer:
          "🌊 Invitarte a nadar en las aguas cristalinas, donde nuestro amor se fundirá.",
        next: "nadar",
      },
      {
        answer:
          "🪷 Tocar un loto mágico que flota en el agua, pidiendo un deseo para nosotros.",
        next: "loto",
      },
    ],
  },
  estrellas: {
    id: "estrellas",
    text: "Bajo las estrellas, mi reina, te abrazo suavemente. La brisa acaricia nuestra piel. ¿Qué hago para hacer esta noche eterna?",
    options: [
      {
        answer:
          "🌠 Pedir un deseo a una estrella fugaz, sellando nuestro amor en el cosmos.",
        next: "deseo",
      },
      {
        answer:
          "🌌 Contarte una historia, tejiendo nuestro amor en cada palabra.",
        next: "historia",
      },
    ],
  },
  hoguera: {
    id: "hoguera",
    text: "La hoguera mágica crepita, mi amor. Su calor nos une mientras te sostengo cerca. ¿Qué elijo para este momento íntimo?",
    options: [
      {
        answer:
          "🔥 Acercarte aún más al calor de la hoguera, dejando que nuestro amor arda.",
        next: "calor",
      },
      {
        answer:
          "🪄 Lanzar un hechizo juntos, invocando la magia de nuestro amor.",
        next: "hechizo",
      },
    ],
  },
  libro: {
    id: "libro",
    text: "El libro antiguo revela secretos de amor, mi principessa. Sus páginas vibran con nuestro destino. ¿Qué elijo para nosotros?",
    options: [
      {
        answer:
          "📖 Leer un hechizo de amor, para unir nuestros corazones eternamente.",
        next: "hechizo_amor",
      },
      {
        answer:
          "🗝️ Buscar una llave oculta, que abrirá un nuevo capítulo de nuestro amor.",
        next: "llave",
      },
    ],
  },
  balcon: {
    id: "balcon",
    text: "Desde el balcón de la torre, mi amor, te abrazo. La luna ilumina nuestro futuro. ¿Qué elijo para este momento eterno?",
    options: [
      {
        answer:
          "🌬️ Susurrar un juramento de amor, dejando que el viento lo lleve al cielo.",
        next: "juramento",
      },
      {
        answer:
          "🌟 Mirar las estrellas, buscando la promesa de nuestro amor eterno.",
        next: "deseo",
      },
    ],
  },
  bote: {
    id: "bote",
    text: "En el bote mágico, mi reina, te sostengo mientras el río refleja la luna. ¿Qué elijo para nuestro viaje?",
    options: [
      {
        answer:
          "🚤 Remar hacia una isla encantada, donde nuestro amor florecerá.",
        next: "isla",
      },
      {
        answer:
          "🌜 Mirar la luna reflejada, dejando que su luz selle nuestro amor.",
        next: "luna",
      },
    ],
  },
  orilla: {
    id: "orilla",
    text: "Caminamos por la orilla del río, mi amor, donde las conchas brillan como tu sonrisa. ¿Qué elijo para este momento mágico?",
    options: [
      {
        answer:
          "🐚 Recoger una concha brillante, como un regalo para mi amor eterno.",
        next: "concha",
      },
      {
        answer:
          "🌊 Caminar descalzos por la orilla, sintiendo nuestro amor en cada paso.",
        next: "nadar",
      },
    ],
  },
  cristales: {
    id: "cristales",
    text: "En la cueva de cristales, mi principessa. Los destellos reflejan nuestro amor. ¿Qué elijo para nosotros?",
    options: [
      {
        answer:
          "🔮 Tocar un cristal reluciente, buscando el secreto de nuestro destino.",
        next: "cristal",
      },
      {
        answer:
          "🕯️ Buscar un altar escondido, para sellar nuestro amor con un voto.",
        next: "altar",
      },
    ],
  },
  vela: {
    id: "vela",
    text: "La vela mágica ilumina nuestro camino, mi amor. Tu cercanía enciende mi corazón. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "🕯️ Seguir la luz de la vela, guiándote hacia un lugar de magia.",
        next: "luz",
      },
      {
        answer:
          "🔥 Hacer un deseo al calor de la llama, sellando nuestro amor eterno.",
        next: "deseo",
      },
    ],
  },
  flor: {
    id: "flor",
    text: 'Te ofrezco una flor mágica, mi principessita, diciendo: "Amor de mi vida, esta flor es para ti." Su luz pulsa con nuestro amor. ¿Qué elijo para este momento?',
    options: [
      {
        answer:
          "🌷 Regalarte la flor con un juramento, sellando nuestro amor eterno.",
        next: "rosa",
      },
      {
        answer: "🪄 Usar su magia en un hechizo, para unirnos para siempre.",
        next: "hechizo",
      },
    ],
  },
  mariposa: {
    id: "mariposa",
    text: "La mariposa encantada nos guía a un claro, mi reina. Tu sonrisa ilumina la noche. ¿Qué elijo para nuestro destino?",
    options: [
      {
        answer:
          "🦋 Seguir a la mariposa, hacia un lugar lleno de promesas mágicas.",
        next: "claro",
      },
      {
        answer:
          "🌸 Quedarnos en el claro, donde nuestro amor florece eternamente.",
        next: "luna",
      },
    ],
  },

  // Etapa 3
  vals: {
    id: "vals",
    text: "Te guío en un vals apasionado, mi amor, cada giro une nuestros corazones. Pero un hechizo susurra en el aire. ¿Qué elijo para proteger nuestro amor?",
    options: [
      {
        answer:
          "💖 Acercarte aún más, dejando que mi amor disipe cualquier magia oscura.",
        next: "acercar",
      },
      {
        answer:
          "🪄 Invocar un hechizo propio, tejiendo nuestra pasión en un escudo.",
        next: "magia",
      },
    ],
  },
  elixir: {
    id: "elixir",
    text: "Te ofrezco una copa de elixir mágico, mi principessa. Mientras su aroma promete unirnos. ¿Qué elijo para nuestro amor eterno?",
    options: [
      {
        answer:
          "🍷 Beber juntos del elixir, sellando nuestro amor con cada sorbo.",
        next: "beber",
      },
      {
        answer:
          "🌟 Derramar el elixir bajo las estrellas, consagrando nuestro amor.",
        next: "deseo",
      },
    ],
  },
  rosa: {
    id: "rosa",
    text: "Te regalo una rosa encantada. Su perfume envuelve nuestros corazones. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💋 Besarte bajo la magia de la rosa, sellando nuestro amor eterno.",
        next: "final-romantico",
      },
      {
        answer:
          "🌹 Guardar la rosa como un tesoro, un símbolo de nuestro amor.",
        next: "guardar",
      },
    ],
  },
  luna: {
    id: "luna",
    text: "Bajo la luna llena, mi amor, te abrazo. Su luz bendice nuestro amor. ¿Qué elijo para este momento eterno?",
    options: [
      {
        answer: "🌜 Jurar nuestro amor eterno, con la luna como testigo.",
        next: "juramento",
      },
      {
        answer: "💃 Invitarte a danzar bajo su brillo, guiándote con mi amor.",
        next: "danza",
      },
    ],
  },
  luz: {
    id: "luz",
    text: "Las luciérnagas nos guían a un claro mágico, mi principessa. ¿Qué elijo para nuestro santuario de amor?",
    options: [
      {
        answer:
          "✨ Abrazarte bajo la luz, dejando que nuestro amor ilumine la noche.",
        next: "abrazo",
      },
      {
        answer:
          "🪄 Seguir la magia del claro, guiándote hacia un destino eterno.",
        next: "magia",
      },
    ],
  },
  captura: {
    id: "captura",
    text: "Capturo una luciérnaga para ti, mi reina. Su brillo ilumina tu rostro. ¿Qué elijo con este tesoro?",
    options: [
      {
        answer:
          "🦋 Liberarla con un deseo, dejando que nuestro amor vuele al cielo.",
        next: "deseo",
      },
      {
        answer:
          "✨ Guardarla en un frasco encantado, como un recuerdo de nuestra noche.",
        next: "frasco",
      },
    ],
  },
  nadar: {
    id: "nadar",
    text: 'Te guío en las aguas cristalinas del lago, mi amor. Nuestro amor fluye como este lago." Nuestras risas resuenan bajo la luna. ¿Qué elijo ahora?',
    options: [
      {
        answer:
          "🌊 Besarte en el agua, sellando nuestro amor con la magia del lago.",
        next: "final-romantico",
      },
      {
        answer:
          "🪷 Buscar un tesoro escondido, una promesa de aventuras juntos.",
        next: "tesoro",
      },
    ],
  },
  loto: {
    id: "loto",
    text: "Toco un loto mágico para ti. Su brillo pulsa con nuestro amor. ¿Qué elijo para nuestro destino?",
    options: [
      {
        answer:
          "🪷 Tocar el loto juntos, dejando que su magia fluya entre nosotros.",
        next: "toque",
      },
      {
        answer: "🌙 Hacer un deseo bajo la luna, confiando en nuestro amor.",
        next: "deseo",
      },
    ],
  },
  deseo: {
    id: "deseo",
    text: "Bajo las estrellas, mi amor, te abrazo. La luna escucha nuestras palabras. ¿Qué deseo elijo para nosotros?",
    options: [
      {
        answer: "🌟 Pedir un amor eterno, que brille más allá del tiempo.",
        next: "amor_eterno",
      },
      {
        answer:
          "🪄 Pedir una aventura sin fin, donde nuestro amor conquiste todo.",
        next: "aventura",
      },
    ],
  },
  historia: {
    id: "historia",
    text: "Te cuento una historia, mi reina. Cada palabra resuena bajo las estrellas. ¿Qué elijo para nuestro capítulo?",
    options: [
      {
        answer:
          "📜 Escribirla juntos en el cielo, con las estrellas como nuestro lienzo.",
        next: "escribir",
      },
      {
        answer: "💋 Sellarlo con un beso apasionado, uniendo nuestras almas.",
        next: "final-romantico",
      },
    ],
  },
  calor: {
    id: "calor",
    text: "Te acerco a la hoguera mágica, mi amor. Su calor nos envuelve. ¿Qué elijo para este momento íntimo?",
    options: [
      {
        answer:
          "🔥 Acercarte aún más, dejando que nuestro amor consuma la noche.",
        next: "acercar",
      },
      {
        answer: "🌟 Susurrar un deseo al fuego, confiando en su magia.",
        next: "deseo",
      },
    ],
  },
  hechizo: {
    id: "hechizo",
    text: 'Invoco un hechizo para nosotros, mi principessa, diciendo: "Nuestro amor es magia." Un susurro oscuro nos advierte. ¿Qué elijo con este poder?',
    options: [
      {
        answer:
          "🪄 Lanzarlo con nuestro amor, confiando en que nos unirá eternamente.",
        next: "lanzar",
      },
      {
        answer: "🌑 Arriesgarme a explorar su poder, aunque sea desconocido.",
        next: "riesgo",
      },
    ],
  },
  hechizo_amor: {
    id: "hechizo_amor",
    text: "El hechizo de amor nos une. Nuestros corazones laten como uno. ¿Qué elijo con esta magia?",
    options: [
      {
        answer: "💖 Entregarnos al hechizo, dejando que nos una para siempre.",
        next: "entrega",
      },
      {
        answer:
          "📜 Escribir su magia en un pergamino, para que nuestro amor sea eterno.",
        next: "escribir",
      },
    ],
  },
  llave: {
    id: "llave",
    text: "Encuentro una llave mágica. Su brillo promete un destino eterno. ¿Qué elijo con ella?",
    options: [
      {
        answer:
          "🗝️ Usarla para abrir un cofre encantado, lleno de tesoros de amor.",
        next: "cofre",
      },
      {
        answer: "🌟 Guardarla como un símbolo de nuestro amor eterno.",
        next: "guardar",
      },
    ],
  },
  juramento: {
    id: "juramento",
    text: 'Te hago un juramento, mi amor, diciendo: "Mi damisela, eres mi todo." La luna escucha nuestro voto. ¿Qué elijo para sellar esta promesa?',
    options: [
      {
        answer:
          "💍 Sellarlo con un anillo mágico, un lazo eterno para nosotros.",
        next: "anillo",
      },
      {
        answer:
          "🌬️ Dejar que el viento lo lleve al cielo, confiando en su magia.",
        next: "volar",
      },
    ],
  },
  isla: {
    id: "isla",
    text: "Te llevo a una isla encantada. Las flores brillan a nuestro alrededor. ¿Qué elijo para nuestra aventura?",
    options: [
      {
        answer:
          "🏝️ Explorar la isla juntos, buscando un nuevo capítulo de amor.",
        next: "explorar",
      },
      {
        answer:
          "🌜 Descansar bajo la luna, dejando que su luz bendiga nuestro amor.",
        next: "luna",
      },
    ],
  },
  concha: {
    id: "concha",
    text: "Te ofrezco una concha brillante. El río canta para nosotros. ¿Qué elijo con este regalo?",
    options: [
      {
        answer:
          "🐚 Escuchar su secreto, para que revele nuestro destino de amor.",
        next: "secreto",
      },
      {
        answer:
          "🌊 Guardarla como un tesoro, un recuerdo de nuestra noche mágica.",
        next: "guardar",
      },
    ],
  },
  cristal: {
    id: "cristal",
    text: "Toco un cristal reluciente, La cueva vibra con nuestro amor. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "🔮 Tocar el cristal juntos, dejando que revele nuestro destino.",
        next: "toque",
      },
      {
        answer:
          "✨ Hacer un deseo, confiando en que el cristal lo hará realidad.",
        next: "deseo",
      },
    ],
  },
  altar: {
    id: "altar",
    text: "Encuentro un altar mágico. Tu mirada confirma nuestro destino. ¿Qué elijo en este momento sagrado?",
    options: [
      {
        answer:
          "🕯️ Hacer un voto solemne ante el altar, sellando nuestro amor eterno.",
        next: "juramento",
      },
      {
        answer: "🌑 Arriesgar un hechizo poderoso, aunque sea desconocido.",
        next: "riesgo",
      },
    ],
  },
  claro: {
    id: "claro",
    text: "Te guío al claro mágico. Las flores brillan con nuestro amor. ¿Qué elijo para este santuario?",
    options: [
      {
        answer:
          "🌸 Invitarte a danzar entre las flores, dejando que nuestro amor florezca.",
        next: "danza",
      },
      {
        answer: "🦋 Hacer un deseo, confiando en la magia del claro.",
        next: "deseo",
      },
    ],
  },

  // Etapa 4
  acercar: {
    id: "acercar",
    text: "Te abrazo con fuerza. Nuestro amor disipa cualquier magia oscura. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💋 Besarte apasionadamente, dejando que nuestro amor consuma la noche.",
        next: "final-romantico",
      },
      {
        answer: "💖 Abrazarte aún más, haciendo que el mundo sea solo nuestro.",
        next: "abrazo",
      },
    ],
  },
  magia: {
    id: "magia",
    text: 'Invoco una magia poderosa, mi principessa, diciendo: "Nuestro amor es el hechizo más fuerte." Un susurro oscuro nos advierte. ¿Qué elijo con este poder?',
    options: [
      {
        answer:
          "🪄 Entregarnos al hechizo, confiando en que nos unirá eternamente.",
        next: "entrega",
      },
      {
        answer: "🌑 Arriesgarme a explorar su poder, aunque sea peligroso.",
        next: "riesgo",
      },
    ],
  },
  beber: {
    id: "beber",
    text: "Bebemos del elixir mágico. Su sabor nos une eternamente. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💖 Jurar nuestro amor eterno, sellando nuestro destino con un voto.",
        next: "juramento",
      },
      {
        answer:
          "💃 Invitarte a danzar, dejando que el elixir guíe nuestros pasos.",
        next: "danza",
      },
    ],
  },
  guardar: {
    id: "guardar",
    text: "Guardo nuestro tesoro con amor. Tu sonrisa ilumina la noche. ¿Qué elijo para nuestro amor?",
    options: [
      {
        answer:
          "💍 Hacer un voto con un anillo mágico, sellando nuestro amor eterno.",
        next: "anillo",
      },
      {
        answer:
          "🌟 Hacer un deseo, confiando en que nuestro tesoro lo hará realidad.",
        next: "deseo",
      },
    ],
  },
  danza: {
    id: "danza",
    text: "Te invito a danzar, mi reina. Cada movimiento une nuestras almas. ¿Qué elijo para este momento mágico?",
    options: [
      {
        answer:
          "💃 Seguir bailando bajo la luna, dejando que nuestro amor sea la melodía.",
        next: "baile_final",
      },
      {
        answer: "💋 Besarte en medio del baile, sellando nuestro amor eterno.",
        next: "final-romantico",
      },
    ],
  },
  abrazo: {
    id: "abrazo",
    text: "Te abrazo con todo mi corazón, mi amor. Nuestro abrazo es nuestro refugio. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💖 Jurar amor eterno, haciendo de nuestro abrazo un voto eterno.",
        next: "amor_eterno",
      },
      {
        answer:
          "🌟 Hacer un deseo, confiando en que nuestro amor lo hará realidad.",
        next: "deseo",
      },
    ],
  },
  frasco: {
    id: "frasco",
    text: "Guardo la luciérnaga en un frasco encantado. Su brillo ilumina tu rostro. ¿Qué elijo ahora?",
    options: [
      {
        answer: "✨ Liberar la luz, dejando que nuestro amor ilumine el mundo.",
        next: "luz_final",
      },
      {
        answer: "🌑 Guardarla, arriesgándome a lo que la magia pueda traer.",
        next: "riesgo",
      },
    ],
  },
  tesoro: {
    id: "tesoro",
    text: "Encuentro un tesoro mágico. Tu mano en la mía es mi verdadero tesoro. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "🏝️ Quedarnos con el tesoro, construyendo un reino donde nuestro amor reine.",
        next: "final-reino",
      },
      {
        answer:
          "🌟 Hacer un deseo, confiando en que el tesoro lo hará realidad.",
        next: "deseo",
      },
    ],
  },
  toque: {
    id: "toque",
    text: "Toco el cristal contigo. Su magia nos une. ¿Qué elijo para nuestro destino?",
    options: [
      {
        answer:
          "💖 Entregarnos al amor, dejando que la magia nos una para siempre.",
        next: "entrega",
      },
      {
        answer:
          "🪄 Invocar un hechizo final, sellando nuestro destino con su poder.",
        next: "hechizo_final",
      },
    ],
  },
  amor_eterno: {
    id: "amor_eterno",
    text: "Te abrazo bajo las estrellas. Somos uno solo en este momento. ¿Qué elijo para nuestra eternidad?",
    options: [
      {
        answer: "💍 Sellarlo con un anillo mágico, un voto de amor eterno.",
        next: "anillo",
      },
      {
        answer: "🌟 Pedir un deseo final, confiando en nuestro amor.",
        next: "final-deseo",
      },
    ],
  },
  aventura: {
    id: "aventura",
    text: "Te guío en una aventura épica. Tu valentía es mi fuerza. ¿Qué elijo para nuestro viaje?",
    options: [
      {
        answer:
          "🎡 Conquistar un reino juntos, haciendo de nuestro amor una leyenda.",
        next: "final-reino",
      },
      {
        answer:
          "🌟 Seguir explorando, confiando en que nuestro amor nos guiará.",
        next: "explorar",
      },
    ],
  },
  escribir: {
    id: "escribir",
    text: "Escribo nuestro amor en las estrellas. Cada palabra resuena en el cosmos. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "📜 Terminar el poema, dejando que nuestro amor sea un canto eterno.",
        next: "final-poetico",
      },
      {
        answer:
          "💋 Besarte apasionadamente, sellando nuestro amor con un beso.",
        next: "final-romantico",
      },
    ],
  },
  entrega: {
    id: "entrega",
    text: "Me entrego a nuestro amor. Cada latido nos une más. ¿Qué elijo para nuestro destino?",
    options: [
      {
        answer: "💖 Jurar amor eterno, sellando nuestro destino con un voto.",
        next: "amor_eterno",
      },
      {
        answer:
          "💃 Invitarte a danzar, dejando que nuestro amor sea la melodía.",
        next: "final-danza",
      },
    ],
  },
  cofre: {
    id: "cofre",
    text: "Abro un cofre encantado. Un anillo brilla dentro. ¿Qué elijo para nuestro amor?",
    options: [
      {
        answer:
          "💍 Ponerte el anillo, sellando nuestro amor con un voto eterno.",
        next: "anillo",
      },
      {
        answer: "🌟 Guardarlo como un símbolo de nuestro amor inmortal.",
        next: "guardar",
      },
    ],
  },
  anillo: {
    id: "anillo",
    text: "Te coloco un anillo mágico. La luna aprueba nuestro voto. ¿Qué elijo para nuestra eternidad?",
    options: [
      {
        answer:
          "👑 Coronarnos como reyes de un reino donde nuestro amor reine.",
        next: "final-reino",
      },
      {
        answer:
          "💖 Jurar amor eterno, sellando nuestro destino con este anillo.",
        next: "final-romantico",
      },
    ],
  },
  volar: {
    id: "volar",
    text: "Dejo que nuestro juramento vuele al cielo. Las estrellas nos bendicen. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "🌟 Seguir nuestro juramento con un deseo, confiando en su magia.",
        next: "final-deseo",
      },
      {
        answer:
          "🌑 Perdernos en la magia del viento, arriesgándome a lo desconocido.",
        next: "final-perdido",
      },
    ],
  },
  explorar: {
    id: "explorar",
    text: "Te guío por un reino mágico. Cada paso nos une más. ¿Qué elijo para nuestro destino?",
    options: [
      {
        answer:
          "🎡 Conquistar el reino juntos, haciendo de nuestro amor una leyenda.",
        next: "final-aventura",
      },
      {
        answer:
          "🏝️ Quedarnos en este reino, construyendo un hogar donde nuestro amor reine.",
        next: "final-reino",
      },
    ],
  },
  secreto: {
    id: "secreto",
    text: "Escucho el secreto de la concha. Su susurro revela nuestro destino. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💖 Creer en el secreto, dejando que nos guíe a un amor eterno.",
        next: "final-romantico",
      },
      {
        answer: "🌑 Dudar del susurro, arriesgándome a perdernos en la magia.",
        next: "final-tragico",
      },
    ],
  },
  lanzar: {
    id: "lanzar",
    text: "Lanzo el hechizo con nuestro amor. Un eco oscuro nos advierte. ¿Qué elijo con este poder?",
    options: [
      {
        answer:
          "✨ Completar el hechizo, dejando que nuestro amor ilumine el mundo.",
        next: "final-luz",
      },
      {
        answer: "🌑 Arriesgarme a explorar su poder, aunque sea desconocido.",
        next: "final-perdido",
      },
    ],
  },
  riesgo: {
    id: "riesgo",
    text: "Enfrento la magia oscura. Tu mano en la mía es mi fuerza. ¿Qué elijo en esta encrucijada?",
    options: [
      {
        answer: "🌑 Arriesgarme a explorar la magia, aunque pueda consumirnos.",
        next: "final-perdido",
      },
      {
        answer: "💖 Confiar en nuestro amor, dejando que disipe las sombras.",
        next: "final-romantico",
      },
    ],
  },
  baile_final: {
    id: "baile_final",
    text: "Te guío en una danza eterna. La luna es testigo de nuestro amor. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💃 Seguir bailando bajo la luna, dejando que nuestro amor sea la melodía.",
        next: "final-danza",
      },
      {
        answer: "💋 Besarte en medio del baile, sellando nuestro amor eterno.",
        next: "final-romantico",
      },
    ],
  },
  luz_final: {
    id: "luz_final",
    text: "La luz de nuestro amor brilla. Tu sonrisa ilumina la noche. ¿Qué elijo para nuestra eternidad?",
    options: [
      {
        answer:
          "✨ Entregarnos a la luz, dejando que nuestro amor ilumine el mundo.",
        next: "final-luz",
      },
      {
        answer: "🌟 Hacer un deseo final, confiando en nuestro amor.",
        next: "final-deseo",
      },
    ],
  },
  hechizo_final: {
    id: "hechizo_final",
    text: "Invoco un hechizo final, mi reina. Un susurro oscuro nos advierte. ¿Qué elijo ahora?",
    options: [
      {
        answer:
          "💖 Completar el hechizo, dejando que nuestro amor sea su fuerza.",
        next: "final-romantico",
      },
      {
        answer: "🌑 Arriesgarme a explorar su poder, aunque sea desconocido.",
        next: "final-tragico",
      },
    ],
  },
};

export default function GamePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GameContent />
    </Suspense>
  );
}

function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startId = searchParams.get("start") || "castillo";
  const [current, setCurrent] = useState<Question>(questions[startId]);

  useEffect(() => {
    if (!questions[startId]) {
      setCurrent(questions.castillo); // Fallback
    }
  }, [startId]);

  const handleAnswer = (next: string) => {
    if (next.startsWith("final-")) {
      router.push(`/final/${next}`);
    } else {
      setCurrent(questions[next]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-100 to-red-300 p-6">
      <h1 className="text-2xl text-center font-bold mb-4 text-pink-700">
        {current.text}
      </h1>
      <div className="flex flex-col gap-3">
        {current.options.map((opt, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleAnswer(opt.next)}
            className="bg-white border border-pink-300 px-4 py-2 rounded-lg shadow hover:bg-pink-50 cursor-pointer transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {opt.answer}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
