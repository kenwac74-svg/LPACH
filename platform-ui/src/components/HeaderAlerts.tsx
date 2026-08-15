import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCircle2, ChevronRight, Clock3, Gift } from 'lucide-react';

const recentAlerts = [
  { title: 'Deposit confirmed', detail: '480.00 USDT was credited to your balance.', time: '2 min ago', icon: CheckCircle2, tone: 'text-emerald-400' },
  { title: 'Withdrawal pending', detail: 'Your 120.00 USDT request is waiting for the next batch.', time: '18 min ago', icon: Clock3, tone: 'text-luxury-gold' },
  { title: 'Daily reward credited', detail: '3.67 USDT was added to Earnings Balance.', time: 'Today', icon: Gift, tone: 'text-sky-400' },
];

export const HeaderAlerts = ({ onOpenAll }: { onOpenAll: () => void }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-label="Alerts"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-10 w-10 items-center justify-center text-gray-400 hover:text-white"
      >
        <Bell size={19} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 bg-red-500" />
      </button>

      {open && (
        <section className="absolute right-0 top-12 z-[140] w-[360px] border border-luxury-gold/25 bg-[#130505] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-luxury-gold">Account</p>
              <h2 className="mt-1 text-base font-black text-white">Personal Alerts</h2>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-red-400">3 unread</span>
          </div>

          <div>
            {recentAlerts.map((alert) => (
              <div key={alert.title} className="flex gap-3 border-b border-white/[0.07] px-5 py-4 last:border-b-0">
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-black/35 ${alert.tone}`}>
                  <alert.icon size={17} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-black text-white">{alert.title}</p>
                    <span className="shrink-0 text-[8px] text-gray-600">{alert.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-gray-400">{alert.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setOpen(false); onOpenAll(); }}
            className="flex w-full items-center justify-between border-t border-luxury-gold/20 px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-luxury-gold hover:bg-luxury-gold/[0.06]"
          >
            View All Alerts <ChevronRight size={15} />
          </button>
        </section>
      )}
    </div>
  );
};
