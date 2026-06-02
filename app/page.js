'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FindPlayers from '@/components/FindPlayers';
import YourLineup from '@/components/YourLineup';
import TeamInfo from '@/components/TeamInfo';

const STORAGE_KEY = 'nba_squad';

const MODES = [
  { id: 'current', label: '2026 All-Stars',    year: 2026         },
  { id: 'knicks',  label: "Knicks Finals '26",  year: 'knicks_2026' },
  { id: 'legacy',  label: '2003 Legacy',        year: 2003         },
];

export default function Home() {
  const [lineup, setLineup] = useState([]);
  const [coachName, setCoachName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [mode, setMode] = useState('current');

  const selectedYear = MODES.find(m => m.id === mode)?.year ?? 2026;

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

  function switchMode(newMode) {
    setMode(newMode);
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
    <div className="min-h-screen">

      {/* Background layers — cross-fade on mode change */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url(/images/court2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${mode === 'knicks' ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: 'url(/images/MSGCourt.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>

      {/* Dark overlay over court background */}
      <div className="min-h-screen" style={{ backgroundColor: 'rgba(13,17,23,0.88)' }}>
        <Navbar mode={mode} />

        {/* Hero heading */}
        <div className="text-center pt-10 pb-6 px-4">
          <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">
            Select 5 players to complete your ultimate lineup
          </p>
          <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            <span className={`transition-opacity duration-700 ease-in-out ${mode === 'knicks' ? 'opacity-0' : 'opacity-100'}`}>
              Build Your{' '}
              <span className="text-brand-orange">All-Star</span>{' '}
              Team
            </span>
            <span className={`absolute inset-0 whitespace-nowrap transition-opacity duration-700 ease-in-out ${mode === 'knicks' ? 'opacity-100' : 'opacity-0'}`}>
              Build Your{' '}
              <span className="text-brand-orange">Knicks</span>{' '}
              Starting 5
            </span>
          </h1>

          {/* Mode Selector */}
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
            {MODES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => switchMode(id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-200 border ${
                  mode === id
                    ? id === 'knicks'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : id === 'legacy'
                      ? 'bg-amber-600 border-amber-500 text-white'
                      : 'bg-brand-orange border-brand-orange text-white'
                    : 'bg-brand-card border-brand-border text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === 'legacy' && (
            <p className="mt-2 text-xs text-amber-500/80 tracking-wide">
              2003 NBA All-Star Game &middot; Atlanta (Philips Arena) &middot; West 155, East 145 (2OT)
            </p>
          )}
          {mode === 'knicks' && (
            <p className="mt-2 text-xs text-blue-400/80 tracking-wide">
              2026 NBA Finals &middot; New York Knicks &middot; Eastern Conference Champions
            </p>
          )}
        </div>

        {/* Three-column layout */}
        <div className="max-w-screen-xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-[380px_1fr_260px] gap-5">
          <FindPlayers lineup={lineup} onAdd={addPlayer} selectedYear={selectedYear} mode={mode} />
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

        <Footer mode={mode} />
      </div>
    </div>
  );
}
