import {
  Archive,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  Filter,
  Folder,
  Info,
  Play,
  RotateCcw,
  Search,
  Trash2,
  Link as LinkIcon,
} from 'lucide-react';
import type { Session } from '../types';

interface HistorySectionProps {
  darkMode?: boolean;
  sessions?: Session[];
}

const defaultSessions: Session[] = [
  {
    id: '1',
    title: 'Market Research Q4',
    date: 'Oct 24, 2023',
    time: '14:30',
    urlCount: 42,
    status: 'COMPLETED',
  },
  {
    id: '2',
    title: 'UI Design Inspiration Search',
    date: 'Today',
    time: '09:15',
    urlCount: 12,
    status: 'IN PROGRESS',
  },
  {
    id: '3',
    title: 'Competitor Analysis - FinTech',
    date: 'Oct 20, 2023',
    time: '11:00',
    urlCount: 89,
    status: 'ARCHIVED',
  },
];

function SessionCard({ session, darkMode = false }: { session: Session; darkMode?: boolean }) {
  const statusConfig = {
    COMPLETED: {
      dot: 'bg-emerald-500',
      icon: Folder,
      iconClassName: darkMode ? 'bg-slate-900 text-primary' : 'bg-blue-50 text-blue-600',
      actionIcon: ExternalLink,
      actionLabel: 'Reopen',
    },
    'IN PROGRESS': {
      dot: 'bg-amber-400',
      icon: Clock3,
      iconClassName: darkMode ? 'bg-slate-900 text-amber-300' : 'bg-orange-50 text-orange-600',
      actionIcon: Play,
      actionLabel: 'Resume',
    },
    ARCHIVED: {
      dot: 'bg-slate-400',
      icon: Archive,
      iconClassName: darkMode ? 'bg-slate-900 text-sky-300' : 'bg-sky-50 text-sky-600',
      actionIcon: RotateCcw,
      actionLabel: 'Restore',
    },
  } as const;

  const config = statusConfig[session.status];
  const Icon = config.icon;
  const ActionIcon = config.actionIcon;

  return (
    <article
      className={`flex flex-col gap-5 rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center md:justify-between ${
        darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className={`truncate text-lg font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{session.title}</h3>
          <div className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {session.date} • {session.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5" />
              {session.urlCount} URLs
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-4 md:w-auto md:justify-end md:gap-8">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${config.dot}`}></span>
          <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {session.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-2 font-semibold transition-colors ${
              darkMode
                ? 'text-primary hover:bg-primary/15 hover:text-primary'
                : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
            type="button"
          >
            <ActionIcon className="h-4 w-4" />
            {config.actionLabel}
          </button>
          <button
            className={`rounded-lg p-2 transition-colors ${
              darkMode
                ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`}
            type="button"
          >
            <Info className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600" type="button">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterSelect({
  icon: Icon,
  label,
  darkMode = false,
}: {
  icon: typeof Calendar | typeof Filter;
  label: string;
  darkMode?: boolean;
}) {
  return (
    <button
      className={`flex h-11 items-center justify-between gap-3 rounded-xl border px-4 text-sm font-medium shadow-sm transition-colors ${
        darkMode
          ? 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
      }`}
      type="button"
    >
      <span className="inline-flex items-center gap-2">
        <Icon className={`h-4 w-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
        {label}
      </span>
      <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
    </button>
  );
}

export default function HistorySection({ darkMode = false, sessions = defaultSessions }: HistorySectionProps) {
  return (
    <section
      id="history"
      className={`mx-auto max-w-5xl rounded-[28px] p-4 scroll-mt-24 transition-colors md:p-8 ${
        darkMode ? 'bg-slate-950/60' : 'bg-slate-50/80'
      }`}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Session History</h1>
          <p className={`mt-2 text-sm leading-6 md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Review and manage your past web exploration sessions.
          </p>
        </div>
        <button
          className={`inline-flex h-11 items-center gap-2 self-start rounded-xl border px-4 text-sm font-semibold shadow-sm transition-colors ${
            darkMode
              ? 'border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
          type="button"
        >
          <Download className="h-4 w-4" />
          Export Log
        </button>
      </div>

      <div
        className={`mb-6 grid grid-cols-1 gap-3 rounded-2xl p-3 md:grid-cols-[minmax(0,1fr)_170px_170px] ${
          darkMode ? 'bg-slate-900/70' : 'bg-slate-100/70'
        }`}
      >
        <div className="relative">
          <Search
            className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
              darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          />
          <input
            className={`h-11 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition-colors ${
              darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:border-primary'
                : 'border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-400'
            }`}
            placeholder="Search sessions by name or URL keywords..."
            type="text"
          />
        </div>
        <FilterSelect darkMode={darkMode} icon={Calendar} label="All Dates" />
        <FilterSelect darkMode={darkMode} icon={Filter} label="All Status" />
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard darkMode={darkMode} key={session.id} session={session} />
        ))}
      </div>

      <div
        className={`mt-8 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between ${
          darkMode ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Showing 3 of 42 sessions</p>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm ${
              darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-500'
                : 'border-slate-200 bg-white text-slate-400'
            }`}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm ${
              darkMode ? 'bg-primary' : 'bg-blue-600'
            }`}
            type="button"
          >
            1
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold shadow-sm transition-colors ${
              darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            type="button"
          >
            2
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold shadow-sm transition-colors ${
              darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            type="button"
          >
            3
          </button>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-colors ${
              darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
