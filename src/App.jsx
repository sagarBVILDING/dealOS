import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Card({ children, className = "" }) {
  return <div className={`border bg-white ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", variant, size, ...props }) {
  const variantClass =
    variant === "secondary"
      ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
      : "bg-slate-950 text-white hover:bg-slate-800";

  const sizeClass = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-medium transition ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const STAGES = [
  "Target Identified",
  "Outreach Initiated",
  "NDA Pending",
  "NDA Executed",
  "CIM Released",
  "IOI Received",
  "Management Meeting",
  "LOI Received",
  "Finalist",
  "Eliminated",
];

const STAGE_GROUPS = ["Pipeline", "Starting", "Active", "Nearing Completion", "Completed"];

const seedDeals = [
  { id: 1, name: "Project Summit", client: "Summit Industrial Holdings", stage: "Active", type: "Sell-Side", industry: "Healthcare Services", owner: "A. Patel", nextMilestone: "IOI Deadline", targetClose: "Q3 2026" },
  { id: 2, name: "Project Atlas", client: "Atlas Business Services", stage: "Pipeline", type: "Sell-Side", industry: "Business Services", owner: "L. Chen", nextMilestone: "Engagement Letter", targetClose: "Q4 2026" },
  { id: 3, name: "Project Harbor", client: "Harbor Logistics Group", stage: "Starting", type: "Sell-Side", industry: "Industrial Services", owner: "R. Singh", nextMilestone: "Buyer Universe Build", targetClose: "Q3 2026" },
  { id: 4, name: "Project Cedar", client: "Cedar Software Holdings", stage: "Nearing Completion", type: "Sell-Side", industry: "Software", owner: "A. Patel", nextMilestone: "Final LOI Selection", targetClose: "Q2 2026" },
  { id: 5, name: "Project North", client: "North Capital Advisors", stage: "Completed", type: "Sell-Side", industry: "Financial Services", owner: "L. Chen", nextMilestone: "Closed", targetClose: "Closed" },
];

const seedBuyersByDeal = {
  1: [
    { id: 1, firm: "Northstar Capital Partners", type: "Private Equity", owner: "A. Patel", contact: "Maya Thompson", email: "maya.thompson@northstar.example", priority: "Tier 1", stage: "Target Identified", source: "CRM", status: "Approved", risk: "Green", notes: "Strong sector fit; prior healthcare services activity." },
    { id: 2, firm: "Summit Strategic Holdings", type: "Strategic", owner: "L. Chen", contact: "David Morales", email: "dmorales@summit.example", priority: "Tier 1", stage: "NDA Pending", source: "Excel", status: "Approved", risk: "Yellow", notes: "High strategic rationale; needs NDA follow-up." },
    { id: 3, firm: "Blue Ridge Equity", type: "Private Equity", owner: "R. Singh", contact: "Emily Carter", email: "ecarter@blueridge.example", priority: "Tier 2", stage: "CIM Released", source: "CRM", status: "Approved", risk: "Green", notes: "Viewed CIM twice; active buyer." },
    { id: 4, firm: "Legacy Family Office", type: "Family Office", owner: "A. Patel", contact: "Thomas Reed", email: "treed@legacyfo.example", priority: "Tier 3", stage: "Target Identified", source: "Excel", status: "Pending Review", risk: "Yellow", notes: "Imported from spreadsheet; needs owner confirmation." },
    { id: 5, firm: "Restricted Competitor Corp", type: "Strategic", owner: "Unassigned", contact: "Unknown", email: "", priority: "Restricted", stage: "Target Identified", source: "Excel", status: "Flagged", risk: "Red", notes: "Potential restricted buyer. Approval required before activation." },
  ],
  2: [
    { id: 201, firm: "Harborview Partners", type: "Private Equity", owner: "L. Chen", contact: "Alex Grant", email: "agrant@harborview.example", priority: "Tier 1", stage: "Target Identified", source: "CRM", status: "Pending Review", risk: "Yellow", notes: "Likely fit; relationship owner needs confirmation." },
    { id: 202, firm: "Midwest Strategic Group", type: "Strategic", owner: "Unassigned", contact: "Dana Lee", email: "dlee@midwestsg.example", priority: "Tier 2", stage: "Target Identified", source: "Excel", status: "Pending Review", risk: "Yellow", notes: "Early pipeline deal; buyer universe not approved." },
  ],
  3: [
    { id: 301, firm: "Iron Gate Capital", type: "Private Equity", owner: "R. Singh", contact: "Priya Shah", email: "pshah@irongate.example", priority: "Tier 1", stage: "Outreach Initiated", source: "CRM", status: "Approved", risk: "Green", notes: "Initial outreach completed; awaiting NDA request." },
    { id: 302, firm: "North Coast Logistics", type: "Strategic", owner: "R. Singh", contact: "Ben Walker", email: "bwalker@northcoast.example", priority: "Tier 1", stage: "NDA Pending", source: "CRM", status: "Approved", risk: "Yellow", notes: "NDA with legal; follow-up needed." },
    { id: 303, firm: "Crescent Family Holdings", type: "Family Office", owner: "A. Patel", contact: "Sara Kim", email: "skim@crescent.example", priority: "Tier 2", stage: "Target Identified", source: "Excel", status: "Approved", risk: "Green", notes: "Long-term hold interest in logistics assets." },
  ],
  4: [
    { id: 401, firm: "Vertex Growth Partners", type: "Private Equity", owner: "A. Patel", contact: "Jordan Miles", email: "jmiles@vertex.example", priority: "Tier 1", stage: "LOI Received", source: "CRM", status: "Approved", risk: "Green", notes: "Strong LOI; clean financing path." },
    { id: 402, firm: "Cloudbridge Software", type: "Strategic", owner: "L. Chen", contact: "Maria Santos", email: "msantos@cloudbridge.example", priority: "Tier 1", stage: "Management Meeting", source: "CRM", status: "Approved", risk: "Yellow", notes: "Strategic fit strong; diligence scope broad." },
    { id: 403, firm: "Pioneer Equity", type: "Private Equity", owner: "A. Patel", contact: "Noah Brown", email: "nbrown@pioneer.example", priority: "Tier 2", stage: "Finalist", source: "Excel", status: "Approved", risk: "Green", notes: "Finalist candidate; partner review pending." },
  ],
  5: [
    { id: 501, firm: "Evergreen Sponsor Group", type: "Private Equity", owner: "L. Chen", contact: "Olivia Hart", email: "ohart@evergreen.example", priority: "Tier 1", stage: "Eliminated", source: "CRM", status: "Approved", risk: "Green", notes: "Process complete; buyer archived." },
    { id: 502, firm: "Northstar Capital Partners", type: "Private Equity", owner: "A. Patel", contact: "Maya Thompson", email: "maya.thompson@northstar.example", priority: "Tier 1", stage: "Finalist", source: "CRM", status: "Approved", risk: "Green", notes: "Winning buyer in completed process." },
  ],
};

const seedMilestonesByDeal = {
  1: [
    { label: "Engagement Letter Signed", date: "2026-04-25", status: "Complete" },
    { label: "Management Timeline Aligned", date: "2026-04-30", status: "Upcoming" },
    { label: "Buyer Universe Approved", date: "2026-05-06", status: "Upcoming" },
    { label: "Teaser / CIM Prep Complete", date: "2026-05-13", status: "Upcoming" },
    { label: "CIM Release", date: "2026-05-20", status: "Upcoming" },
    { label: "IOI Deadline", date: "2026-06-10", status: "At Risk" },
  ],
  2: [
    { label: "Opportunity Identified", date: "2026-04-18", status: "Complete" },
    { label: "Engagement Letter", date: "2026-05-03", status: "At Risk" },
    { label: "Kickoff", date: "2026-05-08", status: "Upcoming" },
    { label: "Timeline Alignment", date: "2026-05-15", status: "Upcoming" },
    { label: "Buyer Strategy", date: "2026-05-22", status: "Upcoming" },
  ],
  3: [
    { label: "Engagement Letter Signed", date: "2026-04-12", status: "Complete" },
    { label: "Management Timeline Aligned", date: "2026-04-20", status: "Complete" },
    { label: "Buyer Universe Build", date: "2026-04-29", status: "At Risk" },
    { label: "Teaser Draft", date: "2026-05-07", status: "Upcoming" },
    { label: "CIM Draft", date: "2026-05-21", status: "Upcoming" },
  ],
  4: [
    { label: "Engagement Letter Signed", date: "2026-02-10", status: "Complete" },
    { label: "CIM Released", date: "2026-03-01", status: "Complete" },
    { label: "IOIs Received", date: "2026-03-25", status: "Complete" },
    { label: "Management Meetings", date: "2026-04-08", status: "Complete" },
    { label: "LOI Review", date: "2026-04-28", status: "At Risk" },
    { label: "Exclusivity Target", date: "2026-05-02", status: "Upcoming" },
  ],
  5: [
    { label: "Engagement Letter Signed", date: "2025-10-15", status: "Complete" },
    { label: "CIM Released", date: "2025-11-05", status: "Complete" },
    { label: "LOI Selected", date: "2025-12-12", status: "Complete" },
    { label: "Exclusivity", date: "2026-01-05", status: "Complete" },
    { label: "Closed", date: "2026-03-18", status: "Complete" },
  ],
};

function runDataTests() {
  if (typeof console === "undefined") return;
  console.assert(STAGES[0] === "Target Identified", "Expected first stage to be Target Identified");
  console.assert(STAGES.includes("IOI Received"), "Expected pipeline stages to include IOI Received");
  console.assert(seedBuyersByDeal[1].length === 5, "Expected five seeded buyers");
  console.assert(Object.keys(seedBuyersByDeal).length === seedDeals.length, "Expected buyer data for every portfolio deal");
  console.assert(Object.keys(seedMilestonesByDeal).length === seedDeals.length, "Expected milestone data for every portfolio deal");
  console.assert(seedBuyersByDeal[1].filter((buyer) => buyer.status === "Approved").length === 3, "Expected three approved seeded buyers");
  console.assert(seedBuyersByDeal[1].some((buyer) => buyer.status === "Flagged" && buyer.risk === "Red"), "Expected one red flagged buyer");
  console.assert(seedMilestonesByDeal[1].some((milestone) => milestone.label === "IOI Deadline"), "Expected IOI deadline milestone");
  console.assert(seedMilestonesByDeal[1].length >= 5, "Expected at least five timeline milestones");
  console.assert(seedDeals.some((deal) => deal.stage === "Nearing Completion"), "Expected nearing completion deal");
  console.assert(STAGES.indexOf("NDA Pending") > STAGES.indexOf("Outreach Initiated"), "Expected NDA Pending after Outreach Initiated");
  console.assert(STAGE_GROUPS.includes("Completed"), "Expected Completed portfolio status group");
  console.assert(seedMilestonesByDeal[5].every((milestone) => milestone.status === "Complete"), "Expected completed deal milestones to be complete");
}

runDataTests();

function Icon({ name, className = "", size = 18 }) {
  const icons = {
    dashboard: "▦",
    edit: "✎",
    upload: "⇧",
    users: "◎",
    plus: "+",
    check: "✓",
    alert: "!",
    shield: "◆",
    spreadsheet: "▤",
    search: "⌕",
    arrow: "›",
  };

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-semibold leading-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(12, size - 2) }}
    >
      {icons[name] || "•"}
    </span>
  );
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    blue: "bg-blue-50 text-blue-700",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone] || tones.neutral}`}>{children}</span>;
}

function buyerRiskClass(risk) {
  if (risk === "Green") return "border-emerald-200 bg-emerald-50";
  if (risk === "Yellow") return "border-amber-200 bg-amber-50";
  return "border-rose-200 bg-rose-50";
}

function dealStageTone(stage) {
  if (stage === "Completed") return "green";
  if (stage === "Nearing Completion") return "blue";
  if (stage === "Active") return "yellow";
  return "neutral";
}

function Sidebar({ view, setView }) {
  const isHomeContext = view === "home" || view === "metrics" || view === "setup";
  const items = isHomeContext
    ? [
        ["home", "dashboard", "Home"],
        ["setup", "plus", "Add New Deal"],
        ["metrics", "dashboard", "Metrics & Reporting"],
      ]
    : [
        ["home", "dashboard", "Home"],
        ["transactionDetails", "edit", "Edit Transaction Details"],
        ["pipeline", "users", "Edit Buyers"],
      ];

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-16 group">
      <aside className="h-full w-72 -translate-x-[15.5rem] border-r bg-slate-950 p-5 text-white shadow-2xl transition-transform duration-300 ease-out group-hover:translate-x-0">
        <div className="mb-8">
          <div className="text-lg font-semibold tracking-tight">DealOS</div>
          <div className="text-sm text-slate-400">{isHomeContext ? "Portfolio command center" : "Deal workspace"}</div>
        </div>
        <nav className="space-y-2">
          {items.map(([key, iconName, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${view === key ? "bg-white text-slate-950" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <Icon name={iconName} />
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="absolute left-0 top-1/2 h-32 w-2 -translate-y-1/2 rounded-r-full bg-slate-400/70 opacity-80 group-hover:opacity-0" />
    </div>
  );
}

function HomePage({ setView, setSelectedDealId, deals }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Deal Portfolio</h1>
          <p className="text-sm text-slate-500">Single pane of glass across all live transactions</p>
        </div>
        <button type="button" onClick={() => setView("setup")} className="inline-flex items-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
          <Icon name="plus" className="mr-2" size={16} /> Launch New Deal
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {STAGE_GROUPS.map((stage) => (
          <Card key={stage} className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
              <div className="text-sm text-slate-500">{stage}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-950">{deals.filter((deal) => deal.stage === stage).length}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-950">All Deals</h2>
            <Badge tone="blue">Click any deal to open dashboard</Badge>
          </div>
          <div className="space-y-3">
            {deals.map((deal) => (
              <button
                key={deal.id}
                type="button"
                onClick={() => {
                  setSelectedDealId(deal.id);
                  setView("dashboard");
                }}
                className="w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold text-slate-950">{deal.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{deal.client} · {deal.industry}</div>
                  </div>
                  <Badge tone={dealStageTone(deal.stage)}>{deal.stage}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-4 text-sm text-slate-600">
                  <div><span className="font-medium">Owner:</span> {deal.owner}</div>
                  <div><span className="font-medium">Type:</span> {deal.type}</div>
                  <div><span className="font-medium">Next:</span> {deal.nextMilestone}</div>
                  <div><span className="font-medium">Target:</span> {deal.targetClose}</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Header({ view, deal, setView }) {
  if (view === "home" || view === "setup" || view === "metrics") return null;

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <button type="button" onClick={() => setView("home")} className="mb-2 text-sm font-medium text-slate-500 hover:text-slate-900">‹ Back to portfolio</button>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{deal.name}</h1>
        <p className="text-sm text-slate-500">{deal.client} · {deal.industry} · {deal.type}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge tone={dealStageTone(deal.stage)}>{deal.stage}</Badge>
        <Button className="rounded-2xl"><Icon name="plus" className="mr-2" size={16} /> Add Buyer</Button>
      </div>
    </div>
  );
}

function Metric({ title, value, icon }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-slate-950">{value}</div>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3"><Icon name={icon} size={20} /></div>
      </CardContent>
    </Card>
  );
}

function Dashboard({ deal, buyers, milestones }) {
  const stats = useMemo(() => {
    const approved = buyers.filter((buyer) => buyer.status === "Approved").length;
    const flagged = buyers.filter((buyer) => buyer.status === "Flagged").length;
    const pending = buyers.filter((buyer) => buyer.status === "Pending Review").length;
    const active = buyers.filter((buyer) => buyer.stage !== "Eliminated").length;
    return { approved, flagged, pending, active };
  }, [buyers]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Metric title="Active Buyers" value={stats.active} icon="users" />
        <Metric title="Approved" value={stats.approved} icon="check" />
        <Metric title="Pending Review" value={stats.pending} icon="alert" />
        <Metric title="Flagged" value={stats.flagged} icon="shield" />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-950">Process Timeline</h2>
            <Badge tone="yellow">IOI deadline watch</Badge>
          </div>
          <ProcessTimeline milestones={milestones} buyers={buyers} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="mb-4 font-semibold text-slate-950">MD Control View</h2>
            <div className="space-y-3 text-sm">
              <ControlLine label="Current deal status" status={deal.stage} tone={dealStageTone(deal.stage)} />
              <ControlLine label="Next milestone" status={deal.nextMilestone} tone="blue" />
              <ControlLine label="Deal owner" status={deal.owner} tone="neutral" />
              <ControlLine label="Target close" status={deal.targetClose} tone="neutral" />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function ProcessTimeline({ milestones, buyers }) {
  const completedCount = milestones.filter((milestone) => milestone.status === "Complete").length;
  const progressWidth = milestones.length > 1 ? `${Math.max(0, ((completedCount - 1) / (milestones.length - 1)) * 100)}%` : "0%";
  const visibleStages = STAGES.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="w-full overflow-x-auto pb-2 pt-6">
        <div className="relative min-w-[900px] px-3 pb-20">
          <div className="absolute left-8 right-8 top-9 h-1 rounded-full bg-slate-200" />
          <div className="absolute left-8 top-9 h-1 rounded-full bg-emerald-500" style={{ width: progressWidth }} />
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
            {milestones.map((milestone, index) => {
              const tone = milestone.status === "Complete" ? "green" : milestone.status === "At Risk" ? "red" : "blue";
              const dotClass = milestone.status === "Complete" ? "border-emerald-500 bg-emerald-500 text-white" : milestone.status === "At Risk" ? "border-rose-500 bg-white text-rose-600" : "border-slate-300 bg-white text-slate-500";
              return (
                <div key={`${milestone.label}-${index}`} className="relative flex flex-col items-center text-center">
                  <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm ${dotClass}`}>
                    {milestone.status === "Complete" ? "✓" : index + 1}
                  </div>
                  <div className="mt-3 max-w-[150px] text-xs font-semibold leading-snug text-slate-900">{milestone.label}</div>
                  <div className="mt-1 text-xs text-slate-500">{milestone.date}</div>
                  <div className="mt-2"><Badge tone={tone}>{milestone.status}</Badge></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-950">Buyer Stage Snapshot</h3>
          <Badge tone="blue">Live by stage</Badge>
        </div>
        <div className="w-full overflow-x-auto pb-2">
          <div className="grid min-w-[1100px] gap-3" style={{ gridTemplateColumns: `repeat(${visibleStages.length}, minmax(0, 1fr))` }}>
            {visibleStages.map((stage) => {
              const stageBuyers = buyers.filter((buyer) => buyer.stage === stage);
              return (
                <div key={stage} className="rounded-2xl border bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold leading-tight text-slate-900">{stage}</div>
                    <Badge>{stageBuyers.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {stageBuyers.length === 0 ? (
                      <div className="rounded-xl border border-dashed bg-white p-3 text-center text-xs text-slate-400">No buyers</div>
                    ) : (
                      stageBuyers.map((buyer) => (
                        <div key={buyer.id} className={`rounded-xl border p-2 shadow-sm ${buyerRiskClass(buyer.risk)}`}>
                          <div className="truncate text-xs font-medium text-slate-950">{buyer.firm}</div>
                          <div className="mt-1 text-[11px] text-slate-500">{buyer.owner}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlLine({ label, status, tone }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
      <span className="text-slate-700">{label}</span>
      <Badge tone={tone}>{status}</Badge>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input className="w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300" value={value} onChange={(event) => onChange?.(event.target.value)} />
    </div>
  );
}

function TransactionDetails({ deal, milestones, onUpdateDeal, onUpdateMilestones, onCancel }) {
  const [form, setForm] = useState({ ...deal });
  const [timelineRows, setTimelineRows] = useState(milestones.map((milestone) => ({ ...milestone })));

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateMilestone(index, field, value) {
    setTimelineRows((prev) => prev.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)));
  }

  function saveChanges() {
    onUpdateDeal(form);
    onUpdateMilestones(timelineRows);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Edit Transaction Details</h2>
              <p className="text-sm text-slate-500">Update deal-level information and timeline dates shown on the dashboard.</p>
            </div>
            <Badge tone="blue">{deal.name}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Deal Codename" value={form.name || ""} onChange={(value) => updateField("name", value)} />
            <Input label="Seller / Client Name" value={form.client || ""} onChange={(value) => updateField("client", value)} />
            <Input label="Deal Stage" value={form.stage || ""} onChange={(value) => updateField("stage", value)} />
            <Input label="Deal Type" value={form.type || ""} onChange={(value) => updateField("type", value)} />
            <Input label="Industry" value={form.industry || ""} onChange={(value) => updateField("industry", value)} />
            <Input label="Deal Owner" value={form.owner || ""} onChange={(value) => updateField("owner", value)} />
            <Input label="Next Milestone" value={form.nextMilestone || ""} onChange={(value) => updateField("nextMilestone", value)} />
            <Input label="Target Close" value={form.targetClose || ""} onChange={(value) => updateField("targetClose", value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-950">Process Timeline Dates</h3>
              <p className="text-sm text-slate-500">These events are plotted across the deal dashboard timeline.</p>
            </div>
            <Button variant="secondary" className="rounded-2xl" onClick={() => setTimelineRows((prev) => [...prev, { label: "New Milestone", date: "TBD", status: "Upcoming" }])}>Add Milestone</Button>
          </div>
          <div className="space-y-3">
            {timelineRows.map((milestone, index) => (
              <div key={`${milestone.label}-${index}`} className="grid grid-cols-12 items-end gap-3 rounded-2xl border bg-white p-3">
                <div className="col-span-5"><Input label="Event" value={milestone.label} onChange={(value) => updateMilestone(index, "label", value)} /></div>
                <div className="col-span-3"><Input label="Date" value={milestone.date} onChange={(value) => updateMilestone(index, "date", value)} /></div>
                <div className="col-span-3"><Input label="Status" value={milestone.status} onChange={(value) => updateMilestone(index, "status", value)} /></div>
                <div className="col-span-1 flex justify-end pb-1">
                  <button type="button" onClick={() => setTimelineRows((prev) => prev.filter((_, rowIndex) => rowIndex !== index))} className="rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" className="rounded-2xl" onClick={onCancel}>Cancel</Button>
            <button type="button" onClick={saveChanges} className="inline-flex items-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              Save Changes <Icon name="arrow" className="ml-2" size={16} />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DealSetup({ onCreateDeal, onCancel }) {
  const [form, setForm] = useState({ name: "Project ", client: "", type: "Sell-Side", industry: "", subsector: "", geography: "", ebitdaRange: "", engagementDate: "", owner: "", targetClose: "Q4 2026", thesis: "" });
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submitDeal() {
    const required = ["name", "client", "industry", "owner", "engagementDate"];
    const missing = required.filter((field) => !String(form[field] || "").trim());
    if (missing.length) {
      setError("Please complete deal codename, seller name, industry, deal owner, and engagement letter date.");
      return;
    }
    onCreateDeal(form);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Launch New Deal</h2>
              <p className="text-sm text-slate-500">Create the transaction record, timeline shell, buyer workspace, and dashboard.</p>
            </div>
            <Badge tone="blue">Backend-enabled MVP</Badge>
          </div>
          {error && <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Deal Codename" value={form.name} onChange={(value) => updateField("name", value)} />
            <Input label="Seller Legal Name" value={form.client} onChange={(value) => updateField("client", value)} />
            <Input label="Deal Type" value={form.type} onChange={(value) => updateField("type", value)} />
            <Input label="Industry" value={form.industry} onChange={(value) => updateField("industry", value)} />
            <Input label="Subsector" value={form.subsector} onChange={(value) => updateField("subsector", value)} />
            <Input label="HQ Geography" value={form.geography} onChange={(value) => updateField("geography", value)} />
            <Input label="EBITDA Range" value={form.ebitdaRange} onChange={(value) => updateField("ebitdaRange", value)} />
            <Input label="Engagement Letter Signed" value={form.engagementDate} onChange={(value) => updateField("engagementDate", value)} />
            <Input label="Deal Owner" value={form.owner} onChange={(value) => updateField("owner", value)} />
            <Input label="Target Close" value={form.targetClose} onChange={(value) => updateField("targetClose", value)} />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Investment Thesis Summary</label>
            <textarea className="min-h-28 w-full rounded-2xl border p-3 text-sm outline-none focus:ring-2 focus:ring-slate-300" value={form.thesis} onChange={(event) => updateField("thesis", event.target.value)} placeholder="Brief internal narrative on positioning, buyer logic, and process objectives." />
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" className="rounded-2xl" onClick={onCancel}>Cancel</Button>
            <button type="button" onClick={submitDeal} className="inline-flex items-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
              Create Deal <Icon name="arrow" className="ml-2" size={16} />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MetricsReporting({ deals, milestonesByDealState }) {
  const totalDeals = deals.length;
  const activeDeals = deals.filter((deal) => deal.stage === "Active" || deal.stage === "Nearing Completion").length;
  const completedDeals = deals.filter((deal) => deal.stage === "Completed").length;
  const atRiskMilestones = Object.values(milestonesByDealState).flat().filter((milestone) => milestone.status === "At Risk").length;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Metrics & Reporting</h1>
        <p className="text-sm text-slate-500">Portfolio-level process visibility across transaction workflows</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Metric title="Total Deals" value={totalDeals} icon="dashboard" />
        <Metric title="Active / Near Close" value={activeDeals} icon="users" />
        <Metric title="Completed" value={completedDeals} icon="check" />
        <Metric title="At-Risk Milestones" value={atRiskMilestones} icon="alert" />
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <h2 className="mb-4 font-semibold text-slate-950">Deal Status Mix</h2>
          <div className="space-y-3">
            {STAGE_GROUPS.map((stage) => {
              const count = deals.filter((deal) => deal.stage === stage).length;
              const width = `${Math.max(8, (count / Math.max(totalDeals, 1)) * 100)}%`;
              return (
                <div key={stage}>
                  <div className="mb-1 flex justify-between text-sm text-slate-600"><span>{stage}</span><span>{count}</span></div>
                  <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-slate-700" style={{ width }} /></div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BuyerIntake({ buyers }) {
  const reviewQueue = buyers.filter((buyer) => buyer.status !== "Approved");
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 rounded-2xl bg-slate-100 p-4">
            <Icon name="spreadsheet" className="mb-3" size={24} />
            <h2 className="font-semibold text-slate-950">Excel Upload</h2>
            <p className="mt-1 text-sm text-slate-500">Import a buyer universe spreadsheet and normalize fields before activation.</p>
          </div>
          <Button className="w-full rounded-2xl"><Icon name="upload" className="mr-2" size={16} /> Upload Spreadsheet</Button>
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 rounded-2xl bg-slate-100 p-4">
            <Icon name="dashboard" className="mb-3" size={24} />
            <h2 className="font-semibold text-slate-950">CRM API Sync</h2>
            <p className="mt-1 text-sm text-slate-500">Pull buyers, contacts, owners, and relationship context from the CRM.</p>
          </div>
          <Button variant="secondary" className="w-full rounded-2xl">Connect CRM</Button>
        </CardContent>
      </Card>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <h2 className="mb-4 font-semibold text-slate-950">Review Queue</h2>
          <div className="space-y-3">
            {reviewQueue.length === 0 ? <div className="rounded-2xl border border-dashed p-4 text-sm text-slate-500">No pending buyers</div> : null}
            {reviewQueue.map((buyer) => (
              <div key={buyer.id} className="rounded-2xl border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">{buyer.firm}</div>
                  <Badge tone={buyer.status === "Flagged" ? "red" : "yellow"}>{buyer.status}</Badge>
                </div>
                <div className="mt-1 text-xs text-slate-500">{buyer.notes}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Pipeline({ buyers, setBuyers }) {
  const [query, setQuery] = useState("");
  const filtered = buyers.filter((buyer) => buyer.firm.toLowerCase().includes(query.toLowerCase()));

  function moveBuyer(id, direction) {
    setBuyers((prev) => prev.map((buyer) => {
      if (buyer.id !== id) return buyer;
      const currentIndex = STAGES.indexOf(buyer.stage);
      const safeIndex = currentIndex < 0 ? 0 : currentIndex;
      const nextIndex = Math.max(0, Math.min(STAGES.length - 1, safeIndex + direction));
      return { ...buyer, stage: STAGES[nextIndex] };
    }));
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-96">
          <Icon name="search" className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search buyers" className="w-full rounded-2xl border py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-300" />
        </div>
        <Badge tone="blue">{filtered.length} buyers visible</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {STAGES.slice(0, 6).map((stage) => (
          <Card key={stage} className="min-h-80 rounded-2xl shadow-sm">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{stage}</h3>
                <Badge>{filtered.filter((buyer) => buyer.stage === stage).length}</Badge>
              </div>
              <div className="space-y-3">
                {filtered.filter((buyer) => buyer.stage === stage).map((buyer) => (
                  <div key={buyer.id} className={`rounded-2xl border p-3 shadow-sm ${buyerRiskClass(buyer.risk)}`}>
                    <div className="text-sm font-medium text-slate-950">{buyer.firm}</div>
                    <div className="mt-1 text-xs text-slate-500">{buyer.type} · {buyer.owner}</div>
                    <div className="mt-2 text-xs text-slate-600">{buyer.notes}</div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-xl" onClick={() => moveBuyer(buyer.id, -1)}>Back</Button>
                      <Button size="sm" className="rounded-xl" onClick={() => moveBuyer(buyer.id, 1)}>Advance</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

export default function TransactionWorkflowMVP() {
  const [view, setView] = useState("home");
  const [selectedDealId, setSelectedDealId] = useState(1);
  const [deals, setDeals] = useState(seedDeals);
  const [buyersByDealState, setBuyersByDealState] = useState(seedBuyersByDeal);
  const [milestonesByDealState, setMilestonesByDealState] = useState(seedMilestonesByDeal);

  const selectedDeal = deals.find((deal) => deal.id === selectedDealId) || deals[0];
  const buyers = buyersByDealState[selectedDealId] || [];
  const milestones = milestonesByDealState[selectedDealId] || [];

  function setBuyers(nextValue) {
    setBuyersByDealState((prev) => ({
      ...prev,
      [selectedDealId]: typeof nextValue === "function" ? nextValue(prev[selectedDealId] || []) : nextValue,
    }));
  }

  function updateSelectedDeal(updatedDeal) {
    setDeals((prev) => prev.map((deal) => (deal.id === selectedDealId ? { ...deal, ...updatedDeal } : deal)));
    setView("dashboard");
  }

  function updateSelectedMilestones(updatedMilestones) {
    setMilestonesByDealState((prev) => ({ ...prev, [selectedDealId]: updatedMilestones }));
  }

  function createDeal(form) {
    const nextId = Math.max(...deals.map((deal) => deal.id), 0) + 1;
    const newDeal = {
      id: nextId,
      name: form.name.trim(),
      client: form.client.trim(),
      stage: "Starting",
      type: form.type.trim() || "Sell-Side",
      industry: form.industry.trim(),
      owner: form.owner.trim(),
      nextMilestone: "Management Timeline Alignment",
      targetClose: form.targetClose.trim() || "TBD",
    };
    const newMilestones = [
      { label: "Engagement Letter Signed", date: form.engagementDate, status: "Complete" },
      { label: "Management Timeline Aligned", date: "TBD", status: "Upcoming" },
      { label: "Buyer Universe Approved", date: "TBD", status: "Upcoming" },
      { label: "Teaser / CIM Prep Complete", date: "TBD", status: "Upcoming" },
      { label: "CIM Release", date: "TBD", status: "Upcoming" },
      { label: "IOI Deadline", date: "TBD", status: "Upcoming" },
    ];
    setDeals((prev) => [newDeal, ...prev]);
    setBuyersByDealState((prev) => ({ ...prev, [nextId]: [] }));
    setMilestonesByDealState((prev) => ({ ...prev, [nextId]: newMilestones }));
    setSelectedDealId(nextId);
    setView("dashboard");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar view={view} setView={setView} />
      <main className="flex-1 p-8 pl-10">
        <Header view={view} deal={selectedDeal} setView={setView} />
        {view === "home" && <HomePage setView={setView} setSelectedDealId={setSelectedDealId} deals={deals} />}
        {view === "dashboard" && <Dashboard deal={selectedDeal} buyers={buyers} milestones={milestones} />}
        {view === "transactionDetails" && <TransactionDetails deal={selectedDeal} milestones={milestones} onUpdateDeal={updateSelectedDeal} onUpdateMilestones={updateSelectedMilestones} onCancel={() => setView("dashboard")} />}
        {view === "setup" && <DealSetup onCreateDeal={createDeal} onCancel={() => setView("home")} />}
        {view === "intake" && <BuyerIntake buyers={buyers} />}
        {view === "pipeline" && <Pipeline buyers={buyers} setBuyers={setBuyers} />}
        {view === "metrics" && <MetricsReporting deals={deals} milestonesByDealState={milestonesByDealState} />}
      </main>
    </div>
  );
}

