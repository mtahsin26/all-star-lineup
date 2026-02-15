'use client';

import { useState, useEffect } from 'react';
import FindPlayers from '@/components/FindPlayers';
import YourLineup from '@/components/YourLineup';
import TeamInfo from '@/components/TeamInfo';

const STORAGE_KEY = 'nba_squad';
const CURRENT_YEAR = 2026;
const LEGACY_YEAR = 2003;

export default function Home() {
  const [lineup, setLineup] = useState([]);
  const [coachName, setCoachName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [legacyMode, setLegacyMode] = useState(false);

  const selectedYear = legacyMode ? LEGACY_YEAR : CURRENT_YEAR;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { lineup: l, coachName: c, teamName: t } = JSON.parse(saved);
        if (l) setLineup(l);
        if (c) setCoachName(c);
        if (t) setTeamName(t);
      }
    } catch (_) {}
    setHydrated(true);
  }, []);

  // Clear lineup when switching modes
  function toggleLegacyMode() {
    setLegacyMode(prev => !prev);
    setLineup([]);
  }

  function addPlayer(player) {
    if (lineup.length >= 5) return alert('Your lineup is full (5/5)');
    if (lineup.some(p => p.name === player.name)) return alert(`${player.name} is already in your lineup`);
    setLineup(prev => [...prev, player]);
  }

  function removePlayer(playerName) {
    setLineup(prev => prev.filter(p => p.name !== playerName));
  }

  function save() {
    if (lineup.length === 0) return alert('Cannot save an empty lineup');
    if (!coachName.trim() || !teamName.trim()) return alert('Enter your name and team name first');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lineup, coachName, teamName }));
    alert('Lineup saved!');
  }

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return alert('No saved lineup found');
      const { lineup: l, coachName: c, teamName: t } = JSON.parse(saved);
      if (l) setLineup(l);
      if (c) setCoachName(c);
      if (t) setTeamName(t);
    } catch (_) {
      alert('Failed to load lineup');
    }
  }

  function clear() {
    setLineup([]);
    setCoachName('');
    setTeamName('');
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!hydrated) return null; // prevent SSR/localStorage mismatch flash

  return (
    <div
      className="min-h-screen bg-brand-dark"
      style={{ backgroundImage: 'url(/images/court2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      {/* Dark overlay over court background */}
      <div className="min-h-screen" style={{ backgroundColor: 'rgba(13,17,23,0.88)' }}>

        {/* Hero heading */}
        <div className="text-center pt-10 pb-6 px-4">
          <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">
            Select 5 players to complete your ultimate lineup
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            Build Your{' '}
            <span className="text-brand-orange">All-Star</span>{' '}
            Team
          </h1>

          {/* Legacy Mode Toggle */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${!legacyMode ? 'text-brand-orange' : 'text-gray-500'}`}>
              {CURRENT_YEAR}
            </span>
            <button
              onClick={toggleLegacyMode}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none border-2 ${
                legacyMode
                  ? 'bg-amber-600 border-amber-500'
                  : 'bg-brand-card border-brand-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  legacyMode ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${legacyMode ? 'text-amber-500' : 'text-gray-500'}`}>
              Legacy Mode
            </span>
          </div>

          {legacyMode && (
            <p className="mt-2 text-xs text-amber-500/80 tracking-wide">
              2003 NBA All-Star Game &middot; Atlanta (Philips Arena) &middot; West 155, East 145 (2OT)
            </p>
          )}
        </div>

        {/* Three-column layout */}
        <div className="max-w-screen-xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-[380px_1fr_260px] gap-5">
          <FindPlayers lineup={lineup} onAdd={addPlayer} selectedYear={selectedYear} />
          <YourLineup lineup={lineup} teamName={teamName} setTeamName={setTeamName} onRemove={removePlayer} />
          <TeamInfo
            coachName={coachName}
            setCoachName={setCoachName}
            teamName={teamName}
            setTeamName={setTeamName}
            onSave={save}
            onLoad={load}
            onClear={clear}
          />
        </div>

      </div>
    </div>
  );
}
