import { Home, ArrowLeft, ArrowRight, Globe } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-4 border-t border-slate-200 bg-white/90 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
      <button className="flex flex-col items-center justify-center px-4 py-2 text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-primary">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-[10px] tracking-wide uppercase font-bold mt-1">Prev</span>
      </button>
      
      <button className="flex flex-col items-center justify-center px-4 py-2 text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-primary">
        <Globe className="w-5 h-5" />
        <span className="text-[10px] tracking-wide uppercase font-bold mt-1">URL</span>
      </button>
      
      <button className="flex flex-col items-center justify-center px-4 py-2 text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-primary">
        <ArrowRight className="w-5 h-5" />
        <span className="text-[10px] tracking-wide uppercase font-bold mt-1">Next</span>
      </button>
      
      <button className="flex flex-col items-center justify-center rounded-xl bg-blue-50 px-4 py-2 text-blue-700 dark:bg-primary/15 dark:text-primary">
        <Home className="w-5 h-5" />
        <span className="text-[10px] tracking-wide uppercase font-bold mt-1">Home</span>
      </button>
    </nav>
  );
}
