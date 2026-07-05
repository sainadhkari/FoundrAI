export interface StartupResults {
  startup_name?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  market_score?: number;
  competition_score?: number;
  financial_score?: number;
  risk_score?: number;
  growth_score?: number;
  confidence?: number;
  verdict?: string;
  recommendation?: string;
  executive_summary?: string;
}

export type ScoreKey = "market" | "competition" | "financial" | "risk" | "growth";
export type ScoreTier = "strong" | "moderate" | "risky";

export interface DerivedScores {
  market: number;
  competition: number;
  financial: number;
  risk: number;
  growth: number;
  confidence: number;
}

const clamp = (n: number, min = 0, max = 10) => Math.min(max, Math.max(min, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

export function deriveScores(r: StartupResults): DerivedScores {
  const market = clamp(r.market_score ?? 7.5);
  const competition = clamp(r.competition_score ?? 6.0);
  const financial = clamp(r.financial_score ?? 7.0);
  const risk = clamp(r.risk_score ?? 5.0);
  const growth = clamp(
    r.growth_score ?? round1(market * 0.4 + financial * 0.3 + (10 - risk) * 0.3),
  );
  const confidence = clamp(
    r.confidence ?? round1((market + competition + financial + growth + (10 - risk)) / 5),
  );
  return { market, competition, financial, risk, growth, confidence };
}

/** For "risk", a higher raw value is worse; every other score, higher is better. */
export function scoreTier(key: ScoreKey, value: number): ScoreTier {
  const normalized = key === "risk" ? 10 - value : value;
  if (normalized >= 7.5) return "strong";
  if (normalized >= 5) return "moderate";
  return "risky";
}

export const TIER_COLORS: Record<ScoreTier, { text: string; bg: string; border: string; glow: string; gradient: string }> = {
  strong: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    glow: "rgba(16,185,129,0.25)",
    gradient: "from-emerald-500 to-green-400",
  },
  moderate: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    glow: "rgba(245,158,11,0.25)",
    gradient: "from-amber-500 to-yellow-400",
  },
  risky: {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/25",
    glow: "rgba(244,63,94,0.25)",
    gradient: "from-rose-500 to-red-400",
  },
};

const SCORE_META: Record<ScoreKey, { label: string; noun: string }> = {
  market: { label: "Market Score", noun: "Market Opportunity" },
  competition: { label: "Competition Score", noun: "Competition" },
  financial: { label: "Financial Score", noun: "Financial" },
  risk: { label: "Risk Score", noun: "Risk" },
  growth: { label: "Growth Score", noun: "Growth" },
};

export function scoreMeta(key: ScoreKey) {
  return SCORE_META[key];
}

/* ─────────────────────────────────────────────
   Score Breakdown reasoning (rule-based, dynamic
   from actual score values + startup context)
───────────────────────────────────────────── */

interface Breakdown {
  strengths: string[];
  concerns: string[];
}

function pick<T>(arr: T[], count: number): T[] {
  return arr.slice(0, count);
}

export function getScoreBreakdown(
  key: ScoreKey,
  value: number,
  scores: DerivedScores,
  name: string,
  industry: string,
): Breakdown {
  const tier = scoreTier(key, value);
  const ind = industry || "this industry";

  const bank: Record<ScoreKey, Record<ScoreTier, Breakdown>> = {
    market: {
      strong: {
        strengths: [
          `Large and expanding addressable market within ${ind}`,
          `Strong, clearly identifiable customer pain point`,
          `Favorable timing given current demand trends in ${ind}`,
        ],
        concerns: [
          `Market awareness will still need active demand generation`,
          `Category education may slow initial adoption speed`,
        ],
      },
      moderate: {
        strengths: [
          `Reasonable market size with room to grow in ${ind}`,
          `Identifiable early-adopter segment exists`,
          `Demand signals are present but not yet explosive`,
        ],
        concerns: [
          `Market timing is uncertain — may be early or late`,
          `Customer education needed before wide adoption`,
        ],
      },
      risky: {
        strengths: [
          `A defensible niche may still exist within ${ind}`,
          `Early feedback loops can sharpen targeting quickly`,
          `Low market saturation gives room to reposition`,
        ],
        concerns: [
          `Market size or demand appears limited today`,
          `Customer pain point may not be urgent enough to pay for`,
        ],
      },
    },
    competition: {
      strong: {
        strengths: [
          `Clear differentiation opportunity versus incumbents in ${ind}`,
          `Fragmented competitive landscape favors a focused entrant`,
          `Room to win on execution speed and product experience`,
        ],
        concerns: [
          `Well-funded players could react once traction is visible`,
          `Sustained differentiation will require continuous innovation`,
        ],
      },
      moderate: {
        strengths: [
          `Established players exist but none dominate ${ind} completely`,
          `Niche specialization can carve out defensible positioning`,
          `Customer switching costs in ${ind} are not prohibitively high`,
        ],
        concerns: [
          `Several credible competitors already serve this market`,
          `Differentiation must be proven, not just claimed`,
        ],
      },
      risky: {
        strengths: [
          `Studying entrenched competitors reveals clear feature gaps`,
          `A tightly focused wedge strategy can still find an opening`,
          `Superior execution can offset a crowded field`,
        ],
        concerns: [
          `${ind} has strong, well-capitalized incumbents`,
          `High customer acquisition costs likely against competitors`,
        ],
      },
    },
    financial: {
      strong: {
        strengths: [
          `Healthy path to profitability given current cost structure`,
          `Capital efficiency looks favorable for this stage`,
          `Revenue model aligns well with ${ind} buying behavior`,
        ],
        concerns: [
          `Assumptions should be pressure-tested against real usage data`,
          `Margins could compress as the business scales`,
        ],
      },
      moderate: {
        strengths: [
          `Financial model is workable with disciplined spending`,
          `Runway appears sufficient to reach key milestones`,
          `Unit economics can improve with scale in ${ind}`,
        ],
        concerns: [
          `Burn rate needs close monitoring relative to milestones`,
          `Pricing strategy is not yet fully validated`,
        ],
      },
      risky: {
        strengths: [
          `Lean operating model reduces downside exposure`,
          `Early-stage flexibility allows for pricing experiments`,
          `Alternative revenue streams remain unexplored upside`,
        ],
        concerns: [
          `Current financial trajectory raises sustainability concerns`,
          `Limited runway increases pressure to reach revenue fast`,
        ],
      },
    },
    risk: {
      strong: {
        strengths: [
          `Execution risk is well-contained for this stage`,
          `Founding team and plan reduce key operational risks`,
          `Dependencies and unknowns are limited in scope`,
        ],
        concerns: [
          `External market shifts remain outside direct control`,
          `Continued discipline is required to keep risk low`,
        ],
      },
      moderate: {
        strengths: [
          `Core risks are identifiable and manageable with planning`,
          `No single point of failure dominates the risk profile`,
          `Team can mitigate most risks through iteration`,
        ],
        concerns: [
          `Execution complexity is non-trivial given ${ind} dynamics`,
          `Timeline slippage could compound other risks`,
        ],
      },
      risky: {
        strengths: [
          `Risks are visible early, allowing proactive mitigation`,
          `Smaller scope reduces blast radius of early mistakes`,
          `Iterative validation can de-risk key assumptions quickly`,
        ],
        concerns: [
          `Multiple compounding risk factors are present at once`,
          `Execution complexity is high relative to team resources`,
        ],
      },
    },
    growth: {
      strong: {
        strengths: [
          `Strong compounding growth potential once traction begins`,
          `Multiple viable channels for customer acquisition`,
          `Retention dynamics in ${ind} support long-term expansion`,
        ],
        concerns: [
          `Scaling too fast could strain operations and support`,
          `Growth channels will need diversification over time`,
        ],
      },
      moderate: {
        strengths: [
          `Solid foundation for steady, sustainable growth`,
          `Expansion opportunities exist across adjacent segments`,
          `Growth trajectory is realistic given current resources`,
        ],
        concerns: [
          `Growth will require deliberate investment in distribution`,
          `Customer acquisition cost trends need close tracking`,
        ],
      },
      risky: {
        strengths: [
          `A focused go-to-market wedge could still unlock growth`,
          `Small initial base makes early growth rates look strong`,
          `Product iteration can unlock new growth levers`,
        ],
        concerns: [
          `Current trajectory suggests growth will be slow to start`,
          `Significant investment may be needed to reach scale`,
        ],
      },
    },
  };

  const entry = bank[key][tier];
  return {
    strengths: pick(entry.strengths, 3),
    concerns: pick(entry.concerns, 2),
  };
}

/* ─────────────────────────────────────────────
   AI Agent Insights
───────────────────────────────────────────── */

export interface AgentInsight {
  name: string;
  role: string;
  insight: string;
  status: "Optimistic" | "Cautious" | "Neutral" | "Alert";
}

export function getAgentInsights(
  scores: DerivedScores,
  name: string,
  industry: string,
  executiveSummary: string,
  verdict: string,
): AgentInsight[] {
  const ind = industry || "this market";
  const marketTier = scoreTier("market", scores.market);
  const compTier = scoreTier("competition", scores.competition);
  const finTier = scoreTier("financial", scores.financial);
  const riskTier = scoreTier("risk", scores.risk);

  return [
    {
      name: "Market Agent",
      role: "Market Intelligence",
      status: marketTier === "strong" ? "Optimistic" : marketTier === "moderate" ? "Neutral" : "Cautious",
      insight:
        marketTier === "strong"
          ? `${ind} shows strong growth potential driven by rising demand for solutions like ${name || "this startup"}. Early adoption indicators are favorable, particularly among digitally native customer segments willing to pay for the right offering.`
          : marketTier === "moderate"
            ? `Demand within ${ind} is present but not yet at an inflection point. There is a credible customer base, though ${name || "the startup"} will need targeted positioning to accelerate adoption beyond early adopters.`
            : `Market conditions in ${ind} appear challenging right now. The opportunity may exist, but signals suggest demand needs to be validated further before committing significant resources.`,
    },
    {
      name: "Competitor Agent",
      role: "Competitive Landscape",
      status: compTier === "strong" ? "Optimistic" : compTier === "moderate" ? "Neutral" : "Alert",
      insight:
        compTier === "strong"
          ? `Competitive intensity in ${ind} is manageable, with clear whitespace for differentiation. ${name || "The startup"} can win through focused execution and a sharper product experience than incumbents.`
          : compTier === "moderate"
            ? `Competition is moderate, with several established players active in ${ind}. Differentiation opportunities exist through niche specialization, better execution, or superior customer experience.`
            : `${ind} has well-entrenched, well-capitalized competitors. Breaking through will require a tightly focused wedge strategy and disciplined go-to-market execution.`,
    },
    {
      name: "Finance Agent",
      role: "Financial Risk",
      status: finTier === "strong" ? "Optimistic" : finTier === "moderate" ? "Neutral" : "Cautious",
      insight:
        finTier === "strong"
          ? `The financial model supports a credible path to profitability. Capital efficiency and pricing assumptions for ${ind} look sound at this stage, assuming disciplined execution.`
          : finTier === "moderate"
            ? `A profitable business model appears achievable within 12–18 months, contingent on controlled burn and validated pricing. Close monitoring of unit economics is recommended.`
            : `Financial viability carries meaningful uncertainty. Runway and burn rate should be reassessed, and pricing or cost assumptions revisited before scaling spend.`,
    },
    {
      name: "Risk Agent",
      role: "Execution & Risk",
      status: riskTier === "strong" ? "Optimistic" : riskTier === "moderate" ? "Neutral" : "Alert",
      insight:
        riskTier === "strong"
          ? `Execution complexity is low to moderate given the current plan. Key risks are identifiable and appear manageable with the resources described.`
          : riskTier === "moderate"
            ? `Execution complexity is medium, largely driven by ${ind} competitive dynamics and go-to-market timing. Proactive risk mitigation is advised.`
            : `Multiple risk factors compound here — execution difficulty, market timing, and resourcing all warrant caution before scaling commitments.`,
    },
    {
      name: "CEO Agent",
      role: "Executive Synthesis",
      status: verdict?.toLowerCase().includes("proceed") ? "Optimistic" : verdict?.toLowerCase().includes("pivot") ? "Cautious" : "Alert",
      insight:
        executiveSummary ||
        `Taking all signals together, this is a ${verdict?.toLowerCase() || "developing"} opportunity that requires strategic execution and continued validation against real customers.`,
    },
  ];
}

/* ─────────────────────────────────────────────
   Competitor Intelligence
───────────────────────────────────────────── */

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
  threat: "High" | "Medium" | "Low";
  position: string;
}

const COMPETITOR_MAP: Record<string, Competitor[]> = {
  edtech: [
    { name: "Coursera", strength: "Strong brand and university partnerships", weakness: "Limited personalization", threat: "High", position: "Market Leader" },
    { name: "Udemy", strength: "Massive course catalog and low pricing", weakness: "Inconsistent content quality", threat: "Medium", position: "Challenger" },
    { name: "UpGrad", strength: "Deep enterprise and cohort relationships", weakness: "Slower iteration on product", threat: "Medium", position: "Niche Player" },
  ],
  saas: [
    { name: "Notion", strength: "Beloved product and strong virality", weakness: "Complex for narrow use cases", threat: "Medium", position: "Challenger" },
    { name: "Airtable", strength: "Flexible data model, broad use cases", weakness: "Steep learning curve for teams", threat: "Medium", position: "Challenger" },
    { name: "Monday", strength: "Strong enterprise sales motion", weakness: "Higher price point at scale", threat: "High", position: "Market Leader" },
  ],
  "ai / ml": [
    { name: "OpenAI", strength: "Best-in-class foundation models", weakness: "Not vertically specialized", threat: "High", position: "Market Leader" },
    { name: "Anthropic", strength: "Strong enterprise trust and safety focus", weakness: "Smaller ecosystem of integrations", threat: "Medium", position: "Challenger" },
    { name: "Perplexity", strength: "Fast consumer adoption and UX", weakness: "Limited enterprise depth", threat: "Medium", position: "Niche Player" },
  ],
  fintech: [
    { name: "Stripe", strength: "Best-in-class developer experience", weakness: "Premium pricing at scale", threat: "High", position: "Market Leader" },
    { name: "Plaid", strength: "Deep bank connectivity network", weakness: "Coverage gaps in some regions", threat: "Medium", position: "Challenger" },
    { name: "Chime", strength: "Strong consumer brand loyalty", weakness: "Narrow product breadth", threat: "Medium", position: "Niche Player" },
  ],
  healthtech: [
    { name: "Practo", strength: "Large provider network and brand trust", weakness: "Limited personalization of care", threat: "Medium", position: "Challenger" },
    { name: "Teladoc", strength: "Scaled telehealth infrastructure", weakness: "High customer acquisition cost", threat: "High", position: "Market Leader" },
    { name: "Apollo 24/7", strength: "Integrated pharmacy and diagnostics", weakness: "Slower digital-first innovation", threat: "Medium", position: "Niche Player" },
  ],
  "e-commerce": [
    { name: "Shopify", strength: "Dominant merchant ecosystem and apps", weakness: "Generic experience out of the box", threat: "High", position: "Market Leader" },
    { name: "Amazon", strength: "Unmatched logistics and reach", weakness: "Low margin, brand dilution", threat: "High", position: "Market Leader" },
    { name: "BigCommerce", strength: "Strong enterprise-grade features", weakness: "Smaller app ecosystem", threat: "Medium", position: "Challenger" },
  ],
  marketplace: [
    { name: "Etsy", strength: "Strong niche community and trust", weakness: "High seller competition", threat: "Medium", position: "Niche Player" },
    { name: "Fiverr", strength: "Broad service categories, brand recall", weakness: "Race-to-the-bottom pricing", threat: "Medium", position: "Challenger" },
    { name: "Upwork", strength: "Large buyer-side network effects", weakness: "High platform fees", threat: "High", position: "Market Leader" },
  ],
  "consumer app": [
    { name: "TikTok", strength: "Unmatched engagement and virality", weakness: "Regulatory scrutiny", threat: "High", position: "Market Leader" },
    { name: "Instagram", strength: "Massive existing user base", weakness: "Feature bloat, slower innovation", threat: "High", position: "Market Leader" },
    { name: "BeReal", strength: "Differentiated authentic-content niche", weakness: "Struggling with retention", threat: "Low", position: "Niche Player" },
  ],
  cybersecurity: [
    { name: "CrowdStrike", strength: "Best-in-class threat intelligence", weakness: "Premium enterprise pricing", threat: "High", position: "Market Leader" },
    { name: "Okta", strength: "Dominant identity platform position", weakness: "Complex implementation", threat: "Medium", position: "Challenger" },
    { name: "SentinelOne", strength: "Strong AI-driven detection", weakness: "Smaller partner ecosystem", threat: "Medium", position: "Niche Player" },
  ],
  "enterprise software": [
    { name: "Salesforce", strength: "Massive enterprise install base", weakness: "High cost and complexity", threat: "High", position: "Market Leader" },
    { name: "Microsoft", strength: "Deep enterprise bundling advantage", weakness: "Slower to innovate on UX", threat: "High", position: "Market Leader" },
    { name: "SAP", strength: "Entrenched in large enterprise ops", weakness: "Legacy architecture friction", threat: "Medium", position: "Challenger" },
  ],
  other: [
    { name: "Established Incumbent", strength: "Strong brand recognition and trust", weakness: "Slower to innovate", threat: "Medium", position: "Market Leader" },
    { name: "Fast-Growing Startup", strength: "Agile product iteration", weakness: "Limited resources and reach", threat: "Medium", position: "Challenger" },
    { name: "Adjacent Platform", strength: "Large existing user base", weakness: "Not purpose-built for this niche", threat: "Low", position: "Niche Player" },
  ],
};

export function getCompetitors(industry: string): Competitor[] {
  const key = (industry || "other").toLowerCase().trim();
  return COMPETITOR_MAP[key] ?? COMPETITOR_MAP.other;
}

/* ─────────────────────────────────────────────
   SWOT
───────────────────────────────────────────── */

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export function getSwot(scores: DerivedScores, industry: string, name: string): SwotData {
  const ind = industry || "the target market";
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const threats: string[] = [];

  if (scores.market >= 7) strengths.push("Strong problem-solution fit with clear market demand");
  else weaknesses.push("Market demand still needs stronger validation");

  if (scores.financial >= 7) strengths.push("Sound financial model with efficient capital use");
  else weaknesses.push("Financial runway and unit economics need tightening");

  if (scores.growth >= 7) strengths.push("Scalable growth trajectory with multiple channels");
  else weaknesses.push("Growth engine is not yet proven at scale");

  if (scores.risk <= 5) strengths.push("Execution risk is well-contained for this stage");
  else weaknesses.push("Execution complexity introduces meaningful risk");

  if (scores.competition >= 7) strengths.push("Clear differentiation versus current competitors");
  else weaknesses.push(`Competitive pressure in ${ind} could squeeze positioning`);

  opportunities.push(`Growing adoption trends across ${ind}`);
  opportunities.push("Underserved niche segments open to a focused offering");
  if (scores.growth >= 6) opportunities.push("Expansion into adjacent customer segments over time");
  opportunities.push("Potential to build defensibility through data and iteration speed");

  threats.push(`Well-resourced incumbents operating in ${ind}`);
  if (scores.competition <= 6) threats.push("Market saturation from multiple similar entrants");
  threats.push("Macro or funding-environment shifts could tighten budgets");
  if (scores.risk >= 6) threats.push("Execution missteps could compound quickly at this stage");

  return {
    strengths: pick(strengths, 5),
    weaknesses: pick(weaknesses, 5),
    opportunities: pick(opportunities, 5),
    threats: pick(threats, 5),
  };
}

/* ─────────────────────────────────────────────
   Risk Matrix
───────────────────────────────────────────── */

export interface RiskMatrixItem {
  label: string;
  level: "Low" | "Medium" | "High";
  percent: number;
}

export function getRiskMatrix(scores: DerivedScores): RiskMatrixItem[] {
  const levelFor = (pct: number): "Low" | "Medium" | "High" =>
    pct >= 65 ? "High" : pct >= 35 ? "Medium" : "Low";

  const technicalPct = clamp(round1(scores.risk * 6.5 + (10 - scores.growth) * 3.5), 5, 95);
  const marketPct = clamp(round1((10 - scores.market) * 8 + (10 - scores.competition) * 2), 5, 95);
  const financialPct = clamp(round1((10 - scores.financial) * 9 + scores.risk * 1), 5, 95);
  const executionPct = clamp(round1(scores.risk * 7 + (10 - scores.growth) * 3), 5, 95);

  return [
    { label: "Technical Risk", level: levelFor(technicalPct), percent: Math.round(technicalPct) },
    { label: "Market Risk", level: levelFor(marketPct), percent: Math.round(marketPct) },
    { label: "Financial Risk", level: levelFor(financialPct), percent: Math.round(financialPct) },
    { label: "Execution Risk", level: levelFor(executionPct), percent: Math.round(executionPct) },
  ];
}

/* ─────────────────────────────────────────────
   Growth Roadmap
───────────────────────────────────────────── */

export interface RoadmapItem {
  period: string;
  title: string;
  bullets: string[];
}

export function getRoadmap(verdict: string, recommendation: string): RoadmapItem[] {
  const v = (verdict || "").toLowerCase();
  const finalBullet = recommendation
    ? recommendation.replace(/\.$/, "")
    : "Reassess viability with updated data";

  if (v.includes("proceed")) {
    return [
      { period: "30 Days", title: "Validate & Build", bullets: ["Validate core use case with 10–15 target customers", "Ship a focused MVP"] },
      { period: "90 Days", title: "Launch & Learn", bullets: ["Launch a paid pilot with early customers", "Instrument retention and usage metrics"] },
      { period: "6 Months", title: "Scale Acquisition", bullets: ["Double down on the highest-performing channel", "Refine pricing from real usage data"] },
      { period: "12 Months", title: "Expand & Fund", bullets: [finalBullet, "Grow team and market footprint"] },
    ];
  }
  if (v.includes("pivot")) {
    return [
      { period: "30 Days", title: "Re-Discover", bullets: ["Re-interview target customers", "Isolate the sharpest, most urgent pain point"] },
      { period: "90 Days", title: "Re-Prototype", bullets: ["Prototype a narrower offering", "Test willingness to pay before rebuilding"] },
      { period: "6 Months", title: "Re-Launch", bullets: ["Re-launch with refined positioning", "Measure retention vs. original model"] },
      { period: "12 Months", title: "Reassess", bullets: [finalBullet, "Revisit go/no-go with fresh market data"] },
    ];
  }
  return [
    { period: "30 Days", title: "Pause & Diagnose", bullets: ["Pause spend on current direction", "Run a rapid discovery sprint"] },
    { period: "90 Days", title: "Explore Adjacent", bullets: ["Explore adjacent problems or segments", "Look for stronger pull signal"] },
    { period: "6 Months", title: "Re-Evaluate", bullets: ["Reassess with fresh data", "Consider full pivot or wind-down"] },
    { period: "12 Months", title: "Redirect", bullets: [finalBullet, "Redirect resources to validated opportunity"] },
  ];
}

/* ─────────────────────────────────────────────
   Investment Decision
───────────────────────────────────────────── */

export interface InvestmentDecision {
  decision: "INVEST" | "WATCH" | "PASS";
  reasoning: string;
}

export function getInvestmentDecision(verdict: string, confidence: number): InvestmentDecision {
  const v = (verdict || "").toLowerCase();

  if (v.includes("proceed") && confidence >= 7) {
    return {
      decision: "INVEST",
      reasoning: `Strong fundamentals and a ${confidence}/10 confidence score support moving forward with capital and resources now.`,
    };
  }
  if (v.includes("pivot") || (v.includes("proceed") && confidence < 7)) {
    return {
      decision: "WATCH",
      reasoning: `Promising signals exist, but a ${confidence}/10 confidence score suggests waiting for further validation before committing capital.`,
    };
  }
  return {
    decision: "PASS",
    reasoning: `Current signals and a ${confidence}/10 confidence score indicate this opportunity does not yet meet the bar for investment.`,
  };
}

export function verdictColor(verdict: string) {
  const v = (verdict || "").toLowerCase();
  if (v.includes("proceed")) return TIER_COLORS.strong;
  if (v.includes("pivot")) return TIER_COLORS.moderate;
  return TIER_COLORS.risky;
}

/* ─────────────────────────────────────────────
   Executive Snapshot
───────────────────────────────────────────── */

export type InvestmentGrade = "A" | "B+" | "B" | "C" | "D";

export interface ExecutiveSnapshot {
  opportunityLevel: "High" | "Moderate" | "Low";
  riskLevel: "Low" | "Moderate" | "High";
  investmentGrade: InvestmentGrade;
  boardConfidencePercent: number;
}

export function gradeFromAverage(avg: number): InvestmentGrade {
  if (avg > 8) return "A";
  if (avg >= 7) return "B+";
  if (avg >= 6) return "B";
  if (avg >= 5) return "C";
  return "D";
}

export const GRADE_COLORS: Record<InvestmentGrade, { text: string; bg: string; border: string; glow: string }> = {
  A: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", glow: "rgba(16,185,129,0.3)" },
  "B+": { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/25", glow: "rgba(16,185,129,0.25)" },
  B: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", glow: "rgba(245,158,11,0.25)" },
  C: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/25", glow: "rgba(251,146,60,0.25)" },
  D: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25", glow: "rgba(244,63,94,0.25)" },
};

export function getExecutiveSnapshot(scores: DerivedScores): ExecutiveSnapshot {
  const avg = round1((scores.market + scores.competition + scores.financial + scores.growth + (10 - scores.risk)) / 5);
  const opportunityLevel = scores.market >= 7.5 ? "High" : scores.market >= 5 ? "Moderate" : "Low";
  const riskLevel = scores.risk >= 6.5 ? "High" : scores.risk >= 3.5 ? "Moderate" : "Low";
  const investmentGrade = gradeFromAverage(avg);
  const boardConfidencePercent = clamp(Math.round(scores.confidence * 10), 0, 100);
  return { opportunityLevel, riskLevel, investmentGrade, boardConfidencePercent };
}

/* ─────────────────────────────────────────────
   Radar chart data
───────────────────────────────────────────── */

export interface RadarPoint {
  axis: string;
  value: number;
  fullMark: number;
}

export function getRadarData(scores: DerivedScores): RadarPoint[] {
  return [
    { axis: "Market", value: scores.market, fullMark: 10 },
    { axis: "Competition", value: scores.competition, fullMark: 10 },
    { axis: "Financial", value: scores.financial, fullMark: 10 },
    { axis: "Risk", value: round1(10 - scores.risk), fullMark: 10 },
    { axis: "Growth", value: scores.growth, fullMark: 10 },
  ];
}

/* ─────────────────────────────────────────────
   Startup DNA
───────────────────────────────────────────── */

export interface StartupDNA {
  category: string;
  stage: string;
  riskProfile: string;
  growthPotential: string;
  fundability: string;
  businessModel: string;
}

const BUSINESS_MODEL_MAP: Record<string, string> = {
  edtech: "B2C / B2B Education",
  saas: "B2B SaaS",
  "ai / ml": "AI Platform / API",
  fintech: "B2C Fintech",
  healthtech: "B2B2C Healthtech",
  "e-commerce": "D2C Commerce",
  marketplace: "Two-Sided Marketplace",
  "consumer app": "B2C Consumer",
  cybersecurity: "B2B Security",
  "enterprise software": "B2B Enterprise",
  other: "Hybrid Model",
};

export function getStartupDNA(scores: DerivedScores, industry: string, timeline?: string): StartupDNA {
  const ind = industry || "Emerging Tech";
  const category = `${ind.charAt(0).toUpperCase()}${ind.slice(1)}`;

  const t = (timeline || "").toLowerCase();
  const stage =
    t.includes("1-3") || t.includes("1–3")
      ? "Idea Stage"
      : scores.growth >= 7.5
        ? "Growth Stage"
        : scores.market >= 6.5 && scores.financial >= 6
          ? "Early Stage"
          : "Pre-Seed";

  const riskProfile = scores.risk >= 6.5 ? "High Risk" : scores.risk >= 3.5 ? "Medium Risk" : "Low Risk";
  const growthPotential = scores.growth >= 7.5 ? "High Growth" : scores.growth >= 5 ? "Moderate Growth" : "Slow Growth";
  const fundability =
    scores.financial >= 7.5 && scores.market >= 7
      ? "Strong"
      : scores.financial >= 5.5
        ? "Fundable"
        : "Needs Work";

  const businessModel = BUSINESS_MODEL_MAP[(industry || "other").toLowerCase().trim()] ?? BUSINESS_MODEL_MAP.other;

  return { category, stage, riskProfile, growthPotential, fundability, businessModel };
}
