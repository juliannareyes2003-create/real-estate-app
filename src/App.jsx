import { useState } from "react";

const C = {
  bg: "#f5f4f1",
  white: "#ffffff",
  ink: "#1a2530",
  inkLight: "#4a5560",
  inkMuted: "#8a9aa8",
  border: "#e0dbd4",
  borderStrong: "#c8c2ba",
  accent: "#1e4d63",
  accentHover: "#163d50",
  accentLight: "#e8eff3",
  warm: "#8a5c3a",
  warmLight: "#f5ede5",
  red: "#c0392b",
  redLight: "#fdf0ee",
};
const R = { sm: "5px", md: "9px", lg: "13px", xl: "16px" };
const btn = {
  primary: { border: "none", borderRadius: R.md, padding: "11px 20px", backgroundColor: C.accent, color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.01em" },
  secondary: { border: `1px solid ${C.border}`, borderRadius: R.md, padding: "11px 20px", backgroundColor: C.white, color: C.accent, fontSize: "14px", fontWeight: "600", cursor: "pointer" },
};

export default function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [activeNav, setActiveNav] = useState("Learn");
  const [savedInterests, setSavedInterests] = useState([]);
  const [currentTopicPage, setCurrentTopicPage] = useState(null);
  const [accountInfo, setAccountInfo] = useState({ name: "", email: "", password: "" });
  const [accountErrors, setAccountErrors] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeComment, setActiveComment] = useState("");
  const [comments, setComments] = useState([]);

  const learningGoals = ["Learn the basics","Understand investing","Explore development","Follow market trends","Learn laws and regulations","Connect with professionals"];

  const topics = [
    { title: "First-Time Learning", slug: "first-time-learning", description: "A clear starting point for anyone new to real estate.", tag: "Beginner" },
    { title: "Investing", slug: "investing", description: "How people build wealth through real estate and what to watch out for.", tag: "Finance" },
    { title: "Development", slug: "development", description: "How projects move from land and concept to completed buildings.", tag: "Building" },
    { title: "Legal & Regulations", slug: "legal-regulations", description: "The laws, rules, and approvals that govern real estate decisions.", tag: "Legal" },
    { title: "Tokenization", slug: "tokenization", description: "How ownership is being digitized and what it means for investors.", tag: "Emerging" },
    { title: "Market Data", slug: "market-data", description: "Prices, rents, and market movement explained without the noise.", tag: "Data" },
    { title: "Brokerage/Agents", slug: "brokerage-agents", description: "What agents do and how buyers and sellers work with them.", tag: "Industry" },
    { title: "Commercial Real Estate", slug: "commercial-real-estate", description: "Offices, retail, and mixed-use properties and how they differ.", tag: "Commercial" },
    { title: "Financing", slug: "financing", description: "How deals are funded — from mortgages to complex capital stacks.", tag: "Finance" },
    { title: "Zoning", slug: "zoning", description: "How land use rules shape what can be built and where.", tag: "Policy" },
    { title: "PropTech", slug: "proptech", description: "Technology changing how real estate is bought, managed, and understood.", tag: "Tech" },
    { title: "Deal Flow", slug: "deal-flow", description: "How investment opportunities are found, shared, and evaluated.", tag: "Industry" },
  ];

  const topicGroups = [
    { groupTitle: "Start Here", groupDescription: "Foundations for anyone new to the field.", items: ["First-Time Learning","Market Data","Brokerage/Agents"] },
    { groupTitle: "Money & Investing", groupDescription: "How capital moves through real estate.", items: ["Investing","Financing","Deal Flow"] },
    { groupTitle: "Building & Property", groupDescription: "How real estate is created and categorized.", items: ["Development","Commercial Real Estate","Zoning"] },
    { groupTitle: "Systems & Technology", groupDescription: "The rules and tools reshaping the industry.", items: ["Legal & Regulations","Tokenization","PropTech"] },
  ];

  const professionals = [
    { name: "Sarah Jenkins", role: "Real Estate Attorney", help: "Explains contracts, zoning, and legal basics clearly." },
    { name: "Marcus Chen", role: "Developer", help: "Walks through how projects are financed, approved, and built." },
    { name: "Elena Rodriguez", role: "Investor & Broker", help: "Covers beginner investing questions and market dynamics." },
  ];

  const topicPageContent = {
    "first-time-learning": { intro: "A starting point for readers who want the basics explained before exploring any specific area of real estate.", points: ["What real estate encompasses","Terminology you will encounter often","How to identify the right area of focus","What to prioritize as a beginner"] },
    investing: { intro: "An overview of how real estate is used as a wealth-building vehicle and what beginners need to understand before going further.", points: ["Types of real estate investment","Risk and return dynamics","Why financing structure matters","Questions to ask before starting"] },
    development: { intro: "A look at how projects move from raw land and ideas through approvals, financing, and construction.", points: ["The developer's role","Entitlement and approval process","How financing affects development","Why projects take time"] },
    "legal-regulations": { intro: "An introduction to the legal layer of real estate — the rules, approvals, and structures that govern what is possible.", points: ["Zoning fundamentals","Permits and regulatory approvals","Why legal structure matters","How regulations shape outcomes"] },
    tokenization: { intro: "A plain-English introduction to tokenization and how digital ownership connects to real property.", points: ["What tokenization means in practice","How ownership can be fractioned","Why investors are paying attention","What to understand before engaging"] },
    "market-data": { intro: "How to read pricing, rental, and inventory data without getting overwhelmed by noise.", points: ["Home price indicators","Rent trend analysis","Supply and demand dynamics","How to interpret market shifts"] },
    "brokerage-agents": { intro: "What agents actually do, how compensation works, and what to look for when choosing representation.", points: ["The agent's core functions","Working with buyers","Working with sellers","Questions to ask before hiring"] },
    "commercial-real-estate": { intro: "An introduction to commercial property types and how they differ from residential in valuation and deal structure.", points: ["Office properties","Retail properties","Mixed-use assets","How commercial deals are structured"] },
    financing: { intro: "How real estate deals are capitalized — from standard mortgages to layered institutional funding structures.", points: ["Mortgage fundamentals","Debt and equity roles","Capital stack structure","Why financing decisions matter"] },
    zoning: { intro: "How land use designations control development, shape neighborhoods, and affect property value.", points: ["What zoning designations mean","How zoning affects land use","Zoning's impact on development","What to look for as a beginner"] },
    proptech: { intro: "How technology is reshaping the processes of buying, selling, managing, and financing real estate.", points: ["Platforms and data tools","Workflow automation","Emerging technology categories","Why it matters for beginners"] },
    "deal-flow": { intro: "How investment opportunities move through markets, networks, and platforms — and how professionals evaluate them.", points: ["What deal flow means","How deals are sourced","How opportunities are distributed","How to evaluate what you find"] },
  };

  const topicNewsletterHighlights = {
    "first-time-learning": { label: "Foundations", title: "Where to Begin in Real Estate", intro: "A structured overview of the first concepts any new reader should understand.", bullets: ["Residential vs. commercial — the core distinction.","Building comfort with industry terminology.","Focusing on one area before expanding."] },
    investing: { label: "Investor Perspective", title: "Real Estate Investing Without the Noise", intro: "A clear-headed look at entry strategies and how to think about risk.", bullets: ["Why REITs are often the clearest starting point.","House hacking as a practical first strategy.","Evaluating risk before chasing returns."] },
    development: { label: "Development", title: "From Concept to Certificate of Occupancy", intro: "How development projects are planned, approved, funded, and delivered.", bullets: ["Why development timelines are longer than expected.","The role of approvals and financing.","How zoning shapes what gets built."] },
    "legal-regulations": { label: "Policy & Law", title: "How Legal Structure Shapes Real Estate", intro: "A grounded explanation of zoning, approvals, and regulations.", bullets: ["Zoning controls what is possible on any given site.","Permits and approvals can reshape or delay projects.","Legal structure is as important as market conditions."] },
    tokenization: { label: "Digital Ownership", title: "Tokenization: What It Is and What It Isn't", intro: "A clear breakdown of how digital ownership connects to real property.", bullets: ["Tokenization fractions ownership into smaller units.","Regulatory and liquidity questions remain open.","The underlying asset matters most — not the token."] },
    "market-data": { label: "Market Overview", title: "Reading the Market Without the Noise", intro: "What the data actually says and what beginners should track.", bullets: ["Mortgage rates continue to influence buyer behavior.","Inventory shifts change how opportunities compare.","Rent pressure is pushing more people toward ownership literacy."] },
    "brokerage-agents": { label: "Industry", title: "What Agents Actually Do", intro: "An honest look at the agent's role and where value is created.", bullets: ["Agents guide pricing, search, negotiation, and process.","Their value depends heavily on market and client context.","Knowing the right questions separates good from average."] },
    "commercial-real-estate": { label: "Commercial", title: "Commercial Real Estate: The Basics", intro: "How office, retail, and mixed-use properties operate differently from residential.", bullets: ["Commercial value is driven by income and lease quality.","Scale and analysis methods differ significantly.","Location, tenancy, and demand are the key variables."] },
    financing: { label: "Capital", title: "How Real Estate Gets Funded", intro: "A plain-English explanation of the capital stack and why structure matters.", bullets: ["Mortgages are one layer — debt and equity together form the picture.","Structure affects risk, return, and who gets paid first.","Interest rate sensitivity is often underestimated by beginners."] },
    zoning: { label: "Zoning & Policy", title: "Why Land Use Rules Shape Everything", intro: "How zoning affects development potential, value, and neighborhood change.", bullets: ["Zoning determines what can and cannot be built.","Supply constraints are often rooted in land use policy.","Understanding zoning before evaluating a site is essential."] },
    proptech: { label: "Technology", title: "Technology's Role in Real Estate Today", intro: "How platforms, data tools, and automation are changing the field.", bullets: ["PropTech broadens access to information and workflow efficiency.","Digital tools are changing how transactions and research happen.","Technology fluency is increasingly relevant for all market participants."] },
    "deal-flow": { label: "Deal Sourcing", title: "How Opportunities Reach Investors", intro: "How deals move through networks, platforms, and relationships.", bullets: ["Deal flow determines what opportunities you see and when.","Strong relationships often provide first access to the best deals.","Evaluation discipline matters as much as sourcing quality."] },
  };

  const weeklyNewsletter = {
    label: "THIS WEEK", date: "Week of April 21, 2025",
    title: "NYC Spotlight: What Beginners Should Be Watching",
    intro: "This week's featured piece examines why New York remains a critical market to study — covering rent pressure, outer-borough demand, and the structural difference between co-ops and condos.",
    bullets: ["Outer boroughs are gaining traction among first-time buyers.","The co-op vs. condo distinction has significant practical implications.","New York provides a useful lens for comparing multiple market types simultaneously."],
  };

  const topicProfileData = {
    "Tokenization": {
      color: C.warm, bg: C.warmLight, border: "#e0cfc0",
      tagline: "Digital ownership is reshaping how people invest in real estate.",
      why: "Tokenization converts physical real estate into tradeable digital units on a blockchain. It lowers the barrier to entry, expands retail investor access, and could generate trillions in new activity by 2035.",
      keyFacts: ["Tokenized real estate projected to grow from $0.3T (2024) to $4T by 2035 — a 27% CAGR","Fractional ownership allows investors to own a share of a property, not the whole asset","Rhino and Jetty offer security deposit insurance — renters pay over time rather than a lump sum upfront","Rhino and Jetty have since merged, now operating in over 6 million homes","Average NYC move-in cost: $10k–$15k for a one-bedroom (deposit + broker fee + moving costs)","The FARE Act shifted broker fee responsibility from tenants to landlords"],
      watchOut: ["Regulation is still evolving — permitted structures vary by state and jurisdiction","The underlying asset matters most — tokenizing a poor investment doesn't improve it","Liquidity is not guaranteed despite tokens being technically tradeable"],
      relatedTopics: ["Investing","Legal & Regulations","Financing"],
    },
    "Commercial Real Estate": {
      color: C.accent, bg: C.accentLight, border: "#c8d8e4",
      tagline: "Income, leases, and tenant quality drive value — not comparable sales.",
      why: "Commercial real estate is valued by the income it generates. Understanding cap rates, lease structures, and vacancy dynamics matters more here than in residential markets.",
      keyFacts: ["Commercial value = Net Operating Income ÷ Cap Rate — not comparable sales","Tenant quality and lease duration are the primary value drivers","Office, retail, industrial, and mixed-use each respond to different demand forces","Vacancy and absorption rates indicate whether a market is growing or contracting","Commercial acquisitions typically require 25–35% down vs. 3–20% in residential","Post-pandemic NYC: Class A office recovering; Class B/C facing sustained pressure"],
      watchOut: ["Commercial leases are complex — review the full document, not just the rent figure","Retail is highly location-dependent; foot traffic data is essential","Cap rate compression can make an overpriced market appear attractive"],
      relatedTopics: ["Financing","Deal Flow","Zoning"],
    },
    "Brokerage/Agents": {
      color: "#2a4a5e", bg: "#edf2f6", border: "#c4d4de",
      tagline: "Agents navigate pricing, negotiation, and process — not just access.",
      why: "The brokerage model is being disrupted by technology platforms and shifting commission structures. Understanding what agents actually do helps you make a more informed decision about representation.",
      keyFacts: ["Traditional commission: 5–6%, split between buyer and seller agents","New platforms are building buyer-first marketplaces that restructure pay-for-leads","Algorithm-driven matching systems are improving match quality and offer competitiveness","Data-forward agents use outcome tracking and performance metrics to improve over time","Platform tools give newer agents client access without large advertising budgets","The FARE Act in NYC moved broker fees from tenants to landlords"],
      watchOut: ["Not all compensation structures are transparent — request a full breakdown upfront","Referral-based selection limits your options; compare multiple agents before deciding","Agent incentives don't always align with client interests — understand how they're paid"],
      relatedTopics: ["First-Time Learning","Market Data","Legal & Regulations"],
    },
    "Investing": {
      color: "#2a5c45", bg: "#eaf4ee", border: "#b8d8c8",
      tagline: "The right strategy depends on what the investment actually requires of you.",
      why: "Real estate investing spans from REITs and house hacking to institutional syndications. The most important first step is understanding the operational and financial demands of each approach.",
      keyFacts: ["REITs allow real estate exposure like a stock — no property management involved","House hacking: buying multi-unit property, living in one unit, renting others to offset costs","Cap rate = Net Operating Income ÷ Property Value — standard metric for comparing assets","Some markets offer appreciation upside; others are cash flow plays — the distinction matters","Leverage amplifies both gains and losses — debt structure is a critical risk variable","1031 exchanges allow investors to defer capital gains taxes by rolling into a new property"],
      watchOut: ["Advertised returns often exclude vacancy, repairs, management fees, and taxes","Leverage magnifies losses — a 10% value decline can eliminate a meaningful equity position","Real estate is illiquid — it cannot be sold quickly in response to changed circumstances"],
      relatedTopics: ["Financing","Market Data","Tokenization"],
    },
    "Legal & Regulations": {
      color: "#4a3570", bg: "#f2eef8", border: "#d4c8ec",
      tagline: "The legal framework determines what can be built, sold, and owned.",
      why: "Zoning, permits, rent regulation, and ownership structures define what is possible in any transaction. Overlooking the legal layer is one of the most common and costly beginner mistakes.",
      keyFacts: ["Zoning designations control what is permitted on any parcel of land","Permits and environmental reviews can delay or block projects by months or years","Rent stabilization and control laws differ significantly by city and state","The FARE Act (NYC) transferred broker fee responsibility from tenants to landlords","Title searches confirm clean ownership — a required step before any transaction closes","LLC structures are commonly used to limit investor personal liability"],
      watchOut: ["Regulations change — what is permitted today may not be in two years","Non-compliance with zoning can result in fines or forced reversal of work","Consult a qualified real estate attorney before signing any binding agreement"],
      relatedTopics: ["Zoning","Development","Brokerage/Agents"],
    },
    "First-Time Learning": {
      color: "#2a5a2a", bg: "#eaf4ea", border: "#b8d8b8",
      tagline: "Most real estate concepts are straightforward once the vocabulary clicks.",
      why: "The language of real estate can make it feel inaccessible. It is not. Once you understand the terminology and how property is bought, sold, and valued, the field opens up considerably.",
      keyFacts: ["Real estate covers residential, commercial, and industrial asset classes","Core participants: buyer, seller, agent, lender, title company, and appraiser","Pre-approval indicates lending capacity — it is not a guarantee of funding","Closing costs typically add 2–5% to the purchase price on top of the down payment","Equity = property value minus outstanding debt owed on it","Appreciation increases value over time; depreciation decreases it"],
      watchOut: ["Pre-qualification and pre-approval are different — pre-approval carries more weight","Listing price is an ask, not market value — buyers determine the latter","Urgency is a common negotiating tactic — a poor deal closed quickly is still a poor deal"],
      relatedTopics: ["Market Data","Financing","Brokerage/Agents"],
    },
    "Market Data": {
      color: C.accent, bg: C.accentLight, border: "#c8d8e4",
      tagline: "Prices show where the market is. Trends show where it's heading.",
      why: "Reading market data helps separate signal from noise. Inventory levels, days on market, and absorption rates reveal the direction and velocity of a market — prices alone do not.",
      keyFacts: ["Median sale price: the midpoint of all transactions — less distorted by outliers than averages","Days on market (DOM): how long listings sit before entering contract","Months of supply: how long it would take to sell current inventory at the current pace","Mortgage rate shifts of 1% materially affect affordability and buyer demand","NYC outer boroughs are showing stronger first-time buyer demand than Manhattan in 2025","Rent growth is slowing in markets where new supply has come online"],
      watchOut: ["Aggregate numbers can mask significant local variation — analyze at the neighborhood level","Seasonal patterns affect data — spring is typically the most active buying period","National trends rarely apply uniformly to local markets"],
      relatedTopics: ["Investing","First-Time Learning","Commercial Real Estate"],
    },
    "Development": {
      color: "#6a3f20", bg: "#f8f0e8", border: "#e0c8a8",
      tagline: "From land to building takes years — and most of that time is not construction.",
      why: "Real estate development involves land assembly, entitlements, financing, and construction management — often spanning years. The timeline explains why supply responds slowly to changes in demand.",
      keyFacts: ["Ground-up development typically takes 3–7 years from concept to occupancy","Entitlement: the process of securing government approval to build a specific project","Hard costs = construction; soft costs = design, permits, legal, and financing fees","Construction loans are short-term and must be retired or refinanced upon completion","Zoning and community opposition are among the most common sources of project delay","A pro forma is the financial model used to estimate project costs, revenue, and returns"],
      watchOut: ["Cost overruns are common — experienced developers budget a contingency from day one","Markets can shift during construction — assumptions at start may not hold at completion","Permits can be delayed or conditions changed; always have contingency scenarios"],
      relatedTopics: ["Zoning","Financing","Legal & Regulations"],
    },
    "Financing": {
      color: "#1a3a5c", bg: "#eaf0f8", border: "#b8cce0",
      tagline: "How a deal is capitalized often determines its outcome more than the price paid.",
      why: "The capital stack — the mix of debt and equity funding a deal — determines risk, return, and who recovers first if things go wrong. Understanding this structure is essential at every level of real estate.",
      keyFacts: ["LTV (Loan-to-Value): the ratio of the loan to property value — typically capped at 70–80% by lenders","DSCR (Debt Service Coverage Ratio): income ÷ debt payments — lenders require above 1.25x","Senior debt is repaid first; equity investors absorb more risk in exchange for higher potential returns","Bridge loans provide short-term financing while a property is being stabilized or repositioned","A 1% change in interest rate can shift monthly payments by hundreds of dollars","Preferred equity sits between senior debt and common equity in the capital stack"],
      watchOut: ["Variable rate loans expose borrowers to rate increases — always model a worst-case scenario","Prepayment penalties can be significant if you sell or refinance earlier than planned","Lender fees and points add to the effective cost of borrowing beyond the stated interest rate"],
      relatedTopics: ["Investing","Development","Commercial Real Estate"],
    },
    "Zoning": {
      color: "#3a5a28", bg: "#eef6e8", border: "#c0d8b0",
      tagline: "Zoning is the invisible hand that shapes every neighborhood.",
      why: "Zoning controls density, permitted uses, and building height. Changing it is one of the most consequential — and contested — actions in urban real estate. Understanding it unlocks how land is valued.",
      keyFacts: ["NYC residential zones range from R1 (single-family) to R10 (high-density)","Commercial zones permit retail and office; manufacturing zones protect industrial uses","Variances allow deviation from zoning rules and require community board review","Upzoning increases permitted density and typically raises land value significantly","Downzoning restricts density and can protect character but constrains housing supply","Inclusionary zoning requires affordable units in exchange for density bonuses"],
      watchOut: ["Zoning maps change — always verify current designations before making assumptions","Community opposition can block projects that are legally permitted","Environmental review processes (e.g., CEQR in NYC) can add years to approvals"],
      relatedTopics: ["Development","Legal & Regulations","Commercial Real Estate"],
    },
    "PropTech": {
      color: "#1a3570", bg: "#eaeef8", border: "#b8c8e8",
      tagline: "Technology is broadening access to information, data, and deals.",
      why: "PropTech platforms are democratizing market data, automating transactions, and creating new pathways for investment. Understanding the landscape helps identify tools that create a genuine information advantage.",
      keyFacts: ["iBuyers (Opendoor, Offerpad) use algorithms to make near-instant cash offers","Data aggregators compile listing, transaction, and demographic data for market analysis","Property management software automates rent collection, maintenance, and lease administration","Virtual tours and AI-assisted staging reduce friction in search and marketing","Tokenization platforms are their own PropTech category reshaping ownership access","CoStar, MSCI, and Reonomy are the dominant commercial data providers used by professionals"],
      watchOut: ["Algorithmic valuations can be inaccurate — particularly in unique or thinly traded markets","Platform dependency carries vendor risk — companies in this space fail regularly","Data quality varies widely — always understand the methodology behind any figures cited"],
      relatedTopics: ["Market Data","Tokenization","Deal Flow"],
    },
    "Deal Flow": {
      color: "#4a3a18", bg: "#f8f4e8", border: "#e0d0a8",
      tagline: "Access determines what deals you see. Discipline determines which ones you take.",
      why: "Deal flow is the pipeline of investment opportunities reaching a buyer or investor. Access to off-market transactions and strong professional relationships separate active investors from passive ones.",
      keyFacts: ["Off-market deals are sold without public listing — typically offering better pricing for buyers","Brokers are the primary source of institutional deal flow; relationships are foundational","LoopNet, CoStar, and Crexi are the primary commercial listing platforms","Direct mail and cold outreach remain effective sourcing tools for smaller residential investors","Underwriting: the analytical process of determining whether a deal's numbers support investment","Deal screening: applying return thresholds to filter opportunities before committing to full analysis"],
      watchOut: ["FOMO is among the most common reasons investors overpay — verify numbers independently","Volume of deal flow is less important than quality of filtering","Always understand why a seller is selling before submitting an offer"],
      relatedTopics: ["Investing","Commercial Real Estate","Financing"],
    },
  };

  const openTopicPage = (topic) => {
    setCurrentTopicPage(topic);
    const ed = topicEditorial[topic.slug] || topicEditorial["first-time-learning"];
    setComments(ed.discussion || []);
    setActiveComment("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBackToHome = () => { setCurrentTopicPage(null); setActiveNav("Topics"); };
  const saveInterest = (t) => {
    if (savedInterests.includes(t)) { setSavedInterests(savedInterests.filter(i => i !== t)); return; }
    if (savedInterests.length < 3) setSavedInterests([...savedInterests, t]);
  };
  const openSignup = () => { setShowSignupModal(true); setOnboardingStep(1); };
  const closeSignup = () => { setShowSignupModal(false); setOnboardingStep(1); };
  const handleNavClick = (sectionId, navName) => {
    setActiveNav(navName);
    const el = document.getElementById(sectionId);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
  };
  const validateAccount = () => {
    const e = {};
    if (!accountInfo.name.trim()) e.name = "Name is required.";
    if (!accountInfo.email.trim() || !/\S+@\S+\.\S+/.test(accountInfo.email)) e.email = "A valid email is required.";
    if (accountInfo.password.length < 6) e.password = "Password must be at least 6 characters.";
    setAccountErrors(e); return Object.keys(e).length === 0;
  };
  const nextStep = () => {
    if (onboardingStep === 3) { if (!validateAccount()) return; setIsSignedUp(true); setOnboardingStep(4); }
    else if (onboardingStep < 4) setOnboardingStep(onboardingStep + 1);
    else { setShowSignupModal(false); setOnboardingStep(1); }
  };

  const font = '"DM Sans", ui-sans-serif, system-ui, -apple-system, sans-serif';
  const page = { minHeight: "100vh", backgroundColor: C.bg, color: C.ink, fontFamily: font };

  const NavBar = ({ onBack, backLabel }) => (
    <div style={{ position: "sticky", top: 0, zIndex: 20, backgroundColor: "rgba(245,244,241,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px clamp(20px,4vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: R.sm, backgroundColor: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: C.ink, letterSpacing: "-0.02em" }}>MyHome</div>
            <div style={{ fontSize: "10px", color: C.inkMuted }}>Real estate, made legible</div>
          </div>
        </div>
        {onBack ? (
          <button onClick={onBack} style={{ ...btn.secondary, fontSize: "13px", padding: "7px 13px" }}>{backLabel || "← Back"}</button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <nav style={{ display: "flex", gap: "2px" }}>
              {[{label:"Learn",id:"learn-section"},{label:"Topics",id:"topics-section"},{label:"Newsletter",id:"market-trends-section"},{label:"Community",id:"community-section"}].map(item => (
                <button key={item.label} onClick={() => handleNavClick(item.id, item.label)} style={{ border: "none", borderRadius: R.sm, padding: "6px 11px", backgroundColor: activeNav===item.label ? C.accentLight : "transparent", color: activeNav===item.label ? C.accent : C.inkLight, fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>{item.label}</button>
              ))}
            </nav>
            <button onClick={openSignup} style={{ ...btn.primary, padding: "8px 16px", fontSize: "13px" }}>Sign up free</button>
          </div>
        )}
      </div>
    </div>
  );

  // PROFILE PAGE
  if (showProfile && isSignedUp) {
    const firstName = accountInfo.name.split(" ")[0] || "there";
    return (
      <div style={page}>
        <NavBar onBack={() => setShowProfile(false)} backLabel="← Home" />
        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px clamp(20px,4vw,48px) 80px", boxSizing: "border-box" }}>
          <div style={{ backgroundColor: C.accent, borderRadius: R.xl, padding: "28px 32px", marginBottom: "28px", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", flexShrink: 0 }}>{(accountInfo.name[0]||"?").toUpperCase()}</div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "700", opacity: 0.65, letterSpacing: "0.08em", marginBottom: "2px" }}>PROFILE</div>
                <div style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "-0.01em" }}>{accountInfo.name}</div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>{accountInfo.email}</div>
              </div>
            </div>
            <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: R.lg, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize: "10px", opacity: 0.65, fontWeight: "700", letterSpacing: "0.06em", marginBottom: "2px" }}>PRIMARY GOAL</div>
              <div style={{ fontSize: "13px", fontWeight: "600" }}>{selectedGoal}</div>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "5px" }}>YOUR TOPICS</div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: C.ink, margin: 0, letterSpacing: "-0.02em" }}>Prepared based on your selections</h2>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {savedInterests.map((topicTitle) => {
              const d = topicProfileData[topicTitle]; if (!d) return null;
              return (
                <div key={topicTitle} style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, overflow: "hidden" }}>
                  <div style={{ backgroundColor: d.bg, borderBottom: `1px solid ${d.border}`, padding: "18px 22px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: d.color, letterSpacing: "0.08em", marginBottom: "3px" }}>TOPIC</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: C.ink, letterSpacing: "-0.01em", marginBottom: "3px" }}>{topicTitle}</div>
                      <div style={{ fontSize: "13px", color: C.inkLight }}>{d.tagline}</div>
                    </div>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {d.relatedTopics.map(rt => <div key={rt} style={{ backgroundColor: C.white, border: `1px solid ${d.border}`, borderRadius: R.sm, padding: "3px 9px", fontSize: "11px", fontWeight: "500", color: d.color }}>{rt}</div>)}
                    </div>
                  </div>
                  <div style={{ padding: "22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "7px" }}>WHY IT MATTERS</div>
                      <p style={{ fontSize: "13px", lineHeight: "1.7", color: C.inkLight, marginBottom: "18px", marginTop: 0 }}>{d.why}</p>
                      <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "9px" }}>KEY FACTS</div>
                      <div style={{ display: "grid", gap: "7px" }}>
                        {d.keyFacts.map((f, i) => (
                          <div key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                            <div style={{ minWidth: "18px", height: "18px", borderRadius: "3px", backgroundColor: d.bg, border: `1px solid ${d.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", color: d.color, marginTop: "2px", flexShrink: 0 }}>{i+1}</div>
                            <div style={{ fontSize: "13px", lineHeight: "1.6", color: C.ink }}>{f}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ backgroundColor: C.redLight, border: "1px solid #eacac6", borderRadius: R.lg, padding: "16px", marginBottom: "14px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: C.red, letterSpacing: "0.08em", marginBottom: "9px" }}>WATCH OUT FOR</div>
                        <div style={{ display: "grid", gap: "7px" }}>
                          {d.watchOut.map((w,i) => <div key={i} style={{ fontSize: "13px", lineHeight: "1.6", color: "#6a2020", paddingLeft: "10px", borderLeft: "2px solid #d4a0a0" }}>{w}</div>)}
                        </div>
                      </div>
                      <div style={{ backgroundColor: d.bg, border: `1px solid ${d.border}`, borderRadius: R.lg, padding: "16px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: d.color, letterSpacing: "0.08em", marginBottom: "9px" }}>EXPLORE NEXT</div>
                        <div style={{ display: "grid", gap: "6px" }}>
                          {d.relatedTopics.map((rt) => {
                            const relTopic = topics.find(t => t.title === rt);
                            return (
                              <button key={rt} onClick={() => { setShowProfile(false); openTopicPage(relTopic || { title: rt, slug: rt.toLowerCase().replace(/[^a-z]/g,"-"), description: "", tag: "" }); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: C.white, border: `1px solid ${d.border}`, borderRadius: R.md, padding: "9px 12px", cursor: "pointer" }}>
                                <span style={{ fontSize: "13px", fontWeight: "500", color: C.ink }}>{rt}</span>
                                <span style={{ color: d.color, fontSize: "13px" }}>→</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "32px", backgroundColor: C.ink, borderRadius: R.xl, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "white", marginBottom: "3px" }}>Ready to go further?</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Browse all 12 topics or ask the community a question.</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setShowProfile(false)} style={{ ...btn.primary, backgroundColor: "#c07040" }}>Browse all topics</button>
              <button onClick={() => { setShowProfile(false); setTimeout(() => document.getElementById("ask-question-section")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{ border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "transparent", color: "white", borderRadius: R.md, padding: "11px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Ask a question</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // TOPIC DETAIL PAGE — full editorial + community layout
  const topicEditorial = {
    "first-time-learning": {
      issue: "Issue No. 01", date: "April 2025", readTime: "6 min read",
      headline: "Real Estate Isn't as Complicated as It Looks",
      subheadline: "Most people avoid learning about real estate because the language feels deliberately exclusive. It isn't. Here's where to start.",
      body: [
        { type: "p", text: "Real estate is one of those fields where jargon does a lot of heavy lifting. Words like 'encumbrance,' 'cap rate,' and 'debt service coverage ratio' get thrown around in ways that make the whole industry feel like a closed club. It isn't. Most of what matters can be understood with a few foundational ideas." },
        { type: "h3", text: "The two categories that shape everything" },
        { type: "p", text: "Almost everything in real estate falls into one of two buckets: residential or commercial. Residential covers homes, apartments, condos, and co-ops — properties where people live. Commercial covers offices, retail spaces, warehouses, and mixed-use buildings — properties that generate income through business use. The rules, financing, and valuation methods differ significantly between the two." },
        { type: "callout", text: "A co-op in NYC and a single-family home in suburban Ohio are both 'residential real estate' — but they have almost nothing in common in terms of how they're bought, financed, or governed. Location and structure both matter." },
        { type: "h3", text: "The vocabulary that unlocks the rest" },
        { type: "p", text: "Before diving into any specific topic — investing, financing, zoning — it's worth getting comfortable with a handful of terms you'll encounter everywhere. Equity is the portion of a property's value you own outright, calculated as current value minus any debt owed on it. Appreciation means the property is worth more over time; depreciation means it's worth less (and is also a tax concept for investors). A mortgage is a loan secured by real property — the property itself is the collateral. Closing costs are the additional expenses paid at the end of a transaction, typically 2–5% of the purchase price." },
        { type: "h3", text: "What to focus on first" },
        { type: "p", text: "The mistake most beginners make is trying to understand everything at once. Real estate is broad enough that even experienced professionals specialize. Pick one area — residential buying, investing, commercial leasing — and go deep before expanding. The concepts build on each other, and trying to absorb all of them simultaneously leads to confusion, not clarity." },
      ],
      stats: [
        { label: "Residential transactions/year (US)", value: "5–6M", note: "Single-family homes alone" },
        { label: "Avg. closing costs (buyer)", value: "2–5%", note: "On top of purchase price" },
        { label: "First-time buyers in 2024", value: "24%", note: "Of all US home purchases" },
      ],
      discussion: [
        { author: "Priya M.", time: "2 days ago", text: "The co-op vs. condo distinction tripped me up for months. NYC makes it especially confusing because co-ops are so dominant here but rare everywhere else.", replies: 4 },
        { author: "James T.", time: "5 days ago", text: "What clicked for me was understanding that 'equity' isn't money in the bank — it's value tied up in an illiquid asset. That reframe changed how I thought about homeownership entirely.", replies: 7 },
        { author: "Anita R.", time: "1 week ago", text: "Is it worth starting with REITs before trying to buy property? Feels like a lower-stakes way to learn how the market moves.", replies: 11 },
      ],
    },
    "market-data": {
      issue: "Issue No. 06", date: "April 2025", readTime: "7 min read",
      headline: "How to Read the Market Without Getting Lost in the Numbers",
      subheadline: "Prices are the headline. But the real story is always in inventory, velocity, and the gap between asking and closing.",
      body: [
        { type: "p", text: "The most common mistake beginners make when reading real estate market data is treating median sale price as a complete picture. It isn't. Price tells you where transactions landed — it doesn't tell you how fast things are moving, whether sellers are negotiating, or whether the apparent trend is hiding something in the composition of what sold." },
        { type: "h3", text: "The three numbers that actually matter" },
        { type: "p", text: "Days on market (DOM) tells you velocity — how quickly homes are moving from listing to contract. A falling DOM signals rising demand or tightening supply. Months of supply tells you the absorption rate — at the current pace of sales, how long would it take to sell everything currently listed? Below 3 months is a strong seller's market. Above 6 months is a buyer's market. The sale-to-list ratio tells you whether buyers are paying over or under asking — a ratio above 100% means bidding wars; below 98% means negotiating room." },
        { type: "callout", text: "In April 2025, the national months of supply sits around 3.8 — technically balanced, but with massive variation by metro. Sun Belt markets with high new construction are seeing 6+ months of supply. High-demand coastal metros are still under 2." },
        { type: "h3", text: "Mortgage rates and the affordability equation" },
        { type: "p", text: "A 1% change in mortgage rates has an outsized effect on monthly payments. On a $500,000 loan, the difference between a 6.5% and 7.5% rate is roughly $320/month — over $115,000 across the life of a 30-year loan. This is why rate moves create such significant demand shifts, and why rate forecasting dominates real estate headlines. What matters for beginners: rates affect how much house the same income can afford, which shapes both buyer behavior and seller pricing expectations." },
        { type: "h3", text: "NYC outer boroughs: a market-within-a-market" },
        { type: "p", text: "Manhattan price data often dominates NYC coverage, but the outer boroughs have been the more interesting story in 2024–2025. Queens and Brooklyn are seeing first-time buyer demand that's outpacing Manhattan as affordability pressures push buyers to look east and south. The Bronx is showing some of the sharpest year-over-year appreciation in the city. These are distinct sub-markets — treating 'NYC' as a monolith misses most of what's actually happening." },
      ],
      stats: [
        { label: "National median sale price (Q1 2025)", value: "$412K", note: "+3.2% YoY" },
        { label: "30-yr fixed mortgage rate", value: "~7.1%", note: "As of April 2025" },
        { label: "National months of supply", value: "3.8 mo", note: "Approaching balanced market" },
      ],
      discussion: [
        { author: "Derek W.", time: "1 day ago", text: "The sale-to-list ratio point is underrated. I've been tracking this in my target neighborhoods and it's a much better signal than median price, which gets skewed by what mix of homes happened to sell that month.", replies: 6 },
        { author: "Lena K.", time: "3 days ago", text: "Any resources for tracking months of supply at the zip code level? The national number feels almost useless given how different local markets are.", replies: 9 },
        { author: "Marcus O.", time: "1 week ago", text: "How much should rate forecasts actually influence a buying decision? Feels like trying to time the market but people keep talking about it as if it's a real strategy.", replies: 14 },
      ],
    },
    "brokerage-agents": {
      issue: "Issue No. 07", date: "April 2025", readTime: "5 min read",
      headline: "What Agents Actually Do — and Where the Model Is Breaking",
      subheadline: "The traditional brokerage model is under pressure from technology, regulation, and shifting buyer expectations. Understanding both sides helps you make a smarter decision.",
      body: [
        { type: "p", text: "The standard narrative about real estate agents is that they're overpaid door-openers. The reality is more nuanced — and the model is genuinely changing. Agents who add value do so through market knowledge, negotiation skill, and access to off-market inventory. Those who don't are increasingly being displaced by platforms that make the informational layer of real estate transactions free." },
        { type: "h3", text: "What a good agent actually provides" },
        { type: "p", text: "On the buyer side, a skilled agent provides three things that platforms can't fully replicate: hyper-local pricing knowledge, negotiation experience, and access to deals before they hit public listings. On the seller side, the value is in pricing strategy, staging guidance, marketing reach, and managing the transaction process through closing. The commission question is really a question of whether the agent's contribution justifies the cost — which varies enormously by agent and market." },
        { type: "callout", text: "The FARE Act, which took effect in NYC in 2024, shifted broker fee payment from tenants to landlords in rental transactions. This removed a $3,000–8,000 upfront cost for renters — but some landlords have adjusted asking rents in response. The net effect on total renter cost is still being evaluated." },
        { type: "h3", text: "How the model is changing" },
        { type: "p", text: "New platforms are building algorithm-driven matching systems that connect buyers and sellers more efficiently than traditional referral networks. Some are moving to flat-fee or performance-based compensation structures. The pay-for-leads model — where agents buy access to prospective clients from platforms like Zillow — is facing criticism because it doesn't align agent incentives with client outcomes. The next wave of disruption is likely to come from data advantage: agents who can demonstrate a track record of pricing accuracy and negotiation outcomes will have a defensible position." },
        { type: "h3", text: "Questions to ask before hiring" },
        { type: "p", text: "Before signing with any agent, ask: How many transactions did you close in the last 12 months in this specific area? What's your average sale-to-list ratio for listings you've represented? How do you handle multiple offer situations? What's your communication process during the transaction? The answers to these questions reveal more than any referral or online review." },
      ],
      stats: [
        { label: "Avg. buyer agent commission", value: "2.5–3%", note: "Of purchase price" },
        { label: "Agents in the US", value: "1.5M+", note: "NAR membership (2024)" },
        { label: "NYC FARE Act savings (avg. renter)", value: "$4–8K", note: "In upfront broker fees" },
      ],
      discussion: [
        { author: "Sofia L.", time: "2 days ago", text: "The sale-to-list ratio question for listing agents is something I wish I'd known to ask the first time. It's such a clean way to evaluate pricing skill versus just charm.", replies: 8 },
        { author: "Ben H.", time: "4 days ago", text: "Has anyone used a flat-fee buyer's agent? Curious whether the savings are worth it or whether you lose something meaningful in negotiation.", replies: 12 },
        { author: "Rachel T.", time: "1 week ago", text: "FARE Act has been interesting to watch. My landlord just folded the fee into the rent rather than paying it separately. Slightly lower than I expected but not the full $6K saving I'd hoped for.", replies: 5 },
      ],
    },
    "investing": {
      issue: "Issue No. 02", date: "April 2025", readTime: "8 min read",
      headline: "The Real Estate Investing Landscape: From REITs to Syndications",
      subheadline: "Every investing strategy sounds compelling in a pitch deck. The differences become clear when you understand what each one actually requires.",
      body: [
        { type: "p", text: "Real estate investing is not a single strategy — it's a spectrum. At one end, you can buy a REIT ETF in your brokerage account in under five minutes with no real estate knowledge required. At the other end, you can syndicate a 200-unit apartment acquisition requiring millions in equity, months of due diligence, and a team of professionals. Most people belong somewhere in the middle, and figuring out where requires honest self-assessment about capital, time, and risk tolerance." },
        { type: "h3", text: "REITs: the starting point most beginners skip" },
        { type: "p", text: "Real Estate Investment Trusts are publicly traded companies that own income-producing real estate. They're required to distribute at least 90% of taxable income to shareholders, which makes them attractive income instruments. They also provide diversification across property types and geographies that no single direct investment can match. The tradeoff is lower control and the fact that REIT prices correlate with the broader stock market more than with direct real estate values." },
        { type: "callout", text: "House hacking — buying a 2–4 unit property, living in one unit, and renting the others — remains one of the most accessible entry points for direct real estate ownership. In many markets, the rental income covers most or all of the mortgage, allowing the owner-occupant to build equity while effectively living rent-free." },
        { type: "h3", text: "Understanding the cap rate" },
        { type: "p", text: "Cap rate (capitalization rate) = Net Operating Income ÷ Property Value. It's the most widely used metric for comparing investment properties and expressing yield expectations in a given market. A market with cap rates of 4% means investors are willing to accept $4 of income for every $100 of value — reflecting high confidence in appreciation or liquidity. A market with 7% cap rates implies more income yield demand, typically in lower-growth areas. Neither is better in isolation — it depends on your investment thesis." },
        { type: "h3", text: "The leverage question" },
        { type: "p", text: "Leverage is the defining feature of direct real estate investment. Using a mortgage to buy property means you control a large asset with a smaller equity investment — amplifying both gains and losses. A property that appreciates 10% generates a 50% return on a 20% down payment (before carrying costs). The same math applies in reverse on the way down. The 2008 crisis was fundamentally a leverage crisis, not just a housing price decline." },
      ],
      stats: [
        { label: "US REIT market cap", value: "$1.3T", note: "Publicly traded REITs (2024)" },
        { label: "Avg. cap rate (US multifamily)", value: "5.1%", note: "Q1 2025" },
        { label: "House hacking rent offset", value: "60–110%", note: "Mortgage covered in many markets" },
      ],
      discussion: [
        { author: "Tyler M.", time: "1 day ago", text: "Started with a REIT ETF two years ago just to learn how the sector moves. Now looking at house hacking as the next step. The REIT experience made me much more comfortable reading NOI and cap rate data.", replies: 9 },
        { author: "Zoe C.", time: "3 days ago", text: "The leverage math is real. Bought a duplex in 2021 with 20% down, it's up about 18% in value. My return on the equity invested is enormous. But I'm also aware that math works the other way too.", replies: 13 },
        { author: "Nathan B.", time: "6 days ago", text: "Is there a good rule of thumb for what cap rate should be the minimum before you'd even underwrite a deal? Or does it really depend entirely on the market?", replies: 8 },
      ],
    },
    "tokenization": {
      issue: "Issue No. 05", date: "April 2025", readTime: "6 min read",
      headline: "Tokenization: The Infrastructure Is Real. The Market Is Still Early.",
      subheadline: "Blockchain-based real estate ownership is no longer theoretical — but the practical path from idea to investable asset is more complex than the pitch suggests.",
      body: [
        { type: "p", text: "Tokenization — the conversion of real property ownership into digital tokens on a blockchain — has been described as the next great democratization of real estate investing. The underlying technology is legitimate. The regulatory path is clearer than it was three years ago. But the gap between what's technically possible and what's commercially viable remains significant, and most retail investors are still years away from having meaningful access to liquid tokenized real estate markets." },
        { type: "h3", text: "What tokenization actually changes" },
        { type: "p", text: "The core value proposition is fractionalization: instead of needing $500,000 to invest in a commercial property, tokenization allows a single asset to be divided into thousands of digital shares that can be purchased for as little as $100. This addresses the liquidity and accessibility problems that have historically kept individual investors out of institutional-grade real estate. Secondary market trading — the ability to sell your token before the underlying asset is sold — is the piece that's still developing." },
        { type: "callout", text: "Rhino and Jetty, two companies applying tokenization principles to security deposits, have merged and now operate in over 6 million homes. Rather than paying a $2,000–3,000 lump sum, renters pay a small monthly fee to insure against the deposit. This is one of the clearest real-world applications of the model — solving a concrete consumer pain point rather than just creating a new asset class." },
        { type: "h3", text: "The regulatory landscape" },
        { type: "p", text: "Most tokenized real estate offerings in the US are structured as securities under Regulation D or Regulation A+, which limits who can invest and how liquidity works. Truly open, retail-accessible tokenized real estate markets require either new regulatory frameworks or structures that haven't fully emerged yet. The EU's MiCA framework is ahead of the US on this, which is why some of the more interesting tokenization activity is happening in European markets first." },
        { type: "h3", text: "What to understand before investing" },
        { type: "p", text: "The token is only as good as the asset it represents. Before evaluating any tokenized offering, evaluate the property itself using standard real estate metrics: location, cash flow, cap rate, debt structure, operator track record. The technology layer adds complexity but doesn't change the fundamental investment analysis. A poorly located property with unfavorable financing is still a poor investment when it's wrapped in a token." },
      ],
      stats: [
        { label: "Tokenized RE market (2024)", value: "$0.3T", note: "Projected to $4T by 2035" },
        { label: "Projected CAGR (2024–2035)", value: "27%", note: "Deloitte estimate" },
        { label: "Rhino/Jetty homes covered", value: "6M+", note: "Security deposit insurance" },
      ],
      discussion: [
        { author: "Amir K.", time: "2 days ago", text: "The Reg D vs. Reg A+ distinction is important and usually gets glossed over. Reg D limits you to accredited investors, which means the 'democratization' story is overstated for most retail investors right now.", replies: 11 },
        { author: "Claudia F.", time: "5 days ago", text: "Has anyone actually invested in a tokenized property? I've seen a few platforms but couldn't find enough information on the underlying assets to feel comfortable.", replies: 7 },
        { author: "Steven G.", time: "1 week ago", text: "The Rhino/Jetty model is interesting because it's solving a real problem, not just creating a new investment product. The security deposit pain point is concrete and the solution makes sense.", replies: 6 },
      ],
    },
    "legal-regulations": {
      issue: "Issue No. 04", date: "April 2025", readTime: "7 min read",
      headline: "The Legal Layer: Why Real Estate Rules Shape Everything Else",
      subheadline: "From zoning to the FARE Act, legal and regulatory frameworks don't just govern transactions — they determine what's even possible in a given market.",
      body: [
        { type: "p", text: "Real estate is one of the most heavily regulated industries in the American economy. Every transaction involves title law, contract law, lending regulations, and local land use rules. Every development project navigates zoning, environmental review, and building codes. Every landlord-tenant relationship is governed by a patchwork of state and local law that varies dramatically across jurisdictions. Understanding the legal layer isn't optional — it's foundational." },
        { type: "h3", text: "Zoning: the invisible hand" },
        { type: "p", text: "Zoning determines what can be built on any given parcel of land. In New York City, the zoning resolution runs thousands of pages and controls building height, lot coverage, use (residential, commercial, manufacturing), and density. The most important thing for beginners to understand is that zoning is not static — it changes through a political process, and those changes create and destroy enormous amounts of real estate value. A parcel that gets upzoned from single-family to mixed-use can increase in value by 3–5x without a single brick being laid." },
        { type: "callout", text: "The FARE Act, effective 2024 in NYC, transferred the obligation to pay broker fees in rental transactions from tenants to landlords. The practical effect: tenants who previously paid $4,000–8,000 in upfront broker fees now pay nothing directly. Landlords, in turn, have begun adjusting listed rents. The total cost to renters over a lease term is still being studied." },
        { type: "h3", text: "Title and ownership structures" },
        { type: "p", text: "Title is the legal concept of ownership. A title search — conducted by a title company before any sale — verifies that the seller actually owns what they're selling and that there are no liens, encumbrances, or competing claims on the property. Title insurance protects both buyers and lenders against undiscovered claims. LLC structures are commonly used by investors to hold real estate — they separate personal assets from investment risk and can provide tax advantages, but require separate accounts, proper capitalization, and consistent operating discipline to be effective." },
        { type: "h3", text: "What regulation means for investment decisions" },
        { type: "p", text: "Rent stabilization laws in NYC govern roughly one million units and cap annual rent increases at rates set by the Rent Guidelines Board. This affects cash flow projections, financing terms, and exit valuations for any rent-stabilized building. Understanding which units are stabilized and what the legal rent is — versus what's actually being charged — is essential due diligence for any multifamily acquisition in the five boroughs." },
      ],
      stats: [
        { label: "NYC rent-stabilized units", value: "~1M", note: "Of ~2.3M total rental units" },
        { label: "Avg. NYC renter broker fee (pre-FARE)", value: "$4–8K", note: "Typically 1 month's rent" },
        { label: "LLC real estate holdings (US)", value: "35%+", note: "Of investment property titles" },
      ],
      discussion: [
        { author: "Grace L.", time: "3 days ago", text: "The rent stabilization due diligence point is huge and overlooked. I've seen deals where the 'legal rent' is $800 for an apartment that should be renting at $2,200. The underwriting is completely different once you know that.", replies: 10 },
        { author: "Omar S.", time: "5 days ago", text: "On FARE Act — my building in Brooklyn just relisted our neighbor's unit $350/month higher than before. Draw your own conclusions. The fee has to come from somewhere.", replies: 16 },
        { author: "Priya D.", time: "1 week ago", text: "Can someone explain the difference between a variance and a rezoning? I keep seeing these terms in development news and they seem related but distinct.", replies: 8 },
      ],
    },
    "development": {
      issue: "Issue No. 03", date: "April 2025", readTime: "7 min read",
      headline: "Development: Why the Gap Between Demand and Supply Is So Hard to Close",
      subheadline: "New housing takes years to deliver because the process is genuinely complex — not because developers are slow.",
      body: [
        { type: "p", text: "The question of why housing supply doesn't respond faster to demand is one of the most important in urban economics. The short answer is that real estate development is slow by nature: assembling land, securing entitlements, arranging financing, and completing construction takes years in even the best conditions. In high-demand coastal markets with active community opposition and complex zoning, it can take a decade from site control to certificate of occupancy." },
        { type: "h3", text: "The entitlement process" },
        { type: "p", text: "Entitlement is the process of getting government approval to build what you want on a specific site. In NYC, this means navigating the Uniform Land Use Review Procedure (ULURP) for any discretionary approval — a process that involves community boards, borough presidents, the City Planning Commission, and the City Council. A straightforward rezoning can take 18–24 months. Environmental review adds more time. Community opposition can add years or kill a project entirely." },
        { type: "callout", text: "The average time from land acquisition to first tenant for a ground-up NYC apartment building is 5–8 years. This is why new supply has such a lagged response to demand — by the time buildings deliver, market conditions may have changed significantly from when the project was conceived." },
        { type: "h3", text: "How projects are financed" },
        { type: "p", text: "Development finance is structured in layers. Construction loans — typically from banks — cover hard costs (actual construction) and some soft costs (architecture, permits, carrying costs during construction). These are short-term, high-rate loans that are repaid or refinanced when the building is complete and stabilized. Equity — the developer's own capital plus any outside investors — covers the portion of costs that debt doesn't. The ratio of debt to equity determines risk: higher leverage means more sensitivity to cost overruns or market changes." },
        { type: "h3", text: "Reading a pro forma" },
        { type: "p", text: "A pro forma is the financial model that underlies every development decision. It projects total development costs (land, hard, soft), expected revenue when the project is complete (rental income or sale proceeds), and the return metrics — typically IRR (internal rate of return) and equity multiple. A well-underwritten pro forma stress-tests its assumptions: what happens if construction costs come in 15% over? What if rents are 10% below projected at stabilization? The deals that survive those tests are the ones worth pursuing." },
      ],
      stats: [
        { label: "Avg. NYC ground-up delivery time", value: "5–8 yrs", note: "Land to certificate of occupancy" },
        { label: "Construction cost inflation (2020–24)", value: "+28%", note: "RSMeans national average" },
        { label: "US housing units needed (annual)", value: "1.5–2M", note: "vs. ~1.1M being delivered" },
      ],
      discussion: [
        { author: "Jordan P.", time: "2 days ago", text: "The ULURP timeline is something I didn't appreciate until I started following a specific project in my neighborhood. It's been 3 years and they're still in community board review. The patience required is extraordinary.", replies: 9 },
        { author: "Maria C.", time: "4 days ago", text: "The construction cost inflation stat is what's killing so many projects right now. Pro formas from 2019 are unrecognizable compared to what projects actually cost to build now.", replies: 11 },
        { author: "Sam R.", time: "1 week ago", text: "Good explainer on construction loans. What's the typical LTC (loan-to-cost) ratio a bank will lend at for ground-up residential in a secondary market?", replies: 7 },
      ],
    },
    "financing": {
      issue: "Issue No. 09", date: "April 2025", readTime: "7 min read",
      headline: "The Capital Stack: Understanding How Real Estate Deals Are Actually Funded",
      subheadline: "Every real estate transaction has a financing structure. Understanding it tells you who takes risk, who gets paid first, and why deals succeed or fail.",
      body: [
        { type: "p", text: "Every real estate transaction — from a $300,000 condo to a $300 million office tower — is financed through a combination of debt and equity. The mix of these two components, how they're layered, and who holds each piece determines the risk and return profile of the deal. This structure is called the capital stack, and understanding it is one of the most important things any real estate investor or professional can learn." },
        { type: "h3", text: "Debt: senior and mezzanine" },
        { type: "p", text: "Senior debt — the primary mortgage — is the safest position in the capital stack. It gets paid first, and lenders protect themselves with conservative LTV ratios (typically 65–75% for investment property). If the deal goes wrong, senior lenders have the right to foreclose and recover their capital before equity holders see anything. Mezzanine debt sits below senior debt but above equity — it takes more risk (and earns a higher rate) in exchange for a second claim on assets. Not every deal has mezzanine, but it's common in larger transactions where the equity required would otherwise be prohibitively large." },
        { type: "callout", text: "The DSCR (Debt Service Coverage Ratio) is the primary metric lenders use to evaluate whether a property's income can support its debt. Calculated as Net Operating Income ÷ Annual Debt Service, a DSCR of 1.25x means the property generates $1.25 for every $1.00 of debt payment. Most lenders require a minimum of 1.20–1.25x. Below that, the loan isn't viable regardless of asset quality." },
        { type: "h3", text: "Equity: common and preferred" },
        { type: "p", text: "Equity holders own the residual — whatever's left after all debt and operating expenses are paid. This is the highest-risk position (no guaranteed return, last to get paid in a liquidation) but also the position with the highest upside. In institutional transactions, equity is often split between preferred equity (which has a priority return, typically 6–10%, before common equity participates) and common equity (which gets the remaining upside). The developer or sponsor typically holds the common equity and earns a promote — a disproportionate share of profits above a hurdle rate — for putting the deal together." },
        { type: "h3", text: "Interest rates and what they actually do to deals" },
        { type: "p", text: "When the Fed raised rates from near zero to 5.25–5.5% in 2022–2023, it didn't just raise mortgage costs — it restructured the economics of every income-producing property. Cap rates lagged the rate move (sellers didn't immediately accept lower prices), which created a spread compression problem: properties were generating returns barely above the cost of financing. This is why deal volume collapsed in 2023. In 2025, the market is slowly adjusting as prices have corrected in some sectors and financing costs have come down modestly." },
      ],
      stats: [
        { label: "Typical senior LTV (investment)", value: "65–75%", note: "At current lending standards" },
        { label: "Min. DSCR most lenders require", value: "1.20–1.25x", note: "NOI / annual debt service" },
        { label: "Fed funds rate (April 2025)", value: "4.25–4.5%", note: "After 2024–25 cuts" },
      ],
      discussion: [
        { author: "Kenji A.", time: "1 day ago", text: "The promote structure explanation is the clearest I've seen. A lot of people investing in syndications don't fully understand that the sponsor is getting a disproportionate share above the hurdle — it's not disclosed very transparently in most decks.", replies: 14 },
        { author: "Diana S.", time: "4 days ago", text: "DSCR lending for short-term rentals is a different calculation since income isn't stabilized year-round. Does anyone know if lenders use trailing 12-month actuals or some kind of discount to gross potential?", replies: 8 },
        { author: "Chris W.", time: "1 week ago", text: "The 2023 deal volume collapse was a direct consequence of the rate move and the lag in cap rate adjustment. What's the read on how much further cap rates need to move before deal flow meaningfully recovers?", replies: 10 },
      ],
    },
    "commercial-real-estate": {
      issue: "Issue No. 08", date: "April 2025", readTime: "7 min read",
      headline: "Commercial Real Estate: Why It Operates by Completely Different Rules",
      subheadline: "Valuation, financing, leasing, and risk all work differently in commercial. Understanding the distinctions unlocks a much larger part of the market.",
      body: [
        { type: "p", text: "Commercial real estate — offices, retail, industrial, and multifamily above four units — operates under fundamentally different rules than residential. The most important difference is valuation: while a home is valued primarily by what comparable homes sold for, a commercial property is valued by the income it generates. This single shift in framework changes how you analyze, buy, finance, and manage these assets." },
        { type: "h3", text: "Income-based valuation" },
        { type: "p", text: "Cap rate = NOI ÷ Value. Rearranging: Value = NOI ÷ Cap Rate. A property with $500,000 in net operating income in a market with 5% cap rates is worth $10 million. If that same property's income increases to $600,000 — through rent growth, improved occupancy, or expense reduction — the value rises to $12 million. This is why value-add commercial investing is about improving the income statement, not just waiting for appreciation. Every dollar of NOI improvement is worth $20 at a 5% cap rate." },
        { type: "callout", text: "NYC's post-pandemic office market is bifurcating sharply. Class A buildings — high amenity, well-located, recently renovated — are seeing strong leasing activity and near pre-pandemic rents. Class B and C buildings are struggling with persistently high vacancy, rising capital expenditure requirements, and lenders unwilling to refinance at current values. The divergence is creating both distressed opportunity and significant risk depending on where you're positioned." },
        { type: "h3", text: "Lease structures and what they mean" },
        { type: "p", text: "Commercial leases are far more variable than residential leases. In a gross lease, the landlord pays all operating expenses (common in office). In a net lease, the tenant pays some or all of operating expenses directly — triple net (NNN) means the tenant pays property tax, insurance, and maintenance on top of base rent. NNN leases to credit tenants (large national retailers, investment-grade companies) are among the most stable cash flow instruments in real estate because the income is contractually committed and the tenant manages operating costs." },
        { type: "h3", text: "Industrial: the standout performer" },
        { type: "p", text: "While office has struggled post-pandemic, industrial real estate — warehouses, distribution centers, last-mile logistics facilities — has been the sector's strongest performer. E-commerce growth drove unprecedented demand for logistics infrastructure, and cap rates compressed to 3–4% in premier markets at the peak. Supply is now catching up, and rent growth has slowed, but industrial fundamentals remain stronger than most other commercial sectors. Location relative to population centers and highway access remain the primary value drivers." },
      ],
      stats: [
        { label: "NYC Class A office vacancy", value: "~12%", note: "vs. 18%+ for Class B/C" },
        { label: "Industrial cap rates (premier markets)", value: "4.5–5.5%", note: "Up from 3–4% at 2022 peak" },
        { label: "NNN lease avg. term", value: "10–20 yrs", note: "Credit tenant deals" },
      ],
      discussion: [
        { author: "Fatima A.", time: "2 days ago", text: "The NOI = Value explanation is the thing that clicked for me when I first understood commercial. Once you see every rent dollar as a multiple of value, the whole industry makes more sense.", replies: 13 },
        { author: "Trevor M.", time: "4 days ago", text: "Industrial has been the story for 5 years but I'm seeing cap rate expansion now as supply catches up. Is there still a case for industrial or has the window closed?", replies: 9 },
        { author: "Isabelle C.", time: "1 week ago", text: "Can someone explain tenant improvement allowances (TI) and how they affect underwriting? I keep seeing them in office lease abstracts and I'm not sure how to model the true economics.", replies: 12 },
      ],
    },
    "zoning": {
      issue: "Issue No. 10", date: "April 2025", readTime: "6 min read",
      headline: "Zoning: The Political Economy of What Gets Built and Where",
      subheadline: "Land use rules are the most consequential — and least understood — force in real estate. Changing them creates enormous value. Protecting them destroys supply.",
      body: [
        { type: "p", text: "Zoning is the regulatory framework that governs land use — what types of buildings can go where, how tall they can be, and how much of a lot they can cover. In theory, it exists to organize urban development and protect property values. In practice, it's a deeply political process that reflects the preferences of existing property owners far more than the needs of future residents. Understanding zoning is essential for understanding why housing supply is constrained, why certain neighborhoods change and others don't, and where development opportunity hides." },
        { type: "h3", text: "How NYC's zoning system works" },
        { type: "p", text: "New York City's zoning resolution, first adopted in 1961 and amended thousands of times since, divides the city into residential (R1–R10), commercial (C1–C8), and manufacturing (M1–M3) districts. The number indicates density: R1 allows single-family homes in low-density suburban-style neighborhoods; R10 allows maximum-density residential towers in central Manhattan. C6 covers high-density commercial districts in central business areas. Understanding which zone a site is in — and what that zone allows — is the first step in any development analysis." },
        { type: "callout", text: "Upzoning a single parcel can multiply its value by 3–5x without any construction occurring. This is why land use approvals are fiercely contested — the value they create is real and immediate, and it flows to the landowner rather than the community unless affordable housing requirements are attached." },
        { type: "h3", text: "Variances vs. rezonings" },
        { type: "p", text: "A variance allows a specific property to deviate from existing zoning rules — for example, building slightly taller than the height limit, or placing a commercial use in a residential zone. Variances require demonstrating hardship and go through the Board of Standards and Appeals (in NYC). They're site-specific and don't change the underlying zoning map. A rezoning changes the rules for an area — it can be initiated by a property owner, a developer, or the city itself, and requires full ULURP review. Rezonings create precedent that applies to all properties in the affected area." },
        { type: "h3", text: "Inclusionary zoning and the affordability tradeoff" },
        { type: "p", text: "Inclusionary zoning (IZ) programs allow developers to build at higher density than base zoning permits — in exchange for setting aside a percentage of units as affordable housing. NYC's Mandatory Inclusionary Housing (MIH) program requires 25–30% affordable units in exchange for the density bonus. The economics work when the value of the additional market-rate units exceeds the cost of the affordable units — which depends heavily on land cost, market rents, and construction costs. When the math doesn't work, developers don't build, and the intended housing supply doesn't materialize." },
      ],
      stats: [
        { label: "NYC zoning districts", value: "7,000+", note: "Distinct mapped districts" },
        { label: "Upzoning value premium", value: "3–5x", note: "Land value increase, site-specific" },
        { label: "MIH affordable set-aside", value: "25–30%", note: "Of units, at various AMI levels" },
      ],
      discussion: [
        { author: "Leo P.", time: "1 day ago", text: "The distinction between variance and rezoning is important and most people conflate them. A variance is a one-off exception; a rezoning changes the rules for everyone in the area going forward. Very different levels of process and precedent.", replies: 8 },
        { author: "Nina W.", time: "4 days ago", text: "Is there a public database where you can look up zoning designations for any NYC parcel? I've been using ZoLa but want to know if there's something more granular.", replies: 11 },
        { author: "Eduardo R.", time: "1 week ago", text: "The MIH math point is critical. I've seen so many projects stall in neighborhoods where the density bonus isn't enough to offset the affordable unit cost plus land price. The policy is well-intentioned but the economics don't always follow.", replies: 9 },
      ],
    },
    "proptech": {
      issue: "Issue No. 11", date: "April 2025", readTime: "6 min read",
      headline: "PropTech: What Actually Stuck and What's Still a Promise",
      subheadline: "After a decade of disruption narratives, it's worth being clear-eyed about which real estate technologies have changed the industry and which remain experiments.",
      body: [
        { type: "p", text: "The PropTech sector attracted over $30 billion in venture investment between 2019 and 2022. The subsequent correction — with several high-profile failures and declining valuations — forced a more sober reckoning with what technology actually changes in real estate versus what it merely makes easier or cheaper at the margin. The distinction matters for anyone trying to understand which tools are worth learning and which platforms are likely to still exist in five years." },
        { type: "h3", text: "What has genuinely changed" },
        { type: "p", text: "Information access has been transformed. The gap between what a professional with CoStar access knows and what a retail investor knows has narrowed substantially, though it hasn't closed. Platforms like Redfin, Zillow, and Realtor.com have made listing data freely available in ways that were unimaginable 20 years ago. For commercial, CoStar remains the dominant data provider with a near-monopoly on comprehensive market data — but alternatives like Reonomy and CompStak are creating specialized datasets that challenge CoStar's supremacy in specific use cases." },
        { type: "callout", text: "iBuyers — companies that use algorithms to make instant cash offers on homes — peaked in 2021 with Opendoor, Offerpad, and Zillow Offers collectively purchasing tens of thousands of homes per month. Zillow exited the business in late 2021 after a $500M+ loss. Opendoor and Offerpad have survived but at dramatically reduced scale. The model works in stable, liquid, homogeneous markets — and struggles everywhere else." },
        { type: "h3", text: "Property management technology" },
        { type: "p", text: "The property management software space has seen genuine adoption. Platforms like Yardi, MRI, AppFolio, and Buildium have become infrastructure for how residential and commercial properties are managed — from rent collection and maintenance tracking to lease administration and financial reporting. This is the unsexy side of PropTech, but it's where real operational efficiency has been achieved. For investors managing multiple properties, these tools have materially reduced administrative burden." },
        { type: "h3", text: "What's still developing" },
        { type: "p", text: "AI-powered valuation models, automated underwriting, and blockchain-based title and closing processes remain in development or early adoption. The friction in real estate transactions — title searches, attorney review, lender underwriting — is deeply embedded in regulatory requirements and professional practice. Technology can speed up the workflow, but eliminating the human review layer requires regulatory change, not just better software. The 5–10 year horizon is where the more significant disruption is likely to occur." },
      ],
      stats: [
        { label: "PropTech VC investment (2019–22)", value: "$30B+", note: "Global, per MSCI" },
        { label: "Zillow iBuyer loss (2021)", value: "$500M+", note: "Before exiting the business" },
        { label: "Yardi/MRI market penetration", value: "~60%", note: "Of institutional portfolios" },
      ],
      discussion: [
        { author: "Raj S.", time: "2 days ago", text: "The iBuyer story is a perfect case study in the limits of algorithmic real estate. The model depends on stable price trends to make the spread work. The moment markets move faster than the model, you're holding inventory at the wrong price.", replies: 12 },
        { author: "Emma L.", time: "5 days ago", text: "What's the best CoStar alternative for someone who can't justify the $15K+ annual cost? Looking for commercial market data for a secondary Midwest market.", replies: 14 },
        { author: "Daniel T.", time: "1 week ago", text: "AppFolio has been great for our small portfolio (~20 units). The maintenance request workflow alone saves hours every month. Curious if people at larger scale still use it or move to Yardi.", replies: 6 },
      ],
    },
    "deal-flow": {
      issue: "Issue No. 12", date: "April 2025", readTime: "6 min read",
      headline: "Deal Flow: Why Access Matters More Than Analysis in Real Estate",
      subheadline: "The best analysis in the world doesn't matter if you're not seeing the right deals. Understanding how opportunities are sourced and shared is the first step to improving your deal flow.",
      body: [
        { type: "p", text: "In most industries, superior analysis confers sustainable advantage. In real estate, the advantage is more often informational — specifically, access to deals before they're broadly available. The best commercial real estate investors spend as much time on relationship cultivation as they do on underwriting, because deal flow quality determines the ceiling of what's achievable. A sophisticated investor seeing only publicly marketed deals is at a structural disadvantage to a moderately capable investor with strong broker relationships." },
        { type: "h3", text: "How commercial deals actually get distributed" },
        { type: "p", text: "Most investment-grade commercial real estate transactions start with a broker outreach. The broker — representing the seller — sends a teaser or offering memorandum (OM) to a distribution list of qualified buyers. The quality of that list determines who gets first look. First-tier buyers — those who close reliably, move quickly, and maintain relationships — receive proactive outreach before deals are broadly marketed. Second-tier buyers see deals after the first round of offers has been collected. The public listing on LoopNet or CoStar is often a signal that the first round of marketing didn't find a buyer at the seller's target price." },
        { type: "callout", text: "Off-market transactions — where a buyer approaches a seller directly, or where a deal is sold quietly without broad marketing — often represent the best opportunities for buyers. These deals involve less competition and frequently price at a discount to what would be achieved through a formal process. Building the relationships that generate off-market access takes years and requires consistent, genuine engagement with brokers and owners." },
        { type: "h3", text: "Evaluating what you find" },
        { type: "p", text: "Deal screening is the process of quickly determining whether an opportunity is worth the time investment of full underwriting. The first filter is usually price and cap rate: does the seller's expectation imply a return threshold that makes sense given current financing costs? The second filter is fundamental: is the location, asset type, and tenancy profile something that fits your investment criteria? Full underwriting — building a detailed pro forma, reviewing leases, inspecting the property, ordering third-party reports — should be reserved for deals that pass both filters." },
        { type: "h3", text: "The FOMO problem" },
        { type: "p", text: "The single most common reason experienced investors overpay is fear of missing out on a specific deal. Once you've invested time and energy in underwriting an opportunity, the psychological cost of walking away can lead to stretching on price, overlooking risks, or accepting unfavorable terms. The discipline to walk away from deals that don't meet underwriting criteria — even after significant time investment — is one of the most valuable skills in real estate, and one of the hardest to develop." },
      ],
      stats: [
        { label: "Off-market deals (institutional)", value: "30–40%", note: "Of all commercial transactions" },
        { label: "Avg. time to underwrite CRE deal", value: "2–6 wks", note: "Full due diligence" },
        { label: "Deals reviewed per deal closed", value: "50–100x", note: "Active institutional investors" },
      ],
      discussion: [
        { author: "Mia F.", time: "1 day ago", text: "The first-tier vs second-tier buyer insight is something brokers don't advertise. I've started tracking which brokers actually call me before sending broad marketing — that's the list that matters.", replies: 11 },
        { author: "David C.", time: "3 days ago", text: "The FOMO point is real. I've passed on three deals I was sure I'd regret and I haven't regretted any of them. The market keeps producing opportunities. The scarcity narrative is usually seller-side positioning.", replies: 15 },
        { author: "Alicia M.", time: "1 week ago", text: "What CRM or tracking system do people use to manage broker relationships and deal pipeline? Looking for something more structured than a spreadsheet but less heavy than Salesforce.", replies: 9 },
      ],
    },
  };

  if (currentTopicPage) {
    const ed = topicEditorial[currentTopicPage.slug] || topicEditorial["first-time-learning"];

    const submitComment = () => {
      if (!activeComment.trim()) return;
      setComments([{ author: "You", time: "Just now", text: activeComment, replies: 0 }, ...comments]);
      setActiveComment("");
    };

    return (
      <div style={page}>
        <NavBar onBack={goBackToHome} backLabel="← All topics" />
        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px clamp(20px,4vw,48px) 80px", boxSizing: "border-box", display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>

          {/* LEFT: Main editorial content */}
          <div>
            {/* Header card */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "32px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", padding: "3px 8px", border: `1px solid ${C.border}`, borderRadius: R.sm }}>{currentTopicPage.tag?.toUpperCase()}</div>
                <div style={{ fontSize: "10px", color: C.inkMuted }}>{ed.issue} · {ed.date} · {ed.readTime}</div>
              </div>
              <h1 style={{ fontSize: "30px", fontWeight: "700", letterSpacing: "-0.025em", margin: "0 0 10px", color: C.ink, lineHeight: "1.15" }}>{ed.headline}</h1>
              <p style={{ fontSize: "16px", color: C.inkLight, lineHeight: "1.65", margin: "0 0 20px", fontStyle: "italic" }}>{ed.subheadline}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "16px", borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => saveInterest(currentTopicPage.title)} style={{ ...btn.primary, padding: "9px 16px", fontSize: "13px", backgroundColor: savedInterests.includes(currentTopicPage.title) ? C.accentHover : C.accent }}>
                  {savedInterests.includes(currentTopicPage.title) ? "Saved" : "Save to interests"}
                </button>
                <button onClick={openSignup} style={{ ...btn.secondary, padding: "9px 16px", fontSize: "13px" }}>Create an account</button>
                <div style={{ fontSize: "12px", color: C.inkMuted, marginLeft: "auto" }}>{comments.length} comments in this thread</div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "16px" }}>
              {ed.stats.map((s, i) => (
                <div key={i} style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "16px 18px" }}>
                  <div style={{ fontSize: "22px", fontWeight: "700", color: C.accent, letterSpacing: "-0.02em", marginBottom: "3px" }}>{s.value}</div>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: C.ink, marginBottom: "2px" }}>{s.label}</div>
                  <div style={{ fontSize: "11px", color: C.inkMuted }}>{s.note}</div>
                </div>
              ))}
            </div>

            {/* Article body */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "32px", marginBottom: "16px" }}>
              {ed.body.map((block, i) => {
                if (block.type === "p") return <p key={i} style={{ fontSize: "15px", lineHeight: "1.8", color: C.inkLight, margin: "0 0 18px" }}>{block.text}</p>;
                if (block.type === "h3") return <h3 key={i} style={{ fontSize: "17px", fontWeight: "700", color: C.ink, margin: "28px 0 10px", letterSpacing: "-0.01em" }}>{block.text}</h3>;
                if (block.type === "callout") return (
                  <div key={i} style={{ backgroundColor: C.accentLight, borderLeft: `3px solid ${C.accent}`, borderRadius: `0 ${R.lg} ${R.lg} 0`, padding: "14px 18px", margin: "20px 0", fontSize: "14px", lineHeight: "1.7", color: C.accent, fontStyle: "italic" }}>{block.text}</div>
                );
                return null;
              })}
            </div>

            {/* Community discussion */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "28px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "6px" }}>COMMUNITY DISCUSSION</div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: C.ink, margin: "0 0 18px", letterSpacing: "-0.01em" }}>Join the conversation on {currentTopicPage.title}</h2>

              {/* Comment input */}
              <div style={{ marginBottom: "20px" }}>
                <textarea
                  value={activeComment}
                  onChange={e => setActiveComment(e.target.value)}
                  placeholder="Share a question, experience, or perspective…"
                  rows={3}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: R.lg, border: `1px solid ${C.border}`, fontSize: "14px", color: C.ink, resize: "vertical", fontFamily: "inherit", outline: "none", boxSizing: "border-box", backgroundColor: C.bg, lineHeight: "1.6" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <div style={{ fontSize: "12px", color: C.inkMuted }}>Be specific — the more context, the better the discussion.</div>
                  <button onClick={submitComment} style={{ ...btn.primary, padding: "8px 16px", fontSize: "13px" }}>Post</button>
                </div>
              </div>

              {/* Comment thread */}
              <div style={{ display: "grid", gap: "12px" }}>
                {comments.map((c, i) => (
                  <div key={i} style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", color: C.accent, flexShrink: 0 }}>{c.author[0]}</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: C.ink }}>{c.author}</div>
                      <div style={{ fontSize: "11px", color: C.inkMuted }}>{c.time}</div>
                    </div>
                    <p style={{ fontSize: "13px", lineHeight: "1.7", color: C.inkLight, margin: "0 0 10px" }}>{c.text}</p>
                    <div style={{ fontSize: "12px", color: C.inkMuted, cursor: "pointer" }}>↩ {c.replies} {c.replies === 1 ? "reply" : "replies"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div style={{ position: "sticky", top: "90px", display: "grid", gap: "14px" }}>
            {/* About this topic */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "20px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "8px" }}>ABOUT THIS TOPIC</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: C.ink, marginBottom: "5px" }}>{currentTopicPage.title}</div>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.6", margin: "0 0 14px" }}>{currentTopicPage.description}</p>
              <div style={{ display: "grid", gap: "5px" }}>
                {topicPageContent[currentTopicPage.slug]?.points.map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "3px", backgroundColor: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", color: C.accent, flexShrink: 0, marginTop: "1px" }}>{i+1}</div>
                    <div style={{ fontSize: "12px", color: C.inkLight, lineHeight: "1.5" }}>{pt}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related topics */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "20px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "10px" }}>RELATED TOPICS</div>
              <div style={{ display: "grid", gap: "6px" }}>
                {(topicProfileData[currentTopicPage.title]?.relatedTopics || []).map(rt => {
                  const relTopic = topics.find(t => t.title === rt);
                  return (
                    <button key={rt} onClick={() => openTopicPage(relTopic || { title: rt, slug: rt.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z-]/g,""), description: "", tag: "" })}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.md, padding: "10px 12px", cursor: "pointer", textAlign: "left" }}>
                      <div>
                        <div style={{ fontSize: "10px", color: C.inkMuted, marginBottom: "1px" }}>{relTopic?.tag}</div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: C.ink }}>{rt}</div>
                      </div>
                      <span style={{ color: C.accent, fontSize: "13px" }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Professionals */}
            <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "20px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "10px" }}>ASK A PROFESSIONAL</div>
              <div style={{ display: "grid", gap: "8px", marginBottom: "12px" }}>
                {professionals.map(p => (
                  <div key={p.name} style={{ borderRadius: R.md, padding: "11px 12px", backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: C.ink }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: C.inkMuted, marginBottom: "3px" }}>{p.role}</div>
                    <div style={{ fontSize: "11px", color: C.inkLight, lineHeight: "1.5" }}>{p.help}</div>
                  </div>
                ))}
              </div>
              <button onClick={openSignup} style={{ ...btn.primary, width: "100%", justifyContent: "center", fontSize: "13px", padding: "10px" }}>Connect with professionals</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // HOMEPAGE
  const heroActions = [
    { number: "01", title: "Pick a topic", body: "Choose one area and start learning.", action: () => handleNavClick("topics-section","Topics") },
    { number: "02", title: "Read this week's update", body: "Stay close to current market insights.", action: () => handleNavClick("market-trends-section","Newsletter") },
    { number: "03", title: "Ask a question", body: "Get answers from people in the field.", action: () => handleNavClick("ask-question-section","Ask a Question") },
  ];

  return (
    <div style={page}>
      <NavBar />
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px clamp(20px,4vw,48px) 80px", boxSizing: "border-box" }}>

        {/* HERO */}
        <section id="learn-section" style={{ marginBottom: "60px" }}>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "40px 44px 36px", boxSizing: "border-box" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "44px", alignItems: "center", marginBottom: "36px" }}>
              <div>
                <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: R.sm, backgroundColor: C.accentLight, color: C.accent, fontSize: "10px", fontWeight: "700", letterSpacing: "0.07em", marginBottom: "18px" }}>BEGINNER-FIRST REAL ESTATE PLATFORM</div>
                <h1 style={{ fontSize: "44px", lineHeight: "1.06", margin: "0 0 14px", color: C.ink, fontWeight: "700", letterSpacing: "-0.025em", maxWidth: "520px" }}>Learn real estate without feeling lost.</h1>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: C.inkLight, maxWidth: "500px", margin: "0 0 26px" }}>MyHome helps beginners understand real estate clearly — explore topics at your own pace, follow market updates, and connect with experienced professionals.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={openSignup} style={btn.primary}>Start learning</button>
                  <button onClick={() => handleNavClick("topics-section","Topics")} style={btn.secondary}>Browse topics</button>
                  <button onClick={() => handleNavClick("market-trends-section","Newsletter")} style={btn.secondary}>Market updates</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", minWidth: "190px" }}>
                {[{title:"Beginner-first",body:"No assumed knowledge. Start wherever you are."},{title:"Step by step",body:"Topics build on each other logically."},{title:"Real professionals",body:"Ask questions and learn from people in the field."}].map(c => (
                  <div key={c.title} style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: "13px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: C.ink, marginBottom: "2px" }}>{c.title}</div>
                    <div style={{ fontSize: "12px", color: C.inkMuted, lineHeight: "1.5" }}>{c.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "26px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "12px" }}>THREE WAYS TO GET STARTED</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                {heroActions.map(item => (
                  <button key={item.title} onClick={item.action}
                    style={{ textAlign: "left", backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "16px 18px", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.backgroundColor = C.accentLight; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.bg; }}>
                    <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "5px" }}>{item.number}</div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: C.ink, marginBottom: "3px" }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: C.inkLight, lineHeight: "1.5" }}>{item.body}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TOPICS */}
        <section id="topics-section" style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "6px" }}>TOPICS</div>
            <h2 style={{ fontSize: "26px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "6px", marginTop: 0 }}>Pick a topic and start there</h2>
            <p style={{ fontSize: "14px", color: C.inkLight, lineHeight: "1.6", maxWidth: "520px", margin: 0 }}>Each topic is structured to help you understand one area clearly before moving to the next.</p>
          </div>
          <div style={{ display: "grid", gap: "28px" }}>
            {topicGroups.map(group => (
              <div key={group.groupTitle}>
                <div style={{ marginBottom: "12px", display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", color: C.ink, margin: 0 }}>{group.groupTitle}</h3>
                  <span style={{ fontSize: "12px", color: C.inkMuted }}>{group.groupDescription}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
                  {group.items.map(topicTitle => {
                    const topic = topics.find(t => t.title === topicTitle);
                    return (
                      <button key={topic.title} onClick={() => openTopicPage(topic)}
                        style={{ textAlign: "left", border: `1px solid ${C.border}`, borderRadius: R.lg, backgroundColor: C.white, padding: "18px", cursor: "pointer" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.backgroundColor = C.accentLight; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.white; }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.07em", marginBottom: "7px" }}>{topic.tag}</div>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: C.ink, marginBottom: "5px", letterSpacing: "-0.01em" }}>{topic.title}</div>
                        <div style={{ fontSize: "12px", color: C.inkLight, lineHeight: "1.5" }}>{topic.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER + COMMUNITY */}
        <section id="market-trends-section" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "16px", marginBottom: "60px" }}>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "26px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "14px" }}>THIS WEEK'S NEWSLETTER</div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "8px", marginTop: 0 }}>What we're highlighting this week</h2>
            <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "18px" }}>One focused weekly read — timely, concise, and designed for people building their understanding.</p>
            <div style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.07em", padding: "3px 7px", backgroundColor: C.warmLight, borderRadius: R.sm }}>{weeklyNewsletter.label}</div>
                <div style={{ fontSize: "11px", color: C.inkMuted }}>{weeklyNewsletter.date}</div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.015em", marginBottom: "8px", color: C.ink, lineHeight: "1.25" }}>{weeklyNewsletter.title}</div>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "12px" }}>{weeklyNewsletter.intro}</p>
              <div style={{ display: "grid", gap: "5px", marginBottom: "16px" }}>
                {weeklyNewsletter.bullets.map((b,i) => (
                  <div key={i} style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: C.accent, marginTop: "8px", flexShrink: 0 }} />
                    <div style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.6" }}>{b}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={btn.primary}>Read this week's issue</button>
                <button style={btn.secondary}>Past issues</button>
              </div>
            </div>
          </div>

          <div id="community-section" style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "26px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "14px" }}>COMMUNITY</div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "7px", marginTop: 0 }}>Learn from people in the field</h2>
            <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "16px" }}>Professionals are here to support the learning process — not to dominate the platform.</p>
            <div style={{ display: "grid", gap: "8px", flex: 1, marginBottom: "16px" }}>
              {professionals.map(p => (
                <div key={p.name} style={{ border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "13px 15px", backgroundColor: C.bg }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "3px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: C.ink }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: C.inkMuted }}>— {p.role}</div>
                  </div>
                  <div style={{ fontSize: "12px", color: C.inkLight, lineHeight: "1.6" }}>{p.help}</div>
                </div>
              ))}
            </div>
            <div id="ask-question-section" style={{ borderRadius: R.lg, padding: "15px 16px", backgroundColor: C.ink, color: "white" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}>Ask a beginner question</div>
              <div style={{ fontSize: "12px", lineHeight: "1.6", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>Post a question and get answers from people who work in real estate.</div>
              <button onClick={openSignup} style={{ border: "none", borderRadius: R.md, padding: "8px 14px", backgroundColor: "white", color: C.ink, fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Join the community</button>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ backgroundColor: C.ink, borderRadius: R.xl, padding: "40px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "28px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: "7px" }}>GET STARTED</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em", color: "white", margin: "0 0 7px" }}>Explore first. Sign up when ready.</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: "380px", lineHeight: "1.6" }}>Browse freely — create a profile when you want to save your progress and personalize your experience.</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={openSignup} style={{ ...btn.primary, backgroundColor: "#c07040", padding: "11px 20px" }}>Create free profile</button>
            <button style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: R.md, padding: "11px 20px", backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Browse as guest</button>
          </div>
        </section>
      </main>

      {/* MODAL */}
      {showSignupModal && (
        <>
          <div onClick={onboardingStep===4?undefined:closeSignup} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(10,18,26,0.6)", zIndex: 40 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", maxWidth: "92%", backgroundColor: C.white, borderRadius: R.xl, padding: "32px", zIndex: 50, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto", boxSizing: "border-box" }}>
            {onboardingStep!==4 && <button onClick={closeSignup} style={{ position: "absolute", top: "13px", right: "15px", border: "none", background: "transparent", fontSize: "20px", color: C.inkMuted, cursor: "pointer", lineHeight: 1 }}>×</button>}

            {onboardingStep < 4 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                {["Goal","Topics","Account"].map((label,i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", flex: i<2?1:"none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: onboardingStep>i+1?C.accent:onboardingStep===i+1?C.accent:C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", color: onboardingStep>=i+1?"white":C.inkMuted, flexShrink: 0 }}>{onboardingStep>i+1?"✓":i+1}</div>
                      <span style={{ fontSize: "11px", fontWeight: "600", color: onboardingStep===i+1?C.ink:C.inkMuted }}>{label}</span>
                    </div>
                    {i<2&&<div style={{ flex:1, height:"1px", backgroundColor:onboardingStep>i+1?C.accent:C.border }} />}
                  </div>
                ))}
              </div>
            )}

            {onboardingStep===1 && <>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "5px" }}>STEP 1 OF 3</div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", color: C.ink, marginBottom: "5px", marginTop: 0 }}>Welcome to MyHome</h2>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "20px" }}>Tell us what you want help with first.</p>
              <div style={{ fontSize: "12px", fontWeight: "600", color: C.ink, marginBottom: "9px" }}>What would you like help with?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px", marginBottom: "22px" }}>
                {learningGoals.map(goal => { const sel=selectedGoal===goal; return <button key={goal} onClick={()=>setSelectedGoal(goal)} style={{ padding:"12px 14px", borderRadius:R.lg, border:sel?`2px solid ${C.accent}`:`1px solid ${C.border}`, backgroundColor:sel?C.accentLight:C.white, color:C.ink, fontSize:"13px", fontWeight:sel?"600":"400", cursor:"pointer", textAlign:"left" }}>{goal}</button>; })}
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button onClick={nextStep} disabled={!selectedGoal} style={{ ...btn.primary, opacity:selectedGoal?1:0.4, cursor:selectedGoal?"pointer":"not-allowed" }}>Continue</button>
              </div>
            </>}

            {onboardingStep===2 && <>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "5px" }}>STEP 2 OF 3</div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", color: C.ink, marginBottom: "5px", marginTop: 0 }}>Select three topics</h2>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "18px" }}>These will anchor your profile and help us surface the most relevant content first.</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"8px" }}>
                {topics.map(topic => { const sel=savedInterests.includes(topic.title); const dis=!sel&&savedInterests.length>=3; return <button key={topic.title} onClick={()=>!dis&&saveInterest(topic.title)} style={{ padding:"8px 13px", borderRadius:R.md, border:sel?`2px solid ${C.accent}`:`1px solid ${C.border}`, backgroundColor:sel?C.accentLight:dis?"#fafafa":C.white, color:dis?C.inkMuted:C.ink, fontSize:"12px", fontWeight:sel?"600":"400", cursor:dis?"not-allowed":"pointer" }}>{topic.title}</button>; })}
              </div>
              <div style={{ fontSize:"11px", color:C.inkMuted, marginBottom:"20px" }}>{savedInterests.length} of 3 selected</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <button onClick={()=>setOnboardingStep(1)} style={btn.secondary}>Back</button>
                <button onClick={nextStep} disabled={savedInterests.length!==3} style={{ ...btn.primary, opacity:savedInterests.length===3?1:0.4, cursor:savedInterests.length===3?"pointer":"not-allowed" }}>Continue</button>
              </div>
            </>}

            {onboardingStep===3 && <>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "5px" }}>STEP 3 OF 3</div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", color: C.ink, marginBottom: "5px", marginTop: 0 }}>Create your account</h2>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "20px" }}>Save your progress and personalize your experience.</p>
              <div style={{ display:"grid", gap:"12px", marginBottom:"16px" }}>
                {[{key:"name",label:"Full name",type:"text",placeholder:"e.g. Jordan Smith"},{key:"email",label:"Email address",type:"email",placeholder:"e.g. jordan@email.com"},{key:"password",label:"Password",type:"password",placeholder:"Minimum 6 characters"}].map(f => (
                  <div key={f.key}>
                    <label style={{ display:"block", fontSize:"12px", fontWeight:"600", color:C.ink, marginBottom:"5px" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={accountInfo[f.key]} onChange={e=>setAccountInfo({...accountInfo,[f.key]:e.target.value})} style={{ width:"100%", padding:"11px 13px", borderRadius:R.lg, border:accountErrors[f.key]?`1.5px solid ${C.red}`:`1px solid ${C.border}`, fontSize:"13px", color:C.ink, outline:"none", boxSizing:"border-box", fontFamily:"inherit", backgroundColor:C.white }} />
                    {accountErrors[f.key]&&<div style={{ color:C.red, fontSize:"11px", marginTop:"3px" }}>{accountErrors[f.key]}</div>}
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor:C.bg, borderRadius:R.lg, padding:"12px 14px", marginBottom:"18px", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:"11px", fontWeight:"700", color:C.ink, marginBottom:"4px" }}>Summary</div>
                <div style={{ fontSize:"12px", color:C.inkLight }}>Goal: <strong style={{ color:C.ink }}>{selectedGoal||"—"}</strong></div>
                <div style={{ fontSize:"12px", color:C.inkLight }}>Topics: <strong style={{ color:C.ink }}>{savedInterests.join(", ")||"—"}</strong></div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
                <button onClick={()=>setOnboardingStep(2)} style={btn.secondary}>Back</button>
                <button onClick={nextStep} style={btn.primary}>Create account</button>
              </div>
              <div style={{ textAlign:"center", fontSize:"11px", color:C.inkMuted }}>By signing up you agree to our <span style={{ color:C.accent, cursor:"pointer" }}>Terms</span> and <span style={{ color:C.accent, cursor:"pointer" }}>Privacy Policy</span>.</div>
            </>}

            {onboardingStep===4 && (
              <div style={{ textAlign:"center", padding:"10px 0" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"50%", backgroundColor:C.accentLight, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontSize:"10px", fontWeight:"700", color:C.warm, letterSpacing:"0.08em", marginBottom:"7px" }}>ACCOUNT CREATED</div>
                <h2 style={{ fontSize:"24px", fontWeight:"700", letterSpacing:"-0.02em", color:C.ink, marginBottom:"8px", marginTop:0 }}>Welcome, {accountInfo.name.split(" ")[0]||"there"}.</h2>
                <p style={{ fontSize:"13px", color:C.inkLight, lineHeight:"1.7", marginBottom:"20px", maxWidth:"360px", margin:"0 auto 20px" }}>Your profile is ready. We've organized your experience around your goal and selected topics.</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", justifyContent:"center", marginBottom:"20px" }}>
                  <div style={{ backgroundColor:C.accentLight, border:`1px solid ${C.border}`, borderRadius:R.sm, padding:"4px 10px", fontSize:"11px", fontWeight:"600", color:C.accent }}>{selectedGoal}</div>
                  {savedInterests.map(t=><div key={t} style={{ backgroundColor:C.warmLight, border:"1px solid #e0cfc0", borderRadius:R.sm, padding:"4px 10px", fontSize:"11px", fontWeight:"600", color:C.warm }}>{t}</div>)}
                </div>
                <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
                  <button onClick={()=>{setShowSignupModal(false);setShowProfile(true);}} style={btn.primary}>View my profile</button>
                  <button onClick={()=>{setShowSignupModal(false);handleNavClick("market-trends-section","Newsletter");}} style={btn.secondary}>This week's newsletter</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}