import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  Eye,
  EyeOff,
  Gift,
  Globe2,
  LogIn,
  LogOut,
  Menu,
  Network,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  X,
  BookOpen,
  Headphones,
} from 'lucide-react';

import { NetworkOverlay } from './components/VisualEffects';
import { HomePage } from './components/HomePage';
import { PackagesPage } from './components/PackagesPage';
import { RewardsPage } from './components/RewardsPage';
import { WalletPage, WalletSection } from './components/WalletPage';
import { EarnPage } from './components/EarnPage';
import { ProfilePage } from './components/ProfilePage';
import { SecurityPage } from './components/SecurityPage';
import { SupportPage } from './components/SupportPage';
import { NoticesPage } from './components/NoticesPage';
import { NewsPage } from './components/NewsPage';
import { HeaderAlerts } from './components/HeaderAlerts';
import { SiteFooter } from './components/SiteFooter';
import { NewsPopup } from './components/NewsPopup';
import { PlatformSettingsPage } from './components/PlatformSettingsPage';
import { FaqPage } from './components/FaqPage';
import { SHARED_MOCK_USERS } from './shared/mockData';
import { UserData } from './shared/types';

type View = 'home' | 'plans' | 'network' | 'earn' | 'wallet' | 'profile' | 'security' | 'support' | 'notices' | 'news' | 'settings' | 'faq';

const LANGUAGE_OPTIONS = [
  { code: 'EN', label: 'English', enabled: true },
  { code: 'ZH', label: 'Chinese', enabled: false },
  { code: 'KO', label: 'Korean', enabled: false },
  { code: 'VI', label: 'Vietnamese', enabled: false },
  { code: 'TH', label: 'Thai', enabled: false },
  { code: 'ID', label: 'Indonesian', enabled: false },
  { code: 'JA', label: 'Japanese', enabled: false },
  { code: 'RU', label: 'Russian', enabled: false },
];

const PACKAGE_POLICY = {
  flexible: { name: 'Flexible', price: 100, annualUsdt: '48%~', annualCnyt: 'None', term: 'No lock-in' },
  basic: { name: 'Basic', price: 200, annualUsdt: '84%~', annualCnyt: '2%~', term: '12 months' },
  standard: { name: 'Standard', price: 500, annualUsdt: '108%~', annualCnyt: '4%~', term: '12 months' },
  premium: { name: 'Premium', price: 1000, annualUsdt: '132%~', annualCnyt: '6%~', term: '12 months' },
  vip: { name: 'VIP', price: 5000, annualUsdt: '216%~', annualCnyt: '10%~', term: '12 months' },
};

const navItems: { id: View; label: string; icon: typeof Wallet }[] = [
  { id: 'plans', label: 'Plans', icon: CircleDollarSign },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'earn', label: 'Earn', icon: Gift },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
];

const LoginPanel = ({ fullPage = false, onClose, onSuccess }: { fullPage?: boolean; onClose?: () => void; onSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and password.');
      return;
    }
    onSuccess();
  };

  const panel = (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`relative z-10 w-full max-w-md rounded-lg border border-luxury-gold/30 bg-[#130505] p-6 shadow-2xl ${fullPage ? '' : 'sm:p-8'}`}>
      {onClose && <button aria-label="Close login" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/10 text-gray-400 hover:text-white"><X size={18}/></button>}
      <div className="mb-7 flex items-center gap-3"><img src="./rank-logos/icon/gold.png" alt="LONGRISE" className="h-11 w-11 object-contain"/><div><p className="font-serif text-xl font-black tracking-widest text-white">LONGRISE</p><p className="mt-1 text-[9px] font-black uppercase tracking-[0.25em] text-luxury-gold">Account Login</p></div></div>
      <form onSubmit={submit}>
        <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className="w-full border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none focus:border-luxury-gold/55" placeholder="name@example.com"/></label>
        <label className="mt-4 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Password</span><div className="relative"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" className="w-full border border-white/10 bg-black/45 px-4 py-4 pr-14 text-sm text-white outline-none focus:border-luxury-gold/55" placeholder="Password"/><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-gray-500 hover:text-white">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label>
        {error && <p className="mt-3 text-xs font-bold text-red-400">{error}</p>}
      <button className="lr-button-primary mt-6 flex w-full items-center justify-center gap-2 px-5 py-4 text-xs font-black uppercase tracking-[0.22em]"><LogIn size={17}/> Login</button>
      </form>
      <p className="mt-5 text-center text-[10px] leading-5 text-gray-600">This preview uses mock account data and does not connect to a production server.</p>
    </motion.div>
  );

  if (fullPage) return <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090202] p-5"><NetworkOverlay intensity={0.35} speed={0.25}/>{panel}</div>;
  return <div className="fixed inset-0 z-[160] flex items-center justify-center p-4"><button aria-label="Close login" onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm"/>{panel}</div>;
};

const PurchaseModal = ({ packageId, onClose, onConfirm }: { packageId: string; onClose: () => void; onConfirm: () => void }) => {
  const policy = PACKAGE_POLICY[packageId as keyof typeof PACKAGE_POLICY];
  const [step, setStep] = useState<'review' | 'confirm'>('review');
  if (!policy) return null;
  return <div className="fixed inset-0 z-[150] flex items-center justify-center p-4"><button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm"/><motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} className="relative z-10 w-full max-w-md border border-luxury-gold/30 bg-[#150606] p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-black uppercase tracking-[0.3em] text-luxury-gold">Package Purchase</p><h2 className="mt-2 font-serif text-3xl font-black text-white">{policy.name}</h2></div><button aria-label="Close" onClick={onClose} className="flex h-10 w-10 items-center justify-center border border-white/10 text-gray-400"><X size={18}/></button></div><div className="mt-6 space-y-3 border-y border-white/10 py-5 text-sm"><div className="flex justify-between"><span className="text-gray-500">Package price</span><strong className="text-white">{policy.price.toLocaleString()} USDT</strong></div><div className="flex justify-between"><span className="text-gray-500">Annual return</span><strong className="text-emerald-400">{policy.annualUsdt}</strong></div><div className="flex justify-between"><span className="text-gray-500">Annual CNYT</span><strong className="text-luxury-gold">{policy.annualCnyt}</strong></div><div className="flex justify-between"><span className="text-gray-500">Term</span><strong className="text-white">{policy.term}</strong></div></div>{step === 'review' ? <><p className="mt-5 text-xs leading-5 text-gray-400">Available and eligible Bonus USDT balances are applied according to package payment rules.</p><p className="mt-3 text-[11px] font-bold text-red-300">Package purchases cannot be canceled after confirmation.</p><button onClick={() => setStep('confirm')} className="mt-5 w-full bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black">Review Purchase</button></> : <><div className="mt-5 border border-red-500/25 bg-red-500/[0.05] p-4"><p className="font-black text-white">Confirm {policy.price.toLocaleString()} USDT purchase?</p><p className="mt-2 text-xs leading-5 text-gray-400">Check the package and payment amount. A confirmed purchase cannot be canceled.</p></div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => setStep('review')} className="border border-white/10 px-4 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Back</button><button onClick={onConfirm} className="bg-luxury-gold px-4 py-4 text-xs font-black uppercase tracking-widest text-black">Confirm</button></div></>}</motion.div></div>;
};

const Navbar = ({ currentView, isLoggedIn, user, onNavigate, onLogin, onLogout }: { currentView: View; isLoggedIn: boolean; user: UserData; onNavigate: (view: View) => void; onLogin: () => void; onLogout: () => void }) => {
  const [menu, setMenu] = useState<'profile' | 'language' | null>(null);
  return <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-black/95 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 lg:px-8"><button onClick={() => isLoggedIn ? onNavigate('home') : window.scrollTo({top:0,behavior:'smooth'})} className="flex items-center gap-2.5" aria-label="LONGRISE home"><img src="./rank-logos/icon/gold.png" alt="" className="h-9 w-9 object-contain"/><span className="font-serif text-base font-black tracking-[0.16em] text-[#ead39b] sm:text-lg">LONGRISE</span></button><nav className="hidden items-center gap-1 lg:flex">{navItems.map(item => <button key={item.id} onClick={() => isLoggedIn ? onNavigate(item.id) : onLogin()} className={`flex items-center gap-2 border px-4 py-3 text-[13px] font-extrabold uppercase tracking-[0.08em] ${isLoggedIn && currentView === item.id ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold' : 'border-transparent text-gray-400 hover:border-white/10 hover:text-white'}`}><item.icon size={17}/>{item.label}</button>)}</nav><div className="flex items-center gap-2">{isLoggedIn && <HeaderAlerts onOpenAll={() => onNavigate('notices')}/>}<div className="relative hidden lg:block"><button onClick={() => setMenu(menu === 'language' ? null : 'language')} className="flex h-10 items-center gap-2 px-2 text-gray-400 hover:text-white"><Globe2 size={17}/><span className="text-[10px] font-black">EN</span><ChevronDown size={13}/></button>{menu === 'language' && <div className="absolute right-0 top-12 w-48 border border-luxury-gold/25 bg-[#150606] p-2 shadow-2xl">{LANGUAGE_OPTIONS.map(language => <button key={language.code} disabled={!language.enabled} className={`flex w-full items-center justify-between px-3 py-3 text-left text-xs font-black ${language.enabled ? 'bg-luxury-gold/10 text-white' : 'cursor-not-allowed text-gray-600'}`}><span>{language.label}</span><span className="text-[8px] uppercase tracking-widest">{language.enabled ? 'Active' : 'Soon'}</span></button>)}</div>}</div>{isLoggedIn ? <div className="relative"><button onClick={() => setMenu(menu === 'profile' ? null : 'profile')} className="lr-control flex items-center gap-2 px-2 py-2 text-white"><span className="hidden text-right sm:block"><span className="block text-[8px] font-black uppercase tracking-widest text-luxury-gold">{user.rank}</span><span className="block text-xs font-black">{user.nickname}</span></span><span className="flex h-8 w-8 items-center justify-center bg-luxury-gold text-black"><User size={16}/></span></button>{menu === 'profile' && <div className="absolute right-0 top-14 w-64 border border-luxury-gold/25 bg-[#150606] p-2 shadow-2xl">{[[User,'Profile','profile'],[Bell,'Alerts','notices'],[BookOpen,'FAQ','faq'],[ShieldCheck,'Security','security'],[Headphones,'Support','support'],[Settings,'Settings','settings']].map(([Icon,label,view]: any) => <button key={view} onClick={() => {onNavigate(view);setMenu(null);}} className="flex w-full items-center gap-3 px-3 py-3 text-left text-xs font-black text-gray-300 hover:bg-white/5 hover:text-white"><Icon size={17} className="text-luxury-gold"/>{label}</button>)}<button onClick={onLogout} className="mt-2 flex w-full items-center gap-3 border-t border-white/10 px-3 py-4 text-left text-xs font-black text-red-400"><LogOut size={17}/>Sign Out</button></div>}</div> : <button onClick={onLogin} className="lr-button-login flex items-center gap-2 px-4 py-3 text-[10px] font-black uppercase tracking-widest"><LogIn size={16}/> Login</button>}</div></div></header>;
};

const BottomNavigation = ({ currentView, onNavigate }: { currentView: View; onNavigate: (view: View) => void }) => <nav className="fixed inset-x-0 bottom-0 z-[120] grid grid-cols-5 border-t border-luxury-gold/20 bg-[#0b0303]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">{navItems.map(item => <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 py-2 text-[9px] font-black ${currentView === item.id ? 'text-luxury-gold' : 'text-gray-500'}`}><item.icon size={19}/>{item.label}</button>)}</nav>;

export default function App() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [view, setView] = useState<View>('earn');
  const [requestedView, setRequestedView] = useState<View>('earn');
  const [walletSection, setWalletSection] = useState<WalletSection>('assets');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [user, setUser] = useState<UserData>(SHARED_MOCK_USERS[2]);

  useEffect(() => {const update = () => setIsDesktop(window.innerWidth >= 1024); update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update);}, []);
  useEffect(() => {window.scrollTo({ top: 0, behavior: 'auto' });}, [view]);

  const requestLogin = (destination: View = 'earn') => {setRequestedView(destination); setLoginOpen(true);};
  const login = () => {setIsLoggedIn(true); setLoginOpen(false); setView(requestedView); setShowNewsPopup(true);};
  const logout = () => {setIsLoggedIn(false); setView('earn'); setSelectedPackage(null); setShowNewsPopup(false);};
  const navigate = (destination: View) => {setView(destination); if (destination !== 'wallet') setWalletSection('assets');};
  const openWallet = (section: WalletSection) => {setWalletSection(section); setView('wallet');};
  const selectPackage = (packageId: string) => isLoggedIn ? setSelectedPackage(packageId) : requestLogin('plans');

  if (!isDesktop && !isLoggedIn) return <LoginPanel fullPage onSuccess={login}/>;

  if (!isLoggedIn) return (
    <div className="min-h-screen">
      <Navbar currentView={view} isLoggedIn={false} user={user} onNavigate={navigate} onLogin={() => requestLogin('earn')} onLogout={logout}/>
      <HomePage onLoginClick={() => requestLogin('earn')} onSelectPackage={selectPackage} onAboutClick={() => window.open('https://longrise.vip', '_blank', 'noopener,noreferrer')}/>
      <SiteFooter />
      <AnimatePresence>{loginOpen && <LoginPanel onClose={() => setLoginOpen(false)} onSuccess={login}/>}</AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen">
      <NetworkOverlay intensity={0.35} speed={0.25}/>
      <Navbar currentView={view} isLoggedIn user={user} onNavigate={navigate} onLogin={() => requestLogin('earn')} onLogout={logout}/>
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.2}}>
            {view === 'home' && <HomePage onLoginClick={() => navigate('earn')} onSelectPackage={selectPackage} onAboutClick={() => window.open('https://longrise.vip', '_blank', 'noopener,noreferrer')}/>}
            {view === 'plans' && <PackagesPage onInvestClick={selectPackage}/>}
            {view === 'network' && <RewardsPage user={user} onUpdateUser={setUser} onSetView={navigate}/>}
            {view === 'earn' && <EarnPage onOpenSwap={() => openWallet('swap')} onOpenPlans={() => navigate('plans')}/>}
            {view === 'wallet' && <WalletPage user={user} initialSection={walletSection}/>}
            {view === 'profile' && <ProfilePage user={user} onUpdateUser={setUser} onLogout={logout}/>}
            {view === 'security' && <SecurityPage user={user} onUpdateUser={setUser}/>}
            {view === 'support' && <SupportPage/>}
            {view === 'notices' && <NoticesPage/>}
            {view === 'news' && <NewsPage/>}
            {view === 'settings' && <PlatformSettingsPage user={user}/>}
            {view === 'faq' && <FaqPage/>}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <BottomNavigation currentView={view} onNavigate={navigate}/>
      <AnimatePresence>{selectedPackage && <PurchaseModal packageId={selectedPackage} onClose={() => setSelectedPackage(null)} onConfirm={() => {setSelectedPackage(null); openWallet('assets');}}/>}</AnimatePresence>
      <AnimatePresence>{showNewsPopup && <NewsPopup onClose={() => setShowNewsPopup(false)} onOpenNews={() => {setShowNewsPopup(false); navigate('news');}}/>}</AnimatePresence>
    </div>
  );
}
