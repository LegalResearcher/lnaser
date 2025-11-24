import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingWhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "967772762090";
  const whatsappMessage = encodeURIComponent("مرحباً، أود الاستفسار عن الخدمات القانونية");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 left-6 z-50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white px-4 py-2 rounded-full shadow-elegant"
            >
              <p className="text-sm font-bold text-primary whitespace-nowrap">
                تواصل عبر الواتساب
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-elegant hover:shadow-card-hover transition-smooth"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="تواصل عبر واتساب"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-9 h-9"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.002 0C7.164 0 0 7.164 0 16c0 2.83.738 5.597 2.145 8.045L.738 30.268l6.486-1.357A15.926 15.926 0 0016.002 32C24.838 32 32 24.836 32 16S24.838 0 16.002 0zm9.426 22.67c-.392 1.105-2.318 2.027-3.187 2.162-.873.136-1.6.393-5.402-.934-4.875-1.702-8.006-6.61-8.247-6.918-.24-.308-1.969-2.619-1.969-4.996 0-2.378 1.247-3.546 1.688-4.027.441-.48.964-.6 1.287-.6.323 0 .647.003.93.016.299.014.7-.114 1.095.836.403 1.082 1.37 3.345 1.49 3.589.12.244.2.529.04.837-.16.308-.24.5-.48.771-.24.271-.505.606-.722.813-.24.234-.49.487-.21.954.279.467 1.243 2.05 2.67 3.323 1.838 1.638 3.385 2.148 3.866 2.391.481.244.764.203 1.044-.122.28-.324 1.203-1.405 1.524-1.885.321-.481.642-.401 1.083-.24.441.16 2.798 1.32 3.279 1.56.48.241.8.36.92.56.12.201.12 1.162-.272 2.267z"/>
          </svg>
        </motion.a>
      </div>

      {/* Pulse animation ring */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 bg-[#25D366] rounded-full -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default FloatingWhatsAppButton;
