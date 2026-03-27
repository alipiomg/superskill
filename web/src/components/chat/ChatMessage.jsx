import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'ahora';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

function renderMarkdown(text) {
  if (!text) return null;
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={key++} className="font-semibold">{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      parts.push(
        <Link key={key++} to={match[4]} className="text-forge-400 hover:text-forge-300 underline underline-offset-2">
          {match[3]}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

export default function ChatMessage({ message, onChipClick }) {
  const [hovered, setHovered] = useState(false);
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-forge-500/15 flex items-center justify-center shrink-0 mt-1 text-sm">
          <span aria-hidden="true">&#x1F525;</span>
        </div>
      )}

      <div className={`max-w-[80%] relative`}>
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-zinc-800 text-zinc-100 rounded-2xl rounded-br-sm'
              : 'bg-forge-500/10 border border-forge-500/20 text-zinc-200 rounded-2xl rounded-bl-sm'
          }`}
        >
          {renderMarkdown(message.text)}
        </div>

        {message.links && message.links.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-forge-500/10 text-forge-400 border border-forge-500/20 hover:bg-forge-500/20 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {message.chips && message.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => onChipClick?.(chip)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-forge-500/40 hover:text-forge-400 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {hovered && message.timestamp && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute -bottom-5 text-[10px] text-zinc-600 ${isUser ? 'right-0' : 'left-0'}`}
          >
            {formatRelativeTime(message.timestamp)}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
