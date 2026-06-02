import LineupSlot from './LineupSlot';

export default function YourLineup({ lineup, teamName, setTeamName, onRemove, knicksMode }) {
  const slots = Array.from({ length: 5 }, (_, i) => lineup[i] || null);

  return (
    <div
      className="border border-brand-border rounded-xl flex flex-col transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: knicksMode ? 'rgba(24, 30, 40, 0.32)' : '#161B22' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-brand-border">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-300">Your Lineup</h2>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border
          ${lineup.length === 5
            ? 'border-brand-orange text-brand-orange'
            : 'border-brand-border text-gray-400'
          }`}
        >
          {lineup.length}/5
        </span>
      </div>

      {/* Slots */}
      <div className="flex flex-col gap-2 px-4 py-4 flex-1">
        {slots.map((player, i) => (
          <LineupSlot key={i} index={i} player={player} onRemove={onRemove} knicksMode={knicksMode} />
        ))}
      </div>

      {/* Team name at bottom */}
      <div className="px-4 pb-4 border-t border-brand-border pt-3">
        <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
          Team Name
        </label>
        <input
          type="text"
          placeholder="Enter team name..."
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
          className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
        />
      </div>
    </div>
  );
}
