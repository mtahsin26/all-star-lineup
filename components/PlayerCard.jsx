'use client';

import Image from 'next/image';
import { useState } from 'react';

// Deterministic fallback avatar color
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
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function PlayerCard({ player, onAdd, inLineup }) {
  const [imgError, setImgError] = useState(false);

  const isInjured = !!player.status;

  return (
    <button
      onClick={() => !inLineup && onAdd(player)}
      disabled={inLineup}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
        ${inLineup
          ? 'opacity-40 cursor-not-allowed bg-brand-panel'
          : 'hover:bg-brand-card cursor-pointer bg-transparent'
        }`}
    >
      {/* Avatar: real photo if available, initials fallback */}
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        {player.image && !imgError ? (
          <Image
            src={player.image}
            alt={player.name}
            width={120}
            height={120}
            className="rounded-full object-cover w-[120px] h-[120px]"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div
            className="w-[120px] h-[120px] rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: avatarColor(player.name) }}
          >
            {initials(player.name)}
          </div>
        )}
        {/* Conference dot */}
        <span
          className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-brand-panel
            ${player.conference === 'Eastern' ? 'bg-blue-500' : 'bg-red-500'}`}
          title={`${player.conference} Conference`}
        />
      </div>

      {/* Name, team, status */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{player.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {player.team}
          {isInjured && (
            <span className="ml-1 text-yellow-500 font-medium">· Injured</span>
          )}
        </p>
      </div>

      {/* Right side: position pill + jersey number */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-xs font-bold text-brand-orange">#{player.number}</span>
        <span className="text-xs text-gray-500 border border-brand-border rounded px-1">
          {player.position}
        </span>
      </div>
    </button>
  );
}
