import { ArrowRight, CalendarClock, Gem, RefreshCcw, TrendingUp, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export const EarnPage = ({ onOpenSwap, onOpenPlans }: { onOpenSwap: () => void; onOpenPlans: () => void }) => {
  const activity = [
    { type: 'USDT earning', package: 'Premium', date: '2026-08-14', amount: '+3.67 USDT', color: 'text-emerald-400' },
    { type: 'CNYT reward', package: 'Premium', date: '2026-08-14', amount: '+0.55 CNYT', color: 'text-luxury-gold' },
    { type: 'USDT earning', package: 'Basic', date: '2026-08-13', amount: '+0.47 USDT', color: 'text-emerald-400' },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Daily Rewards</p>
          <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">Earn</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-gray-400">Package earnings and CNYT rewards are credited to the platform ledger each day.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { label: 'Earnings Balance', value: '23.00', unit: 'USDT', icon: Wallet, color: 'text-emerald-400' },
          { label: 'Available Rewards', value: '53.00', unit: 'CNYT', icon: Gem, color: 'text-luxury-gold' },
          { label: 'Active Package Value', value: '1,700.00', unit: 'USDT', icon: TrendingUp, color: 'text-white' },
        ].map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="border border-white/10 bg-black/30 p-6"
          >
            <card.icon size={22} className="mb-8 text-luxury-gold" />
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">{card.label}</p>
            <p className={`mt-3 font-mono text-3xl font-black ${card.color}`}>{card.value} <span className="text-xs text-gray-500">{card.unit}</span></p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_0.75fr]">
        <section className="border border-white/10 bg-black/25 p-5 lg:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Recent 30 Days</p>
              <h2 className="mt-2 font-serif text-2xl font-black text-white">Earnings Activity</h2>
            </div>
            <CalendarClock className="text-gray-500" size={22} />
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {activity.map((item) => (
              <div key={`${item.type}-${item.date}-${item.package}`} className="grid grid-cols-[1fr_auto] gap-4 py-4 lg:grid-cols-[1fr_1fr_auto]">
                <div>
                  <p className="text-sm font-black text-white">{item.type}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-500 lg:hidden">{item.package}</p>
                </div>
                <p className="hidden self-center text-xs text-gray-400 lg:block">{item.package} · {item.date}</p>
                <p className={`self-center font-mono text-sm font-black ${item.color}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="border border-luxury-gold/25 bg-luxury-gold/[0.045] p-6">
          <RefreshCcw size={25} className="text-luxury-gold" />
          <h2 className="mt-7 font-serif text-2xl font-black text-white">Swap Rewards</h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">Review the conversion rate and expected amount before confirming a reward conversion.</p>
          <button onClick={onOpenSwap} className="mt-8 flex w-full items-center justify-between bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black">
            Open Swap <ArrowRight size={17} />
          </button>
          <button onClick={onOpenPlans} className="mt-2 flex w-full items-center justify-between border border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-300">
            View Plans <ArrowRight size={17} />
          </button>
        </aside>
      </div>
    </div>
  );
};
