import { motion } from 'framer-motion';

export default function XpBar({ current, max, level, showLabel = true }) {
  const percent = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-300">
            {level.emoji} {level.nombre}
          </span>
          <span className="text-sm text-zinc-500 font-mono">{current}/{max} XP</span>
        </div>
      )}
      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-forge-600 via-forge-500 to-gold-500 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}