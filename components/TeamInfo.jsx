export default function TeamInfo({ coachName, setCoachName, teamName, setTeamName, onSave, onLoad, onClear, knicksMode }) {
  const cardStyle = {
    backgroundColor: knicksMode ? 'rgba(24, 30, 40, 0.32)' : '#161B22',
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Team Info card */}
      <div
        className="border border-brand-border rounded-xl px-4 py-4 transition-colors duration-700 ease-in-out"
        style={cardStyle}
      >
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-3">Team Info</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={coachName}
              onChange={e => setCoachName(e.target.value)}
              className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
            />
          </div>
        </div>
      </div>

      {/* Actions card */}
      <div
        className="border border-brand-border rounded-xl px-4 py-4 transition-colors duration-700 ease-in-out"
        style={cardStyle}
      >
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-300 mb-3">Actions</h2>

        <div className="flex flex-col gap-2">
          <button
            onClick={onSave}
            className="w-full py-2.5 bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-colors"
          >
            Save Lineup
          </button>

          <button
            onClick={onLoad}
            className="w-full py-2.5 bg-transparent border border-brand-border hover:border-gray-400 text-gray-300 hover:text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-colors"
          >
            Load Saved
          </button>

          <button
            onClick={onClear}
            className="w-full py-2.5 text-brand-orange hover:text-orange-400 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Pro Tip card */}
      <div
        className="border border-brand-border rounded-xl px-4 py-3 transition-colors duration-700 ease-in-out"
        style={cardStyle}
      >
        <div className="flex items-start gap-2">
          <span className="text-brand-orange text-lg leading-none mt-0.5">💡</span>
          <div>
            <p className="text-xs font-bold text-brand-orange mb-0.5">Pro Tip</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Select your lineup with players from different positions for the best team chemistry.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
