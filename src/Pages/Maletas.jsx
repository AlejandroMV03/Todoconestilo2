import { motion } from "framer-motion";
import { Wand2, Clock, Sparkles } from "lucide-react";

export default function Maletas() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-pink-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-7xl mb-4"
      >
        <Sparkles className="w-16 h-16 text-pink-600" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-4xl font-playfair font-bold"
      >
        Esta sección está en proceso de magia ✨
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-4 text-lg text-pink-700 max-w-md"
      >
        Muy pronto podrás disfrutar de nuestros productos en esta categoría.
        ¡Gracias por tu paciencia y tu estilo! 💖
      </motion.p>

      <motion.div
        className="mt-8 flex space-x-4 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Wand2 className="text-pink-400 w-6 h-6 animate-pulse" />

        {/* Ícono con tooltip */}
        <div className="relative group inline-block cursor-pointer">
          <Clock className="text-pink-400 w-6 h-6 animate-spin-slow" />
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-pink-800 px-3 py-1 text-white text-xs opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap z-10">
            Esta área estará disponible el 20 de junio 2025
          </div>
        </div>
      </motion.div>
    </div>
  );
}
