export default function Navbar() {
  return (
    <nav className="bg-brand-dark border-b border-brand-border px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center font-bold text-white text-sm">
          SB
        </div>
        <span className="font-bold tracking-wider text-white text-sm uppercase">
          NBA ALL STAR LINEUP <span className="text-brand-orange">Builder</span>
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-6 text-xs font-semibold tracking-widest text-gray-400 uppercase">
        {/* <span className="hover:text-white cursor-pointer transition-colors">Create</span>
        <span className="hover:text-white cursor-pointer transition-colors">My Rosters</span>
        <span className="hover:text-white cursor-pointer transition-colors">Leaderboard</span> */}
      </div>
    </nav>
  );
}
