export type MicroMarket = {
  slug: string;
  name: string;
  city: string;
  primaryLocality: string;
  nearby: string[];
  radiusKm: number;
  populationLakhs: number;
  propertiesAnalysed: number;
  recentTransactions: number;
  projects: number;
  builders: number;
  demandScore: number;
  supplyScore: number;
  stability: number;
  health: {
    score: number;
    demand: string;
    supply: string;
    growth: string;
    grade: string;
    rentalYield: string;
    appreciation: string;
    liquidity: string;
    risk: string;
  };
  price: { average: number; low: number; fair: number; premium: number; luxury: number };
  transactions: {
    d30: number;
    d90: number;
    m12: number;
    avgDeal: string;
    highest: string;
    lowest: string;
  };
  demand: {
    today: number;
    week: number;
    month: number;
    savedSearches: number;
    daysOnMarket: number;
  };
  mix: { label: string; value: number }[];
  infrastructure: { label: string; score: number }[];
  growth: { upcoming: string[]; expected: string };
  comparables: { name: string; distance: string; size: string; price: string }[];
  confidence: { score: number; label: string; factors: { label: string; value: number }[] };
  trend: { label: string; value: string }[];
  bargain: {
    asking: string;
    trueValue: string;
    range: string;
    firstOffer: string;
    closing: string;
    strength: string;
  };
};

export const formulaWeights = [
  { label: "Verified Registrations", weight: 30 },
  { label: "Comparable Sales", weight: 20 },
  { label: "Demand Index", weight: 15 },
  { label: "Supply Index", weight: 10 },
  { label: "Infrastructure", weight: 10 },
  { label: "Price Stability", weight: 5 },
  { label: "Rental Yield", weight: 5 },
  { label: "Future Growth", weight: 5 },
];

export const microMarkets: MicroMarket[] = [
  {
    slug: "kompally",
    name: "North Hyderabad – Kompally Premium Residential Zone",
    city: "Hyderabad",
    primaryLocality: "Kompally",
    nearby: ["Suchitra", "Gundlapochampally", "Bowrampet", "Jeedimetla"],
    radiusKm: 3.2,
    populationLakhs: 1.45,
    propertiesAnalysed: 2485,
    recentTransactions: 624,
    projects: 48,
    builders: 22,
    demandScore: 86,
    supplyScore: 61,
    stability: 92,
    health: {
      score: 88,
      demand: "High",
      supply: "Balanced",
      growth: "Excellent",
      grade: "A+",
      rentalYield: "4.8%",
      appreciation: "11.2% / year",
      liquidity: "Fast Selling",
      risk: "Low",
    },
    price: { average: 5546, low: 5120, fair: 5546, premium: 5930, luxury: 6450 },
    transactions: {
      d30: 45,
      d90: 138,
      m12: 624,
      avgDeal: "₹84 Lakhs",
      highest: "₹2.15 Cr",
      lowest: "₹38 Lakhs",
    },
    demand: { today: 84, week: 615, month: 2830, savedSearches: 1425, daysOnMarket: 28 },
    mix: [
      { label: "Apartments", value: 52 },
      { label: "Independent Houses", value: 18 },
      { label: "Villas", value: 12 },
      { label: "Plots", value: 15 },
      { label: "Commercial", value: 3 },
    ],
    infrastructure: [
      { label: "Metro Connectivity", score: 82 },
      { label: "Road Connectivity", score: 94 },
      { label: "Schools", score: 91 },
      { label: "Hospitals", score: 89 },
      { label: "Shopping", score: 93 },
      { label: "IT Employment Access", score: 81 },
      { label: "Public Transport", score: 87 },
      { label: "Parks & Recreation", score: 84 },
    ],
    growth: {
      upcoming: [
        "Metro Extension",
        "Ring Road Access",
        "New Schools",
        "Shopping Mall",
        "IT Park Expansion",
      ],
      expected: "8–14% over the next 3 years",
    },
    comparables: [
      { name: "Green Valley Residency", distance: "0.8 km", size: "1640 sqft", price: "₹89.8 L" },
      { name: "Aparna Serenity", distance: "1.2 km", size: "1675 sqft", price: "₹92.3 L" },
      { name: "Vertex Meadows", distance: "1.7 km", size: "1620 sqft", price: "₹90.9 L" },
      { name: "My Home Harmony", distance: "2.4 km", size: "1660 sqft", price: "₹93.1 L" },
      { name: "Ramky Elite", distance: "2.8 km", size: "1655 sqft", price: "₹91.2 L" },
    ],
    confidence: {
      score: 91,
      label: "Excellent",
      factors: [
        { label: "Comparable Sales", value: 96 },
        { label: "Data Freshness", value: 92 },
        { label: "Property Similarity", value: 90 },
        { label: "Market Stability", value: 95 },
        { label: "Registration Records", value: 94 },
      ],
    },
    trend: [
      { label: "1 Month", value: "+0.8%" },
      { label: "3 Months", value: "+2.1%" },
      { label: "6 Months", value: "+4.4%" },
      { label: "1 Year", value: "+10.8%" },
      { label: "3 Years", value: "+34%" },
    ],
    bargain: {
      asking: "₹95 Lakhs",
      trueValue: "₹91.5 Lakhs",
      range: "₹90.2 L – ₹92.8 L",
      firstOffer: "₹90.8 Lakhs",
      closing: "₹91.9 Lakhs",
      strength: "Very High",
    },
  },
  {
    slug: "gachibowli",
    name: "West Hyderabad – Gachibowli IT Corridor Zone",
    city: "Hyderabad",
    primaryLocality: "Gachibowli",
    nearby: ["Nallagandla", "Tellapur", "Kondapur", "Financial District"],
    radiusKm: 4.1,
    populationLakhs: 2.1,
    propertiesAnalysed: 3960,
    recentTransactions: 812,
    projects: 71,
    builders: 34,
    demandScore: 93,
    supplyScore: 68,
    stability: 89,
    health: {
      score: 92,
      demand: "Very High",
      supply: "Tight",
      growth: "Excellent",
      grade: "A+",
      rentalYield: "3.9%",
      appreciation: "13.4% / year",
      liquidity: "Very Fast Selling",
      risk: "Low",
    },
    price: { average: 8420, low: 7650, fair: 8420, premium: 9280, luxury: 11400 },
    transactions: {
      d30: 71,
      d90: 204,
      m12: 812,
      avgDeal: "₹1.42 Cr",
      highest: "₹6.8 Cr",
      lowest: "₹62 Lakhs",
    },
    demand: { today: 138, week: 964, month: 4210, savedSearches: 2680, daysOnMarket: 21 },
    mix: [
      { label: "Apartments", value: 68 },
      { label: "Independent Houses", value: 8 },
      { label: "Villas", value: 14 },
      { label: "Plots", value: 4 },
      { label: "Commercial", value: 6 },
    ],
    infrastructure: [
      { label: "Metro Connectivity", score: 78 },
      { label: "Road Connectivity", score: 96 },
      { label: "Schools", score: 94 },
      { label: "Hospitals", score: 92 },
      { label: "Shopping", score: 95 },
      { label: "IT Employment Access", score: 99 },
      { label: "Public Transport", score: 84 },
      { label: "Parks & Recreation", score: 88 },
    ],
    growth: {
      upcoming: ["Metro Phase 2", "Elevated Corridor", "New Campus Hubs", "Retail District"],
      expected: "10–16% over the next 3 years",
    },
    comparables: [
      { name: "Lanco Hills Signature", distance: "1.1 km", size: "1780 sqft", price: "₹1.52 Cr" },
      { name: "Aparna Cyberscape", distance: "1.6 km", size: "1810 sqft", price: "₹1.58 Cr" },
      { name: "My Home Avatar", distance: "2.2 km", size: "1760 sqft", price: "₹1.47 Cr" },
      { name: "Rajapushpa Atria", distance: "2.9 km", size: "1795 sqft", price: "₹1.49 Cr" },
      { name: "Vasavi Skyla", distance: "3.4 km", size: "1750 sqft", price: "₹1.44 Cr" },
    ],
    confidence: {
      score: 94,
      label: "Excellent",
      factors: [
        { label: "Comparable Sales", value: 98 },
        { label: "Data Freshness", value: 95 },
        { label: "Property Similarity", value: 92 },
        { label: "Market Stability", value: 91 },
        { label: "Registration Records", value: 96 },
      ],
    },
    trend: [
      { label: "1 Month", value: "+1.2%" },
      { label: "3 Months", value: "+3.4%" },
      { label: "6 Months", value: "+6.1%" },
      { label: "1 Year", value: "+13.4%" },
      { label: "3 Years", value: "+41%" },
    ],
    bargain: {
      asking: "₹1.62 Cr",
      trueValue: "₹1.54 Cr",
      range: "₹1.51 Cr – ₹1.56 Cr",
      firstOffer: "₹1.52 Cr",
      closing: "₹1.55 Cr",
      strength: "Moderate",
    },
  },
];

export function microMarketScore(m: MicroMarket) {
  const registrations = Math.min(100, (m.transactions.m12 / 800) * 100);
  const comparables = m.confidence.factors[0]!.value;
  const infra = Math.round(
    m.infrastructure.reduce((a, i) => a + i.score, 0) / m.infrastructure.length,
  );
  const rental = Math.min(100, parseFloat(m.health.rentalYield) * 18);
  const growth = Math.min(100, parseFloat(m.health.appreciation) * 7);
  const parts = [
    { label: "Verified Registrations", weight: 30, value: registrations },
    { label: "Comparable Sales", weight: 20, value: comparables },
    { label: "Demand Index", weight: 15, value: m.demandScore },
    { label: "Supply Index", weight: 10, value: m.supplyScore },
    { label: "Infrastructure", weight: 10, value: infra },
    { label: "Price Stability", weight: 5, value: m.stability },
    { label: "Rental Yield", weight: 5, value: rental },
    { label: "Future Growth", weight: 5, value: growth },
  ];
  const total = parts.reduce((a, p) => a + (p.value * p.weight) / 100, 0);
  return { parts, total: Math.round(total), infra };
}
