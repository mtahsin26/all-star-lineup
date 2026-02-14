'use client';

import Image from 'next/image';
import { useState } from 'react';

const AVATAR_COLORS = [
  '#6366F1', '#EC4899', '#14B8A6', '#F59E0B',
  '#8B5CF6', '#10B981', '#3B82F6', '#EF4444',
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name) {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function LineupSlot({ index, player, onRemove }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!player) {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg border border-dashed border-brand-border bg-brand-panel/40">
        <div className="w-[60px] h-[60px] rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-xl font-light">+</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500">Empty Slot</p>
          <p className="text-xs text-gray-600">Click a player to add</p>
        </div>
        <span className="ml-auto text-xs text-gray-700 font-bold">#{index + 1}</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg border border-brand-border bg-brand-card relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <div className="relative w-[60px] h-[60px] flex-shrink-0">
        {player.image && !imgError ? (
          <Image
            src={player.image}
            alt={player.name}
            width={60}
            height={60}
            className="rounded-full object-cover w-[60px] h-[60px]"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: avatarColor(player.name) }}
          >
            {initials(player.name)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white truncate">{player.name}</p>
          <span className="text-sm text-gray-400 border border-brand-border rounded px-2 py-0.5 flex-shrink-0 leading-none">
            {player.position}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate">{player.team}</p>
      </div>

      {/* Remove button — visible on hover */}
      <button
        onClick={() => onRemove(player.name)}
        className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-bold flex items-center justify-center transition-opacity
          ${hovered ? 'opacity-100' : 'opacity-0'}`}
        title="Remove player"
      >
        ×
      </button>
    </div>
  );
}
