import { AtSign, CalendarDays, Fingerprint, LogOut, ShieldCheck, User } from 'lucide-react';

export const ProfilePage = ({ user, onLogout }: { user: any; onUpdateUser?: (u: any) => void; onLogout: () => void }) => (
  <div className="mx-auto min-h-screen max-w-5xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
    <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Account</p>
    <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">Profile</h1>
    <div className="mt-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <aside className="border border-luxury-gold/25 bg-luxury-gold/[0.04] p-6 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center border border-luxury-gold/40 bg-black/40 text-luxury-gold"><User size={32}/></div><h2 className="mt-5 font-serif text-2xl font-black text-white">{user.nickname || user.name}</h2><p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-luxury-gold">{user.rank}</p><button onClick={onLogout} className="mt-8 flex w-full items-center justify-center gap-2 border border-red-500/30 px-5 py-3 text-xs font-black uppercase tracking-widest text-red-400"><LogOut size={16}/> Sign Out</button></aside>
      <section className="border border-white/10 bg-black/25 p-6"><h2 className="font-serif text-2xl font-black text-white">Account Information</h2><p className="mt-2 text-sm leading-6 text-gray-400">LONGRISE identifies accounts by email and a unique platform number. Identity documents are not collected in this mockup policy.</p><div className="mt-6 divide-y divide-white/10 border-y border-white/10">{[
        [AtSign, 'Email', user.email],
        [Fingerprint, 'Account number', user.id || 'LR-000003'],
        [CalendarDays, 'Joined', user.joinDate || '2026-01-01'],
        [ShieldCheck, 'Account status', 'Active'],
      ].map(([Icon,label,value]: any) => <div key={label} className="grid grid-cols-[34px_1fr] items-center gap-3 py-4 sm:grid-cols-[34px_160px_1fr]"><Icon size={18} className="text-luxury-gold"/><span className="text-xs font-black uppercase tracking-widest text-gray-500">{label}</span><strong className="col-start-2 text-sm text-white sm:col-start-3">{value}</strong></div>)}</div></section>
    </div>
  </div>
);
