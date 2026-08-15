/* LONGRISE Mobile — platform data */
window.LR_DATA = {
  user: {
    name: "Alex Chen",
    initials: "AC",
    id: "LR-00001",
    rank: "WHITE",
    nextRank: "BLUE",
    memberSince: "Jun 2026",
    refCode: "RISE2026",
    refLink: "longrise.ai/join?ref=RISE2026"
  },

  balances: {
    available: 0,
    earned: 0,
    cnyt: 0,
    invested: 0
  },

  todayPnl: 0,

  engine: {
    name: "NEURAL CORE V6",
    winRate: 87.4,
    dailyRoi: 1.42,
    signals: 1284,
    latency: 14
  },

  spark: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  weekEarnings: [0, 0, 0, 0, 0, 0, 0],

  packages: [
    { id: "flexible", name: "FLEXIBLE", roi: "48%~", mid: 0.65, min: 100,   term: "No lock",  note: "Withdraw anytime" },
    { id: "basic",    name: "BASIC",    roi: "84%~", mid: 0.9,  min: 200,   term: "12 months",  note: "Entry compounding" },
    { id: "standard", name: "STANDARD", roi: "108%~", mid: 1.2,  min: 500,  term: "12 months", note: "Balanced growth" },
    { id: "premium",  name: "PREMIUM",  roi: "132%~", mid: 1.6,  min: 1000, term: "12 months", note: "Most popular", featured: true },
    { id: "vip",      name: "VIP",      roi: "216%~", mid: 2.1,  min: 5000, term: "12 months", note: "Private desk access" }
  ],

  portfolio: [],

  pairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT", "AVAX/USDT", "DOGE/USDT"],

  trades: [
    { pair: "BTC/USDT", side: "LONG",  pnl: 184.20,  time: "14:32:08" },
    { pair: "ETH/USDT", side: "SHORT", pnl: 96.75,   time: "14:31:42" },
    { pair: "SOL/USDT", side: "LONG",  pnl: -22.40,  time: "14:30:51" },
    { pair: "BNB/USDT", side: "LONG",  pnl: 61.10,   time: "14:29:33" },
    { pair: "XRP/USDT", side: "SHORT", pnl: 38.92,   time: "14:28:17" }
  ],

  referrals: [],

  orgStats: { totalOrg: 0, maxDepth: 0, active: 0, directSubs: 0, teamVolume: 0 },

  commissions: { direct: 0, matching: 0, pool: 0 },

  ranks: [
    { name: "WHITE",  pkg: "Basic ($200+)",     refs: 0,  downline: null,          team: 0,        bonus: "—" },
    { name: "BLUE",   pkg: "Standard ($500+)",  refs: 3,  downline: "White × 3",   team: 1000,     bonus: "$1,000" },
    { name: "PURPLE", pkg: "Premium ($1,000+)", refs: 5,  downline: "Blue × 3",    team: 10000,    bonus: "$10,000" },
    { name: "RED",    pkg: "VIP ($5,000+)",     refs: 10, downline: "Purple × 3",  team: 100000,   bonus: "$100,000" },
    { name: "BLACK",  pkg: "$10,000+",          refs: 15, downline: "Red × 3",     team: 1000000,  bonus: "$1,000,000" }
  ],

  market: {
    cnytPrice: 0.1412,
    cnytChange: 2.14,
    usdtPremium: 1.012,
    orders: [
      { id: "o1", side: "BUY",  asset: "USDT", amount: 2500,  price: 1.012, user: "rise***26",  status: "OPEN" },
      { id: "o2", side: "SELL", asset: "USDT", amount: 1200,  price: 1.009, user: "gold***41",  status: "OPEN" },
      { id: "o3", side: "BUY",  asset: "CNYT", amount: 18000, price: 0.1408, user: "rise***07", status: "OPEN" },
      { id: "o4", side: "SELL", asset: "USDT", amount: 800,   price: 1.011, user: "neo***23",   status: "COMPLETE" },
      { id: "o5", side: "BUY",  asset: "CNYT", amount: 6400,  price: 0.1415, user: "axis***90", status: "OPEN" },
      { id: "o6", side: "SELL", asset: "CNYT", amount: 31000, price: 0.1402, user: "luna***55", status: "COMPLETE" }
    ]
  },

  history: [],

  news: [
    { title: "V6 Neural Engine throughput upgrade", date: "Jun 11", tag: "ENGINE", body: "The NEURAL CORE V6 engine has completed a throughput upgrade, raising sustained signal capacity by 38% across all three connected exchanges. Execution latency now averages 14ms. No action is required — existing packages benefit automatically from the next settlement cycle." },
    { title: "CNYT market maker program opens", date: "Jun 07", tag: "MARKET", body: "The CNYT market maker program is now open to RED rank and above. Approved makers receive reduced spreads and priority order matching on the P2P floor. Apply through Support to be considered for the current cohort." },
    { title: "Q3 roadmap: advanced integrations", date: "Jun 02", tag: "ROADMAP", body: "Our Q3 roadmap focuses on advanced integrations: native hardware-wallet signing, an expanded Dragon Wealth vault lineup, and the public launch of the MARKET P2P trading floor. Detailed timelines will follow in the next monthly briefing." }
  ],

  alerts: [
    { id: "a1", type: "ROI",      title: "Daily dividend credited", body: "+$288.00 USDT from your STANDARD package.", time: "00:00 UTC", unread: true },
    { id: "a2", type: "SECURITY", title: "New login detected", body: "Sign-in from a new device. If this wasn't you, secure your account.", time: "2h ago", unread: true },
    { id: "a3", type: "NOTICE",   title: "Withdrawal batch time", body: "Withdrawals are processed once daily at UTC 09:00.", time: "1d ago", unread: true }
  ],

  depositAddress: "TQ5kX9vR2mLnW8eYcJ4aZbF7uHs3dGpE6N",

  riskNotice: "RISK DISCLOSURE STATEMENT\n\nLONGRISE provides access to algorithmic digital-asset strategies. As with all digital-asset activity, market conditions can fluctuate and outcomes are not guaranteed. Please participate only with funds you are comfortable committing.\n\n1. Results may vary. Past performance, projected ROI, win rates and any figures shown in the application reflect historical or modelled scenarios and are provided for reference purposes only. Future outcomes may differ.\n\n2. Committed funds are subject to market conditions. Funds allocated to any package or strategy may be affected by market movements, liquidity conditions, and operational factors. Please review lock-up terms before activating a plan.\n\n3. Liquidity and settlement. Withdrawals are processed in batches and may be delayed by network congestion, compliance review, or settlement windows. On-chain transactions are irreversible.\n\n4. Regulatory status. Digital-asset services may be restricted or prohibited in your jurisdiction. You are solely responsible for determining whether your participation is lawful where you reside.\n\n5. Tax. You are responsible for reporting and paying any taxes arising from your activity.\n\n6. Security. You are responsible for safeguarding your credentials, 2FA device and withdrawal PIN. LONGRISE will never ask for your password.\n\nBy continuing you confirm that you understand these risks and that you are participating using funds you can afford to lose.",

  terms: "TERMS OF SERVICE & USER AGREEMENT\n\nThese Terms govern your access to and use of the LONGRISE platform. By continuing you agree to be bound by them.\n\n1. Eligibility. You must be at least 18 years old and legally permitted to use digital-asset services in your jurisdiction. You represent that the information you provide is accurate.\n\n2. Accounts. You are responsible for all activity under your account. Keep your authentication factors confidential. Notify support immediately of any unauthorized access.\n\n3. Deposits & withdrawals. You are responsible for sending funds to the correct address on a supported network. Transactions sent to incorrect addresses or unsupported networks cannot be recovered.\n\n4. Packages & rewards. Package terms, ROI ranges, lock-up periods and referral commissions are described in the application and may be revised. Referral and team rewards require ongoing compliance with program rules; abusive or fraudulent activity may result in forfeiture.\n\n5. Prohibited use. You may not use the platform for money laundering, fraud, market manipulation, or any unlawful purpose, or attempt to interfere with platform security or operation.\n\n6. Suspension. We may suspend or restrict accounts to comply with law, investigate suspected misuse, or protect the platform and its users.\n\n7. No advice. Nothing in the platform constitutes financial, legal or tax advice. Decisions are made at your own discretion and risk.\n\n8. Limitation of liability. To the maximum extent permitted by law, LONGRISE is not liable for indirect, incidental or consequential damages, or for losses arising from market movements, network failures or events beyond our control.\n\n9. Changes. We may update these Terms; continued use after changes constitutes acceptance.",

  importantNotice: {
    tag: "WALLET NOTICE",
    title: "Withdrawal batch time",
    body: "Withdrawals are processed once daily at UTC 09:00. Requests of 500 USDT or more require administrator approval before payout."
  },

  // FAQ content is hardcoded in the current MVP/mobile mockup due to schedule constraints.
  // Long-term requirement: FAQ items must be editable from the Admin Tool.
  // Admin-editable fields should include category, question, answer, display order, active status, and updated timestamp.
  // Do not expose CMS/admin-management details to customers in the UI.
  faqs: [
    { q: "When is daily ROI credited?", a: "Daily dividends are credited at 00:00 UTC to your earned balance." },
    { q: "What is the minimum withdrawal?", a: "$10 USDT. Withdrawals are processed once daily at UTC 09:00 with a fixed 1 USDT fee during the MVP period." },
    { q: "Which networks are supported?", a: "USDT on TRC20 is supported now. BEP20 is planned for a future update." }
  ],

  orgTree: {
    id: "LR-00001", name: "Alex Chen", initials: "AC", rank: "PURPLE", volume: 182400, isMe: true,
    children: [
      { id: "LR-41201", name: "M. Tanaka",   initials: "MT", rank: "BLUE",  volume: 32400, children: [
        { id: "LR-71834", name: "K. Lee",     initials: "KL", rank: "WHITE", volume: 13200, children: [
          { id: "LR-92341", name: "Y. Park",  initials: "YP", rank: "WHITE", volume: 2400,  children: [] },
          { id: "LR-83920", name: "N. Ito",   initials: "NI", rank: "WHITE", volume: 600,   children: [] }
        ]},
        { id: "LR-29384", name: "B. Chen",    initials: "BC", rank: "WHITE", volume: 2000,  children: [] },
        { id: "LR-10293", name: "T. Singh",   initials: "TS", rank: "BLUE",  volume: 17000, children: [
          { id: "LR-48201", name: "A. Patel", initials: "AP", rank: "WHITE", volume: 5000,  children: [] },
          { id: "LR-56789", name: "M. Osei",  initials: "MO", rank: "WHITE", volume: 1200,  children: [] },
          { id: "LR-34521", name: "C. Diaz",  initials: "CD", rank: "WHITE", volume: 800,   children: [] }
        ]}
      ]},
      { id: "LR-55820", name: "S. Williams", initials: "SW", rank: "BLUE",  volume: 28600, children: [
        { id: "LR-77401", name: "J. Brown",   initials: "JB", rank: "BLUE",  volume: 16000, children: [
          { id: "LR-91234", name: "L. Davis",  initials: "LD", rank: "WHITE", volume: 5000,  children: [] },
          { id: "LR-34902", name: "O. James",  initials: "OJ", rank: "WHITE", volume: 1800,  children: [] }
        ]},
        { id: "LR-88902", name: "E. Miller",  initials: "EM", rank: "WHITE", volume: 3200,  children: [] },
        { id: "LR-23401", name: "F. Wilson",  initials: "FW", rank: "WHITE", volume: 400,   children: [] },
        { id: "LR-67832", name: "G. Moore",   initials: "GM", rank: "WHITE", volume: 5000,  children: [] }
      ]},
      { id: "LR-33902", name: "J. Kim",      initials: "JK", rank: "WHITE", volume: 9800,  children: [
        { id: "LR-12309", name: "H. Kim",     initials: "HK", rank: "WHITE", volume: 3000,  children: [] },
        { id: "LR-45678", name: "R. Choi",    initials: "RC", rank: "WHITE", volume: 800,   children: [] }
      ]},
      { id: "LR-72018", name: "A. Novak",    initials: "AN", rank: "WHITE", volume: 3800,  children: [
        { id: "LR-89023", name: "P. Novak",   initials: "PN", rank: "WHITE", volume: 600,   children: [] }
      ]},
      { id: "LR-90134", name: "R. Garcia",   initials: "RG", rank: "WHITE", volume: 600,   children: [] }
    ]
  }
};

window.LR_DATA.genTrade = function () {
  const d = window.LR_DATA;
  const pair = d.pairs[Math.floor(Math.random() * d.pairs.length)];
  const side = Math.random() > 0.45 ? "LONG" : "SHORT";
  const win = Math.random() > 0.16;
  const pnl = (win ? 1 : -1) * (8 + Math.random() * 220);
  const t = new Date();
  const pad = function (n) { return String(n).padStart(2, "0"); };
  return {
    pair: pair,
    side: side,
    pnl: Math.round(pnl * 100) / 100,
    time: pad(t.getHours()) + ":" + pad(t.getMinutes()) + ":" + pad(t.getSeconds())
  };
};

window.LR_IMG_FALLBACK = {
  iconGold: "brand/icon-gold.png",
  iconBlue: "brand/icon-blue.png",
  iconPurple: "brand/icon-purple.png",
  iconRed: "brand/icon-red.png",
  iconBlack: "brand/icon-black.png"
};
window.LR_IMG = function (key) {
  var el = (typeof document !== "undefined") && document.getElementById("lrimg-" + key);
  if (el && el.getAttribute("src")) return el.getAttribute("src");
  if (window.__resources && window.__resources[key]) return window.__resources[key];
  return window.LR_IMG_FALLBACK[key] || key;
};

window.LR_FMT = function (n, dec) {
  if (dec === undefined) dec = 2;
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
};
