// Real content from our-company.md. Gaps are marked [PLACEHOLDER: …] and tracked in CLAUDE.md.

export const company = {
  name: 'Epox',
  city: 'Faisalabad',
  country: 'Pakistan',
  founded: 2019,
  timezone: 'UTC+5',
  email: '[PLACEHOLDER: email]',
  whatsapp: '[PLACEHOLDER: WhatsApp]',
  bookingUrl: '', // [PLACEHOLDER: booking link]
};

export type Service = {
  n: string; slug: string; title: string; promise: string; tags: string[];
};

export const services: Service[] = [
  { n: '01', slug: 'web-saas-development', title: 'Web & SaaS development', promise: 'Websites, web apps and SaaS products built to scale.', tags: ['Company sites', 'E-commerce', 'Web portals', 'SaaS', 'Custom web apps'] },
  { n: '02', slug: 'mobile-apps', title: 'Mobile apps', promise: 'iOS and Android apps people keep opening after week one.', tags: ['iOS', 'Android', 'Cross-platform'] },
  { n: '03', slug: 'business-software', title: 'Business software', promise: 'Systems that replace spreadsheets and manual work.', tags: ['ERP', 'CRM', 'Automation', 'Dashboards', 'Integrations', 'Internal tools'] },
  { n: '04', slug: 'ai-solutions', title: 'AI solutions', promise: 'AI that does real work inside your product or team.', tags: ['AI agents & chatbots', 'LLM integration', 'Workflow automation', 'Data pipelines'] },
  { n: '05', slug: 'ui-ux-branding', title: 'UI/UX & branding', promise: 'Design that makes products clear and brands memorable.', tags: ['UI/UX', 'UX research', 'Design systems', 'Brand identity', 'Motion'] },
  { n: '06', slug: 'cloud-devops', title: 'Cloud & DevOps', promise: 'Infrastructure that stays fast and ships safely.', tags: ['Cloud setup & migration', 'CI/CD'] },
  { n: '07', slug: 'launch-growth-support', title: 'Launch, growth & support', promise: 'We stay after launch: testing, marketing and maintenance.', tags: ['QA', 'Maintenance', 'Marketing', 'Project rescue'] },
];
export const alsoServices = ['Desktop apps', 'Blockchain', 'Game development'];

export type CaseStudy = {
  n: string; slug: string; headline: string; summary: string; sector: string; region?: string;
  client: string; platforms: string; engagement: string; status: string; duration: string; asset: string;
};

export const cases: CaseStudy[] = [
  {
    n: '001', slug: 'nutrition-coaching-app', headline: 'A nutrition app with a real nutritionist inside',
    summary: 'People log meals and track their nutrition, then talk directly to a real nutrition doctor inside the app, not a generic diet bot.',
    sector: 'Health & nutrition', client: '[PLACEHOLDER: client descriptor]', platforms: 'iOS · Android · Web',
    engagement: 'Build, marketing, maintenance', status: 'Live', duration: '[PLACEHOLDER: duration]', asset: 'case 001 hero · 16:10',
  },
  {
    n: '002', slug: 'rental-inspection-app', headline: 'Apps that settle rental disputes before they start',
    summary: 'Tenants photograph the property at move-in into a tamper-proof record, then both sides compare it side by side at move-out.',
    sector: 'PropTech', region: 'Europe', client: '[PLACEHOLDER: client descriptor]', platforms: 'iOS · Android · Web',
    engagement: 'Build, marketing, maintenance', status: 'Live', duration: '[PLACEHOLDER: duration]', asset: 'case 002 hero · 16:10',
  },
];

export const models = [
  { n: '01', title: 'Fixed project', best: 'A defined product or feature with a clear finish line.', points: ['Agreed scope, timeline and deliverables', 'One accountable project lead', 'Handover with docs and source code'] },
  { n: '02', title: 'Dedicated developers', best: 'Teams that need more hands without hiring.', points: ['Engineers working as part of your team', 'Your tools, your rituals', 'Scale up or down monthly'] },
  { n: '03', title: 'Monthly retainer', best: 'Live products that need to keep improving.', points: ['Ongoing development and fixes', 'Marketing and maintenance', 'A fixed monthly plan, reviewed together'] },
];

export const steps = [
  { n: '01', title: 'Find', text: 'We look at what you run today and name the problem worth solving first.' },
  { n: '02', title: 'Plan', text: 'Scope, timeline and team, agreed before anyone writes code.' },
  { n: '03', title: 'Build', text: 'Weekly demos and written updates. You always see working software.' },
  { n: '04', title: 'Run', text: 'Launch, then marketing and maintenance. We stay.' },
];

export const stats = [
  { value: 2019, label: 'Building since', raw: true },
  { value: 2, label: 'Products live, still run by us' },
  { value: 7, label: 'Service areas' },
  { value: null as number | null, label: '[PLACEHOLDER: countries delivered to]' },
];

export const industries = [
  { name: 'Health & nutrition', count: 1, line: 'Meal tracking with real nutritionists in the loop.' },
  { name: 'PropTech', count: 1, line: 'Move-in and move-out records tenants and landlords both trust.' },
  { name: '[PLACEHOLDER: industry]', count: 0, line: '[PLACEHOLDER: one-line outcome]' },
];

export const trust = ['Since 2019', '2 products live', 'NDA on request', 'Faisalabad, PK · UTC+5'];
