import { Search, Bell, Settings, Moon, Sun } from 'lucide-react';
import type { AuthUser } from '../../lib/auth';

interface NavbarProps {
  currentUser: AuthUser | null;
  darkMode: boolean;
  activeNav?: 'analytics' | 'resources' | 'profile' | null;
  isSettingsActive?: boolean;
  onAnalyticsClick: () => void;
  onLoginClick: () => void;
  onResourcesClick: () => void;
  onToggleDarkMode: () => void;
  onSettingsClick: () => void;
}

export default function Navbar({
  currentUser,
  darkMode,
  activeNav = null,
  isSettingsActive = false,
  onAnalyticsClick,
  onLoginClick,
  onResourcesClick,
  onToggleDarkMode,
  onSettingsClick,
}: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between shadow-sm transition-colors ${
        darkMode
          ? 'border-b border-slate-800/70 bg-slate-950/96 backdrop-blur-md'
          : 'border-b border-slate-200/80 bg-white backdrop-blur-0'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className={`font-headline text-xl font-bold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>WebNav</span>
          <div className="hidden md:flex gap-6 items-center font-headline font-semibold text-sm">
            <button
              className={`relative px-1 py-1 transition-colors ${
                activeNav === 'analytics'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
              type="button"
              onClick={onAnalyticsClick}
            >
              Analytics
              {activeNav === 'analytics' ? <span className="absolute -bottom-[18px] left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" /> : null}
            </button>
            <button
              className={`relative px-1 py-1 transition-colors ${
                activeNav === 'resources'
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
              type="button"
              onClick={onResourcesClick}
            >
              Resources
              {activeNav === 'resources' ? <span className="absolute -bottom-[18px] left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" /> : null}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div
            className={`relative flex w-64 items-center rounded-lg px-3 py-1.5 transition-colors ${
              darkMode ? 'bg-slate-900' : 'bg-white border border-slate-200'
            }`}
          >
            <Search className="text-on-surface-variant w-4 h-4" />
            <input 
              className={`ml-2 w-full border-none bg-transparent text-sm focus:outline-none ${
                darkMode
                  ? 'text-slate-100 placeholder:text-slate-500'
                  : 'text-slate-800 placeholder:text-slate-400'
              }`}
              placeholder="Search resources..." 
              type="text"
            />
          </div>
          
          {currentUser ? (
            <>
              <button className="rounded-full p-2 text-slate-500 transition-colors duration-200 active:scale-95 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900">
                <Bell className="w-5 h-5" />
              </button>
              
              <button
                className={`rounded-full p-2 transition-colors duration-200 active:scale-95 ${
                  darkMode
                    ? 'bg-primary/15 text-primary hover:bg-primary/20'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
                type="button"
                onClick={onToggleDarkMode}
              >
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <button
                className={`relative p-2 rounded-full transition-colors active:scale-95 duration-200 ${
                  isSettingsActive
                    ? 'text-primary'
                    : 'text-slate-500 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
                type="button"
                onClick={onSettingsClick}
              >
                <Settings className="w-5 h-5" />
                {isSettingsActive ? <span className="absolute -bottom-[18px] left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" /> : null}
              </button>

              <button
                className="ml-1 h-9 w-9 overflow-hidden rounded-full ring-2 ring-blue-100 transition-transform hover:scale-105 dark:ring-primary/30"
                type="button"
                onClick={onSettingsClick}
              >
                {currentUser.avatarUrl ? (
                  <img
                    alt={currentUser.name}
                    className="h-full w-full object-cover"
                    src={currentUser.avatarUrl}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-primary text-sm font-bold text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              <button className="rounded-full p-2 text-slate-500 transition-colors duration-200 active:scale-95 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900">
                <Bell className="w-5 h-5" />
              </button>
              
              <button
                className={`rounded-full p-2 transition-colors duration-200 active:scale-95 ${
                  darkMode
                    ? 'bg-primary/15 text-primary hover:bg-primary/20'
                    : 'text-slate-500 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
                type="button"
                onClick={onToggleDarkMode}
              >
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <button className="rounded-full p-2 text-slate-500 transition-colors duration-200 active:scale-95 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900">
                 <Settings className="w-5 h-5" />
              </button>
              
              <button
                className="ml-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 active:scale-95 hover:bg-blue-700 dark:hover:bg-[#8d32ea]"
                type="button"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
