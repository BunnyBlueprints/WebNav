export default function StatsCard() {
  return (
    <div className="rounded-[18px] bg-surface-container p-6 shadow-sm">
      <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant">Weekly Activity</h3>
      <div className="space-y-6">
        <div>
          <div className="mb-2 flex justify-between text-[11px] font-bold tracking-wide text-on-surface">
            <span>EXPLORED URLS</span>
            <span>2,400 / 5,000</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-[48%] rounded-full bg-primary"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
            <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Success Rate</p>
            <p className="mt-1 text-[2rem] font-extrabold leading-none text-primary">99.2%</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
            <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Time Saved</p>
            <p className="mt-1 text-[2rem] font-extrabold leading-none text-primary">12.4h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
