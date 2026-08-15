import {
  Bell,
  BookOpen,
  ChevronRight,
  CircleDollarSign,
  Gift,
  Headphones,
  LogOut,
  Network,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  RefreshCcw,
} from 'lucide-react';

type Destination = 'plans' | 'network' | 'earn' | 'wallet' | 'profile' | 'security' | 'support' | 'notices' | 'news' | 'settings' | 'faq';
type WalletAction = 'deposit' | 'withdraw' | 'send' | 'swap';

interface AllPageProps {
  onNavigate: (destination: Destination) => void;
  onWalletAction: (action: WalletAction) => void;
  onLogout: () => void;
}

const sectionClass = 'border border-white/10 bg-black/25 p-5 lg:p-7';

const Tile = ({ icon: Icon, label, note, onClick }: {
  icon: typeof Wallet;
  label: string;
  note?: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex min-h-20 items-center gap-4 border border-white/10 bg-white/[0.035] p-4 text-left transition-colors hover:border-luxury-gold/45 hover:bg-luxury-gold/[0.06]"
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-luxury-gold/25 bg-black/40 text-luxury-gold">
      <Icon size={20} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-black text-white">{label}</span>
      {note && <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-gray-500">{note}</span>}
    </span>
    <ChevronRight size={17} className="text-gray-600 transition-transform group-hover:translate-x-1 group-hover:text-luxury-gold" />
  </button>
);

export const AllPage = ({ onNavigate, onWalletAction, onLogout }: AllPageProps) => (
  <div className="mx-auto min-h-screen max-w-7xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
    <div className="mb-8">
      <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Navigation</p>
      <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">All</h1>
    </div>

    <div className="grid gap-5 lg:grid-cols-3">
      <section className={sectionClass}>
        <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-luxury-gold">Main</h2>
        <div className="grid gap-2">
          <Tile icon={CircleDollarSign} label="Plans" onClick={() => onNavigate('plans')} />
          <Tile icon={Network} label="Network" onClick={() => onNavigate('network')} />
          <Tile icon={Gift} label="Earn" onClick={() => onNavigate('earn')} />
          <Tile icon={Wallet} label="Wallet" onClick={() => onNavigate('wallet')} />
          <Tile icon={User} label="Profile" onClick={() => onNavigate('profile')} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-luxury-gold">Wallet Actions</h2>
        <div className="grid gap-2">
          <Tile icon={ArrowDownToLine} label="Deposit" note="TRC20" onClick={() => onWalletAction('deposit')} />
          <Tile icon={ArrowUpFromLine} label="Withdraw" note="Daily at UTC 09:00" onClick={() => onWalletAction('withdraw')} />
          <Tile icon={Send} label="Send" note="Internal USDT transfer" onClick={() => onWalletAction('send')} />
          <Tile icon={RefreshCcw} label="Swap" note="Reward conversion" onClick={() => onWalletAction('swap')} />
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-luxury-gold">Account</h2>
        <div className="grid gap-2">
          <Tile icon={Bell} label="Alerts" onClick={() => onNavigate('notices')} />
          <Tile icon={BookOpen} label="News" onClick={() => onNavigate('news')} />
          <Tile icon={BookOpen} label="FAQ" onClick={() => onNavigate('faq')} />
          <Tile icon={ShieldCheck} label="Security" onClick={() => onNavigate('security')} />
          <Tile icon={Headphones} label="Support" onClick={() => onNavigate('support')} />
          <Tile icon={Settings} label="Settings" onClick={() => onNavigate('settings')} />
        </div>
      </section>
    </div>

    <button
      onClick={onLogout}
      className="mt-5 flex w-full items-center justify-center gap-3 border border-red-500/30 bg-red-500/[0.04] px-5 py-4 text-xs font-black uppercase tracking-[0.25em] text-red-400 transition-colors hover:bg-red-500/10"
    >
      <LogOut size={18} /> Sign Out
    </button>
  </div>
);
