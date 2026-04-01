import { Calendar, Filter, Download, Search, TrendingUp, AlertTriangle, Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const chartData = [
  { day: '01 APR', requests: 40, success: 30 },
  { day: '02 APR', requests: 35, success: 45 },
  { day: '03 APR', requests: 65, success: 20 },
  { day: '04 APR', requests: 90, success: 15, peak: true },
  { day: '05 APR', requests: 55, success: 50 },
  { day: '06 APR', requests: 42, success: 35 },
  { day: '07 APR', requests: 30, success: 25 },
];

const sessions = [
  {
    name: 'Market Research Q3',
    time: 'Started 4h ago',
    urls: '48 URLs',
    status: ['Active', 'Data Exported'],
    efficiency: 99.2,
    efficiencyLabel: 'Optimal',
    type: 'stats'
  },
  {
    name: 'Competitor Analysis',
    time: 'Started Yesterday',
    urls: '122 URLs',
    status: ['Anomalies Detected'],
    efficiency: 84.5,
    efficiencyLabel: 'Review',
    type: 'warning'
  }
];

export default function Analytics() {
  return (
    <section className="mx-auto w-full max-w-[1380px] pb-8">
      {/* Header & Controls */}
      <div className="mb-8 flex flex-col gap-6 2xl:flex-row 2xl:items-start 2xl:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Session Analysis</h1>
          <p className="text-on-surface-variant font-sans max-w-lg">Deep dive into architectural sessions, performance latency, and navigation patterns.</p>
        </div>
        
        <div className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap md:items-center 2xl:w-auto 2xl:justify-end">
          <div className="flex h-11 items-center bg-white border border-outline-variant/30 rounded-lg px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-on-surface-variant mr-2" />
            <select className="bg-transparent border-0 text-sm font-semibold text-on-surface focus:ring-0 p-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="flex h-11 items-center bg-white border border-outline-variant/30 rounded-lg px-3 py-2 shadow-sm">
            <Filter className="w-4 h-4 text-on-surface-variant mr-2" />
            <select className="bg-transparent border-0 text-sm font-semibold text-on-surface focus:ring-0 p-0 cursor-pointer">
              <option>All Projects</option>
              <option>Alpha Dev</option>
            </select>
          </div>
          <div className="flex bg-slate-200 rounded-lg p-1 md:ml-auto 2xl:ml-0">
            <button className="px-4 py-1.5 rounded-md text-xs font-bold bg-white text-primary shadow-sm">Performance</button>
            <button className="px-4 py-1.5 rounded-md text-xs font-bold text-on-surface-variant hover:bg-white/50 transition-colors">Content</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Left Column */}
        <div className="min-w-0 space-y-8">
          <section className="bg-white border border-outline-variant/20 rounded-xl p-8 shadow-sm">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline mb-1">Architecture Velocity</h3>
                <p className="text-sm text-on-surface-variant">Combined success rate vs. request density</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Avg. Nav Speed</span>
                  <span className="text-lg font-extrabold text-on-surface">1.4s</span>
                </div>
                <div className="flex flex-col items-end border-l pl-6 border-outline-variant/30">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Peak Concurrent</span>
                  <span className="text-lg font-extrabold text-primary">842</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="h-80 relative mt-4">
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-full h-[1px] bg-slate-100"></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-end justify-between gap-2 px-4 pb-8">
                {chartData.map((data) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                    <div 
                      className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors" 
                      style={{ height: `${data.success}%` }}
                    ></div>
                    <div 
                      className={`w-full rounded-t-sm ${data.peak ? 'bg-primary' : 'bg-primary/80'}`} 
                      style={{ height: `${data.requests}%` }}
                    ></div>
                    <span className={`text-[10px] font-bold ${data.peak ? 'text-on-surface' : 'text-on-surface-variant'}`}>{data.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-medium text-on-surface-variant">Requests Processed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                <span className="text-xs font-medium text-on-surface-variant">Success Margin</span>
              </div>
            </div>
          </section>

          {/* Queue Table */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-headline">Session Analysis Queue</h3>
              <div className="flex gap-2">
                <button className="p-2 border border-outline-variant/30 rounded-lg hover:bg-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 border border-outline-variant/30 rounded-lg hover:bg-white transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant px-4">
                    <th className="text-left pb-2 pl-4">Session Name</th>
                    <th className="text-left pb-2">Status & Tags</th>
                    <th className="text-left pb-2">Efficiency</th>
                    <th className="text-right pb-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, idx) => (
                    <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors group shadow-sm">
                      <td className="py-4 pl-4 rounded-l-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded flex items-center justify-center ${session.type === 'stats' ? 'bg-blue-50 text-primary' : 'bg-amber-50 text-amber-600'}`}>
                            {session.type === 'stats' ? <TrendingUp className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-on-surface">{session.name}</div>
                            <div className="text-[10px] text-on-surface-variant">{session.time} • {session.urls}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {session.status.map(tag => (
                            <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded ${tag === 'Active' ? 'bg-green-100 text-green-700' : tag === 'Anomalies Detected' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1 w-32">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>{session.efficiency}%</span>
                            <span className={session.type === 'stats' ? 'text-on-surface-variant' : 'text-amber-600'}>{session.efficiencyLabel}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div className={`h-full ${session.type === 'stats' ? 'bg-primary' : 'bg-amber-500'}`} style={{ width: `${session.efficiency}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-right rounded-r-xl">
                        <button className="text-primary text-xs font-bold hover:underline">
                          {session.type === 'stats' ? 'Analysis Report' : 'View Errors'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="min-w-0">
          <section className="bg-slate-100 rounded-xl p-8 xl:sticky xl:top-24 space-y-8">
            <h3 className="text-xl font-bold font-headline">Session Insights</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Top Domains</label>
              <div className="space-y-4">
                {[
                  { domain: 'github.com', requests: '1,240', avg: '0.4s' },
                  { domain: 'aws.amazon.com', requests: '842', avg: '1.2s' },
                  { domain: 'figma.com', requests: '312', avg: '0.9s' },
                ].map(item => (
                  <div key={item.domain} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">{item.domain}</span>
                      <span className="text-[10px] text-on-surface-variant">{item.requests} requests</span>
                    </div>
                    <span className="text-xs font-bold text-primary">{item.avg} avg</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Error Breakdown</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-outline-variant/20">
                  <div className="text-[10px] font-bold text-on-surface-variant mb-1">404 NOT FOUND</div>
                  <div className="text-xl font-extrabold text-on-surface">12</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-outline-variant/20">
                  <div className="text-[10px] font-bold text-on-surface-variant mb-1">TIMEOUTS</div>
                  <div className="text-xl font-extrabold text-red-600">4</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Latency Distribution</label>
              <div className="space-y-4">
                {[
                  { label: '< 500ms', value: 74, color: 'bg-primary' },
                  { label: '500ms - 2s', value: 21, color: 'bg-blue-300' },
                  { label: '> 2s (Latency)', value: 5, color: 'bg-red-500', error: true },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-[11px] font-medium text-on-surface-variant mb-1">
                      <span>{item.label}</span>
                      <span className={item.error ? 'text-red-500 font-bold' : ''}>{item.value}%</span>
                    </div>
                    <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate AI Summary
            </motion.button>
            <button className="w-full py-4 px-6 border border-outline-variant/30 text-on-surface font-bold text-sm rounded-lg hover:bg-white transition-colors">
              Export Full Dataset
            </button>
          </section>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg lg:right-10"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
