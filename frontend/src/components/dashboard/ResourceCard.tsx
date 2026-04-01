import {
  ArrowUpRight,
  BookOpen,
  FileCode2,
  FileText,
  Keyboard,
  Play,
  Search,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ResourceTileProps {
  title: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  iconClassName: string;
  darkMode?: boolean;
}

function ResourceTile({ title, description, icon: Icon, cta, iconClassName, darkMode = false }: ResourceTileProps) {
  return (
    <article
      className={`rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        darkMode ? 'border border-slate-800 bg-slate-950' : 'border border-slate-200/80 bg-white'
      }`}
    >
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className={`mb-2 text-[15px] font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{title}</h3>
      <p className={`mb-5 text-[13px] leading-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
      <button className={`inline-flex items-center gap-1 text-[13px] font-semibold transition-colors ${darkMode ? 'text-primary' : 'text-blue-600 hover:text-blue-700'}`} type="button">
        {cta}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </article>
  );
}

function VideoWalkthroughs({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <section
      className={`rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:col-span-2 ${
        darkMode ? 'border border-slate-800 bg-slate-900' : 'border border-slate-200/80 bg-slate-50'
      }`}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-700 md:w-[45%]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_45%),linear-gradient(135deg,_#5f6670,_#343b44)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${darkMode ? 'bg-slate-950 text-primary' : 'bg-white text-blue-600'}`}>
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`mb-2 text-[18px] font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Video Walkthroughs</h3>
          <p className={`mb-4 max-w-md text-[13px] leading-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Visual learner? Watch our curated library of step-by-step video guides and workflow demos.
          </p>
          <button className={`inline-flex items-center gap-1 text-[13px] font-semibold transition-colors ${darkMode ? 'text-primary' : 'text-blue-600 hover:text-blue-700'}`} type="button">
            Browse Library
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CommunityForum({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <section
      className={`rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:col-span-3 ${
        darkMode ? 'border border-slate-800 bg-slate-950' : 'border border-slate-200/80 bg-slate-50'
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-sm ${darkMode ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-500'}`}>
            <Users className="h-3.5 w-3.5" />
            Join 12,000+ users
          </div>
          <h3 className={`mb-2 text-lg font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Community Forum</h3>
          <p className={`max-w-2xl text-[13px] leading-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Share tips, ask questions, and connect with other power users in our thriving community space. Get insights directly from the people building with NavigationPro.
          </p>
        </div>
        <button className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-colors ${darkMode ? 'bg-primary hover:bg-[#8d32ea]' : 'bg-blue-600 hover:bg-blue-700'}`} type="button">
          Join The Discussion
        </button>
      </div>
    </section>
  );
}

function SupportFooter({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <section
      className={`rounded-2xl p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ${
        darkMode ? 'border border-slate-800 bg-slate-900' : 'border border-slate-200/80 bg-slate-100'
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className={`mb-1 text-lg font-bold ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Still need help?</h4>
          <p className={`text-[13px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Our dedicated team is available 24/7 for technical assistance.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className={`rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors ${darkMode ? 'border border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`} type="button">
            Contact Support
          </button>
          <button className={`rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors ${darkMode ? 'border border-slate-700 bg-slate-950 text-primary hover:bg-primary/10' : 'border border-slate-200 bg-white text-blue-600 hover:bg-blue-50'}`} type="button">
            Submit a Ticket
          </button>
        </div>
      </div>
    </section>
  );
}

const resourceTiles: ResourceTileProps[] = [
  {
    title: 'Getting Started Guide',
    description: 'A complete step-by-step setup guide to help you go from first launch to workflow-ready in minutes.',
    icon: BookOpen,
    cta: 'Read Guide',
    iconClassName: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'CSV Template Library',
    description: 'Download our ready-to-use CSV file templates for clean imports, exports, and migrations.',
    icon: FileText,
    cta: 'View Templates',
    iconClassName: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Learn the essential productivity shortcuts and commands for faster navigation and control.',
    icon: Keyboard,
    cta: 'Master Shortcuts',
    iconClassName: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'API Documentation',
    description: 'Full developer reference for REST APIs and integration hooks, with request examples included.',
    icon: FileCode2,
    cta: 'View API Docs',
    iconClassName: 'bg-indigo-50 text-indigo-600',
  },
];

interface ResourceCenterProps {
  darkMode?: boolean;
}

export default function ResourceCenter({ darkMode = false }: ResourceCenterProps) {
  return (
    <section
      id="resources"
      className={`mx-auto max-w-5xl rounded-[28px] p-4 scroll-mt-24 transition-colors md:p-8 ${
        darkMode ? 'bg-slate-950/60' : 'bg-[#f8faff]'
      }`}
    >
      <header className="mb-8">
        <h1 className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>Resource Center</h1>
        <p className={`mt-2 max-w-2xl text-[13px] leading-6 md:text-base ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Everything you need to build, scale, and optimize your workflow with NavigationPro. Explore our comprehensive guides and developer tools.
        </p>
        <div className="relative mt-5 max-w-xl">
          <Search className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            className={`h-11 w-full rounded-xl pl-11 pr-4 text-sm outline-none shadow-sm transition-colors ${
              darkMode
                ? 'border border-slate-800 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:border-primary'
                : 'border border-slate-200/90 bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-400'
            }`}
            placeholder="Search guides, API docs, or tutorials..."
            type="text"
          />
        </div>
      </header>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className={`text-[13px] font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Helpful Resources</h2>
        <button className={`text-[12px] font-semibold transition-colors ${darkMode ? 'text-primary' : 'text-blue-600 hover:text-blue-700'}`} type="button">
          View All Documentation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {resourceTiles.slice(0, 3).map((resource) => (
          <ResourceTile key={resource.title} {...resource} darkMode={darkMode} />
        ))}
        <VideoWalkthroughs darkMode={darkMode} />
        <ResourceTile {...resourceTiles[3]} darkMode={darkMode} />
        <CommunityForum darkMode={darkMode} />
      </div>

      <div className="mt-4">
        <SupportFooter darkMode={darkMode} />
      </div>
    </section>
  );
}
