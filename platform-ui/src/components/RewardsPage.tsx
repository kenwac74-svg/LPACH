import { useMemo, useState } from 'react';
import { Copy, Medal, Network, Target, UserPlus, Users } from 'lucide-react';
import { motion } from 'motion/react';

type NetworkTab = 'team' | 'tree' | 'ranks' | 'honor' | 'invite';

const TEAM_MEMBERS = [
  { user: 'Dragon_Master', rank: 'BLACK DRAGON', volume: 15000, members: 28, teamVolume: 385000 },
  { user: 'Golden_Tiger88', rank: 'RED DRAGON', volume: 8000, members: 21, teamVolume: 292000 },
  { user: 'Phoenix_Alpha', rank: 'BLUE DRAGON', volume: 12000, members: 17, teamVolume: 245000 },
  { user: 'Crypto_King', rank: 'WHITE DRAGON', volume: 3000, members: 14, teamVolume: 198000 },
  { user: 'Noble_Dragon', rank: 'BLACK DRAGON', volume: 15000, members: 13, teamVolume: 176000 },
  { user: 'Elite_Falcon', rank: 'RED DRAGON', volume: 10000, members: 11, teamVolume: 145000 },
  { user: 'Rich_Panda', rank: 'PURPLE DRAGON', volume: 5000, members: 9, teamVolume: 118000 },
  { user: 'Lion_Wealth', rank: 'WHITE DRAGON', volume: 1000, members: 8, teamVolume: 96000 },
  { user: 'Alpha_Trader', rank: 'BLUE DRAGON', volume: 2500, members: 6, teamVolume: 72000 },
  { user: 'Ace_Direct', rank: 'WHITE DRAGON', volume: 500, members: 4, teamVolume: 41000 },
];

const rankDefinitions = [
  { key: 'white', name: 'WHITE DRAGON', qualification: 'Basic ($200+) · No rollup required', benefit: '10% Direct Referral' },
  { key: 'blue', name: 'BLUE DRAGON', qualification: 'Standard ($500+) · Direct Refs × 3 White', benefit: '3-Tier Rollup' },
  { key: 'purple', name: 'PURPLE DRAGON', qualification: 'Premium ($1,000+) · Direct Refs × 5 · Team Vol. $10,000', benefit: '7-Tier Rollup' },
  { key: 'red', name: 'RED DRAGON', qualification: 'VIP ($5,000+) · Direct Refs × 10 · Team Vol. $100,000', benefit: '15-Tier + 1% Pool' },
  { key: 'black', name: 'BLACK DRAGON', qualification: '$10,000+ · Direct Refs × 15 · Team Vol. $1,000,000', benefit: '25-Tier + 1% Pool' },
];

const labelForRank = (rank: string) => rank.toLowerCase().replace(' dragon', '');
const number = (value: number) => value.toLocaleString();

const SectionHeading = ({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) => (
  <div className="mb-6">
    <p className="text-[10px] font-black uppercase tracking-[0.38em] text-luxury-gold">{eyebrow}</p>
    <h2 className="mt-2 font-serif text-3xl font-black text-white lg:text-4xl">{title}</h2>
    {copy && <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">{copy}</p>}
  </div>
);

export const RewardsPage = ({ user }: { user: any; onUpdateUser?: (u: any) => void; onSetView?: (v: any) => void }) => {
  const [tab, setTab] = useState<NetworkTab>('team');
  const currentRank = labelForRank(user.rank || 'White Dragon');
  const ranked = useMemo(() => [...TEAM_MEMBERS].sort((a, b) => b.teamVolume - a.teamVolume), []);

  const tabs: { id: NetworkTab; label: string; icon: typeof Users }[] = [
    { id: 'team', label: 'Team', icon: Users },
    { id: 'tree', label: 'Tree', icon: Network },
    { id: 'ranks', label: 'Ranks', icon: Target },
    { id: 'honor', label: 'Honor', icon: Medal },
    { id: 'invite', label: 'Invite', icon: UserPlus },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-28 pt-24 sm:px-5 lg:px-10 lg:pb-20 lg:pt-32">
      <header className="mb-6 border-b border-white/10 pb-5">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">LONGRISE</p>
        <h1 className="mt-1 font-serif text-4xl font-black text-white lg:text-6xl">Network</h1>
      </header>

      <nav className="lr-tabs mb-6 grid grid-cols-5 p-1">
        {tabs.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`lr-tab flex min-h-14 flex-col items-center justify-center gap-1 px-2 py-2 text-[9px] font-black uppercase tracking-wider transition-colors lg:min-h-12 lg:flex-row lg:gap-2 lg:text-[11px] ${tab === item.id ? 'bg-luxury-gold text-black' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
            <item.icon size={16} /> {item.label}
          </button>
        ))}
      </nav>

      {tab === 'team' && (
        <section className="lr-panel p-5 lg:p-7">
          <SectionHeading eyebrow="Direct Network" title="Team Members" copy="Volume, member count and team volume use the same data set as Honor rankings." />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-[9px] uppercase tracking-[0.2em] text-gray-500"><tr><th className="border-b border-white/10 pb-3">User</th><th className="border-b border-white/10 pb-3">Rank</th><th className="border-b border-white/10 pb-3">Volume</th><th className="border-b border-white/10 pb-3">Members</th><th className="border-b border-white/10 pb-3 text-right">Team Vol.</th></tr></thead>
              <tbody>{TEAM_MEMBERS.map((member) => <tr key={member.user}><td className="border-b border-white/5 py-4 font-black text-white">{member.user}</td><td className="border-b border-white/5 py-4 text-gray-400">{member.rank}</td><td className="border-b border-white/5 py-4 font-mono text-white">{number(member.volume)} USDT</td><td className="border-b border-white/5 py-4 text-gray-400">{member.members}</td><td className="border-b border-white/5 py-4 text-right font-mono font-black text-luxury-gold">{number(member.teamVolume)} USDT</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      )}

      {tab === 'tree' && (
        <section className="lr-panel p-5 lg:p-7">
          <SectionHeading eyebrow="Organization" title="Network Tree" copy="A compact hierarchy for checking direct and lower-level network relationships." />
          <div className="mx-auto max-w-4xl">
            <div className="lr-card mx-auto w-fit border-luxury-gold/45 bg-luxury-gold/[0.07] px-6 py-4 text-center"><p className="font-black text-white">{user.nickname || user.name}</p><p className="mt-1 text-[9px] font-black uppercase tracking-widest text-luxury-gold">{user.rank}</p></div>
            <div className="mx-auto h-8 w-px bg-luxury-gold/35" />
            <div className="grid gap-3 md:grid-cols-3">{TEAM_MEMBERS.slice(0, 3).map((member) => <div key={member.user} className="lr-card p-4 text-center"><p className="font-black text-white">{member.user}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-gray-500">{member.rank}</p><p className="mt-4 font-mono text-sm font-black text-luxury-gold">{number(member.teamVolume)} USDT</p></div>)}</div>
          </div>
        </section>
      )}

      {tab === 'ranks' && (
        <div>
          <SectionHeading eyebrow="Current Rank" title={user.rank || 'White Dragon'} copy="Only the user's active rank is highlighted. Higher ranks remain available as progress targets." />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {rankDefinitions.map((rank) => {
              const active = rank.key === currentRank;
              const black = rank.key === 'black';
              return (
                <motion.div key={rank.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={`lr-card relative min-h-64 overflow-hidden p-5 ${active ? 'border-luxury-gold bg-luxury-gold/[0.07] shadow-[0_0_28px_rgba(201,146,42,0.14)]' : black ? 'border-luxury-gold/35 bg-[#050403]' : 'opacity-70'}`}>
                  <img src={`./rank-logos/icon/${rank.key}.png`} alt="" aria-hidden="true" className="pointer-events-none absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.13]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3"><h3 className={`text-sm font-black tracking-widest ${black ? 'text-luxury-gold' : 'text-white'}`}>{rank.name}</h3>{active && <span className="border border-luxury-gold/55 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-luxury-gold">Current</span>}</div>
                    <p className="mt-8 text-[9px] font-black uppercase tracking-widest text-gray-600">Qualification</p><p className="mt-2 text-xs leading-5 text-gray-300">{rank.qualification}</p>
                    <div className="mt-auto border-t border-white/10 pt-4"><p className="text-[9px] font-black uppercase tracking-widest text-gray-600">Benefit</p><p className={`mt-2 text-sm font-black ${black ? 'text-luxury-gold' : 'text-white'}`}>{rank.benefit}</p></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'honor' && (
        <section className="lr-panel p-5 lg:p-7">
          <SectionHeading eyebrow="Hall of Honor" title="Top 10 Members" copy="Ranked by Team Volume using the same records shown in Team." />
          <div className="space-y-2">
            {ranked.map((member, index) => {
              const medal = index === 0 ? 'GOLD' : index === 1 ? 'SILVER' : index === 2 ? 'BRONZE' : `${index + 1}`;
              const medalClass = index === 0 ? 'border-amber-400/50 bg-amber-400/10 text-amber-300' : index === 1 ? 'border-gray-300/40 bg-gray-300/10 text-gray-200' : index === 2 ? 'border-orange-500/45 bg-orange-500/10 text-orange-300' : 'border-white/10 bg-white/[0.03] text-gray-500';
              return <div key={member.user} className="lr-card grid grid-cols-[70px_1fr_auto] items-center gap-3 p-3 lg:grid-cols-[110px_1fr_150px_120px_170px] lg:px-5"><span className={`flex h-10 items-center justify-center rounded-[var(--lr-radius-control)] border text-[9px] font-black tracking-widest ${medalClass}`}>{medal}</span><div><p className="font-black text-white">{member.user}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-gray-600">{member.rank}</p></div><p className="hidden font-mono text-sm text-white lg:block">{number(member.volume)} USDT</p><p className="hidden text-center text-sm text-gray-400 lg:block">{member.members} Members</p><p className="text-right font-mono text-sm font-black text-luxury-gold">{number(member.teamVolume)} <span className="hidden text-[9px] lg:inline">USDT</span></p></div>;
            })}
          </div>
        </section>
      )}

      {tab === 'invite' && (
        <section className="lr-panel mx-auto max-w-3xl p-6 lg:p-8">
          <SectionHeading eyebrow="Referral" title="Invite a Member" copy="Share your referral link. New accounts are identified by email and their unique platform number." />
          <div className="lr-control flex flex-col gap-2 p-2 sm:flex-row"><input readOnly value="https://longrise.ai/join?ref=CK88" className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-sm text-gray-400 outline-none"/><button className="lr-button-primary flex items-center justify-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-widest"><Copy size={16}/> Copy Link</button></div>
        </section>
      )}
    </div>
  );
};
