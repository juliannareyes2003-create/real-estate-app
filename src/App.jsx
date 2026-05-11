import { useState } from "react";

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [activeNav, setActiveNav] = useState("Learn");
  const [savedInterests, setSavedInterests] = useState([]);
  const [currentTopicPage, setCurrentTopicPage] = useState(null);

  const learningGoals = [
    "Learn the basics",
    "Understand investing",
    "Explore development",
    "Follow market trends",
    "Learn laws and regulations",
    "Connect with professionals",
  ];

  const topics = [
    { title: "First-Time Learning", slug: "first-time-learning", description: "Start here if you are new and want the basics explained clearly.", icon: "🌱" },
    { title: "Investing", slug: "investing", description: "Understand how people build wealth through real estate and what to watch out for.", icon: "📈" },
    { title: "Development", slug: "development", description: "Learn how projects go from land and ideas to finished buildings.", icon: "🏗️" },
    { title: "Legal & Regulations", slug: "legal-regulations", description: "See the laws, rules, and approvals that shape how real estate works.", icon: "⚖️" },
    { title: "Tokenization", slug: "tokenization", description: "Learn how ownership can be split into digital shares and what that means.", icon: "🪙" },
    { title: "Market Data", slug: "market-data", description: "Read simple updates on prices, rents, and where the market is moving.", icon: "📊" },
    { title: "Brokerage/Agents", slug: "brokerage-agents", description: "Understand what agents do and how buyers and sellers work with them.", icon: "🤝" },
    { title: "Commercial Real Estate", slug: "commercial-real-estate", description: "Explore offices, retail, mixed-use properties, and larger deals.", icon: "🏢" },
    { title: "Financing", slug: "financing", description: "Learn how deals are funded, from mortgages to larger capital stacks.", icon: "💵" },
    { title: "Zoning", slug: "zoning", description: "See how land use rules affect what can be built and where.", icon: "🗺️" },
    { title: "PropTech", slug: "proptech", description: "Explore the technology changing how real estate is bought, managed, and understood.", icon: "💻" },
    { title: "Deal Flow", slug: "deal-flow", description: "Understand how opportunities are found, shared, and evaluated.", icon: "📂" },
  ];

  const topicGroups = [
    { groupTitle: "Start Here", groupDescription: "Best for beginners who are new to real estate.", items: ["First-Time Learning", "Market Data", "Brokerage/Agents"] },
    { groupTitle: "Money & Investing", groupDescription: "Learn how money moves through real estate.", items: ["Investing", "Financing", "Deal Flow"] },
    { groupTitle: "Building & Property Types", groupDescription: "Understand how real estate is created and used.", items: ["Development", "Commercial Real Estate", "Zoning"] },
    { groupTitle: "Rules, Ownership & Tech", groupDescription: "Explore the systems changing real estate.", items: ["Legal & Regulations", "Tokenization", "PropTech"] },
  ];

  const professionals = [
    { name: "Sarah Jenkins", role: "Real Estate Attorney", help: "Explains contracts, zoning, and legal basics in plain language." },
    { name: "Marcus Chen", role: "Developer", help: "Shares how projects are financed, approved, and built." },
    { name: "Elena Rodriguez", role: "Investor & Broker", help: "Breaks down beginner investing questions and market trends." },
  ];

  const topicPageContent = {
    "first-time-learning": { intro: "This page is for beginners who want a simple starting point before diving into more specific parts of real estate.", points: ["What real estate includes", "Basic terms you will hear often", "How to choose what area interests you most", "What beginners should focus on first"] },
    investing: { intro: "This page explains how people use real estate to build wealth and what beginners should understand before going deeper.", points: ["Different ways people invest", "Risk versus reward", "Why financing matters", "Questions beginners should ask first"] },
    development: { intro: "This page breaks down how projects move from ideas and land to approved, financed, and completed buildings.", points: ["What developers do", "How projects get approved", "How financing affects development", "Why development takes time"] },
    "legal-regulations": { intro: "This page helps beginners understand how laws, approvals, and regulations shape real estate decisions.", points: ["Zoning basics", "Permits and approvals", "Why regulations matter", "How legal rules affect projects"] },
    tokenization: { intro: "This page introduces tokenization in simpler language and explains how digital ownership connects to real estate.", points: ["What tokenization means", "How ownership can be split", "Why people are interested in it", "What beginners should understand first"] },
    "market-data": { intro: "This page shows how to think about pricing, rents, and market movement without getting overwhelmed.", points: ["Home prices", "Rent trends", "Supply and demand", "How to read market changes simply"] },
    "brokerage-agents": { intro: "This page explains what agents do and how buyers and sellers work with them.", points: ["What agents actually do", "Working with buyers", "Working with sellers", "What to ask before choosing one"] },
    "commercial-real-estate": { intro: "This page introduces commercial real estate and explains how it differs from residential.", points: ["Office properties", "Retail properties", "Mixed-use buildings", "How commercial deals differ"] },
    financing: { intro: "This page explains how real estate deals are funded and why financing shapes what is possible.", points: ["Mortgages", "Debt and equity", "Capital stacks", "Why financing decisions matter"] },
    zoning: { intro: "This page explains how land use rules affect what can be built and where.", points: ["What zoning is", "How zoning affects land use", "Why zoning matters for development", "What beginners should notice first"] },
    proptech: { intro: "This page introduces the technology side of real estate and how digital tools are changing the industry.", points: ["Platforms and apps", "Data tools", "Automation", "Why technology matters in real estate"] },
    "deal-flow": { intro: "This page explains how opportunities are found, shared, and evaluated in real estate.", points: ["What deal flow means", "How opportunities are found", "How deals are shared", "How people evaluate them"] },
  };

  const topicNewsletterHighlights = {
    "first-time-learning": { label: "Beginner Basics", title: "Where New Learners Should Start", intro: "A simple overview of the first ideas beginners should understand before diving deeper into real estate topics.", bullets: ["Learn the difference between residential and commercial real estate.", "Get comfortable with the basic language used across the industry.", "Focus on one area at a time instead of trying to understand everything at once."] },
    investing: { label: "Investor Mindset", title: "Thinking About Real Estate Investing Without the Confusion", intro: "A straightforward guide to beginner strategies like REITs, house hacking, and learning how to judge risk.", bullets: ["REITs can be one of the easiest starting points for beginners.", "House hacking is a clear entry strategy to learn first.", "Understanding risk matters more than chasing hype."] },
    development: { label: "Development Update", title: "How Projects Move From Idea to Building", intro: "A beginner-friendly look at how development projects are planned, approved, financed, and completed.", bullets: ["Development starts long before construction begins.", "Approvals, financing, and timelines shape every project.", "Zoning and market demand strongly influence what gets built."] },
    "legal-regulations": { label: "Policy Watch", title: "Why Legal Rules Shape Real Estate So Much", intro: "An easier explanation of how zoning, approvals, and regulations affect projects, ownership, and opportunity.", bullets: ["Zoning rules affect what can be built and where.", "Permits and approvals can slow or reshape development.", "Legal structure matters just as much as market demand."] },
    tokenization: { label: "Tokenization Spotlight", title: "Digital Ownership, Explained More Clearly", intro: "A simple breakdown of how tokenization connects to ownership, access, and investor questions in real estate.", bullets: ["Tokenization can split ownership into smaller pieces.", "It raises questions about regulation, access, and risk.", "Beginners should understand the asset behind the token first."] },
    "market-data": { label: "U.S. Market Overview", title: "The Market Right Now: What You Actually Need to Know", intro: "A simple breakdown of where the market stands today and what beginners should pay attention to first.", bullets: ["Mortgage rates are still shaping buyer behavior.", "Inventory changes affect how people compare opportunities.", "Rent pressure is still pushing more people to learn about ownership."] },
    "brokerage-agents": { label: "Broker Perspective", title: "What Agents Actually Help With", intro: "A clearer look at how agents guide buyers and sellers and where beginners often misunderstand their role.", bullets: ["Agents help with pricing, search, negotiation, and process.", "Their value depends on the market and the client's needs.", "Beginners should know what questions to ask before choosing one."] },
    "commercial-real-estate": { label: "Commercial Spotlight", title: "Commercial Real Estate Without the Jargon", intro: "An intro to how office, retail, and mixed-use properties work and why commercial deals feel so different.", bullets: ["Commercial properties usually depend more on income and leases.", "The scale and analysis differ from residential real estate.", "Location, tenant quality, and demand matter heavily."] },
    financing: { label: "Financing Focus", title: "How Real Estate Deals Get Funded", intro: "A simpler explanation of mortgages, debt, equity, and why capital structure matters in real estate.", bullets: ["Mortgages are only one part of the financing picture.", "Debt and equity play different roles in a deal.", "Funding structure affects risk, returns, and feasibility."] },
    zoning: { label: "Zoning Watch", title: "Why Land Use Rules Matter So Much", intro: "A beginner-friendly explanation of zoning and how it affects development, value, and neighborhood change.", bullets: ["Zoning controls what can be built on a site.", "Land use rules affect supply and neighborhood growth.", "Beginners should understand zoning before judging a project's potential."] },
    proptech: { label: "PropTech Update", title: "Technology Changing How Real Estate Works", intro: "A simple look at how data platforms, automation, and digital tools are shaping the industry.", bullets: ["PropTech improves access to information and workflow speed.", "Digital tools are changing research, management, and transactions.", "Technology matters because it changes how people learn and act in the market."] },
    "deal-flow": { label: "Deal Flow Insight", title: "How Opportunities Get Found and Shared", intro: "A clearer explanation of how deals move through networks, platforms, and professional relationships.", bullets: ["Deal flow is about how opportunities reach people.", "Strong networks often shape who sees what first.", "Evaluating a deal matters just as much as finding it."] },
  };

  const weeklyNewsletter = {
    label: "THIS WEEK'S HIGHLIGHT",
    date: "Week of April 21",
    title: "NYC Spotlight: What Beginners Should Notice Right Now",
    intro: "This week's featured newsletter breaks down why New York is still an important market to study, especially for beginners trying to understand rent pressure, outer-borough demand, and the difference between co-ops and condos.",
    bullets: ["Outer boroughs are becoming more attractive for first-time buyers.", "The co-op versus condo difference matters a lot in NYC.", "NYC helps beginners compare many market types in one place."],
  };

  const openTopicPage = (topic) => { setCurrentTopicPage(topic); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goBackToHome = () => { setCurrentTopicPage(null); setActiveNav("Topics"); };
  const saveInterest = (topicTitle) => {
    if (savedInterests.includes(topicTitle)) { setSavedInterests(savedInterests.filter((item) => item !== topicTitle)); return; }
    if (savedInterests.length < 3) { setSavedInterests([...savedInterests, topicTitle]); }
  };
  const openSignup = () => { setShowSignupModal(true); setOnboardingStep(1); };
  const closeSignup = () => { setShowSignupModal(false); setOnboardingStep(1); };
  const handleNavClick = (sectionId, navName) => {
    setActiveNav(navName);
    const section = document.getElementById(sectionId);
    if (section) { const y = section.getBoundingClientRect().top + window.pageYOffset - 112; window.scrollTo({ top: y, behavior: "smooth" }); }
  };
  const nextStep = () => {
    if (onboardingStep < 2) { setOnboardingStep(onboardingStep + 1); } else { setShowSignupModal(false); setOnboardingStep(1); }
  };

  // DATA: quick-start action steps shown inside the merged hero card.
  const heroActions = [
    { number: "1", icon: "📖", title: "Pick a topic", body: "Choose one area and start learning.", action: () => handleNavClick("topics-section", "Topics") },
    { number: "2", icon: "📰", title: "Read this week's update", body: "Stay close to simple market insights.", action: () => handleNavClick("market-trends-section", "Newsletter") },
    { number: "3", icon: "💬", title: "Ask a beginner question", body: "Get support from the community.", action: () => handleNavClick("ask-question-section", "Ask a Question") },
  ];

  const featureChips = [
    { icon: "📖", title: "Beginner friendly", body: "No jargon. Just simple explanations." },
    { icon: "📊", title: "Step by step", body: "Learn at your own pace with clear topics." },
    { icon: "👥", title: "Real people", body: "Ask questions and learn from experts." },
  ];

  // PAGE: Topic detail
  if (currentTopicPage) {
    const topicInfo = topicPageContent[currentTopicPage.slug];
    const topicNewsletter = topicNewsletterHighlights[currentTopicPage.slug];

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f4ef", color: "#243746", fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: "40px 24px 80px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <button onClick={goBackToHome} style={{ border: "none", background: "transparent", color: "#355569", fontSize: "16px", fontWeight: "700", cursor: "pointer", marginBottom: "24px" }}>← Back to topics</button>
          <div style={{ backgroundColor: "white", border: "1px solid #e5ddd3", borderRadius: "28px", padding: "36px", marginBottom: "24px", boxSizing: "border-box" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{currentTopicPage.icon}</div>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "#94613c", marginBottom: "10px" }}>TOPIC PAGE</div>
            <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>{currentTopicPage.title}</h1>
            <p style={{ fontSize: "18px", color: "#61707d", lineHeight: "1.7", marginBottom: "24px" }}>{currentTopicPage.description}</p>
            <div style={{ backgroundColor: "#faf7f2", border: "1px solid #ebe1d5", borderRadius: "22px", padding: "22px" }}>
              <h2 style={{ marginTop: 0, marginBottom: "10px" }}>What this topic helps you understand</h2>
              <p style={{ fontSize: "16px", color: "#61707d", lineHeight: "1.7", margin: 0 }}>{topicInfo?.intro}</p>
            </div>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #e5ddd3", borderRadius: "28px", padding: "30px", boxSizing: "border-box" }}>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "#94613c", marginBottom: "12px" }}>START HERE</div>
            <h2 style={{ fontSize: "30px", marginBottom: "18px" }}>Simple things to explore first</h2>
            <div style={{ display: "grid", gap: "14px", marginBottom: "24px" }}>
              {topicInfo?.points.map((item) => (
                <div key={item} style={{ backgroundColor: "#faf7f2", border: "1px solid #ebe1d5", borderRadius: "20px", padding: "18px", fontSize: "16px", fontWeight: "600", color: "#2b3d4b" }}>{item}</div>
              ))}
            </div>
            <div style={{ backgroundColor: "white", border: "1px solid #e5ddd3", borderRadius: "28px", padding: "30px", marginTop: "24px", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#94613c", marginBottom: "12px" }}>NEWSLETTER HIGHLIGHT</div>
              <h2 style={{ fontSize: "30px", marginBottom: "12px" }}>Related newsletter for this topic</h2>
              <p style={{ fontSize: "16px", color: "#61707d", lineHeight: "1.7", marginBottom: "20px", maxWidth: "760px" }}>This gives beginners a simple read that connects directly to the topic they are exploring now.</p>
              <div style={{ backgroundColor: "#fbf8f3", border: "1px solid #ebe1d5", borderRadius: "24px", padding: "24px", marginBottom: "24px" }}>
                <div style={{ display: "inline-block", borderRadius: "999px", padding: "7px 12px", backgroundColor: "#efe7dc", color: "#94613c", fontSize: "12px", fontWeight: "800", marginBottom: "12px" }}>{topicNewsletter?.label}</div>
                <div style={{ fontSize: "24px", fontWeight: "800", marginBottom: "10px", color: "#233746" }}>{topicNewsletter?.title}</div>
                <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#61707d", marginBottom: "14px" }}>{topicNewsletter?.intro}</div>
                <ul style={{ paddingLeft: "20px", color: "#48657a", lineHeight: "1.9", fontSize: "15px", margin: 0 }}>
                  {topicNewsletter?.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => saveInterest(currentTopicPage.title)} style={{ border: "none", backgroundColor: savedInterests.includes(currentTopicPage.title) ? "#355569" : "#2f596e", color: "white", borderRadius: "16px", padding: "14px 20px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>
                {savedInterests.includes(currentTopicPage.title) ? "Saved to your top interests" : "Save to my top 3 interests"}
              </button>
              <button onClick={openSignup} style={{ border: "1px solid #d7dddd", backgroundColor: "white", color: "#355569", borderRadius: "16px", padding: "14px 20px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Continue to sign up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PAGE: Homepage
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f4ef", color: "#243746", fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* SECTION: Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, backgroundColor: "rgba(247, 244, 239, 0.94)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e5ddd3" }}>
        <div style={{ width: "100%", maxWidth: "1500px", margin: "0 auto", padding: "18px clamp(20px, 4vw, 44px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "14px", backgroundColor: "#2f596e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "20px" }}>⌂</div>
            <div>
              <div style={{ fontSize: "21px", fontWeight: "800", color: "#2f596e" }}>MyHome</div>
              <div style={{ fontSize: "12px", color: "#7b8794" }}>Real estate, made easier to understand</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {[{ label: "Learn", id: "learn-section" }, { label: "Topics", id: "topics-section" }, { label: "Newsletter", id: "market-trends-section" }, { label: "Community", id: "community-section" }, { label: "Ask a Question", id: "ask-question-section" }].map((item) => (
              <button key={item.label} onClick={() => handleNavClick(item.id, item.label)} style={{ border: "none", borderRadius: "999px", padding: "10px 16px", backgroundColor: activeNav === item.label ? "#2f596e" : "transparent", color: activeNav === item.label ? "white" : "#355569", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>{item.label}</button>
            ))}
          </div>
          <button onClick={openSignup} style={{ border: "none", borderRadius: "14px", padding: "12px 18px", backgroundColor: "#2f596e", color: "white", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>Sign up free</button>
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: "1500px", margin: "0 auto", padding: "34px clamp(20px, 4vw, 44px) 80px", boxSizing: "border-box" }}>

        {/* SECTION: Merged hero — single wide card */}
        <section id="learn-section" style={{ marginBottom: "56px" }}>
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e1d8cd",
            borderRadius: "32px",
            padding: "44px 44px 40px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            boxSizing: "border-box",
          }}>
            {/* Top: headline + description + CTAs */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "32px",
              alignItems: "center",
              marginBottom: "36px",
            }}>
              <div>
                <div style={{ alignSelf: "flex-start", display: "inline-block", padding: "8px 14px", borderRadius: "999px", backgroundColor: "#efe7dc", color: "#94613c", fontSize: "13px", fontWeight: "700", marginBottom: "20px" }}>
                  Beginner-first real estate platform
                </div>
                <h1 style={{ fontSize: "44px", lineHeight: "1.08", margin: "0 0 16px", color: "#233746", maxWidth: "620px" }}>
                  Learn real estate<br />without feeling lost.
                </h1>
                <p style={{ fontSize: "17px", lineHeight: "1.75", color: "#5f6d79", maxWidth: "620px", margin: "0 0 24px" }}>
                  MyHome helps beginners understand real estate in simple language, explore topics step by step, read market newsletters, and connect with experienced people when they are ready.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button onClick={openSignup} style={{ border: "none", borderRadius: "16px", padding: "14px 20px", backgroundColor: "#2f596e", color: "white", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Start learning</button>
                  <button onClick={() => handleNavClick("topics-section", "Topics")} style={{ border: "1px solid #d7dddd", borderRadius: "16px", padding: "14px 20px", backgroundColor: "white", color: "#355569", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Browse topics</button>
                  <button onClick={() => handleNavClick("market-trends-section", "Newsletter")} style={{ border: "1px solid #d7dddd", borderRadius: "16px", padding: "14px 20px", backgroundColor: "white", color: "#355569", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>See market updates</button>
                </div>
              </div>

              {/* Feature chips stacked on the right */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "200px" }}>
                {featureChips.map((item) => (
                  <div key={item.title} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "999px", backgroundColor: "#f3eadf", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "800", color: "#233746", marginBottom: "2px" }}>{item.title}</div>
                      <div style={{ fontSize: "12px", lineHeight: "1.4", color: "#61707d" }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #ede5da", marginBottom: "28px" }} />

            {/* Bottom: 3 action steps in a dark strip */}
            <div style={{
              backgroundColor: "#2f596e",
              borderRadius: "22px",
              padding: "28px 28px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto 1fr auto 1fr",
              gap: "0",
              alignItems: "center",
            }}>
              {heroActions.map((item, i) => (
                <>
                  <button
                    key={item.title}
                    onClick={item.action}
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "white",
                      borderRadius: "16px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      cursor: "pointer",
                      textAlign: "left",
                      minWidth: "220px",
                    }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "800", marginBottom: "3px" }}>{item.number}. {item.title}</div>
                      <div style={{ fontSize: "12px", lineHeight: "1.45", color: "rgba(255,255,255,0.75)" }}>{item.body}</div>
                    </div>
                    <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.6)" }}>→</div>
                  </button>
                  {i < heroActions.length - 1 && (
                    <div key={`divider-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
                      <div style={{ width: "1px", height: "40px", backgroundColor: "rgba(255,255,255,0.15)" }} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: Topics grid */}
        <section id="topics-section" style={{ marginBottom: "34px" }}>
          <div style={{ marginBottom: "28px", textAlign: "center", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "#94613c", marginBottom: "10px" }}>TOPICS</div>
            <h2 style={{ fontSize: "34px", marginBottom: "10px" }}>Pick a topic and start there</h2>
            <p style={{ fontSize: "17px", color: "#61707d", lineHeight: "1.7", maxWidth: "780px" }}>These are not just tags. Each topic is meant to help beginners understand a part of real estate more clearly.</p>
          </div>
          <div style={{ display: "grid", gap: "26px" }}>
            {topicGroups.map((group) => (
              <div key={group.groupTitle}>
                <div style={{ marginBottom: "18px", textAlign: "left" }}>
                  <h3 style={{ fontSize: "22px", marginBottom: "6px", color: "#233746" }}>{group.groupTitle}</h3>
                  <p style={{ fontSize: "14px", color: "#61707d", lineHeight: "1.6", margin: 0 }}>{group.groupDescription}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "18px" }}>
                  {group.items.map((topicTitle) => {
                    const topic = topics.find((item) => item.title === topicTitle);
                    return (
                      <button key={topic.title} onClick={() => openTopicPage(topic)} style={{ textAlign: "left", border: "1px solid #ddd5ca", borderRadius: "20px", backgroundColor: "white", padding: "22px", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.03)", minHeight: "132px" }}>
                        <div style={{ fontSize: "24px", marginBottom: "12px" }}>{topic.icon}</div>
                        <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#233746" }}>{topic.title}</div>
                        <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#61707d" }}>{topic.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Newsletter and Community */}
        <section id="market-trends-section" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "22px", marginBottom: "34px" }}>
          <div style={{ backgroundColor: "white", border: "1px solid #e5ddd3", borderRadius: "28px", padding: "30px" }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "#94613c", marginBottom: "10px" }}>THIS WEEK'S NEWSLETTER</div>
            <h2 style={{ fontSize: "34px", marginBottom: "12px" }}>What we're highlighting this week</h2>
            <p style={{ fontSize: "17px", color: "#61707d", lineHeight: "1.7", marginBottom: "20px" }}>Instead of giving beginners too many newsletter choices at once, MyHome can feature one strong weekly highlight that feels timely, easier to follow, and more intentional.</p>
            <div style={{ backgroundColor: "#fbf8f3", border: "1px solid #ebe1d5", borderRadius: "24px", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div style={{ display: "inline-block", borderRadius: "999px", padding: "7px 12px", backgroundColor: "#efe7dc", color: "#94613c", fontSize: "12px", fontWeight: "800" }}>{weeklyNewsletter.label}</div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#61707d" }}>{weeklyNewsletter.date}</div>
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", marginBottom: "12px", color: "#233746", lineHeight: "1.2" }}>{weeklyNewsletter.title}</div>
              <div style={{ fontSize: "16px", lineHeight: "1.8", color: "#61707d", marginBottom: "18px", maxWidth: "760px" }}>{weeklyNewsletter.intro}</div>
              <ul style={{ paddingLeft: "20px", color: "#48657a", lineHeight: "1.9", fontSize: "15px", marginBottom: "22px" }}>
                {weeklyNewsletter.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button style={{ border: "none", borderRadius: "14px", padding: "12px 18px", backgroundColor: "#2f596e", color: "white", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>Read this week's newsletter</button>
                <button style={{ border: "1px solid #d7dddd", borderRadius: "14px", padding: "12px 18px", backgroundColor: "white", color: "#355569", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>See past highlights</button>
              </div>
            </div>
          </div>

          <div id="community-section" style={{ backgroundColor: "white", border: "1px solid #e5ddd3", borderRadius: "28px", padding: "30px" }}>
            <div style={{ fontSize: "14px", fontWeight: "800", color: "#94613c", marginBottom: "10px" }}>COMMUNITY</div>
            <h2 style={{ fontSize: "34px", marginBottom: "12px" }}>Learn from people already in the field</h2>
            <p style={{ fontSize: "17px", color: "#61707d", lineHeight: "1.7", marginBottom: "20px" }}>Professionals are here to support the beginner journey, not take over the platform.</p>
            <div style={{ display: "grid", gap: "14px", marginBottom: "18px" }}>
              {professionals.map((person) => (
                <div key={person.name} style={{ border: "1px solid #ebe1d5", borderRadius: "22px", padding: "18px", backgroundColor: "#faf7f2" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "4px" }}>{person.name}</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#48657a", marginBottom: "8px" }}>{person.role}</div>
                  <div style={{ fontSize: "15px", color: "#61707d", lineHeight: "1.7" }}>{person.help}</div>
                </div>
              ))}
            </div>
            <div id="ask-question-section" style={{ borderRadius: "22px", padding: "18px", backgroundColor: "#2f596e", color: "white" }}>
              <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Ask a beginner question</div>
              <div style={{ fontSize: "15px", lineHeight: "1.7", color: "rgba(255,255,255,0.84)", marginBottom: "14px" }}>See a topic you do not understand yet? Ask the community and get answers in simpler language.</div>
              <button onClick={openSignup} style={{ border: "none", borderRadius: "14px", padding: "12px 16px", backgroundColor: "white", color: "#2f596e", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>Continue to community</button>
            </div>
          </div>
        </section>

        {/* SECTION: Bottom CTA */}
        <section style={{ backgroundColor: "#243746", color: "white", borderRadius: "30px", padding: "40px 34px", textAlign: "center" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ fontSize: "14px", fontWeight: "800", letterSpacing: "0.08em", opacity: 0.75, marginBottom: "10px" }}>READY TO KEEP GOING?</div>
            <h2 style={{ fontSize: "36px", lineHeight: "1.15", marginBottom: "12px", color: "white" }}>Explore the platform first, then make it yours.</h2>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "rgba(255,255,255,0.82)", marginBottom: "22px" }}>This keeps the experience open and intuitive, while still giving you a sign-up moment like Reddit or LinkedIn.</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
              <button onClick={openSignup} style={{ border: "none", borderRadius: "16px", padding: "14px 20px", backgroundColor: "#d58d6b", color: "white", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Create free profile</button>
              <button style={{ border: "1px solid rgba(255,255,255,0.24)", borderRadius: "16px", padding: "14px 20px", backgroundColor: "transparent", color: "white", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Browse as guest</button>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL: Sign-up / onboarding */}
      {showSignupModal && (
        <>
          <div onClick={closeSignup} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 30, 0.48)", zIndex: 40 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "760px", maxWidth: "92%", backgroundColor: "white", borderRadius: "28px", padding: "34px", zIndex: 50, boxShadow: "0 24px 55px rgba(0,0,0,0.22)" }}>
            <button onClick={closeSignup} style={{ position: "absolute", top: "16px", right: "18px", border: "none", background: "transparent", fontSize: "30px", color: "#6b7280", cursor: "pointer" }}>×</button>
            {onboardingStep === 1 ? (
              <>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "#94613c", marginBottom: "8px" }}>STEP 1 OF 2</div>
                <div style={{ fontSize: "29px", fontWeight: "800", color: "#233746", marginBottom: "10px" }}>Welcome to MyHome</div>
                <div style={{ color: "#61707d", fontSize: "17px", lineHeight: "1.7", marginBottom: "24px", maxWidth: "620px" }}>A simpler way to learn real estate. Start by telling us what you want help with first.</div>
                <div style={{ fontSize: "21px", fontWeight: "700", marginBottom: "16px" }}>What would you like help with first?</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px", marginBottom: "28px" }}>
                  {learningGoals.map((goal) => {
                    const isSelected = selectedGoal === goal;
                    return (
                      <button key={goal} onClick={() => setSelectedGoal(goal)} style={{ padding: "18px", borderRadius: "18px", border: isSelected ? "2px solid #355569" : "1px solid #d7dddd", backgroundColor: isSelected ? "#eef3f5" : "white", color: "#2b3d4b", fontSize: "16px", fontWeight: "600", cursor: "pointer", textAlign: "left" }}>{goal}</button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={nextStep} style={{ border: "none", backgroundColor: "#2f596e", color: "white", borderRadius: "16px", padding: "15px 24px", fontSize: "17px", fontWeight: "700", cursor: "pointer" }}>Continue</button>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "#94613c", marginBottom: "8px" }}>STEP 2 OF 2</div>
                <div style={{ fontSize: "29px", fontWeight: "800", color: "#233746", marginBottom: "12px" }}>Pick topics you want to explore</div>
                <div style={{ color: "#61707d", fontSize: "17px", lineHeight: "1.7", marginBottom: "24px", maxWidth: "640px" }}>This helps us show you beginner-friendly content first.</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
                  {topics.map((topic) => {
                    const isSelected = savedInterests.includes(topic.title);
                    return (
                      <button key={topic.title} onClick={() => saveInterest(topic.title)} style={{ padding: "12px 18px", borderRadius: "999px", border: isSelected ? "2px solid #355569" : "1px solid #d7dddd", backgroundColor: isSelected ? "#eef3f5" : "white", color: "#2b3d4b", fontSize: "15px", cursor: "pointer", fontWeight: "600" }}>{topic.title}</button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                  <button onClick={() => setOnboardingStep(1)} style={{ border: "1px solid #d7dddd", backgroundColor: "white", color: "#355569", borderRadius: "16px", padding: "15px 22px", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Back</button>
                  <button onClick={nextStep} disabled={savedInterests.length !== 3} style={{ border: "none", backgroundColor: savedInterests.length === 3 ? "#2f596e" : "#d7dddd", color: "white", borderRadius: "16px", padding: "15px 24px", fontSize: "17px", fontWeight: "700", cursor: savedInterests.length === 3 ? "pointer" : "not-allowed", opacity: savedInterests.length === 3 ? 1 : 0.7 }}>Continue ({savedInterests.length}/3)</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;