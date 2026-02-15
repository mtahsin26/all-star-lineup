'use client';

import { useState, useMemo } from 'react';
import { getPlayers } from '@/lib/getPlayers';
import PlayerCard from './PlayerCard';

const POS_FILTERS = ['ALL', 'G', 'F', 'C'];
const CONF_FILTERS = [
  { label: 'ALL',     value: 'ALL' },
  { label: 'East',    value: 'Eastern' },
  { label: 'West',    value: 'Western' },
];

export default function FindPlayers({ lineup, onAdd, selectedYear }) {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('ALL');
  const [confFilter, setConfFilter] = useState('ALL');

  const { players, year, meta } = useMemo(() => getPlayers(selectedYear), [selectedYear]);

  const lineupNames = new Set(lineup.map(p => p.name));

  const filtered = players.filter(p => {
    const matchPos  = posFilter  === 'ALL' || p.position  === posFilter;
    const matchConf = confFilter === 'ALL' || p.conference === confFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchPos && matchConf && matchSearch;
  });

  function reset() {
    setSearch('');
    setPosFilter('ALL');
    setConfFilter('ALL');
  }

  return (
    <div className="bg-brand-panel border border-brand-border rounded-xl flex flex-col" style={{ maxHeight: '660px' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-brand-border flex-shrink-0">
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-300">Find Players</h2>
          <p className="text-xs text-brand-orange mt-0.5">{year} All-Stars · {meta.location}</p>
        </div>
        <button
          onClick={reset}
          className="text-xs text-gray-500 hover:text-brand-orange font-semibold tracking-wider uppercase transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 flex-shrink-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-brand-card border border-brand-border rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      {/* Position filter pills */}
      <div className="px-4 pb-2 flex-shrink-0">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1.5">Position</p>
        <div className="flex gap-2">
          {POS_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setPosFilter(f)}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors
                ${posFilter === f
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-card border border-brand-border text-gray-400 hover:text-white'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Conference filter pills */}
      <div className="px-4 pb-3 flex-shrink-0">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1.5">Conference</p>
        <div className="flex gap-2">
          {CONF_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setConfFilter(f.value)}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors
                ${confFilter === f.value
                  ? f.value === 'Eastern'
                    ? 'bg-blue-600 text-white'
                    : f.value === 'Western'
                    ? 'bg-red-600 text-white'
                    : 'bg-brand-orange text-white'
                  : 'bg-brand-card border border-brand-border text-gray-400 hover:text-white'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Player list */}
      <div className="overflow-y-auto flex-1 px-2 pb-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8">No players found</p>
        ) : (
          filtered.map(player => (
            <PlayerCard
              key={player.name}
              player={player}
              onAdd={onAdd}
              inLineup={lineupNames.has(player.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}
