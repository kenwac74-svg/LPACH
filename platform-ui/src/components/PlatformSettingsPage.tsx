import { Bell, Check, Globe2, Moon, WalletCards } from 'lucide-react';

const languages = [
  { name: 'English', code: 'EN', enabled: true },
  { name: 'Chinese', code: 'ZH', enabled: false },
  { name: 'Korean', code: 'KO', enabled: false },
  { name: 'Vietnamese', code: 'VI', enabled: false },
  { name: 'Thai', code: 'TH', enabled: false },
  { name: 'Indonesian', code: 'ID', enabled: false },
  { name: 'Japanese', code: 'JA', enabled: false },
  { name: 'Russian', code: 'RU', enabled: false },
];

const currencies = [
  { name: 'USDT', code: 'USDT', enabled: true },
  { name: 'Chinese Yuan', code: 'CNY', enabled: false },
  { name: 'Korean Won', code: 'KRW', enabled: false },
  { name: 'Vietnamese Dong', code: 'VND', enabled: false },
  { name: 'Thai Baht', code: 'THB', enabled: false },
  { name: 'Indonesian Rupiah', code: 'IDR', enabled: false },
  { name: 'Japanese Yen', code: 'JPY', enabled: false },
  { name: 'Russian Ruble', code: 'RUB', enabled: false },
];

// Developer note: local-currency values must be quoted from a USDT base.
// Suggested implementation: fetch USD fiat rates from a free provider such as
// Frankfurter, then apply the current USDT/USD quote. Do not expose provider or
// calculation details in the customer UI. Only English and USDT are active now.

const ChoiceGrid = ({ items }: { items: { name: string; code: string; enabled: boolean }[] }) => (
  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((item) => (
      <button key={item.code} disabled={!item.enabled} className={`flex min-h-16 items-center justify-between border px-4 py-3 text-left ${item.enabled ? 'border-luxury-gold bg-luxury-gold/[0.07] text-white' : 'cursor-not-allowed border-white/10 bg-white/[0.02] text-gray-600'}`}>
        <span><span className="block text-sm font-black">{item.name}</span><span className="mt-1 block text-[9px] font-black uppercase tracking-widest">{item.enabled ? 'Active' : 'Coming Soon'}</span></span>
        {item.enabled && <Check size={17} className="text-luxury-gold" />}
      </button>
    ))}
  </div>
);

export const PlatformSettingsPage = ({ user: _user }: { user: any }) => (
  <div className="mx-auto min-h-screen max-w-5xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
    <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Account</p>
    <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">Settings</h1>

    <div className="mt-8 space-y-5">
      <section className="border border-white/10 bg-black/25 p-5 lg:p-7">
        <div className="mb-5 flex items-center gap-3"><Globe2 size={21} className="text-luxury-gold"/><div><h2 className="font-black text-white">Display Language</h2><p className="mt-1 text-xs text-gray-500">English is available. Additional language packs are planned.</p></div></div>
        <ChoiceGrid items={languages} />
      </section>

      <section className="border border-white/10 bg-black/25 p-5 lg:p-7">
        <div className="mb-5 flex items-center gap-3"><WalletCards size={21} className="text-luxury-gold"/><div><h2 className="font-black text-white">Currency Display</h2><p className="mt-1 text-xs text-gray-500">USDT is the platform base currency. Local currency displays are planned.</p></div></div>
        <ChoiceGrid items={currencies} />
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="flex items-center justify-between border border-white/10 bg-black/25 p-5"><div className="flex items-center gap-3"><Bell className="text-luxury-gold" size={20}/><div><p className="font-black text-white">Notifications</p><p className="mt-1 text-xs text-gray-500">Security and wallet activity</p></div></div><span className="border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-400">On</span></div>
        <div className="flex items-center justify-between border border-white/10 bg-black/25 p-5"><div className="flex items-center gap-3"><Moon className="text-luxury-gold" size={20}/><div><p className="font-black text-white">Appearance</p><p className="mt-1 text-xs text-gray-500">Dark mode</p></div></div><span className="border border-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Current</span></div>
      </section>
    </div>
  </div>
);
