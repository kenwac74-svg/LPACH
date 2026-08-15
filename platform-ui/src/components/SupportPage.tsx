import { useState } from 'react';
import { CheckCircle2, Headphones, MessageSquarePlus, Send } from 'lucide-react';

export const SupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
      <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Help Center</p>
      <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">Support</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="border border-white/10 bg-black/25 p-6">
          <Headphones size={28} className="text-luxury-gold" />
          <h2 className="mt-6 font-serif text-2xl font-black text-white">Contact Support</h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">Use a support ticket for account, package, wallet or transaction questions.</p>
          <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm"><div><p className="text-gray-500">Response target</p><p className="mt-1 font-black text-white">Within 24 hours</p></div><div><p className="text-gray-500">Ticket tracking</p><p className="mt-1 font-black text-white">Platform account number</p></div></div>
        </aside>
        <section className="border border-white/10 bg-black/25 p-6">
          {submitted ? <div className="flex min-h-72 flex-col items-center justify-center text-center"><CheckCircle2 size={42} className="text-emerald-400"/><h2 className="mt-5 font-serif text-2xl font-black text-white">Ticket Submitted</h2><p className="mt-3 text-sm text-gray-400">Reference SUP-260814-042 has been created.</p><button onClick={() => setSubmitted(false)} className="mt-6 border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">Create Another</button></div> : <form onSubmit={(event) => {event.preventDefault(); setSubmitted(true);}}><div className="mb-5 flex items-center gap-3"><MessageSquarePlus className="text-luxury-gold" size={21}/><h2 className="font-serif text-2xl font-black text-white">New Ticket</h2></div><label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Category</span><select className="w-full border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none"><option>Wallet</option><option>Package</option><option>Account</option><option>Network</option></select></label><label className="mt-4 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Subject</span><input required className="w-full border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none placeholder:text-gray-600" placeholder="Brief summary"/></label><label className="mt-4 block"><span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-500">Message</span><textarea required rows={5} className="w-full resize-none border border-white/10 bg-black/45 px-4 py-4 text-sm text-white outline-none placeholder:text-gray-600" placeholder="Describe the issue"/></label><button className="mt-5 flex w-full items-center justify-center gap-2 bg-luxury-gold px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black"><Send size={17}/> Submit Ticket</button></form>}
        </section>
      </div>
    </div>
  );
};
