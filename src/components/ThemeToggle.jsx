import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();

  const activeTheme = resolvedTheme || theme || 'dark';
  const isDark = activeTheme === 'dark';
  const borderColor = isDark ? '#2c2c30' : '#d1d5db';

  return (
    <button
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 text-amber-500 border-2 rounded-xl cursor-pointer hover:bg-amber-500/10"
      style={{
        background: 'transparent',
        borderColor,
      }}
    >
      {/* Sun Icon: Visible in Light Mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-90 scale-0 absolute' : 'rotate-0 scale-100'}`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41-1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      {/* Moon Icon: Visible in Dark Mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0 absolute'}`}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
