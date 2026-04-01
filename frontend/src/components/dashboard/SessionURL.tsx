import { TrendingUp, Activity, BarChart3, Share2, ExternalLink, Moon, Sun, Menu, CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import type { UploadActivity } from '../types';

interface SessionURLProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  recentUploads?: UploadActivity[];
  onViewHistory?: () => void;
}

export default function SessionURL({ darkMode, setDarkMode, recentUploads = [], onViewHistory }: SessionURLProps) {
  const recentSessions =
    recentUploads.length > 0
      ? recentUploads.slice(0, 3).map((upload) => ({
          title: upload.title,
          info: `${upload.date} • ${upload.urlCount} URLs • ${upload.fileName}`,
          icon: <Activity className="w-6 h-6" />,
        }))
      : [
          { title: 'Market Research Q3', info: 'Started 4h ago • 48 URLs Active', icon: <Activity className="w-6 h-6" /> },
          { title: 'Competitor Analysis', info: 'Started Yesterday • 122 URLs Active', icon: <BarChart3 className="w-6 h-6" /> },
          { title: 'Internal System Audit', info: 'Paused 2 days ago • 12 URLs', icon: <Share2 className="w-6 h-6" /> },
        ];
  return (
    <section className="mx-auto w-full max-w-[1380px] pb-8">
      {/* Header Section */}
      <section className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Architect Workspace</h1>
          <p className="text-on-surface-variant font-body max-w-lg">Manage your digital environments and track architectural efficiency through automated session analysis.</p>
        </div>
        {/* Summary Stats Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
          <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col items-start min-w-[160px] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Success Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-primary dark:text-primary-fixed-dim font-headline">99.2%</span>
              <TrendingUp className="w-4 h-4 text-primary dark:text-primary-fixed-dim" />
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col items-start min-w-[160px] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Time Saved</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-on-surface font-headline">12.4h</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-lg flex flex-col items-start min-w-[160px] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Total URLs</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-on-surface font-headline">2,400</span>
              <span className="text-xs text-on-surface-variant font-medium">/ 5,000</span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[48%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left Column: Activity & Sessions */}
        <div className="min-w-0 space-y-8">
          {/* Activity Trends */}
          <section className="bg-surface-container-low rounded-xl p-8 overflow-hidden relative shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline mb-1">Activity Trends</h3>
                <p className="text-sm text-on-surface-variant">URL navigation frequency (Last 7 Days)</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-surface-container-lowest rounded-full text-xs font-semibold text-primary dark:text-primary-fixed-dim">
                  <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-fixed-dim"></span>
                  Active
                </span>
              </div>
            </div>
            {/* Simulated Chart Component */}
            <div className="relative z-10">
              <div className="relative h-64 rounded-2xl bg-white/60 px-4 pb-4 pt-3">
                <div className="absolute inset-x-4 top-3 bottom-10 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((line) => (
                    <div key={line} className="border-t border-slate-200/80" />
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-10 top-6 flex items-end justify-between gap-3">
                  {[60, 45, 85, 100, 70, 30, 20].map((height, i) => (
                    <div key={i} className="flex h-full flex-1 items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className={`w-full max-w-14 rounded-t-xl ${
                          height === 100
                            ? 'bg-primary dark:bg-primary-fixed-dim'
                            : 'bg-primary/25 dark:bg-primary-fixed-dim/30'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-0 flex justify-between gap-3 pb-1">
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                    <div key={day} className="flex flex-1 justify-center">
                      <span className="text-[10px] font-bold text-on-surface-variant">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent Active Sessions */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-headline">Recent Active Sessions</h3>
              <button className="text-primary dark:text-primary-fixed-dim text-sm font-semibold hover:underline" type="button" onClick={onViewHistory}>View all history</button>
            </div>
            <div className="space-y-4">
              {(recentUploads.length > 0 ? recentSessions : [
                { title: 'Market Research Q3', info: 'Started 4h ago • 48 URLs Active', icon: <Activity className="w-6 h-6" /> },
                { title: 'Competitor Analysis', info: 'Started Yesterday • 122 URLs Active', icon: <BarChart3 className="w-6 h-6" /> },
                { title: 'Internal System Audit', info: 'Paused 2 days ago • 12 URLs', icon: <Share2 className="w-6 h-6" /> },
              ]).map((session, i) => (
                <div key={i} className="bg-surface-container-lowest hover:bg-white dark:hover:bg-surface-container transition-all group rounded-lg p-5 flex flex-wrap items-center justify-between gap-4 border border-transparent hover:border-outline-variant/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary dark:text-primary-fixed-dim">
                      {session.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface font-headline">{session.title}</h4>
                      <p className="text-xs text-on-surface-variant">{session.info}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors">Manage</button>
                    <button className="px-4 py-2 rounded-lg bg-primary dark:bg-primary-container text-white font-semibold text-xs active:scale-95 transition-transform flex items-center gap-2">
                      Open <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Account Settings Sidebar */}
        <div className="min-w-0">
          <section className="bg-surface-container-low rounded-xl p-8 xl:sticky xl:top-24 shadow-sm">
            <h3 className="text-xl font-bold font-headline mb-8">Account Settings</h3>
            <div className="space-y-8">
              {/* Profile Quick Edit */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Architect Identity</label>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold text-on-surface-variant mb-1 ml-1">Display Name</p>
                    <input 
                      className="w-full bg-white dark:bg-surface-container-lowest border-0 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm text-on-surface font-medium" 
                      type="text" 
                      defaultValue="System Architect"
                    />
                  </div>
                </div>
              </div>

              {/* Plan Badge */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Service Tier</label>
                <div className="bg-primary-fixed dark:bg-primary-container rounded-lg p-4 relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-on-primary-fixed dark:text-on-primary-container">PRO ARCHITECT</p>
                      <p className="text-[10px] text-on-primary-fixed-variant dark:text-on-primary-container/80">$24/mo billed yearly</p>
                    </div>
                    <button className="bg-white dark:bg-surface-container-lowest text-primary dark:text-primary-fixed-dim px-3 py-1.5 rounded-lg text-[11px] font-extrabold shadow-sm">MANAGE</button>
                  </div>
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                </div>
              </div>

              {/* UI Preferences */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">UI Preferences</label>
                <div className="space-y-3">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-surface-container/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-4 h-4 text-on-surface-variant" /> : <Sun className="w-4 h-4 text-on-surface-variant" />}
                      <span className="text-sm font-medium text-on-surface">Dark mode</span>
                    </div>
                    <div 
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${darkMode ? 'bg-primary' : 'bg-surface-container-highest'}`}
                    >
                      <motion.div 
                        animate={{ x: darkMode ? 20 : 4 }}
                        className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm" 
                      />
                    </div>
                  </div>
                  {/* Compact View Toggle */}
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-surface-container/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Menu className="w-4 h-4 text-on-surface-variant" />
                      <span className="text-sm font-medium text-on-surface">Compact view</span>
                    </div>
                    <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 px-6 border border-outline-variant/30 text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container transition-colors">
                Apply Changes
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* FAB for mobile */}
      <button className="fixed bottom-8 right-8 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform lg:hidden z-50">
        <Plus className="w-6 h-6" />
      </button>
    </section>
  );
}
