import { BookOpen, X } from 'lucide-react';
import { motion } from 'motion/react';

export const NewsPopup = ({ onClose, onOpenNews }: { onClose: () => void; onOpenNews: () => void }) => (
  <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
    <button aria-label="Close news" onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
    <motion.section initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-lg rounded-lg border border-luxury-gold/30 bg-[#150606] p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-luxury-gold/25 bg-black/35 text-luxury-gold"><BookOpen size={19} /></span>
          <div><p className="text-[9px] font-black uppercase tracking-[0.3em] text-luxury-gold">Important News</p><h2 className="mt-1 text-xl font-black text-white">TRC20 Wallet Test Phase</h2></div>
        </div>
        <button aria-label="Close news" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-gray-400 hover:text-white"><X size={18} /></button>
      </div>
      <p className="mt-5 text-sm leading-6 text-gray-400">TRC20 deposits and withdrawals are available in the current test phase. BEP20 support is planned for a later release.</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button onClick={onClose} className="border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-400">Close</button>
        <button onClick={onOpenNews} className="bg-luxury-gold px-4 py-3 text-xs font-black uppercase tracking-widest text-black">View News</button>
      </div>
    </motion.section>
  </div>
);
