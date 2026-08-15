const legalLinks = [
  { label: 'Terms', href: 'https://longrise.vip/terms.html' },
  { label: 'Privacy', href: 'https://longrise.vip/privacy-policy.html' },
  { label: 'Risk Notice', href: 'https://longrise.vip/risk-notice.html' },
];

export const SiteFooter = () => (
  <footer className="border-t border-luxury-gold/10 bg-[#080202] px-6 py-10 lg:py-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-serif text-lg font-black tracking-[0.16em] text-[#ead39b]">LONGRISE</p>
        <p className="mt-3 max-w-md text-xs leading-5 text-gray-500">Platform information and account actions are subject to the applicable terms and risk notice.</p>
      </div>
      <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3">
        {legalLinks.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-luxury-gold/80 transition-colors hover:text-luxury-gold">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);
