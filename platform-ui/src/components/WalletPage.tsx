import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Gem,
  Gift,
  History,
  Landmark,
  LockKeyhole,
  Package,
  RefreshCcw,
  Send,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type WalletSection = 'assets' | 'deposit' | 'withdraw' | 'send' | 'swap' | 'history' | 'addresses';
type HistoryTab = 'package' | 'transfer' | 'earn';

interface WalletPageProps {
  user: any;
  initialSection?: WalletSection;
}

const WITHDRAWAL_BALANCE = 1023;
const cardClass = 'border border-white/10 bg-black/30 p-5 lg:p-6';
const inputClass = 'w-full border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-luxury-gold/55';

const format = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Modal = ({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
    <button aria-label="Close dialog" className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md border border-luxury-gold/30 bg-[#150606] p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-black text-white">{title}</h2>
        <button aria-label="Close" onClick={onClose} className="flex h-10 w-10 items-center justify-center border border-white/10 text-gray-400 hover:text-white"><X size={19} /></button>
      </div>
      {children}
    </motion.div>
  </div>
);

export const WalletPage = ({ user, initialSection = 'assets' }: WalletPageProps) => {
  const [section, setSection] = useState<WalletSection>(initialSection);
  const [historyTab, setHistoryTab] = useState<HistoryTab>('package');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendReview, setSendReview] = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; title: string; message: string } | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawReview, setWithdrawReview] = useState(false);
  const [swapAmount, setSwapAmount] = useState('');

  useEffect(() => setSection(initialSection), [initialSection]);

  const totalAssets = useMemo(() => WITHDRAWAL_BALANCE + 450 + 1700, []);
  const sendValue = Number(sendAmount || 0);
  const withdrawValue = Number(withdrawAmount || 0);

  const navigation: { key: WalletSection; label: string; icon: typeof Wallet }[] = [
    { key: 'assets', label: 'Assets', icon: Wallet },
    { key: 'deposit', label: 'Deposit', icon: ArrowDownToLine },
    { key: 'withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
    { key: 'send', label: 'Send', icon: Send },
    { key: 'history', label: 'History', icon: History },
    { key: 'addresses', label: 'Addresses', icon: Landmark },
  ];

  const openHistory = (tab: HistoryTab) => {
    setHistoryTab(tab);
    setSection('history');
  };

  const reviewSend = (event: FormEvent) => {
    event.preventDefault();
    if (!sendRecipient.trim() || sendValue <= 0) {
      setSendResult({ ok: false, title: 'Check Transfer Details', message: 'Enter a valid recipient username and amount.' });
      return;
    }
    if (sendValue > WITHDRAWAL_BALANCE) {
      setSendResult({ ok: false, title: 'Insufficient Balance', message: `Your available balance is ${format(WITHDRAWAL_BALANCE)} USDT.` });
      return;
    }
    setSendReview(true);
  };

  const confirmSend = () => {
    setSendReview(false);
    setSendResult({ ok: true, title: 'Transfer Complete', message: `${format(sendValue)} USDT was sent to ${sendRecipient.trim()}.` });
    setHistoryTab('transfer');
    setSection('history');
    setSendAmount('');
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-28 pt-24 sm:px-5 lg:px-10 lg:pb-20 lg:pt-32">
      <header className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">LONGRISE</p>
          <h1 className="mt-1 font-serif text-4xl font-black text-white lg:text-6xl">Wallet</h1>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500">Total Assets</p>
          <p className="mt-1 font-mono text-2xl font-black text-luxury-gold lg:text-4xl">{format(totalAssets)} <span className="text-[10px]">USDT</span></p>
        </div>
      </header>

      <div className="mb-5 grid grid-cols-3 gap-2 lg:hidden">
        {[
          { key: 'deposit' as const, label: 'Deposit', icon: ArrowDownToLine },
          { key: 'withdraw' as const, label: 'Withdraw', icon: ArrowUpFromLine },
          { key: 'send' as const, label: 'Send', icon: Send },
        ].map((action) => (
          <button key={action.key} onClick={() => setSection(action.key)} className={`flex min-h-20 flex-col items-center justify-center gap-2 border px-2 py-3 text-[10px] font-black uppercase tracking-widest ${section === action.key ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold' : 'border-white/10 bg-black/30 text-gray-300'}`}>
            <action.icon size={20} /> {action.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden self-start border border-white/10 bg-black/30 p-3 lg:block lg:sticky lg:top-28">
          <p className="px-3 pb-3 pt-2 text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Wallet Menu</p>
          <div className="space-y-1">
            {navigation.map((item) => (
              <button key={item.key} onClick={() => setSection(item.key)} className={`flex w-full items-center gap-3 border px-3 py-3 text-left text-xs font-black uppercase tracking-widest transition-colors ${section === item.key ? 'border-luxury-gold/55 bg-luxury-gold/10 text-luxury-gold' : 'border-transparent text-gray-400 hover:border-white/10 hover:text-white'}`}>
                <item.icon size={17} /> {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="px-3 text-[9px] font-black uppercase tracking-widest text-gray-600">Total Assets</p>
            <p className="px-3 pt-2 font-mono text-lg font-black text-white">{format(totalAssets)} USDT</p>
          </div>
        </aside>

        <main className="min-w-0">
          {section === 'assets' && (
            <div className="space-y-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <button onClick={() => setSection('withdraw')} className={`${cardClass} text-left hover:border-luxury-gold/45`}>
                  <Wallet size={22} className="text-luxury-gold" />
                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">Withdrawal Balance</p>
                  <p className="mt-2 font-mono text-2xl font-black text-white">1,023.00 <span className="text-[10px] text-gray-500">USDT</span></p>
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                    <div className="flex justify-between text-gray-400"><span>Deposit balance</span><strong className="text-white">1,000.00</strong></div>
                    <div className="flex justify-between text-gray-400"><span>Earnings balance</span><strong className="text-luxury-gold">23.00</strong></div>
                  </div>
                </button>

                <div className={cardClass}>
                  <Gift size={22} className="text-luxury-gold" />
                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">Bonus USDT</p>
                  <p className="mt-2 font-mono text-2xl font-black text-white">450.00 <span className="text-[10px] text-gray-500">USDT</span></p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-widest text-red-400">Non-withdrawable</p>
                </div>

                <button onClick={() => openHistory('package')} className={`${cardClass} text-left hover:border-luxury-gold/45`}>
                  <Package size={22} className="text-luxury-gold" />
                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">Package Value</p>
                  <p className="mt-2 font-mono text-2xl font-black text-white">1,700.00 <span className="text-[10px] text-gray-500">USDT</span></p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-widest text-emerald-400">Status · Earning</p>
                </button>

                <div className={cardClass}>
                  <Gem size={22} className="text-luxury-gold" />
                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">CNYT Tokens</p>
                  <p className="mt-2 font-mono text-2xl font-black text-white">553.00 <span className="text-[10px] text-gray-500">CNYT</span></p>
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                    <div className="flex justify-between text-gray-400"><span>Available</span><strong className="text-white">53.00</strong></div>
                    <div className="flex justify-between text-gray-400"><span>Staked</span><strong className="text-luxury-gold">500.00</strong></div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className={cardClass}>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Recent Deposit</p>
                  <div className="mt-4 flex items-center justify-between gap-4"><div><p className="font-black text-white">480.00 USDT</p><p className="mt-1 text-xs text-gray-500">TRC20 · Confirmed</p></div><CheckCircle2 className="text-emerald-400" size={22} /></div>
                </div>
                <div className={cardClass}>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">Withdrawal Pending</p>
                  <div className="mt-4 flex items-center justify-between gap-4"><div><p className="font-black text-white">120.00 USDT</p><p className="mt-1 text-xs text-gray-500">Next batch · UTC 09:00</p></div><Clock3 className="text-luxury-gold" size={22} /></div>
                </div>
              </div>
            </div>
          )}

          {section === 'deposit' && (
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <section className={cardClass}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Deposit</p>
                <h2 className="mt-2 font-serif text-3xl font-black text-white">Receive USDT</h2>
                <p className="mt-3 text-sm leading-6 text-gray-400">Select the same network in the sending wallet. Deposits are credited after 19 confirmations.</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button className="border border-luxury-gold bg-luxury-gold/10 px-4 py-4 text-xs font-black text-luxury-gold">TRC20</button>
                  <button disabled className="cursor-not-allowed border border-white/10 bg-white/[0.02] px-4 py-4 text-xs font-black text-gray-600">BEP20 <span className="block pt-1 text-[8px] uppercase tracking-widest">Coming Soon</span></button>
                </div>
                <div className="mt-5 grid gap-4 border border-white/10 bg-black/45 p-4 sm:grid-cols-[148px_1fr] sm:items-center">
                  <div className="bg-white p-2">
                    <img src="./deposit-trc20-qr.png" alt="TRC20 USDT deposit address QR code" className="aspect-square w-full" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Your deposit address</p>
                    <div className="mt-3 flex items-center gap-3"><code className="min-w-0 flex-1 break-all text-sm text-white">TN9f3hD8J7uK5xQ2mY4cV6bW1sR8pL0aZ</code><button aria-label="Copy address" className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-luxury-gold"><Copy size={17} /></button></div>
                    <p className="mt-3 text-xs leading-5 text-gray-500">Scan with a TRC20-compatible wallet. Confirm the network before sending.</p>
                  </div>
                </div>
              </section>
              <aside className={cardClass}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Deposit Notice</p>
                <h2 className="mt-2 font-serif text-3xl font-black text-white">Balance Credit</h2>
                <div className="mt-6 space-y-3">
                  <div className="border border-emerald-500/25 bg-emerald-500/[0.04] p-4"><p className="font-black text-white">Wallet balance first</p><p className="mt-2 text-sm leading-6 text-gray-400">Deposits are credited to Withdrawal Balance. Packages are purchased separately.</p></div>
                  <div className="border border-luxury-gold/25 bg-luxury-gold/[0.04] p-4"><p className="font-black text-white">Service region restrictions</p><p className="mt-2 text-sm leading-6 text-gray-400">Exchanges located in service-restricted countries are not supported for deposits or withdrawals.</p></div>
                </div>
              </aside>
            </div>
          )}

          {section === 'withdraw' && (
            <section className={`${cardClass} max-w-3xl`}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Withdraw</p>
              <h2 className="mt-2 font-serif text-3xl font-black text-white">Request USDT Withdrawal</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">Requests are processed once daily at UTC 09:00. Only approved Main or Sub addresses can be selected.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Address</span><select className={inputClass}><option>Main · TN8...4Pk</option><option>Sub · TP2...7Qa</option></select></label>
                <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Network</span><input className={inputClass} value="TRC20" disabled /></label>
              </div>
              <label className="mt-4 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</span><div className="relative"><input value={withdrawAmount} onChange={(event) => setWithdrawAmount(event.target.value)} type="number" min="10" className={inputClass} placeholder="Minimum 10 USDT" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">USDT</span></div></label>
              <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/10 py-4 text-sm"><div><p className="text-gray-500">Network fee</p><p className="mt-1 font-black text-white">1.00 USDT</p></div><div><p className="text-gray-500">You receive</p><p className="mt-1 font-black text-luxury-gold">{format(Math.max(0, withdrawValue - 1))} USDT</p></div></div>
              <button disabled={withdrawValue < 10 || withdrawValue > WITHDRAWAL_BALANCE} onClick={() => setWithdrawReview(true)} className="mt-6 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-black disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600">Review Withdrawal</button>
            </section>
          )}

          {section === 'send' && (
            <form onSubmit={reviewSend} className={`${cardClass} max-w-3xl`}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Send</p>
              <h2 className="mt-2 font-serif text-3xl font-black text-white">Send USDT Internally</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">Internal transfers are recorded on the platform ledger and do not create an on-chain TxID.</p>
              <label className="mt-6 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Recipient username</span><input value={sendRecipient} onChange={(event) => setSendRecipient(event.target.value)} className={inputClass} placeholder="Enter exact username" /></label>
              <label className="mt-4 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</span><div className="relative"><input value={sendAmount} onChange={(event) => setSendAmount(event.target.value)} type="number" min="0" className={inputClass} placeholder="0.00" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">USDT</span></div></label>
              <div className="mt-4 flex justify-between border-y border-white/10 py-4 text-sm"><span className="text-gray-500">Available balance</span><strong className="text-white">{format(WITHDRAWAL_BALANCE)} USDT</strong></div>
              <button className="mt-6 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-black">Review Transfer</button>
            </form>
          )}

          {section === 'swap' && (
            <section className={`${cardClass} max-w-3xl`}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Action</p>
              <h2 className="mt-2 font-serif text-3xl font-black text-white">Swap Rewards → CNYT</h2>
              <label className="mt-6 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Pay · Earned USDT</span><div className="relative"><input value={swapAmount} onChange={(event) => setSwapAmount(event.target.value)} type="number" className={inputClass} placeholder="0.00" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">USDT</span></div></label>
              <p className="mt-2 text-xs text-gray-500">Earned balance 23.00 USDT</p>
              <div className="mt-6 border border-luxury-gold/25 bg-black/40 p-5 text-sm"><div className="flex justify-between"><span className="text-gray-500">Rate</span><strong className="text-white">1 USDT = 7.08 CNYT</strong></div><div className="mt-4 flex justify-between"><span className="text-gray-500">You receive</span><strong className="text-emerald-400">{format(Number(swapAmount || 0) * 7.08)} CNYT</strong></div></div>
              <button disabled={Number(swapAmount || 0) <= 0 || Number(swapAmount || 0) > 23} className="mt-6 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-black disabled:bg-gray-800 disabled:text-gray-600">Review Conversion</button>
            </section>
          )}

          {section === 'history' && (
            <section className={cardClass}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Recent 30 Days</p>
              <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="font-serif text-3xl font-black text-white">History</h2><div className="grid grid-cols-3 gap-2">{([['package','Package'],['transfer','Transfer'],['earn','Earn & Reward']] as [HistoryTab,string][]).map(([key,label]) => <button key={key} onClick={() => setHistoryTab(key)} className={`border px-3 py-3 text-[10px] font-black uppercase tracking-widest ${historyTab === key ? 'border-luxury-gold bg-luxury-gold text-black' : 'border-white/10 text-gray-400'}`}>{label}</button>)}</div></div>
              <div className="mt-6 overflow-x-auto">
                {historyTab === 'package' && <table className="w-full min-w-[620px] text-left text-sm"><thead className="text-[9px] uppercase tracking-widest text-gray-500"><tr><th className="border-b border-white/10 pb-3">Package</th><th className="border-b border-white/10 pb-3">Date</th><th className="border-b border-white/10 pb-3">Amount</th><th className="border-b border-white/10 pb-3">Status</th></tr></thead><tbody><tr><td className="py-4 font-black text-white">Premium</td><td className="py-4 text-gray-400">2026-08-01</td><td className="py-4 font-mono text-white">1,000 USDT</td><td className="py-4 text-emerald-400">ACTIVE</td></tr><tr><td className="border-t border-white/5 py-4 font-black text-white">Flexible</td><td className="border-t border-white/5 py-4 text-gray-400">2026-07-24</td><td className="border-t border-white/5 py-4 font-mono text-white">100 USDT</td><td className="border-t border-white/5 py-4 text-gray-400">MATURITY</td></tr></tbody></table>}
                {historyTab === 'transfer' && <table className="w-full min-w-[720px] text-left text-sm"><thead className="text-[9px] uppercase tracking-widest text-gray-500"><tr><th className="border-b border-white/10 pb-3">Type / Status</th><th className="border-b border-white/10 pb-3">Date</th><th className="border-b border-white/10 pb-3">Amount</th><th className="border-b border-white/10 pb-3">Address</th><th className="border-b border-white/10 pb-3">TxID Log</th></tr></thead><tbody><tr><td className="py-4 font-black text-white">Deposit · Completed</td><td className="py-4 text-gray-400">2026-08-14</td><td className="py-4 font-mono text-emerald-400">+480.00 USDT</td><td className="py-4 text-gray-600">Not displayed</td><td className="py-4 text-luxury-gold">6af3...81d2</td></tr><tr><td className="border-t border-white/5 py-4 font-black text-white">Send · Completed</td><td className="border-t border-white/5 py-4 text-gray-400">2026-08-13</td><td className="border-t border-white/5 py-4 font-mono text-red-400">-25.00 USDT</td><td className="border-t border-white/5 py-4 text-gray-400">Dragon_Master</td><td className="border-t border-white/5 py-4 text-gray-500">Internal log</td></tr></tbody></table>}
                {historyTab === 'earn' && <table className="w-full min-w-[620px] text-left text-sm"><thead className="text-[9px] uppercase tracking-widest text-gray-500"><tr><th className="border-b border-white/10 pb-3">Type</th><th className="border-b border-white/10 pb-3">Date</th><th className="border-b border-white/10 pb-3">Source</th><th className="border-b border-white/10 pb-3">Amount</th></tr></thead><tbody><tr><td className="py-4 font-black text-white">USDT Daily Earning</td><td className="py-4 text-gray-400">2026-08-14</td><td className="py-4 text-gray-400">Premium</td><td className="py-4 font-mono text-emerald-400">+3.67 USDT</td></tr><tr><td className="border-t border-white/5 py-4 font-black text-white">CNYT Daily Reward</td><td className="border-t border-white/5 py-4 text-gray-400">2026-08-14</td><td className="border-t border-white/5 py-4 text-gray-400">Premium</td><td className="border-t border-white/5 py-4 font-mono text-luxury-gold">+0.55 CNYT</td></tr></tbody></table>}
              </div>
            </section>
          )}

          {section === 'addresses' && (
            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <section className={cardClass}><p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Address Book</p><h2 className="mt-2 font-serif text-3xl font-black text-white">Approved Withdrawal Addresses</h2><div className="mt-6 space-y-3">{[['Main','TN8f...4Pk','Active'],['Sub','TP2d...7Qa','Active']].map(([name,address,status]) => <div key={name} className="border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between"><strong className="text-white">{name} Address</strong><span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">{status}</span></div><code className="mt-3 block text-sm text-gray-400">{address}</code></div>)}</div><button className="mt-4 w-full border border-luxury-gold/35 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-luxury-gold">Request Address Change</button></section>
              <aside className={cardClass}><p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold">Security</p><h2 className="mt-2 font-serif text-3xl font-black text-white">Wallet Safety</h2><div className="mt-6 space-y-3"><div className="border border-luxury-gold/25 bg-luxury-gold/[0.04] p-4"><ShieldCheck size={20} className="text-luxury-gold"/><p className="mt-3 font-black text-white">Address changes require review</p><p className="mt-2 text-sm leading-6 text-gray-400">Main and Sub address changes require OTP verification and administrator approval before use.</p></div><div className="border border-white/10 p-4"><LockKeyhole size={20} className="text-gray-400"/><p className="mt-3 text-sm leading-6 text-gray-400">Always verify the selected network. Rejected or failed withdrawals are restored to your balance. Bonus USDT is not withdrawable.</p></div></div></aside>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {sendReview && <Modal title="Confirm Transfer" onClose={() => setSendReview(false)}><div className="border border-red-500/25 bg-red-500/[0.05] p-4"><AlertCircle size={21} className="text-red-400"/><p className="mt-3 text-sm font-black text-white">Internal transfers cannot be reversed.</p><p className="mt-2 text-sm leading-6 text-gray-400">Check the recipient username and amount carefully before sending.</p></div><div className="mt-5 space-y-3 border-y border-white/10 py-4 text-sm"><div className="flex justify-between gap-4"><span className="text-gray-500">Recipient</span><strong className="text-white">{sendRecipient}</strong></div><div className="flex justify-between gap-4"><span className="text-gray-500">Amount</span><strong className="text-luxury-gold">{format(sendValue)} USDT</strong></div></div><button onClick={confirmSend} className="mt-5 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black">Confirm Send</button></Modal>}
        {sendResult && <Modal title={sendResult.title} onClose={() => setSendResult(null)}><div className="flex flex-col items-center py-3 text-center">{sendResult.ok ? <CheckCircle2 size={42} className="text-emerald-400"/> : <AlertCircle size={42} className="text-red-400"/>}<p className="mt-5 text-sm leading-6 text-gray-300">{sendResult.message}</p><button onClick={() => setSendResult(null)} className="mt-6 w-full border border-white/15 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white">Close</button></div></Modal>}
        {withdrawReview && <Modal title="Confirm Withdrawal" onClose={() => setWithdrawReview(false)}><div className="space-y-3 border-y border-white/10 py-4 text-sm"><div className="flex justify-between"><span className="text-gray-500">Amount</span><strong className="text-white">{format(withdrawValue)} USDT</strong></div><div className="flex justify-between"><span className="text-gray-500">Fee</span><strong className="text-white">1.00 USDT</strong></div><div className="flex justify-between"><span className="text-gray-500">Receive</span><strong className="text-luxury-gold">{format(withdrawValue - 1)} USDT</strong></div></div><p className="mt-4 text-sm leading-6 text-gray-400">The request will enter the next UTC 09:00 processing batch.</p><button onClick={() => {setWithdrawReview(false); setHistoryTab('transfer'); setSection('history');}} className="mt-5 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black">Confirm Request</button></Modal>}
      </AnimatePresence>
    </div>
  );
};
