import Image from 'next/image';

export default function Footer({ mode }) {
  const isKnicks = mode === 'knicks';

  return (
    <footer
      className="border-t border-brand-border px-4 py-4 flex items-center justify-between gap-4 min-w-0 transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: isKnicks ? '#305CDE' : '#0D1117' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-6 h-6 flex-shrink-0">
          {/* Default orange box */}
          <div
            className={`absolute inset-0 bg-brand-orange rounded flex items-center justify-center font-bold text-white text-xs transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-0' : 'opacity-100'}`}
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
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
              unoptimized
            />
          </div>
        </div>

        <div className="relative font-bold tracking-wider text-white text-xs uppercase overflow-hidden min-w-0">
          <span className={`transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-0' : 'opacity-100'}`}>
            NBA All Star Lineup <span className="text-brand-orange">Builder</span>
          </span>
          <span className={`absolute inset-0 whitespace-nowrap transition-opacity duration-700 ease-in-out ${isKnicks ? 'opacity-100' : 'opacity-0'}`}>
            New York Knicks <span className="text-brand-orange">Lineup Builder</span>
          </span>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-600">© 2026 All rights reserved.</p>

      {/* Social icons */}
      <div className="flex items-center gap-4 text-gray-500">
        <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <svg className="w-4 h-4 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
        </svg>
      </div>
    </footer>
  );
}
