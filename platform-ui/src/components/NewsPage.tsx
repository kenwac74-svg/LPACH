import { Calendar, Clock3, Info, ShieldCheck, Wallet } from 'lucide-react';

const newsItems = [
  { category: 'WALLET', date: '2026.08.14', title: 'TRC20 Wallet Test Phase', body: 'TRC20 deposits and withdrawals are available in the current test phase. BEP20 support is planned for a later release.', icon: Wallet },
  { category: 'SYSTEM', date: '2026.08.10', title: 'Daily Withdrawal Batch Schedule', body: 'Approved withdrawal requests are processed once daily at UTC 09:00. Pending requests continue in the next available batch.', icon: Clock3 },
  { category: 'SECURITY', date: '2026.08.05', title: 'Withdrawal Address Protection', body: 'Main and Sub withdrawal address changes require OTP verification and administrator approval.', icon: ShieldCheck },
  { category: 'UPDATE', date: '2026.08.01', title: 'Wallet History Improvements', body: 'Package, transfer, and earn and reward records are now separated for faster review.', icon: Info },
];

export const NewsPage = () => (
  <div className="mx-auto min-h-screen max-w-6xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
    <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Platform</p>
    <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">News</h1>
    <section className="mt-8 space-y-3">
      {newsItems.map((item) => (
        <article key={item.title} className="border border-white/10 bg-black/25 p-5 lg:p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-luxury-gold/25 bg-black/40 text-luxury-gold"><item.icon size={20} /></span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[9px] font-black uppercase tracking-widest text-luxury-gold">{item.category}</span>
                <span className="flex items-center gap-1 text-[9px] text-gray-600"><Calendar size={11} />{item.date}</span>
              </div>
              <h2 className="mt-2 text-lg font-black text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">{item.body}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  </div>
);
