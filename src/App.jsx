import { useState, useEffect } from "react";

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


const NavBar = ({ onBack, backLabel, activeNav, handleNavClick, isSignedUp, setShowProfile, openSignup, accountInfo }) => (
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
            <button onClick={isSignedUp ? () => setShowProfile(true) : openSignup} style={{ ...btn.primary, padding: "8px 16px", fontSize: "13px" }}>{isSignedUp ? ("Hi, " + accountInfo.name.split(" ")[0] + " ↗") : "Sign up free"}</button>
          </div>
        )}
      </div>
    </div>
  );

export default function App() {
  // Loads Montserrat so the whole website uses the new font.
  useEffect(() => {
    const fontId = "myhome-montserrat-font";

    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);
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
  const [profileTopicDetail, setProfileTopicDetail] = useState(null);
  const [activeComment, setActiveComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [proMessage, setProMessage] = useState("");
  const [selectedNewsletterId, setSelectedNewsletterId] = useState("april-sales-flat");
  const [showPastIssues, setShowPastIssues] = useState(false);

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
    {
      name: "Sarah Jenkins", role: "Real Estate Attorney", initials: "SJ",
      help: "Explains contracts, zoning, and legal basics clearly.",
      location: "New York, NY", experience: "14 years",
      bio: "Sarah specializes in residential and commercial real estate transactions, zoning disputes, and landlord-tenant law. She has represented buyers, sellers, and developers across NYC and the tri-state area. She's particularly focused on helping first-time buyers understand what they're signing.",
      topics: ["Legal & Regulations", "Zoning", "First-Time Learning"],
      availability: "Responds within 24 hours",
    },
    {
      name: "Marcus Chen", role: "Developer", initials: "MC",
      help: "Walks through how projects are financed, approved, and built.",
      location: "Brooklyn, NY", experience: "11 years",
      bio: "Marcus has developed mixed-use and residential projects across Brooklyn and Queens, with a focus on ground-up construction and adaptive reuse. He's navigated NYC's complex entitlement process dozens of times and enjoys breaking it down for people who are new to development.",
      topics: ["Development", "Financing", "Zoning"],
      availability: "Responds within 48 hours",
    },
    {
      name: "Elena Rodriguez", role: "Investor & Broker", initials: "ER",
      help: "Covers beginner investing questions and market dynamics.",
      location: "Miami, FL", experience: "9 years",
      bio: "Elena started as a residential agent before building a portfolio of income-producing properties in South Florida. She now splits her time between brokerage and managing her own investments. She's particularly good at explaining cap rates, cash flow analysis, and how to evaluate your first deal.",
      topics: ["Investing", "Market Data", "Deal Flow"],
      availability: "Responds within 24 hours",
    },
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

  const newsletterIssues = [
    {
      id: "april-sales-flat",
      label: "THIS WEEK",
      date: "May 11, 2026",
      category: "Market Pulse",
      title: "April Home Sales Barely Moved. What That Tells Beginners",
      intro: "Existing-home sales rose only slightly in April while prices stayed high and inventory improved. This issue explains what that means for buyers, sellers, and anyone trying to read the market without getting overwhelmed.",
      bullets: [
        "Sales increased 0.2% month-over-month, showing a slow spring market rather than a dramatic rebound.",
        "The median existing-home sale price reached $417,700, so affordability is still the main pressure point.",
        "More inventory gives buyers a little breathing room, but supply is still not fully back to normal."
      ],
      source: "NAR",
      sourceUrl: "https://www.nar.realtor/newsroom/nar-existing-home-sales-report-shows-0-2-increase-in-april"
    },
    {
      id: "inventory-watch",
      label: "CURRENT NEWS",
      date: "April 30, 2026",
      category: "Inventory",
      title: "Listings Are Rising, but Buyers Are Still Careful",
      intro: "Realtor.com reported that active listings passed one million in April, while median list prices were down year-over-year. This is a useful read for understanding why more supply does not automatically mean homes are affordable.",
      bullets: [
        "Active listings reached 1,002,935 nationally.",
        "Median list price was $425,000, down 1.4% year-over-year.",
        "Homes spent a median of 51.5 days on the market, signaling a slower pace than recent years."
      ],
      source: "Realtor.com",
      sourceUrl: "https://www.realtor.com/research/april-2026-data/"
    },
    {
      id: "pending-sales",
      label: "CURRENT NEWS",
      date: "May 7, 2026",
      category: "Buyer Demand",
      title: "Pending Sales Picked Up When Rates Dipped",
      intro: "Redfin reported that pending home sales reached their highest level since 2022 during the four weeks ending May 3. The takeaway: buyers are still sensitive to mortgage-rate movement.",
      bullets: [
        "Pending sales rose 7.7% year-over-year on a seasonally adjusted basis.",
        "A temporary mortgage-rate dip helped pull some buyers back into the market.",
        "The market is active, but still slower than a typical spring season."
      ],
      source: "Redfin",
      sourceUrl: "https://www.redfin.com/news/housing-market-news/"
    },
    {
      id: "nyc-beginner-guide",
      label: "PAST ISSUE",
      date: "April 21, 2025",
      category: "NYC Basics",
      title: "NYC Spotlight: What Beginners Should Be Watching",
      intro: "A beginner-friendly issue on rent pressure, outer-borough demand, and the practical difference between co-ops and condos.",
      bullets: [
        "Outer boroughs are gaining traction among first-time buyers.",
        "The co-op vs. condo distinction has significant practical implications.",
        "New York gives beginners a useful lens for comparing multiple market types at once."
      ],
      source: "MyHome Editorial",
      sourceUrl: "#"
    }
  ];

  const currentNews = newsletterIssues.filter(issue => issue.label === "CURRENT NEWS");
  const pastIssues = newsletterIssues.filter(issue => issue.label === "PAST ISSUE");
  const weeklyNewsletter = newsletterIssues.find(issue => issue.id === selectedNewsletterId) || newsletterIssues[0];

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

  // Rich beginner explainer content shown when a topic card is expanded on the profile page
  const topicDeepDive = {
    "First-Time Learning": {
      sections: [
        { heading: "What is real estate, exactly?", body: "Real estate is any land and anything permanently attached to it — buildings, homes, parking lots, even trees. When people talk about 'the real estate market,' they usually mean the buying, selling, and renting of property. It's one of the oldest and most common ways people build wealth, and it affects almost everyone whether they own property or not." },
        { heading: "Residential vs. commercial: the most important split", body: "Residential real estate is where people live — houses, apartments, condos, townhouses. Commercial real estate is where businesses operate — offices, retail stores, warehouses, hotels. The rules, financing, and valuations work very differently between the two. As a beginner, residential is usually the easier starting point because it's more familiar and the data is more accessible." },
        { heading: "Key terms you'll keep seeing", body: "Equity is the portion of a property's value that you own free and clear — if your home is worth $400,000 and you owe $300,000 on the mortgage, your equity is $100,000. Appreciation means the property is growing in value over time. Depreciation means it's losing value (though in tax language, depreciation is also a deduction investors use). A mortgage is a loan used to buy property where the property itself serves as collateral." },
        { heading: "How a typical home purchase works", body: "First, a buyer gets pre-approved by a lender — this tells them how much they can borrow. Then they search for homes, make an offer, negotiate, and go under contract. An inspection happens to identify any issues with the property. The lender does an appraisal to confirm the home is worth what's being paid. Finally, closing happens — both parties sign documents, money changes hands, and ownership transfers. The whole process typically takes 30–60 days from accepted offer to close." },
        { heading: "What closing costs are and why they matter", body: "On top of the down payment, buyers pay closing costs — a collection of fees including lender fees, title insurance, attorney fees, and prepaid taxes and insurance. These typically run 2–5% of the purchase price. On a $400,000 home, that's $8,000–$20,000 extra you need to have ready. Many first-time buyers are surprised by this, so it's important to budget for it from the start." },
      ],
      glossary: [
        { term: "Pre-approval", def: "A lender's conditional commitment to loan you up to a certain amount, based on your credit, income, and assets." },
        { term: "Down payment", def: "The portion of the purchase price you pay upfront — typically 3–20% for a home." },
        { term: "Equity", def: "The value of your ownership stake: property value minus what you owe on it." },
        { term: "Appraisal", def: "An independent estimate of a property's market value, required by lenders before finalizing a loan." },
        { term: "Title", def: "The legal record of who owns a property. A title search confirms the seller has the right to sell." },
      ],
    },
    "Investing": {
      sections: [
        { heading: "Why people invest in real estate", body: "Real estate offers four potential sources of return: cash flow (monthly rent income after expenses), appreciation (the property growing in value), tax benefits (deductions and depreciation), and leverage (using borrowed money to control a larger asset). Not every investment delivers all four, and different strategies prioritize different ones. Understanding which you're pursuing helps you evaluate deals clearly." },
        { heading: "REITs: the lowest-barrier entry point", body: "A REIT (Real Estate Investment Trust) is a company that owns income-producing real estate — think shopping centers, apartment buildings, or office towers — and trades on the stock market like a share. You can buy a REIT for the price of one stock. You don't manage anything, you don't need a down payment, and you get exposure to real estate returns. The tradeoff is less control and prices that move with the broader market." },
        { heading: "House hacking: a beginner's first direct investment", body: "House hacking means buying a 2–4 unit property, living in one unit, and renting the others. The rental income offsets — sometimes entirely covers — your mortgage payment. You're building equity while effectively living for free or close to it. It's one of the most practical first steps into direct real estate ownership because you qualify for residential financing (lower rates, lower down payments) rather than investment property financing." },
        { heading: "The cap rate: the most important investing metric", body: "Cap rate = Net Operating Income ÷ Property Value. Net Operating Income (NOI) is the income the property generates after operating expenses but before debt service. A property with $30,000 NOI priced at $500,000 has a 6% cap rate. Higher cap rates mean more income relative to price — but often also more risk or a less desirable location. Cap rates are a quick way to compare properties and understand what a market is pricing in." },
        { heading: "How leverage works — and why it cuts both ways", body: "If you put $50,000 down on a $250,000 property and it appreciates 10% to $275,000, your $25,000 gain represents a 50% return on your $50,000 investment. That's the power of leverage. But if the property drops 10% to $225,000, you've lost $25,000 — half your down payment — while still owing the full mortgage. Leverage amplifies both gains and losses, which is why understanding your debt structure matters as much as picking the right property." },
      ],
      glossary: [
        { term: "Cap rate", def: "Net Operating Income divided by property value — used to compare investment properties." },
        { term: "Cash flow", def: "Monthly income remaining after all expenses (mortgage, taxes, insurance, management, repairs) are paid." },
        { term: "NOI", def: "Net Operating Income — revenue from a property minus operating expenses, before debt payments." },
        { term: "Leverage", def: "Using borrowed money (a mortgage) to control a larger asset than your own capital would allow." },
        { term: "1031 Exchange", def: "A tax rule allowing investors to defer capital gains taxes by rolling proceeds from one property sale into another." },
      ],
    },
    "Tokenization": {
      sections: [
        { heading: "What tokenization actually means", body: "Tokenization is the process of converting ownership of a physical asset — like a building — into digital tokens on a blockchain. Instead of one person owning 100% of a property, ownership can be divided into thousands or millions of tokens, each representing a fractional share. This is similar to how a company divides ownership into shares of stock, but for real property." },
        { heading: "Why people are excited about it", body: "Traditionally, real estate investing requires large amounts of capital — most people can't afford to buy an apartment building outright. Tokenization allows smaller investors to own a fraction of a property, receive a proportional share of rental income, and potentially sell their tokens on a secondary market without waiting for the whole building to be sold. It promises to make real estate more accessible and liquid." },
        { heading: "Rhino and Jetty: tokenization applied to deposits", body: "You don't have to look at blockchain startups to see tokenization principles in action. Rhino and Jetty applied the core idea — spreading out a large lump sum payment over time — to security deposits. Instead of paying $3,000 upfront, renters pay a small monthly fee. The companies have since merged and now operate in over 6 million homes. The FARE Act in NYC further changed the economics by shifting broker fees from tenants to landlords." },
        { heading: "What's still uncertain", body: "Most tokenized real estate in the US is structured as a security under SEC regulations, which means there are strict rules about who can invest and how. Fully open, retail-accessible tokenized markets don't widely exist yet. The technology works, but the regulatory and market infrastructure is still catching up. The EU is further along on frameworks for this than the US." },
        { heading: "What beginners should focus on first", body: "Before evaluating any tokenized investment, evaluate the underlying property using standard real estate metrics: location, income, expenses, debt structure, and the track record of whoever is managing it. The token is a wrapper around the asset — a great token backed by a bad property is still a bad investment. Technology doesn't change the fundamentals." },
      ],
      glossary: [
        { term: "Token", def: "A digital unit of ownership on a blockchain representing a fractional share of a real asset." },
        { term: "Blockchain", def: "A decentralized digital ledger that records transactions across many computers, making records tamper-resistant." },
        { term: "Fractionalization", def: "Dividing ownership of an asset into smaller pieces so more people can own a share." },
        { term: "Security", def: "In financial terms, an investment product regulated by the SEC — most tokenized real estate qualifies." },
        { term: "Secondary market", def: "A platform where investors can buy and sell tokens from each other, rather than directly with the issuer." },
      ],
    },
    "Market Data": {
      sections: [
        { heading: "Why prices alone don't tell the full story", body: "Median sale price tells you where transactions landed — but it doesn't tell you how fast things are moving, whether sellers are cutting prices, or whether what's selling this month is different from last month. A market where 20 luxury homes sold can show a rising median while the typical home price is actually flat. You always need more than one number to understand what a market is really doing." },
        { heading: "The three numbers that matter most", body: "Days on market (DOM) is how long listings sit before going under contract — a falling DOM means rising demand. Months of supply is how long it would take to sell all current inventory at the current sales pace — below 3 months is a seller's market, above 6 is a buyer's market. The sale-to-list ratio is the average price homes sell at compared to asking price — above 100% means bidding wars, below 98% means room to negotiate." },
        { heading: "How mortgage rates affect everything", body: "When mortgage rates go up, monthly payments go up, which reduces how much house a given income can afford. This reduces buyer demand, which puts downward pressure on prices. When rates fall, the reverse happens. A 1% rate change on a $400,000 loan changes the monthly payment by roughly $250–270. This is why rate news dominates real estate headlines — it directly affects how many people can actually buy." },
        { heading: "Local markets vs. national headlines", body: "National real estate data averages across hundreds of very different markets. A 'slowing national market' might mean San Francisco is correcting while Tampa is still hot. Always try to find data at the metro, neighborhood, or even zip code level. Zillow, Redfin, and Realtor.com all offer local market data for free. For commercial, CoStar and LoopNet are the primary sources." },
        { heading: "What NYC's market looks like right now", body: "In 2024–2025, NYC's outer boroughs — Brooklyn, Queens, the Bronx — have been outperforming Manhattan in first-time buyer demand. Affordability pressure is pushing buyers further from the center. The co-op vs. condo distinction matters in NYC more than anywhere else in the US: co-ops are owned collectively and require board approval, while condos offer individual title. This affects financing, resale, and flexibility." },
      ],
      glossary: [
        { term: "Median sale price", def: "The midpoint of all transaction prices — half sold above, half below. Less distorted by outliers than average price." },
        { term: "Days on market (DOM)", def: "How many days a listing is active before going under contract." },
        { term: "Months of supply", def: "Current inventory divided by monthly sales pace — measures how long it would take to sell everything listed." },
        { term: "Sale-to-list ratio", def: "The percentage of asking price that homes actually sell for. Over 100% = bidding wars." },
        { term: "Absorption rate", def: "The rate at which available properties are being sold in a market — related to months of supply." },
      ],
    },
    "Brokerage/Agents": {
      sections: [
        { heading: "What a real estate agent actually does", body: "Agents help buyers find properties, evaluate them, make offers, negotiate, and navigate the closing process. For sellers, they advise on pricing, market the property, vet buyers, and manage the transaction. The best agents add genuine value through hyper-local market knowledge, negotiation skill, and access to deals before they hit public listings. The weakest ones are overpaid schedulers." },
        { heading: "How agents get paid", body: "Traditionally, the seller pays a commission — typically 5–6% of the sale price — which gets split between the listing agent and buyer's agent. After recent NAR settlement changes, buyer's agent compensation is now more explicitly negotiated. This is changing how buyers and agents interact: buyers are now more often asked to sign a buyer representation agreement that outlines exactly what the agent earns." },
        { heading: "The FARE Act and how it changed NYC rentals", body: "In 2024, New York City passed the FARE Act, which moved the responsibility for paying broker fees in rental transactions from the tenant to the landlord. Before this, renters in NYC often paid 1 month's rent (or 15% of annual rent) as a broker fee — typically $3,000–$8,000 — on top of first month, last month, and security deposit. This was a significant upfront cost. Now landlords bear that fee, though some have adjusted asking rents in response." },
        { heading: "Questions to ask before choosing an agent", body: "How many transactions did you close in the last 12 months in this specific neighborhood? What's your average sale-to-list ratio for listings you've represented? How do you handle multiple offer situations? What's your communication style and how often will you update me? These questions reveal far more than any review or referral. An agent who can answer them with specific data is worth more than one who speaks in generalities." },
        { heading: "How technology is disrupting the model", body: "Platforms like Zillow, Redfin, and newer startups are compressing the informational advantage agents used to hold. Buyers can now research neighborhoods, pricing history, and comparable sales on their own. This is shifting agent value from information access toward judgment, negotiation, and process management. Agents who can't demonstrate clear value beyond scheduling showings are increasingly at risk." },
      ],
      glossary: [
        { term: "Listing agent", def: "The agent representing the seller — responsible for pricing, marketing, and managing the sale." },
        { term: "Buyer's agent", def: "The agent representing the buyer — helps with search, offers, negotiation, and closing." },
        { term: "Commission", def: "The fee paid to agents, traditionally a percentage of the sale price paid by the seller." },
        { term: "FARE Act", def: "NYC law (2024) shifting broker fee payment in rental transactions from tenants to landlords." },
        { term: "Buyer representation agreement", def: "A contract between a buyer and agent specifying the agent's compensation and responsibilities." },
      ],
    },
    "Legal & Regulations": {
      sections: [
        { heading: "Why the legal layer matters more than most beginners realize", body: "Every real estate transaction is fundamentally a legal transaction. When you buy a property, you're receiving a transfer of title — a legal document establishing your ownership. When you borrow to buy, you're signing a mortgage agreement that gives the lender the right to foreclose if you default. When you rent to a tenant, you're entering a contract governed by landlord-tenant law. Understanding these legal foundations isn't optional — it's the difference between protecting yourself and being exposed." },
        { heading: "Zoning: what it controls and why it matters", body: "Zoning laws determine what can be built on any piece of land. Residential zones allow homes and apartments. Commercial zones allow offices and retail. Manufacturing zones protect industrial uses. These designations affect property values enormously — a parcel that gets upzoned from single-family to mixed-use can triple in value without anything being built. Understanding what a site's zoning allows is the first step in any development or investment analysis." },
        { heading: "Title and what it means to own property", body: "Title is the legal concept of ownership. When you close on a property, a title company researches the chain of ownership to confirm the seller actually owns what they're selling and that there are no outstanding liens, judgments, or competing claims. Title insurance protects you against undiscovered claims. An LLC (Limited Liability Company) is a common structure investors use to hold properties — it separates personal assets from investment risk and can offer tax advantages." },
        { heading: "Rent stabilization and how it works in NYC", body: "About one million apartments in New York City are rent-stabilized, meaning annual rent increases are capped at rates set by the Rent Guidelines Board rather than by market forces. This significantly affects investment analysis for any NYC multifamily property. You need to know which units are stabilized, what the legal rent is, and what limits apply to lease renewals and vacancy increases. Getting this wrong is one of the most common and costly due diligence failures in NYC real estate." },
        { heading: "What to always do before signing anything", body: "Always have a real estate attorney review any contract before signing — purchase agreements, leases, partnership agreements, and loan documents all carry binding obligations that can be very difficult to undo. Attorney fees in a transaction are a small price compared to the cost of a mistake. Never rely solely on the other party's attorney, their agent, or their word about what a document means." },
      ],
      glossary: [
        { term: "Title", def: "The legal right to own and use a specific property." },
        { term: "Lien", def: "A legal claim against a property, often for unpaid debts — must be resolved before a property can be sold." },
        { term: "LLC", def: "Limited Liability Company — a business structure that protects personal assets from liabilities of the investment." },
        { term: "Rent stabilization", def: "A NYC system that limits how much landlords can raise rents each year on covered apartments." },
        { term: "Encumbrance", def: "Any claim, lien, or restriction on a property that could affect its use or transfer." },
      ],
    },
    "Development": {
      sections: [
        { heading: "What real estate developers actually do", body: "Developers take raw land or underutilized property and turn it into something more valuable — apartment buildings, office towers, mixed-use projects. The job involves assembling land, securing government approvals, arranging financing, hiring architects and contractors, managing construction, and ultimately leasing or selling the completed project. It requires coordinating many professionals over a long timeline with significant capital at risk." },
        { heading: "The entitlement process: where most projects get stuck", body: "Before breaking ground, a developer needs government approval to build what they're planning. In New York City, this involves the Uniform Land Use Review Procedure (ULURP) for any discretionary approval — a process that moves through community boards, borough presidents, the City Planning Commission, and City Council. A straightforward rezoning can take 18–24 months. Community opposition, environmental reviews, and political complications can add years — or kill a project entirely." },
        { heading: "How development projects are financed", body: "Development finance has two main components: construction loans (from banks, covering 60–70% of total costs) and equity (the developer's own capital plus any outside investors). Construction loans are short-term, higher-rate, and must be repaid when the project completes. The developer then refinances into a permanent loan (or sells the completed project). The ratio of debt to equity determines how sensitive the project is to cost overruns or market changes." },
        { heading: "What a pro forma is and why it matters", body: "A pro forma is the financial model that supports every development decision. It projects total costs (land acquisition, construction, architecture, permits, financing, and contingency), expected revenue when the project completes (rental income or sale proceeds), and return metrics — typically IRR (Internal Rate of Return) and equity multiple. A realistic pro forma stress-tests its assumptions: what if construction costs run 15% over? What if leasing takes twice as long as planned?" },
        { heading: "Why supply responds so slowly to demand", body: "When housing demand rises in a city, it takes years before new supply can respond — because development is slow by nature. Land assembly, entitlement, design, financing, and construction each take substantial time. In NYC, the average ground-up apartment building takes 5–8 years from land acquisition to first tenant. By the time a building delivers, the market conditions that justified it may have shifted significantly." },
      ],
      glossary: [
        { term: "Entitlement", def: "Government approval to build a specific project on a specific site — the most uncertain part of development." },
        { term: "Pro forma", def: "The financial projection model showing expected costs, revenues, and returns for a development project." },
        { term: "Construction loan", def: "A short-term, higher-rate loan that funds the building phase — repaid upon project completion." },
        { term: "Certificate of occupancy (CO)", def: "Government approval confirming a building is safe to occupy — issued when construction meets all code requirements." },
        { term: "IRR", def: "Internal Rate of Return — a metric expressing the annualized return on an investment over its full life." },
      ],
    },
    "Financing": {
      sections: [
        { heading: "The capital stack: what it is and why it matters", body: "Every real estate deal is funded through a combination of debt and equity — the 'capital stack.' At the bottom (safest, paid first) is senior debt — the primary mortgage. Above that may be mezzanine debt or preferred equity. At the top (most risk, paid last) is common equity — the ownership stake. Understanding this hierarchy tells you who takes risk and who gets paid when something goes wrong." },
        { heading: "How mortgages actually work", body: "A mortgage is a loan secured by real property — meaning if you stop paying, the lender can take the property through foreclosure. The interest rate determines your cost of borrowing. The loan term (usually 15 or 30 years for residential) determines how long you have to repay. A fixed-rate mortgage locks in your rate. An adjustable-rate mortgage (ARM) starts lower but can rise with market rates. For investment properties, lenders look closely at the property's income as well as your personal finances." },
        { heading: "LTV and DSCR: the two numbers lenders care most about", body: "LTV (Loan-to-Value) is the loan amount divided by the property's appraised value. Lenders typically cap LTV at 75–80% for investment properties, meaning you need at least 20–25% down. DSCR (Debt Service Coverage Ratio) is Net Operating Income divided by annual debt payments. A DSCR of 1.25x means the property earns $1.25 for every $1 of debt payment. Lenders generally require at least 1.20–1.25x. Below that, the loan won't be approved regardless of your credit." },
        { heading: "Why interest rates matter so much", body: "A 1% change in interest rate on a $500,000 loan changes the monthly payment by roughly $270 and the total cost over 30 years by about $97,000. At the investment level, rising rates compress cap rate spreads — if cap rates are 5% but financing costs 7%, the deal doesn't pencil. This is exactly what happened in 2022–2023, when rapid rate increases caused commercial transaction volumes to collapse. Rates are the most important external variable affecting real estate markets." },
        { heading: "Bridge loans and what they're used for", body: "A bridge loan is short-term financing (typically 12–36 months) used to 'bridge' a gap — often while a property is being renovated, leased up, or repositioned before it qualifies for permanent financing. They carry higher rates than permanent loans because of the higher risk. Developers use them when a property isn't yet generating stable income but they need capital to improve it. Understanding when bridge financing makes sense versus when it adds unnecessary risk is an important skill." },
      ],
      glossary: [
        { term: "LTV", def: "Loan-to-Value — the loan amount as a percentage of the property's appraised value." },
        { term: "DSCR", def: "Debt Service Coverage Ratio — property income divided by debt payments. Lenders require 1.20–1.25x." },
        { term: "Amortization", def: "The process of gradually paying down a loan through scheduled payments of principal and interest." },
        { term: "Bridge loan", def: "Short-term financing used during a transitional period — higher rate, shorter term than a permanent mortgage." },
        { term: "Cap rate spread", def: "The difference between a property's cap rate and the prevailing interest rate — determines deal profitability." },
      ],
    },
    "Commercial Real Estate": {
      sections: [
        { heading: "How commercial differs from residential", body: "In residential real estate, a home is worth roughly what comparable homes nearby sold for. In commercial real estate, a property is worth the income it generates. This income-based valuation is the single most important difference to understand. It means that improving a commercial property's income — through better leases, lower vacancy, or reduced expenses — directly and immediately increases its value." },
        { heading: "The main commercial property types", body: "Office buildings house companies and their employees. Retail centers include everything from strip malls to regional shopping centers. Industrial properties are warehouses, distribution centers, and manufacturing facilities — one of the strongest-performing commercial sectors in recent years. Multifamily (apartment buildings with 5+ units) is technically commercial. Mixed-use buildings combine multiple types — retail on the ground floor, offices or apartments above." },
        { heading: "Cap rates and how commercial is valued", body: "Cap rate = Net Operating Income ÷ Property Value. Rearranging: Value = NOI ÷ Cap Rate. If a property generates $400,000 in NOI and the market cap rate is 5%, the property is worth $8,000,000. If you can increase NOI to $450,000 by improving occupancy, the value rises to $9,000,000 — a $1 million gain for $50,000 of income improvement. This math is why value-add commercial investing is so appealing." },
        { heading: "Commercial leases: what makes them different", body: "Commercial leases are far more complex than residential leases and can span 5–20 years. They're negotiated individually — there's no standard form. Gross leases have the landlord covering most expenses. Net leases pass expenses to the tenant. Triple net (NNN) leases pass all expenses — taxes, insurance, maintenance — to the tenant, making them lower-maintenance for landlords. Lease term, rent escalations, tenant improvement allowances, and renewal options are all negotiated." },
        { heading: "The NYC office market post-pandemic", body: "NYC's office market has bifurcated sharply since 2020. Class A buildings — modern, well-located, high-amenity — are seeing strong leasing as companies compete for the best space to attract workers back. Class B and C buildings — older, less amenitized, less well-located — are struggling with high vacancy, expensive required upgrades, and lenders unwilling to refinance. The divergence is creating distressed opportunity in some segments and genuine risk in others." },
      ],
      glossary: [
        { term: "NOI", def: "Net Operating Income — revenue minus operating expenses, before debt payments. The core commercial valuation input." },
        { term: "Cap rate", def: "NOI divided by property value — the standard metric for comparing and pricing commercial properties." },
        { term: "Triple net (NNN)", def: "A lease where the tenant pays base rent plus taxes, insurance, and maintenance — minimal landlord obligation." },
        { term: "Class A/B/C", def: "Quality classifications for commercial buildings — A is newest/best located, C is oldest/most outdated." },
        { term: "Vacancy rate", def: "The percentage of rentable space in a building or market that is currently unoccupied." },
      ],
    },
    "Zoning": {
      sections: [
        { heading: "What zoning actually controls", body: "Zoning laws determine what types of buildings and uses are allowed on any given parcel of land. A residential zone might allow single-family homes but prohibit apartments. A commercial zone might allow retail and offices but not manufacturing. Zoning also controls building height, how much of the lot can be covered, how far buildings must be set back from the street, and density (how many units per acre). These rules collectively shape everything you see in any neighborhood." },
        { heading: "How NYC's zoning system is organized", body: "New York City divides land into residential (R1–R10), commercial (C1–C8), and manufacturing (M1–M3) districts. The number indicates density — R1 is the lowest-density, suburban-style single-family zone; R10 allows the highest-density towers in central Manhattan. C6 covers major commercial centers. Understanding a site's zone is step one in any development analysis because it tells you what's legally buildable without special approvals." },
        { heading: "Rezonings: how the rules change", body: "Zoning isn't permanent. A property owner, developer, or the city itself can apply to change a site's zoning designation. In NYC, this goes through the Uniform Land Use Review Procedure (ULURP) — a multi-step process involving community boards, borough presidents, the City Planning Commission, and the City Council. A rezoning that allows higher density can increase land value by 3–5x or more. This is why zoning decisions are intensely political and often contentious." },
        { heading: "Variances: permission to deviate", body: "A variance allows a specific property to build something that would otherwise violate zoning rules — a slightly taller building, a commercial use in a residential zone, a reduced parking requirement. Variances are site-specific and require demonstrating hardship. They go through the Board of Standards and Appeals in NYC. They don't change the underlying zoning map the way a rezoning does, but they create exceptions for individual properties." },
        { heading: "Inclusionary zoning and affordable housing", body: "Many zoning codes allow developers to build at higher density than base zoning permits — in exchange for including affordable housing units. NYC's Mandatory Inclusionary Housing (MIH) program requires 25–30% of units to be affordable when a developer takes a density bonus. Whether this works depends on the math: the value of the extra market-rate units has to exceed the cost of the affordable ones. When it does, more housing gets built. When it doesn't, developers walk away." },
      ],
      glossary: [
        { term: "Zoning resolution", def: "The legal document that establishes zoning rules for a jurisdiction — NYC's runs thousands of pages." },
        { term: "Use", def: "In zoning, what a property or building is used for — residential, commercial, manufacturing, etc." },
        { term: "FAR (Floor Area Ratio)", def: "The maximum total floor area allowed on a site relative to the lot size — controls building bulk." },
        { term: "Upzoning", def: "Changing zoning to allow higher density or more uses — typically increases land value." },
        { term: "ULURP", def: "Uniform Land Use Review Procedure — NYC's process for reviewing zoning changes and land use applications." },
      ],
    },
    "PropTech": {
      sections: [
        { heading: "What PropTech actually covers", body: "PropTech (property technology) is a broad term for technology companies that apply software, data, and automation to real estate processes. It includes platforms for searching listings (Zillow, Redfin), tools for managing properties (AppFolio, Yardi), data providers for professional investors (CoStar, Reonomy), iBuyers that use algorithms to purchase homes, and emerging categories like tokenization and AI-powered underwriting." },
        { heading: "What has actually changed", body: "The biggest shift is information access. Twenty years ago, knowing what a property sold for required a real estate agent or a trip to the county recorder. Now Zillow, Redfin, and Realtor.com show pricing history, days on market, and neighborhood data for free. This has narrowed — but not eliminated — the information gap between professionals and retail investors. Platforms like CoStar still offer data that's inaccessible without a paid subscription." },
        { heading: "The iBuyer story: what worked and what didn't", body: "iBuyers — companies like Opendoor and Zillow Offers — used algorithms to make near-instant cash offers on homes, buy them, and resell at a profit. The model worked in stable, liquid, homogeneous markets. Zillow exited in 2021 after a $500M+ loss when its algorithm mispriced at scale. Opendoor and Offerpad have survived at reduced scale. The lesson: algorithmic real estate valuation works until the market moves faster than the model." },
        { heading: "Property management software: the unsexy success story", body: "While headline PropTech was getting venture capital and press, property management software was quietly becoming essential infrastructure. Platforms like Yardi, MRI, AppFolio, and Buildium now handle rent collection, maintenance requests, lease administration, and financial reporting for millions of units. For small landlords managing 5–20 units, tools like AppFolio have materially reduced the administrative burden of ownership." },
        { heading: "What's still developing", body: "AI-powered valuation models, automated underwriting, and blockchain-based title and closing processes are in early stages. The friction in real estate transactions is deeply embedded in regulation and professional practice. Technology can accelerate workflows, but eliminating human judgment from title searches, attorney review, and lender underwriting requires regulatory change — not just better software." },
      ],
      glossary: [
        { term: "iBuyer", def: "A company that uses algorithms to make near-instant cash offers on homes, then resells them." },
        { term: "CoStar", def: "The dominant commercial real estate data platform — comprehensive but expensive, subscription-based." },
        { term: "AppFolio / Yardi", def: "Property management software platforms used by landlords and managers to run operations." },
        { term: "Automated valuation model (AVM)", def: "An algorithm that estimates property values based on comparable sales data — Zillow's 'Zestimate' is one." },
        { term: "PropTech", def: "Short for 'property technology' — any software or technology applied to real estate processes." },
      ],
    },
    "Deal Flow": {
      sections: [
        { heading: "What deal flow means", body: "Deal flow refers to the pipeline of investment opportunities that reach an investor or buyer. In real estate, deal flow quality — not just quantity — determines what you can build. An investor who sees 200 deals a year but most are widely marketed, overpriced, or outside their criteria is worse off than one who sees 50 deals with strong broker relationships and off-market access. The goal is to see the right deals, not more deals." },
        { heading: "How commercial deals get distributed", body: "Most institutional commercial deals start with a broker outreach. The seller's broker sends a teaser — a brief overview of the property — to a distribution list. The quality of that list determines who gets first look. Top-tier buyers who close reliably and move quickly receive proactive outreach before deals are widely marketed. Second-tier buyers see deals after the first round. A deal listed on LoopNet or CoStar publicly often signals the first round didn't find a buyer at the target price." },
        { heading: "Off-market deals: what they are and why they matter", body: "Off-market deals are transactions where a buyer approaches a seller directly — or a broker circulates a deal very quietly — without a formal marketing process. These deals involve less competition and often price at a discount compared to what a formal process would achieve. Building access to off-market deals takes years of relationship-building with brokers, owners, and other market participants. It's one of the most durable competitive advantages in real estate investing." },
        { heading: "Deal screening vs. full underwriting", body: "When a deal comes in, the first step is screening — a quick assessment of whether the opportunity is worth spending real time on. This means checking if the seller's price expectation implies a return that makes sense, whether the location and asset type fit your criteria, and whether the basic facts add up. Full underwriting — detailed pro forma, lease review, third-party reports, physical inspection — should only happen after a deal passes your screening filters." },
        { heading: "The FOMO problem and how to avoid it", body: "Once you've invested time underwriting a deal, walking away feels like losing. This psychological cost leads experienced investors to stretch on price, overlook risks, or accept unfavorable terms to avoid feeling like the time was wasted. The discipline to walk away from deals that don't meet your criteria — even after significant investment of time and effort — is one of the hardest skills to develop in real estate, and one of the most valuable." },
      ],
      glossary: [
        { term: "Deal flow", def: "The volume and quality of investment opportunities reaching an investor or buyer." },
        { term: "Off-market deal", def: "A transaction conducted without broad public marketing — typically less competition, potential pricing advantage." },
        { term: "Offering memorandum (OM)", def: "A detailed marketing document prepared by a broker describing a property being offered for sale." },
        { term: "Underwriting", def: "The process of analyzing a deal in detail to determine if it meets investment criteria and return requirements." },
        { term: "Pro forma", def: "A financial model projecting a property's future income, expenses, and returns — the core underwriting tool." },
      ],
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
  const openSignup = () => {
    // If a user already created an account, do not show the sign-up flow again.
    // Send them straight to their existing profile instead.
    if (isSignedUp) {
      setShowProfile(true);
      return;
    }

    setShowSignupModal(true);
    setOnboardingStep(1);
  };
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
    if (onboardingStep === 3) {
      if (!validateAccount()) return;

      // Account is now created, so the rest of the app should treat them as signed in.
      setIsSignedUp(true);
      setOnboardingStep(4);
      return;
    }

    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
      return;
    }

    // After the success screen, close the modal and show the user's profile.
    setShowSignupModal(false);
    setShowProfile(true);
    setOnboardingStep(1);
  };

  const openProfessional = (professional) => {
    if (!isSignedUp) {
      openSignup();
      return;
    }

    setSelectedProfessional(professional);
    setProMessage("");
  };

  const font = '"Montserrat", ui-sans-serif, system-ui, -apple-system, sans-serif';
  const page = { minHeight: "100vh", backgroundColor: C.bg, color: C.ink, fontFamily: font, boxSizing: "border-box" };


  // DATA: rich beginner explanations shown when a topic card is clicked on the profile
  const profileTopicContent = {
    "First-Time Learning": {
      sections: [
        { title: "What is real estate?", body: "Real estate is land and anything permanently attached to it — homes, apartment buildings, offices, warehouses, and retail stores. When you own real estate, you own a physical asset that can be rented, sold, or borrowed against. It's one of the oldest forms of wealth in the world, and also one of the most accessible once you understand the basics." },
        { title: "Residential vs. commercial", body: "Residential real estate is where people live: single-family homes, condos, co-ops, and apartment buildings with up to four units. Commercial real estate is where businesses operate: offices, retail stores, warehouses, hotels, and apartment buildings with five or more units. The rules, financing, and valuation methods differ significantly between the two. As a beginner, most of what you encounter will be residential." },
        { title: "The people involved in a transaction", body: "Every real estate transaction involves a cast of characters. The buyer and seller are the principals. A real estate agent represents each side. A lender provides the mortgage. A title company confirms ownership is clean and issues title insurance. An appraiser determines the property's market value for the lender. An attorney (required in some states) reviews contracts. Understanding who does what helps you know who to call when something goes wrong." },
        { title: "Key terms you'll hear constantly", body: "Equity is the portion of the property's value you own outright — calculated as current value minus debt owed. A mortgage is a loan secured by the property itself. Appreciation means the property is worth more over time. Closing costs are additional fees paid at the end of a transaction, typically 2–5% of the purchase price. Pre-approval is a lender's conditional commitment to lend you a specific amount — it's not a guarantee, but it's what sellers require before taking your offer seriously." },
        { title: "What to focus on first", body: "The most common beginner mistake is trying to learn everything at once. Real estate is broad enough that professionals specialize their entire careers. Pick one area — residential buying, rental investing, or just understanding how mortgages work — and go deep before expanding. Everything else will make more sense once you have a foundation in one area." },
      ],
      facts: ["24% of US home purchases in 2024 were by first-time buyers", "The average closing process takes 30–45 days", "Closing costs add 2–5% on top of the purchase price", "A pre-approval letter is typically valid for 60–90 days"],
    },
    "Investing": {
      sections: [
        { title: "Why people invest in real estate", body: "Real estate investing offers four potential sources of return: cash flow (income after expenses), appreciation (property value increasing over time), debt paydown (tenants effectively paying off your mortgage), and tax benefits (depreciation and deductions). No other common investment vehicle offers all four simultaneously — which is why real estate has created more millionaires than almost any other asset class." },
        { title: "The spectrum from passive to active", body: "At the passive end, you can invest in a REIT (Real Estate Investment Trust) the same way you'd buy a stock — in under five minutes, with no property knowledge required. REITs own large portfolios of income-producing properties and are required to distribute at least 90% of taxable income as dividends. At the active end, you can buy and manage rental properties directly, which offers more control and often higher returns but requires significant time and expertise." },
        { title: "House hacking: the most accessible entry point", body: "House hacking means buying a property with 2–4 units, living in one, and renting out the others. The rental income offsets — or sometimes fully covers — your mortgage, letting you build equity while living for free or near-free. It's legal, widely used, and eligible for owner-occupant financing (as low as 3.5% down with FHA loans). For most people with limited capital, it's the clearest path from renter to property owner." },
        { title: "Understanding cap rate", body: "Cap rate (capitalization rate) = Net Operating Income ÷ Property Value. It's the most universal metric for comparing investment properties. A property generating $30,000/year in net income priced at $500,000 has a 6% cap rate. Higher cap rates mean more income relative to price — but usually also mean more risk, less desirable location, or older condition. Lower cap rates reflect higher-quality assets in stronger markets. Neither is universally better — it depends on your strategy." },
        { title: "What beginners get wrong most often", body: "The most common mistake is underestimating expenses. Beginners often calculate returns using gross rent without accounting for vacancy (budget 5–10%), property management (8–12% of rent), maintenance (1% of value per year), insurance, taxes, and capital expenditure reserves. A property that looks profitable on paper often isn't when all costs are included. Always underwrite conservatively." },
      ],
      facts: ["REITs returned an average of 11.4% annually over the past 20 years", "House hacking can reduce your housing cost by 50–100%", "The 1% rule: monthly rent should be ≥1% of purchase price for strong cash flow", "Leverage amplifies returns — and losses — in both directions"],
    },
    "Tokenization": {
      sections: [
        { title: "What tokenization actually means", body: "Tokenization converts ownership of a real asset — a building, a development project, a rental property — into digital tokens on a blockchain. Each token represents a fractional ownership stake. Instead of needing $500,000 to invest in a commercial property, tokenization allows the same asset to be divided into thousands of tokens purchasable for as little as $100. The blockchain creates a transparent, tamper-proof record of who owns what." },
        { title: "Why it matters for regular investors", body: "Historically, high-quality real estate investments — office buildings, industrial parks, multifamily complexes — were only accessible to institutional investors or accredited individuals with millions to invest. Tokenization lowers the minimum investment dramatically and creates a path for retail investors to own fractional stakes in assets that were previously out of reach. The theoretical endgame is a world where real estate is as liquid and accessible as stocks." },
        { title: "Rhino and Jetty: a real-world example", body: "Rhino and Jetty apply tokenization principles to the mundane but painful problem of security deposits. Traditionally, a renter in NYC pays $2,000–4,000 upfront as a security deposit — money that sits locked away for years. Rhino and Jetty instead charge a small monthly fee (like insurance) that replaces the lump sum deposit. The landlord is still protected; the renter keeps their cash. The two companies have since merged and operate in over 6 million homes across the US." },
        { title: "What the risks look like", body: "The regulatory framework for tokenized real estate in the US is still evolving. Most offerings are structured as securities under Regulation D, which limits investment to accredited investors (income over $200K or net worth over $1M). True retail access to liquid tokenized real estate markets doesn't yet exist at scale. Additionally, the token is only as good as the underlying asset — a token representing a poorly-located property with bad tenants is still a bad investment, regardless of how innovative the technology is." },
      ],
      facts: ["Tokenized RE market: $0.3T (2024) → projected $4T by 2035", "Rhino/Jetty now covers 6M+ homes in the US", "Most US tokenized offerings require accredited investor status", "Average NYC move-in cost without tokenization: $10K–$15K"],
    },
    "Market Data": {
      sections: [
        { title: "Why median price alone misleads you", body: "Median sale price is the number that makes headlines — but it's one of the least informative metrics for understanding a market. It tells you where transactions closed, not whether prices are rising or falling, not how competitive the market is, and not whether what sold this month is comparable to last month. A spike in median price can mean appreciation — or it can mean that more expensive homes happened to sell that month. Always look at median price alongside other indicators." },
        { title: "The three metrics that actually matter", body: "Days on market (DOM) tells you velocity — how quickly listings are going under contract. A falling DOM means demand is outpacing supply. Months of supply tells you the absorption rate — at the current sales pace, how long would it take to sell all active listings? Below 3 months is a strong seller's market; above 6 is a buyer's market. The sale-to-list ratio tells you whether buyers are paying over or under asking price — above 100% means bidding wars; below 98% means negotiating room exists." },
        { title: "How mortgage rates change everything", body: "A 1% increase in mortgage rates on a $500,000 loan increases monthly payments by roughly $320 — and reduces how much home the same income can afford by approximately $50,000–60,000. This is why rate moves dominate real estate news. When rates spike, demand falls, prices soften, and inventory builds. When rates drop, demand surges, inventory tightens, and prices rise. For a beginner, understanding rate sensitivity is essential context for interpreting any market data." },
        { title: "NYC as a case study in local variation", body: "National real estate statistics can be almost meaningless at the local level. NYC illustrates this perfectly: Manhattan, Brooklyn, Queens, and the Bronx are four distinct markets with different price points, buyer profiles, and demand drivers. In 2024–2025, outer boroughs have seen stronger first-time buyer activity than Manhattan as affordability pressures push buyers further from the center. Always look at data at the most local level available — zip code or neighborhood, not city or metro." },
      ],
      facts: ["National months of supply: ~3.8 (April 2025)", "30-year fixed mortgage rate: ~7.1% (April 2025)", "A 1% rate change = ~$320/month on a $500K loan", "Median US home price Q1 2025: ~$412,000"],
    },
    "Brokerage/Agents": {
      sections: [
        { title: "What agents actually do", body: "A good agent does three things that platforms can't fully replace: they provide hyper-local pricing knowledge built from years of transactions in a specific area; they negotiate on your behalf with professional experience and no emotional attachment to the deal; and they often have access to inventory before it hits public listings. On the seller side, a skilled listing agent develops a pricing strategy, manages marketing, coordinates showings, and guides the transaction through closing. The value varies enormously by agent quality and market." },
        { title: "How they're paid", body: "In a traditional transaction, the seller pays a total commission of 5–6% of the sale price, which is then split between the listing agent and the buyer's agent (typically 2.5–3% each). This means the buyer's agent is technically paid by the seller — a structure critics argue misaligns incentives, since a higher sale price means a higher commission for the buyer's agent. Following the 2024 NAR settlement, buyers are now required to sign buyer representation agreements explicitly showing what they'll pay their agent." },
        { title: "How the model is changing", body: "Technology platforms have disrupted the informational advantage that once justified high commissions. Zillow, Redfin, and Realtor.com give buyers access to listing data that once required an agent. New platforms are experimenting with flat-fee structures, algorithm-driven matching, and performance-based compensation. The FARE Act in NYC (effective 2024) moved broker fee payment in rental transactions from tenants to landlords, removing a $4,000–8,000 upfront cost for renters." },
        { title: "Questions to ask before hiring anyone", body: "Before signing with any agent, ask: How many transactions did you close in the past 12 months in this specific neighborhood? What's your average sale-to-list ratio for listings you've represented? How do you communicate during a transaction — and how often? What happens if I'm unhappy with your service? The answers reveal far more than any online review. A skilled agent answers these questions confidently and specifically." },
      ],
      facts: ["1.5M+ licensed real estate agents in the US (NAR)", "Traditional commission: 5–6% of sale price", "NYC FARE Act saved renters $4–8K in upfront broker fees", "Buyers must now sign representation agreements before touring"],
    },
    "Legal & Regulations": {
      sections: [
        { title: "Why the legal layer matters", body: "Real estate is one of the most heavily regulated industries in the US. Every transaction involves contract law, title law, and lending regulations. Every development project navigates zoning approvals, environmental review, and building codes. Every landlord-tenant relationship is governed by state and local law that varies dramatically by jurisdiction. Skipping the legal layer — or assuming it's someone else's problem — is the most common and expensive mistake beginners make." },
        { title: "Zoning: the invisible hand", body: "Zoning determines what can be built on any parcel of land. A residential zone might allow only single-family homes; a commercial zone might allow offices and retail; a mixed-use zone allows both. Zoning also controls building height, lot coverage, and density. Importantly, zoning can be changed — through a political process that requires community board review and city council approval. A successful rezoning can multiply a parcel's value 3–5x without any construction occurring." },
        { title: "Title and ownership structures", body: "Title is the legal concept of ownership. Before any sale closes, a title company conducts a title search to confirm the seller actually owns what they're selling and that there are no liens, unpaid taxes, or competing claims. Title insurance protects both the buyer and lender against claims that weren't discovered in the search. Many investors hold property through LLCs (Limited Liability Companies) to separate personal assets from investment risk — a structure that also offers certain tax advantages when maintained properly." },
        { title: "The FARE Act and rent regulation", body: "NYC's FARE Act (effective 2024) shifted broker fee payment in rental transactions from tenants to landlords, eliminating a $4,000–8,000 upfront cost for renters. Separately, NYC's rent stabilization system governs roughly one million apartments, capping annual rent increases at rates set by the Rent Guidelines Board. For investors, understanding which units are stabilized — and what the legal rent is versus what's being charged — is essential due diligence before any multifamily acquisition." },
      ],
      facts: ["~1M NYC apartments are rent-stabilized (of ~2.3M total rental units)", "LLCs hold 35%+ of US investment property titles", "Title searches catch problems in roughly 25% of all transactions", "Zoning changes can increase land value by 3–5x"],
    },
    "Development": {
      sections: [
        { title: "What developers actually do", body: "A real estate developer identifies an opportunity (a site, a market gap, a rezoning possibility), assembles the land, secures financing, hires a team (architects, engineers, contractors), navigates approvals, and delivers a completed building. They're general contractors of capital — they don't necessarily build anything themselves, but they coordinate everyone who does. The developer takes the most risk and, if the project succeeds, earns the most reward." },
        { title: "The entitlement process", body: "Entitlement is the process of getting government permission to build what you want on a specific site. In NYC, this means navigating ULURP (Uniform Land Use Review Procedure) for any discretionary approval — involving community boards, borough presidents, the City Planning Commission, and the City Council. A straightforward rezoning can take 18–24 months. Add environmental review, and you're often looking at 3+ years before you break ground. This is why development timelines are so long." },
        { title: "How development projects are financed", body: "Development is financed in layers. Construction loans from banks cover hard costs (actual construction) and some soft costs (architecture, permits, legal fees). These are short-term, interest-only loans repaid when the building is complete and either sold or refinanced into permanent debt. The portion not covered by the construction loan — typically 30–40% — must come from equity: the developer's own capital plus any outside investors. The balance of debt to equity determines the project's risk profile." },
        { title: "Reading a pro forma", body: "A pro forma is the financial model that underlies every development decision. It projects total costs (land, construction, soft costs, financing), expected revenue at completion (sale prices or stabilized rental income), and return metrics — typically IRR (internal rate of return) and equity multiple. A well-constructed pro forma stress-tests its assumptions: what happens if construction costs run 15% over budget? What if rents are 10% below projections at completion? Deals that still work under those conditions are worth pursuing." },
      ],
      facts: ["Ground-up NYC development: 5–8 years land to occupancy", "Construction cost inflation 2020–2024: +28% (national average)", "US housing deficit: building ~1.1M units/year vs. 1.5–2M needed", "Typical developer equity requirement: 30–40% of total project cost"],
    },
    "Financing": {
      sections: [
        { title: "The capital stack explained", body: "Every real estate deal is financed through a combination of debt and equity. The 'capital stack' describes how these are layered. Senior debt (the primary mortgage) sits at the bottom — it's the safest position, gets paid first, and carries the lowest interest rate. Equity sits at the top — it's the riskiest position (last to be paid, first to absorb losses) but has the highest upside. Between them, there may be mezzanine debt or preferred equity, each with different risk/return profiles." },
        { title: "How mortgages work", body: "A mortgage is a loan secured by real property. You borrow a percentage of the property's value (the loan-to-value, or LTV ratio), and the property itself is the collateral — meaning the lender can foreclose if you stop making payments. For residential purchases, lenders typically allow up to 80% LTV (20% down payment) for conventional loans, and up to 96.5% LTV with FHA loans (3.5% down). Investment property loans typically require 20–25% down and carry higher rates than owner-occupied financing." },
        { title: "DSCR: the number lenders care most about", body: "For income-producing properties, the key metric is DSCR: Debt Service Coverage Ratio = Net Operating Income ÷ Annual Debt Payments. A DSCR of 1.25x means the property generates $1.25 for every $1.00 of debt payment. Most lenders require a minimum of 1.20–1.25x. Below that, the loan isn't viable regardless of how nice the property is. This is why increasing a property's income — through rent growth, reduced vacancy, or expense cuts — directly increases its borrowing capacity." },
        { title: "Why interest rates matter so much", body: "A 1% change in interest rates on a $500,000 loan changes the monthly payment by approximately $320. Over a 30-year loan, that's over $115,000 in total interest. For investors, rate changes affect both the cost of financing and the cap rates investors demand — when rates rise, investors typically require higher cap rates to justify their risk, which pushes property values down. The 2022–2023 rate cycle is a real-time case study in how dramatically financing costs reshape the entire real estate market." },
      ],
      facts: ["DSCR minimum: most lenders require 1.20–1.25x", "FHA loans: as low as 3.5% down for owner-occupants", "Fed funds rate April 2025: 4.25–4.5%", "Senior LTV for investment property: typically 65–75%"],
    },
    "Zoning": {
      sections: [
        { title: "What zoning actually controls", body: "Zoning is the local government's tool for controlling land use. It determines what type of building can go on any given lot (residential, commercial, industrial, or mixed-use), how tall it can be, how much of the lot it can cover, and how many units it can contain. These rules are written into a zoning code and mapped across the entire jurisdiction. In New York City, the zoning resolution runs thousands of pages and has been amended thousands of times since it was first adopted in 1961." },
        { title: "NYC's zoning system", body: "NYC uses letter-number designations. Residential zones run from R1 (single-family homes in low-density suburban neighborhoods) to R10 (maximum-density towers in central Manhattan). Commercial zones run from C1 (neighborhood retail) to C8 (large commercial uses). Manufacturing zones (M1–M3) protect industrial uses. The number indicates intensity — higher numbers mean more density. Each designation comes with detailed rules about building height, setbacks, floor area ratios (FAR), and permitted uses." },
        { title: "How zoning creates and destroys value", body: "Zoning changes are among the most consequential events in real estate. Upzoning — changing a designation to allow higher density or more uses — can multiply a parcel's value by 3–5x without a single brick being laid, because it increases the potential return from developing the site. Downzoning — restricting what can be built — can significantly reduce value. This is why zoning decisions are politically contested: they redistribute enormous amounts of wealth between property owners, developers, and communities." },
        { title: "Variances and inclusionary zoning", body: "A variance allows a specific property to deviate from existing zoning rules and requires demonstrating hardship. A rezoning changes the rules for an entire area. Inclusionary zoning programs (like NYC's Mandatory Inclusionary Housing) allow developers to build at higher density than base zoning permits — in exchange for setting aside 25–30% of units as affordable housing. The economics only work when the added market-rate unit value exceeds the cost of the affordable units, which is why these programs don't always generate housing." },
      ],
      facts: ["NYC has 7,000+ distinct mapped zoning districts", "Upzoning can increase land value by 3–5x", "NYC's MIH program requires 25–30% affordable units for density bonuses", "ULURP (rezoning review) typically takes 7–12 months minimum"],
    },
    "PropTech": {
      sections: [
        { title: "What PropTech actually is", body: "PropTech (Property Technology) refers to any software or platform that changes how real estate is bought, sold, rented, financed, or managed. It ranges from consumer-facing apps you use daily (Zillow, Redfin) to institutional-grade data tools (CoStar, Reonomy) to operational software that property managers use (Yardi, AppFolio). The sector attracted over $30 billion in venture investment between 2019 and 2022 before a significant correction in 2023." },
        { title: "What has genuinely changed", body: "Information access has been transformed. The gap between what a professional with CoStar access knows versus a retail investor has narrowed substantially. Zillow, Redfin, and Realtor.com make listing data freely available that was unimaginable to access 20 years ago. Property management software has also seen genuine adoption — platforms like Yardi, AppFolio, and Buildium automate rent collection, maintenance tracking, and lease administration in ways that have materially reduced operational burden for landlords." },
        { title: "The iBuyer cautionary tale", body: "iBuyers — companies that use algorithms to make instant cash offers on homes — peaked in 2021. Opendoor, Offerpad, and Zillow Offers were collectively purchasing tens of thousands of homes per month. Zillow exited the business in late 2021 after losing over $500 million. The model works in stable, liquid, homogeneous markets where algorithmic valuation is reliable. It breaks down when markets move faster than the model — exactly what happened in 2021–2022. Opendoor and Offerpad survived but at dramatically smaller scale." },
        { title: "What's still developing", body: "AI-powered valuation models, automated mortgage underwriting, and blockchain-based title and closing processes are all in development or early adoption. The friction in real estate transactions — title searches, attorney review, lender underwriting — is deeply embedded in regulatory requirements and professional practice. Technology can speed up the workflow, but eliminating the human review layer requires regulatory change, not just better software. The more significant disruption is still ahead." },
      ],
      facts: ["PropTech VC investment 2019–2022: $30B+ globally", "Zillow iBuyer losses: $500M+ before exiting", "CoStar annual subscription: $15,000+ for professional access", "Yardi/MRI penetration: ~60% of institutional property portfolios"],
    },
    "Commercial Real Estate": {
      sections: [
        { title: "How commercial differs from residential", body: "The most important difference is valuation. A home is valued primarily by what similar homes have sold for nearby (comparable sales). A commercial property is valued by the income it generates. This single shift changes everything — how you analyze an asset, how lenders evaluate it, how you improve its value, and how you exit. In commercial real estate, increasing the income is how you create value, not waiting for the market to rise." },
        { title: "The main property types", body: "Office buildings house businesses and are categorized as Class A (trophy buildings with premium amenities), Class B (functional but not premium), and Class C (older, basic). Retail covers everything from neighborhood strip malls to regional shopping centers. Industrial includes warehouses, distribution centers, and manufacturing facilities — one of the strongest-performing sectors post-pandemic. Multifamily (5+ units) straddles residential and commercial, valued on income but with residential financing available at certain scales." },
        { title: "Cap rates and income-based valuation", body: "Value = Net Operating Income (NOI) ÷ Cap Rate. If a property generates $500,000 in NOI and similar assets trade at 5% cap rates, the property is worth $10 million. If you can grow NOI to $600,000 through rent increases or improved occupancy, the value rises to $12 million — a $2M gain from operating improvement alone. This is the core logic of value-add commercial investing. Every dollar of NOI improvement at a 5% cap rate creates $20 of value." },
        { title: "NYC's post-pandemic office market", body: "NYC's office market is bifurcating sharply. Class A buildings — high amenity, well-located, recently renovated — are seeing strong leasing activity and near pre-pandemic rents. Class B and C buildings face persistently high vacancy, rising capital expenditure requirements, and lenders unwilling to refinance at current values. This divergence has created both distressed opportunity (buying B/C at steep discounts) and significant risk (being stuck with obsolete assets). Remote work permanently changed the demand picture for lower-quality office space." },
      ],
      facts: ["Commercial deals typically require 25–35% down vs. 3–20% residential", "NYC Class A office vacancy: ~12% (2025); Class B/C: 18–22%", "Industrial cap rates: 4.5–6% nationally (2025)", "Value formula: NOI ÷ Cap Rate = Property Value"],
    },
    "Deal Flow": {
      sections: [
        { title: "What deal flow means", body: "Deal flow is the pipeline of investment opportunities that reach a buyer or investor. In residential real estate, most deal flow comes through the MLS (Multiple Listing Service) — the shared database agents use to list properties. In commercial real estate, deal flow is much more relationship-dependent: most transactions start with a broker reaching out to a curated list of qualified buyers, and the best deals often never reach public platforms like LoopNet at all." },
        { title: "How commercial deals are distributed", body: "A seller's broker sends a teaser or offering memorandum (OM) to a distribution list. First-tier buyers — those who close reliably, move quickly, and maintain broker relationships — get proactive outreach before broad marketing. Second-tier buyers see deals only after the first round of offers has been collected. When a deal appears on LoopNet or CoStar's public listings, it's often a signal that the first marketing round didn't achieve the seller's target price." },
        { title: "Off-market deals: the real opportunity", body: "Off-market transactions — where a buyer approaches a seller directly, or where a deal is sold quietly without a formal process — often offer the best pricing for buyers because competition is limited or nonexistent. Building the relationships that generate off-market access takes years of consistent, genuine engagement with brokers and property owners. There are no shortcuts. Investors who prioritize relationship-building over deal-chasing typically see much better long-term results." },
        { title: "How to evaluate what you find", body: "Deal screening is the process of quickly determining whether an opportunity is worth full underwriting. First filter: does the implied cap rate make sense given current financing costs? Second filter: does the location, asset type, and tenancy profile fit your criteria? Only deals that pass both filters warrant the time investment of full underwriting — building a pro forma, reviewing leases, ordering third-party reports, and inspecting the property. Discipline in filtering is as important as quality in analysis." },
      ],
      facts: ["30–40% of institutional commercial transactions are off-market", "Full commercial due diligence: 2–6 weeks", "Active institutional investors review 50–100 deals per closed deal", "FOMO (fear of missing out) is the #1 reason investors overpay"],
    },
  };

  // PROFILE PAGE
  if (showProfile && isSignedUp) {
    const firstName = accountInfo.name.split(" ")[0] || "there";
    return (
      <div style={page}>
        <NavBar onBack={() => setShowProfile(false)} backLabel="← Back to home" activeNav={activeNav} handleNavClick={handleNavClick} isSignedUp={isSignedUp} setShowProfile={setShowProfile} openSignup={openSignup} accountInfo={accountInfo} />

        {/* Hero banner */}
        <div style={{ backgroundColor: C.accent, borderBottom: `1px solid ${C.accentHover}` }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px clamp(20px,4vw,48px) 28px", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", color: "white", flexShrink: 0 }}>{(accountInfo.name[0]||"?").toUpperCase()}</div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", opacity: 0.6, letterSpacing: "0.1em", marginBottom: "3px" }}>WELCOME BACK</div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "white", letterSpacing: "-0.02em" }}>{accountInfo.name}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", marginBottom: "3px" }}>LEARNING GOAL</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>{selectedGoal}</div>
                </div>
                <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", marginBottom: "3px" }}>TOPICS SAVED</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>{savedInterests.length} of 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px clamp(20px,4vw,48px) 80px", boxSizing: "border-box" }}>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "5px" }}>YOUR SAVED TOPICS</div>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: C.ink, margin: 0, letterSpacing: "-0.02em" }}>Click any topic to learn more</h2>
            </div>
            <button onClick={() => setShowProfile(false)} style={{ ...btn.secondary, fontSize: "12px", padding: "7px 13px" }}>Browse all 12 topics →</button>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {savedInterests.map((topicTitle, idx) => {
              const d = topicProfileData[topicTitle];
              const content = profileTopicContent[topicTitle];
              const isOpen = profileTopicDetail === topicTitle;
              if (!d) return null;
              return (
                <div key={topicTitle} style={{ backgroundColor: C.white, border: `1px solid ${isOpen ? C.accent : C.border}`, borderRadius: R.xl, overflow: "hidden", transition: "border-color 0.15s" }}>

                  {/* Clickable header */}
                  <button onClick={() => setProfileTopicDetail(isOpen ? null : topicTitle)}
                    style={{ width: "100%", display: "grid", gridTemplateColumns: "4px 1fr auto", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
                    <div style={{ backgroundColor: isOpen ? C.accent : d.color }} />
                    <div style={{ padding: "18px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: isOpen ? C.accent : d.color, letterSpacing: "0.08em" }}>0{idx+1} · TOPIC</div>
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: C.ink, letterSpacing: "-0.01em" }}>{topicTitle}</div>
                      <div style={{ fontSize: "13px", color: C.inkLight, marginTop: "2px" }}>{d.tagline}</div>
                    </div>
                    <div style={{ padding: "18px 22px", display: "flex", alignItems: "center" }}>
                      <div style={{ fontSize: "18px", color: C.inkMuted, transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</div>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && content && (
                    <div style={{ borderTop: `1px solid ${C.border}` }}>
                      {/* Quick facts bar */}
                      <div style={{ backgroundColor: C.accentLight, padding: "12px 22px", display: "flex", gap: "24px", flexWrap: "wrap", borderBottom: `1px solid ${C.border}` }}>
                        {content.facts.map((f, i) => (
                          <div key={i} style={{ fontSize: "12px", color: C.accent, fontWeight: "500" }}>· {f}</div>
                        ))}
                      </div>

                      {/* Sections */}
                      <div style={{ padding: "22px", display: "grid", gap: "20px" }}>
                        {content.sections.map((s, i) => {
                          const isNotLast = i !== content.sections.length - 1;
                          return (
                            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px", paddingBottom: "20px", borderBottom: isNotLast ? `1px solid ${C.border}` : "none" }}>
                              <div style={{ fontSize: "13px", fontWeight: "700", color: C.ink, lineHeight: "1.4", paddingTop: "2px" }}>{s.title}</div>
                              <div style={{ fontSize: "13px", lineHeight: "1.75", color: C.inkLight }}>{s.body}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer actions */}
                      <div style={{ padding: "14px 22px", backgroundColor: C.bg, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                          <span style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.07em", marginRight: "4px" }}>RELATED</span>
                          {d.relatedTopics.map(rt => {
                            const relTopic = topics.find(t => t.title === rt);
                            return (
                              <button key={rt} onClick={() => { setShowProfile(false); openTopicPage(relTopic || { title: rt, slug: rt.toLowerCase().replace(/[^a-z]/g,"-"), description: "", tag: "" }); }}
                                style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "4px 11px", fontSize: "12px", fontWeight: "500", color: C.accent, cursor: "pointer" }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentLight}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.white}>
                                {rt} →
                              </button>
                            );
                          })}
                        </div>
                        <button onClick={() => { setShowProfile(false); openTopicPage(topics.find(t => t.title === topicTitle) || { title: topicTitle, slug: topicTitle.toLowerCase().replace(/[^a-z]/g,"-"), description: d.tagline, tag: "" }); }}
                          style={{ ...btn.primary, fontSize: "12px", padding: "8px 14px" }}>Read full article →</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "28px", backgroundColor: C.ink, borderRadius: R.xl, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "white", marginBottom: "3px" }}>Ready to go further?</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Browse all 12 topics or post a question to the community.</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setShowProfile(false)} style={{ ...btn.primary, backgroundColor: "#c07040" }}>Browse all topics</button>
              <button onClick={() => { setShowProfile(false); setTimeout(() => document.getElementById("ask-question-section")?.scrollIntoView({ behavior: "smooth" }), 100); }} style={{ border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", borderRadius: R.md, padding: "11px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Ask a question</button>
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
        <NavBar onBack={goBackToHome} backLabel="← All topics" activeNav={activeNav} handleNavClick={handleNavClick} isSignedUp={isSignedUp} setShowProfile={setShowProfile} openSignup={openSignup} accountInfo={accountInfo} />
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
                <button onClick={isSignedUp ? () => { setCurrentTopicPage(null); setShowProfile(true); } : openSignup} style={{ ...btn.secondary, padding: "9px 16px", fontSize: "13px" }}>{isSignedUp ? "View my profile" : "Create an account"}</button>
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
                  <button key={p.name} onClick={() => openProfessional(p)}
                    style={{ borderRadius: R.md, padding: "12px", backgroundColor: C.bg, border: `1px solid ${C.border}`, textAlign: "left", cursor: "pointer", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.backgroundColor = C.accentLight; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.bg; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "4px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", color: "white", flexShrink: 0 }}>{p.initials}</div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: C.ink }}>{p.name}</div>
                        <div style={{ fontSize: "11px", color: C.inkMuted }}>{p.role}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: C.inkLight, lineHeight: "1.5", paddingLeft: "37px" }}>{p.help}</div>
                  </button>
                ))}
              </div>
              <div style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.md, padding: "12px 14px" }}>
                <div style={{ fontSize: "11px", color: C.inkMuted, lineHeight: "1.6" }}>
                  <strong style={{ color: C.ink, display: "block", marginBottom: "3px" }}>Want a direct answer?</strong>
                  Click any professional above to view their profile and send them a question about this topic.
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Professional profile modal */}
        {selectedProfessional && (
          <>
            <div onClick={() => setSelectedProfessional(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(10,18,26,0.55)", zIndex: 40 }} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", maxWidth: "92%", backgroundColor: C.white, borderRadius: R.xl, zIndex: 50, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", boxSizing: "border-box" }}>
              <div style={{ backgroundColor: C.accent, padding: "24px 24px 20px", position: "relative" }}>
                <button onClick={() => setSelectedProfessional(null)} style={{ position: "absolute", top: "14px", right: "16px", border: "none", background: "rgba(255,255,255,0.15)", borderRadius: "50%", width: "28px", height: "28px", color: "white", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>×</button>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", color: "white", flexShrink: 0 }}>{selectedProfessional.initials}</div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "white", letterSpacing: "-0.01em" }}>{selectedProfessional.name}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{selectedProfessional.role} · {selectedProfessional.location}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "22px 24px", maxHeight: "65vh", overflowY: "auto", boxSizing: "border-box" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <div style={{ backgroundColor: C.accentLight, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "600", color: C.accent }}>{selectedProfessional.experience} experience</div>
                  <div style={{ backgroundColor: C.warmLight, border: "1px solid #e0cfc0", borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "600", color: C.warm }}>{selectedProfessional.availability}</div>
                </div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "6px" }}>ABOUT</div>
                <p style={{ fontSize: "13px", lineHeight: "1.7", color: C.inkLight, marginBottom: "18px", marginTop: 0 }}>{selectedProfessional.bio}</p>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "8px" }}>COVERS THESE TOPICS</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {selectedProfessional.topics.map(t => (
                    <div key={t} style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "500", color: C.ink }}>{t}</div>
                  ))}
                </div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "8px" }}>SEND A MESSAGE</div>
                <textarea
                  value={proMessage}
                  onChange={e => setProMessage(e.target.value)}
                  placeholder={`Ask ${selectedProfessional.name.split(" ")[0]} a question about ${selectedProfessional.topics[0]}…`}
                  rows={3}
                  style={{ width: "100%", padding: "11px 13px", borderRadius: R.lg, border: `1px solid ${C.border}`, fontSize: "13px", color: C.ink, resize: "none", fontFamily: "inherit", outline: "none", boxSizing: "border-box", backgroundColor: C.bg, lineHeight: "1.6" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "11px", color: C.inkMuted }}>{isSignedUp ? "Your question will be sent from your saved profile." : "Create a free account to send messages."}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setSelectedProfessional(null)} style={{ ...btn.secondary, padding: "9px 16px", fontSize: "13px" }}>Cancel</button>
                    <button onClick={() => { setSelectedProfessional(null); if (!isSignedUp) openSignup(); }} style={{ ...btn.primary, padding: "9px 16px", fontSize: "13px" }}>{isSignedUp ? "Send message" : "Sign up to send"}</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  const heroActions = [
    { number: "01", title: "Pick a topic", body: "Choose one area and start learning.", action: () => handleNavClick("topics-section","Topics") },
    { number: "02", title: "Read this week's update", body: "Stay close to current market insights.", action: () => handleNavClick("market-trends-section","Newsletter") },
    { number: "03", title: "Ask a question", body: "Get answers from people in the field.", action: () => handleNavClick("ask-question-section","Ask a Question") },
  ];

  return (
    <div style={page}>
      <NavBar activeNav={activeNav} handleNavClick={handleNavClick} isSignedUp={isSignedUp} setShowProfile={setShowProfile} openSignup={openSignup} accountInfo={accountInfo} />
      <main style={{ maxWidth: "1180px", margin: "0 auto", padding: "36px clamp(20px,4vw,48px) 80px", boxSizing: "border-box" }}> 

        {/* HERO */}
        <section id="learn-section" style={{ marginBottom: "60px" }}>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "42px clamp(26px,4vw,48px) 36px", boxSizing: "border-box" }}> 
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.35fr) minmax(240px,0.65fr)", gap: "44px", alignItems: "center", marginBottom: "36px" }}> 
              <div>
                <div style={{ display: "inline-block", padding: "4px 10px", borderRadius: R.sm, backgroundColor: C.accentLight, color: C.accent, fontSize: "10px", fontWeight: "700", letterSpacing: "0.07em", marginBottom: "18px" }}>BEGINNER-FIRST REAL ESTATE PLATFORM</div>
                <h1 style={{ fontSize: "44px", lineHeight: "1.06", margin: "0 0 14px", color: C.ink, fontWeight: "700", letterSpacing: "-0.025em", maxWidth: "520px" }}>Learn real estate without feeling lost.</h1>
                <p style={{ fontSize: "15px", lineHeight: "1.75", color: C.inkLight, maxWidth: "500px", margin: "0 0 26px" }}>MyHome helps beginners understand real estate clearly — explore topics at your own pace, follow market updates, and connect with experienced professionals.</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={isSignedUp ? () => setShowProfile(true) : openSignup} style={btn.primary}>{isSignedUp ? "Go to my profile" : "Start learning"}</button>
                  <button onClick={() => handleNavClick("topics-section","Topics")} style={btn.secondary}>Browse topics</button>
                  <button onClick={() => handleNavClick("market-trends-section","Newsletter")} style={btn.secondary}>Market updates</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}> 
                {[{title:"Beginner-first",body:"No assumed knowledge. Start wherever you are."},{title:"Step by step",body:"Topics build on each other logically."},{title:"Real professionals",body:"Ask questions and learn from people in the field."}].map(c => (
                  <div key={c.title} style={{ border: `1px solid ${C.border}`, borderRadius: R.lg, backgroundColor: C.bg, padding: "14px 16px" }}> 
                    <div style={{ fontSize: "13px", fontWeight: "600", color: C.ink, marginBottom: "2px" }}>{c.title}</div>
                    <div style={{ fontSize: "12px", color: C.inkMuted, lineHeight: "1.5" }}>{c.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "26px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "12px", textAlign: "center" }}>THREE WAYS TO GET STARTED</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "12px" }}>
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
          <div style={{ marginBottom: "28px", textAlign: "center" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "6px" }}>TOPICS</div>
            <h2 style={{ fontSize: "26px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "8px", marginTop: 0 }}>Pick a topic and start there</h2>
            <p style={{ fontSize: "14px", color: C.inkLight, lineHeight: "1.6", maxWidth: "620px", margin: "0 auto" }}>Each topic is structured to help you understand one area clearly before moving to the next.</p>
          </div>
          <div style={{ display: "grid", gap: "28px" }}>
            {topicGroups.map(group => (
              <div key={group.groupTitle}>
                <div style={{ marginBottom: "12px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
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
        <section id="market-trends-section" style={{ marginBottom: "46px" }}>
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "clamp(20px,3vw,30px)", marginBottom: "18px" }}>
            <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 20px" }}>
              <div style={{ fontSize: "9px", fontWeight: "800", color: C.warm, letterSpacing: "0.16em", marginBottom: "8px" }}>THIS WEEK'S NEWSLETTER</div>
              <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: "800", letterSpacing: "-0.03em", margin: "0 0 8px", color: C.ink }}>What we're highlighting this week</h2>
              <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.55", margin: "0 auto", maxWidth: "540px" }}>Choose a current real estate headline on the right, and the featured newsletter will update here.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.25fr) minmax(260px,0.7fr)", gap: "16px", alignItems: "stretch" }}>
              <article style={{ backgroundColor: C.bg, border: `1px solid ${C.borderStrong}`, borderRadius: R.xl, padding: "clamp(18px,3vw,26px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <div style={{ fontSize: "9px", fontWeight: "800", color: C.warm, letterSpacing: "0.12em", padding: "6px 10px", backgroundColor: C.warmLight, borderRadius: R.md }}>{weeklyNewsletter.label}</div>
                    <div style={{ fontSize: "12px", color: C.inkMuted }}>{weeklyNewsletter.date}</div>
                  </div>

                  <div style={{ fontSize: "10px", fontWeight: "700", color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "7px" }}>{weeklyNewsletter.category}</div>
                  <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: "800", letterSpacing: "-0.03em", margin: "0 0 10px", color: C.ink, lineHeight: "1.15" }}>{weeklyNewsletter.title}</h3>
                  <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.6", margin: "0 0 16px" }}>{weeklyNewsletter.intro}</p>

                  <div style={{ display: "grid", gap: "8px", marginBottom: "18px" }}>
                    {weeklyNewsletter.bullets.map((b,i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "16px minmax(0,1fr)", gap: "8px", alignItems: "start" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: C.accent, marginTop: "8px", justifySelf: "center" }} />
                        <div style={{ fontSize: "12.5px", color: C.inkLight, lineHeight: "1.5" }}>{b}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "11px", color: C.inkMuted }}>Source: {weeklyNewsletter.source}</div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => weeklyNewsletter.sourceUrl !== "#" && window.open(weeklyNewsletter.sourceUrl, "_blank", "noopener,noreferrer")}
                      style={{ ...btn.primary, padding: "9px 14px", fontSize: "12px" }}
                    >
                      Read this issue ↗
                    </button>
                    <button
                      onClick={() => setShowPastIssues(!showPastIssues)}
                      style={{ ...btn.secondary, padding: "9px 14px", fontSize: "12px" }}
                    >
                      {showPastIssues ? "Hide past issues" : "Past issues"}
                    </button>
                  </div>
                </div>
              </article>

              <aside style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "16px", backgroundColor: C.white }}>
                  <div style={{ fontSize: "9px", fontWeight: "800", color: C.warm, letterSpacing: "0.12em", marginBottom: "10px" }}>CURRENT NEWS</div>
                  <div style={{ display: "grid", gap: "8px" }}>
                    {currentNews.map(item => {
                      const active = selectedNewsletterId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedNewsletterId(item.id)}
                          style={{ textAlign: "left", border: `1px solid ${active ? C.accent : C.border}`, borderRadius: R.lg, padding: "11px", backgroundColor: active ? C.accentLight : C.bg, cursor: "pointer" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "5px" }}>
                            <span style={{ fontSize: "10px", fontWeight: "700", color: active ? C.accent : C.inkMuted }}>{item.category}</span>
                            <span style={{ fontSize: "10px", color: C.inkMuted }}>{item.source}</span>
                          </div>
                          <div style={{ fontSize: "12px", fontWeight: "800", color: C.ink, lineHeight: "1.32", marginBottom: "4px" }}>{item.title}</div>
                          <div style={{ fontSize: "10.5px", color: C.inkLight, lineHeight: "1.4" }}>{item.date}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showPastIssues && (
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "16px", backgroundColor: C.white }}>
                    <div style={{ fontSize: "9px", fontWeight: "800", color: C.warm, letterSpacing: "0.12em", marginBottom: "10px" }}>PAST ISSUES</div>
                    <div style={{ display: "grid", gap: "8px" }}>
                      {pastIssues.map(item => (
                        <button
                          key={item.id}
                          onClick={() => { setSelectedNewsletterId(item.id); setShowPastIssues(false); }}
                          style={{ textAlign: "left", border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "11px", backgroundColor: C.bg, cursor: "pointer" }}
                        >
                          <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, marginBottom: "5px" }}>{item.date}</div>
                          <div style={{ fontSize: "12px", fontWeight: "800", color: C.ink, lineHeight: "1.3" }}>{item.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>

          <div id="community-section" style={{ backgroundColor: C.white, border: `1px solid ${C.border}`, borderRadius: R.xl, padding: "26px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.warm, letterSpacing: "0.08em", marginBottom: "14px" }}>COMMUNITY</div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "7px", marginTop: 0 }}>Learn from people in the field</h2>
            <p style={{ fontSize: "13px", color: C.inkLight, lineHeight: "1.7", marginBottom: "16px" }}>Professionals are here to support the learning process — not to dominate the platform.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "10px", flex: 1, marginBottom: "16px" }}>
              {professionals.map(p => (
                <button
                  key={p.name}
                  onClick={() => openProfessional(p)}
                  style={{ border: `1px solid ${C.border}`, borderRadius: R.lg, padding: "13px 15px", backgroundColor: C.bg, textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.backgroundColor = C.accentLight; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.backgroundColor = C.bg; }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "3px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: C.ink }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: C.inkMuted }}>— {p.role}</div>
                  </div>
                  <div style={{ fontSize: "12px", color: C.inkLight, lineHeight: "1.6" }}>{isSignedUp ? p.help : "Sign up to view this professional profile and ask a question."}</div>
                </button>
              ))}
            </div>
            <div id="ask-question-section" style={{ borderRadius: R.lg, padding: "15px 16px", backgroundColor: C.ink, color: "white" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}>Ask a beginner question</div>
              <div style={{ fontSize: "12px", lineHeight: "1.6", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>Post a question and get answers from people who work in real estate.</div>
              <button onClick={isSignedUp ? () => { handleNavClick("ask-question-section","Ask a Question"); } : openSignup} style={{ border: "none", borderRadius: R.md, padding: "8px 14px", backgroundColor: "white", color: C.ink, fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{isSignedUp ? "Ask a question" : "Join the community"}</button>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ backgroundColor: C.ink, borderRadius: R.xl, padding: "42px clamp(26px,4vw,48px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", alignItems: "center", gap: "28px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: "7px" }}>GET STARTED</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em", color: "white", margin: "0 0 7px" }}>{isSignedUp ? "Welcome back to your real estate hub." : "Explore first. Sign up when ready."}</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: "380px", lineHeight: "1.6" }}>{isSignedUp ? "Your profile is already saved, so you can return to it anytime without signing up again." : "Browse freely — create a profile when you want to save your progress and personalize your experience."}</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button onClick={isSignedUp ? () => setShowProfile(true) : openSignup} style={{ ...btn.primary, backgroundColor: "#c07040", padding: "11px 20px" }}>{isSignedUp ? ("Welcome back, " + accountInfo.name.split(" ")[0]) : "Create free profile"}</button>
            <button onClick={() => handleNavClick("topics-section","Topics")} style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: R.md, padding: "11px 20px", backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>{isSignedUp ? "Back to topics" : "Browse as guest"}</button>
          </div>
        </section>
      </main>

        {/* Professional profile modal */}
        {selectedProfessional && (
          <>
            <div onClick={() => setSelectedProfessional(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(10,18,26,0.55)", zIndex: 40 }} />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "520px", maxWidth: "92%", backgroundColor: C.white, borderRadius: R.xl, zIndex: 50, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", boxSizing: "border-box" }}>
              <div style={{ backgroundColor: C.accent, padding: "24px 24px 20px", position: "relative" }}>
                <button onClick={() => setSelectedProfessional(null)} style={{ position: "absolute", top: "14px", right: "16px", border: "none", background: "rgba(255,255,255,0.15)", borderRadius: "50%", width: "28px", height: "28px", color: "white", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>×</button>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", color: "white", flexShrink: 0 }}>{selectedProfessional.initials}</div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "white", letterSpacing: "-0.01em" }}>{selectedProfessional.name}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>{selectedProfessional.role} · {selectedProfessional.location}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "22px 24px", maxHeight: "65vh", overflowY: "auto", boxSizing: "border-box" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <div style={{ backgroundColor: C.accentLight, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "600", color: C.accent }}>{selectedProfessional.experience} experience</div>
                  <div style={{ backgroundColor: C.warmLight, border: "1px solid #e0cfc0", borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "600", color: C.warm }}>{selectedProfessional.availability}</div>
                </div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "6px" }}>ABOUT</div>
                <p style={{ fontSize: "13px", lineHeight: "1.7", color: C.inkLight, marginBottom: "18px", marginTop: 0 }}>{selectedProfessional.bio}</p>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "8px" }}>COVERS THESE TOPICS</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {selectedProfessional.topics.map(t => (
                    <div key={t} style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: R.sm, padding: "4px 10px", fontSize: "11px", fontWeight: "500", color: C.ink }}>{t}</div>
                  ))}
                </div>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.inkMuted, letterSpacing: "0.08em", marginBottom: "8px" }}>SEND A MESSAGE</div>
                <textarea
                  value={proMessage}
                  onChange={e => setProMessage(e.target.value)}
                  placeholder={`Ask ${selectedProfessional.name.split(" ")[0]} a question about ${selectedProfessional.topics[0]}…`}
                  rows={3}
                  style={{ width: "100%", padding: "11px 13px", borderRadius: R.lg, border: `1px solid ${C.border}`, fontSize: "13px", color: C.ink, resize: "none", fontFamily: "inherit", outline: "none", boxSizing: "border-box", backgroundColor: C.bg, lineHeight: "1.6" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "11px", color: C.inkMuted }}>{isSignedUp ? "Your question will be sent from your saved profile." : "Create a free account to send messages."}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setSelectedProfessional(null)} style={{ ...btn.secondary, padding: "9px 16px", fontSize: "13px" }}>Cancel</button>
                    <button onClick={() => { setSelectedProfessional(null); if (!isSignedUp) openSignup(); }} style={{ ...btn.primary, padding: "9px 16px", fontSize: "13px" }}>{isSignedUp ? "Send message" : "Sign up to send"}</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}


      {/* MODAL */}
      {showSignupModal && (
        <>
          <div onClick={onboardingStep===4?undefined:closeSignup} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(10,18,26,0.6)", zIndex: 40 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", maxWidth: "92%", backgroundColor: C.white, borderRadius: R.xl, padding: "32px", zIndex: 50, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto", boxSizing: "border-box" }}>
            {onboardingStep!==4 && <button onClick={closeSignup} style={{ position: "absolute", top: "13px", right: "15px", border: "none", background: "transparent", fontSize: "20px", color: C.inkMuted, cursor: "pointer", lineHeight: 1 }}>×</button>}

            {onboardingStep < 4 && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                {["Goal","Topics","Account"].map((label,i) => {
                  const stepNum = i + 1;
                  const isPast = onboardingStep > stepNum;
                  const isCurrent = onboardingStep === stepNum;
                  const isReached = onboardingStep >= stepNum;
                  const isNotLast = i < 2;
                  return (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", flex: isNotLast ? 1 : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: isPast || isCurrent ? C.accent : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", color: isReached ? "white" : C.inkMuted, flexShrink: 0 }}>{isPast ? "✓" : stepNum}</div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: isCurrent ? C.ink : C.inkMuted }}>{label}</span>
                      </div>
                      {isNotLast && <div style={{ flex: 1, height: "1px", backgroundColor: isPast ? C.accent : C.border }} />}
                    </div>
                  );
                })}
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