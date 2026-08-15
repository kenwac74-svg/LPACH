import { useState } from 'react';
import { Calendar, CheckCircle2, Clock3, Gift, Search, Send, ShieldCheck } from 'lucide-react';

const alerts = [
  { category: 'WALLET', date: '2026.08.15 08:42', title: 'Deposit Confirmed', body: '480.00 USDT was credited to your Withdrawal Balance after network confirmation.', icon: CheckCircle2 },
  { category: 'WALLET', date: '2026.08.15 08:26', title: 'Withdrawal Request Pending', body: 'Your 120.00 USDT withdrawal request is waiting for the next UTC 09:00 processing batch.', icon: Clock3 },
  { category: 'REWARDS', date: '2026.08.15 00:05', title: 'Daily Reward Credited', body: '3.67 USDT was added to your Earnings Balance.', icon: Gift },
  { category: 'WALLET', date: '2026.08.14 17:18', title: 'USDT Received', body: '25.00 USDT was received through an internal SEND transfer.', icon: Send },
  { category: 'SECURITY', date: '2026.08.14 09:12', title: 'Withdrawal Address Change Approved', body: 'Your Main withdrawal address change passed OTP verification and administrator approval.', icon: ShieldCheck },
];

export const NoticesPage = () => {
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const filtered = alerts.filter((alert) => (category === 'ALL' || alert.category === category) && `${alert.title} ${alert.body}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
      <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Account</p>
      <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">Alerts</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="self-start border border-white/10 bg-black/25 p-4 lg:sticky lg:top-28">
          <p className="px-2 text-[9px] font-black uppercase tracking-widest text-gray-500">Categories</p>
          <div className="mt-3 space-y-1">
            {['ALL', 'WALLET', 'REWARDS', 'SECURITY'].map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`w-full border px-3 py-3 text-left text-[10px] font-black tracking-widest ${category === item ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold' : 'border-transparent text-gray-500 hover:border-white/10 hover:text-white'}`}>{item}</button>
            ))}
          </div>
          <div className="relative mt-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search alerts" className="w-full border border-white/10 bg-black/40 py-3 pl-9 pr-3 text-xs text-white outline-none" />
          </div>
        </aside>

        <section className="space-y-3">
          {filtered.map((alert) => (
            <article key={`${alert.date}-${alert.title}`} className="border border-white/10 bg-black/25 p-5 lg:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-luxury-gold/25 bg-black/40 text-luxury-gold"><alert.icon size={20} /></span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-luxury-gold">{alert.category}</span>
                    <span className="flex items-center gap-1 text-[9px] text-gray-600"><Calendar size={11} />{alert.date}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-black text-white">{alert.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{alert.body}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
