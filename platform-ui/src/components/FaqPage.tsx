import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// TODO: Replace this temporary hardcoded list with Admin Tool managed FAQ content.
const FAQ_ITEMS = [
  ['When are withdrawals processed?', 'Approved TRC20 withdrawals are processed once daily at UTC 09:00.'],
  ['What is the minimum withdrawal?', 'The minimum withdrawal request is 10 USDT. The phase-one withdrawal fee is fixed at 1 USDT.'],
  ['Can I send USDT to another LONGRISE user?', 'Yes. Send is an internal ledger transfer and does not create an on-chain transaction ID. Always verify the recipient username and amount before confirming.'],
  ['Which deposit network is supported?', 'TRC20 is supported in the current phase. BEP20 is displayed as a planned network and cannot be selected yet.'],
  ['Can Bonus USDT be withdrawn?', 'No. Bonus USDT can only be used for eligible package purchases.'],
  ['Can CNYT be withdrawn to an external wallet?', 'No. CNYT transfers are handled only through the platform internal ledger.'],
];

export const FaqPage = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-5 pb-28 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
      <p className="text-[10px] font-black uppercase tracking-[0.45em] text-luxury-gold">Help Center</p>
      <h1 className="mt-2 font-serif text-4xl font-black text-white lg:text-6xl">FAQ</h1>
      <div className="mt-8 border-t border-white/10">
        {FAQ_ITEMS.map(([question, answer], index) => (
          <div key={question} className="border-b border-white/10">
            <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left">
              <span className="text-sm font-black text-white lg:text-base">{question}</span>
              <ChevronDown size={19} className={`shrink-0 text-luxury-gold transition-transform ${open === index ? 'rotate-180' : ''}`} />
            </button>
            {open === index && <p className="max-w-3xl pb-6 text-sm leading-7 text-gray-400">{answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
