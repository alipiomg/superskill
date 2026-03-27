import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function ChatBubble({ onClick, hasUnread }) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
        fixed z-50
        bottom-6 right-6
        max-lg:bottom-20 max-lg:right-4
        w-14 h-14 rounded-full
        bg-gradient-to-br from-forge-500 to-ember-500
        flex items-center justify-center
        shadow-lg hover:shadow-xl hover:shadow-forge-500/40
        transition-shadow cursor-pointer
      "
    >
      <Flame className="w-6 h-6 text-white" />
      {hasUnread && (
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-ember-500 border-2 border-zinc-950 pulse-glow" />
      )}
    </motion.button>
  );
}
