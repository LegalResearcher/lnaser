import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
          <MessageCircle className="w-8 h-8 text-white" fill="white" />
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
