"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResetButton() {
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
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
