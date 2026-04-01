export default function PromoCard() {
  return (
    <div className="group relative flex min-h-[390px] overflow-hidden rounded-[18px] shadow-xl">
      <img 
        alt="abstract technology background" 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi52HpgnCnq1MTn1A4JPQ00c9SpjwudwRrj8qk8FQe5TAduuj3NhQSFATxOuGS-tsBActR7p_97F4HfNEphS2cHym5gfq1misihVxj3EZ01EQop0NQiw1AaUa8ODBwxbOt21yyKNxA5wfqbA5w2116-ZsdNCWmqY1x0RNIOvv13HSUcB1rAmc6qNqmPnA8XQ1LzSzRhK6H-Z3bFhBivkMFcGtF1UCayGby8b4xMJk8FHzZoTnCuxlW4mmZk8_j7qcODgDpeHqWoWI"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-primary/35 to-primary"></div>
      <div className="relative mt-auto p-7 text-white">
        <h3 className="mb-3 max-w-[220px] text-[2rem] font-bold font-headline leading-[1.05]">Master the Bulk Navigation</h3>
        <p className="mb-6 max-w-[220px] text-sm leading-7 text-blue-100">Learn how to use keyboard shortcuts to fly through thousands of URLs in record time.</p>
        <button className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-blue-50">
          View Guide
        </button>
      </div>
    </div>
  );
}
