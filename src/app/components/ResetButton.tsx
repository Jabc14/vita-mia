"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ResetButton() {
  const router = useRouter();

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("visitedFinals") || "[]");
    const currentId = window.location.pathname.split("/").pop();
    if (currentId && !visited.includes(currentId)) {
      localStorage.setItem(
        "visitedFinals",
        JSON.stringify([...visited, currentId])
      );
    }
  }, []);

  const visitedCount = JSON.parse(
    localStorage.getItem("visitedFinals") || "[]"
  ).length;

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <p className="text-white text-sm">
        Has descubierto {visitedCount} de 10 finales
      </p>
      <motion.button
        onClick={() => router.push("/start")}
        className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Puedes comenzar una nueva historia, preciosa
      </motion.button>
    </div>
  );
}
