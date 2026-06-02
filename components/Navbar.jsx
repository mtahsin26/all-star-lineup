import Image from 'next/image';

export default function Navbar({ mode }) {
  const isKnicks = mode === 'knicks';

  return (
    <nav
      className="border-b border-brand-border px-6 py-3 flex items-center justify-between transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: isKnicks ? '#305CDE' : '#0D1117' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 flex-shrink-0">
          {/* Default orange box */}
          <div
            className={`absolute inset-0 bg-brand-orange rounded flex items-center justify-center font-bold text-white text-sm transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-0' : 'opacity-100'}`}
          >
            N
          </div>
          {/* Knicks logo */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src="/images/BG-removed knicks logo.png"
              alt="New York Knicks"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              unoptimized
            />
          </div>
        </div>
        <div className="relative font-bold tracking-wider text-white text-sm uppercase">
          <span className={`transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-0' : 'opacity-100'}`}>
            NBA ALL STAR LINEUP <span className="text-brand-orange">Builder</span>
          </span>
          <span className={`absolute inset-0 whitespace-nowrap transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-100' : 'opacity-0'}`}>
            New York Knicks <span className="text-brand-orange">Lineup Builder</span>
          </span>
        </div>
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
