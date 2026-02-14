'use client';

import { useState, useEffect } from 'react';
import FindPlayers from '@/components/FindPlayers';
import YourLineup from '@/components/YourLineup';
import TeamInfo from '@/components/TeamInfo';

const STORAGE_KEY = 'nba_squad';

export default function Home() {
  const [lineup, setLineup] = useState([]);
  const [coachName, setCoachName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [hydrated, setHydrated] = useState(false);

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
        </div>

        {/* Three-column layout */}
        <div className="max-w-screen-xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-[380px_1fr_260px] gap-5">
          <FindPlayers lineup={lineup} onAdd={addPlayer} />
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
