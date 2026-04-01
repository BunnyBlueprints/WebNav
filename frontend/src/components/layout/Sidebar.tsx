import { LayoutDashboard, History, Link as LinkIcon } from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'history' | 'savedUrls' | 'other';
  darkMode: boolean;
  onDashboardClick: () => void;
  onHistoryClick: () => void;
  onSavedUrlsClick: () => void;
}

export default function Sidebar({
  activeView,
  darkMode,
  onDashboardClick,
  onHistoryClick,
  onSavedUrlsClick,
}: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: activeView === 'dashboard', onClick: onDashboardClick },
    { icon: History, label: 'Session History', active: activeView === 'history', onClick: onHistoryClick },
    { icon: LinkIcon, label: 'Saved URLs', active: activeView === 'savedUrls', onClick: onSavedUrlsClick },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 hidden h-screen w-64 flex-col pt-16 transition-colors lg:flex ${
        darkMode
          ? 'border-r border-slate-800 bg-slate-950'
          : 'border-r border-slate-200 bg-white'
      }`}
    >
      <div className="p-6">
        <h2 className={`font-sans text-lg font-bold ${darkMode ? 'text-primary' : 'text-blue-700'}`}>WebNav Explorer</h2>
      </div>
      
      <nav className="flex-1 px-3 space-y-1 font-sans text-sm font-medium">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
              item.active 
                ? darkMode
                  ? 'bg-slate-900 text-primary shadow-sm'
                  : 'bg-white text-blue-700 shadow-sm'
                : darkMode
                  ? 'text-slate-400 hover:bg-slate-900'
                  : 'text-slate-500 hover:bg-slate-200/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
