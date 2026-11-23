// Service detail pages (/services/[slug]). Built only from our-company.md (owner's ticked catalogue + case facts).
// Shared terms (ownership, payment, response times…) come from `terms` in content.ts. Add a slug here to publish its page.

import { terms } from './content';

export type ServiceDetail = {
  headline: string;            // h1, specific to the area
  lead: string;
  cta: string;                 // hero primary button
  buildTitle: string;          // "What we build" section title
  capabilities: { title: string; text: string }[];   // "What we build", 4–6
  features: { label: string; title: string; text: string; asset?: string }[]; // feature chapters; full-width visual only when there's a real asset to ask for
  caseSlugs: string[];         // related cases, in order (only where the case really involved this area)
  tech: string[];
  techNote?: string;           // placeholder note when the stack isn't confirmed
  faq: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'web-saas-development': {
    headline: 'Web apps and SaaS products that ship the useful part first',
    cta: 'Talk about your web project',
    buildTitle: 'From a company site to a full SaaS product',
    lead: 'Company sites, online stores, customer portals and full SaaS products. We start with what your customers use most, on a stack the next developer will understand, and keep building after launch.',
    capabilities: [
      { title: 'Company websites', text: 'Fast, clear sites and landing pages that explain what you do and get people to reply.' },
      { title: 'E-commerce', text: 'Shopify, WooCommerce or a custom store, connected to your payments and stock.' },
      { title: 'Web portals', text: 'Customer, vendor and partner portals that replace email back-and-forth.' },
      { title: 'SaaS products', text: 'Accounts, roles, billing and the admin side, built to grow with your users.' },
      { title: 'Custom web apps', text: 'Internal or customer-facing apps built around how your business actually works.' },
      { title: 'Speed and SEO fixes', text: 'Technical fixes that make an existing site faster and easier to find.' },
    ],
    features: [
      {
        label: 'How we build',
        title: 'The useful part first',
        text: 'Version one does the thing your customers came for, and does it well. Everything else waits until real use shows us what matters next.',
      },
      {
        label: 'Stack',
        title: 'Code the next developer can read',
        text: 'React or Next.js on the front, Node, Python, .NET, Laravel or Go behind it. We pick what fits your product and your team, and avoid anything only we could maintain.',
      },
    ],
    caseSlugs: ['rental-inspection-app'],
    tech: ['React', 'Next.js', 'Vue', 'Angular', 'Node', 'Python', '.NET', 'Laravel', 'Go', 'Shopify', 'WooCommerce'],
    faq: [
      { q: 'Can you improve our existing site instead of rebuilding it?', a: 'Yes. We can start by fixing what is slow or broken on what you already have, and only suggest a rebuild when it would cost you less in the long run.' },
      { q: 'Which stack will you use?', a: 'The one that fits: usually React or Next.js on the front and Node, Python or Laravel behind it. We tell you why before we start.' },
      { q: 'Can you take over a half-finished web project?', a: 'Yes. We review the code first, tell you what is worth keeping, then agree a plan before changing anything.' },
    ],
  },

  'mobile-apps': {
    headline: 'iOS and Android apps people keep opening after week one',
    cta: 'Talk about your app',
    buildTitle: 'Everything an app needs, from one team',
    lead: 'We build for iPhone and Android, cross-platform or native, then stay to keep the app fast, fixed and growing. The apps in our work are still live and still run by us.',
    capabilities: [
      { title: 'iOS and Android apps', text: 'One product on both stores, designed for how people actually hold and use a phone.' },
      { title: 'Cross-platform builds', text: 'Flutter or React Native: one codebase for both stores, so every fix ships everywhere at once.' },
      { title: 'The backend behind the app', text: 'Accounts, APIs, payments and the admin panel your team uses to run it.' },
      { title: 'App design', text: 'Screens designed and tested with real users before anyone writes code.' },
      { title: 'Store release and updates', text: 'App Store and Google Play submission, then regular updates after launch.' },
      { title: 'Taking over stalled apps', text: 'We pick up an app another team left half-finished and tell you what is worth keeping.' },
    ],
    features: [
      {
        label: 'From our work · PropTech',
        title: 'Proof nobody can argue with',
        text: 'Tenants walk through the property at move-in and every photo is sealed into a tamper-proof record. At move-out both sides compare the same rooms side by side, so a deposit dispute has evidence instead of opinions.',
      },
      {
        label: 'From our work · Health & nutrition',
        title: 'A real person inside the app',
        text: 'Logging meals is easy to build and easy to abandon. We added the part generic diet apps skip: users talk directly to a real nutrition doctor in the same app where they track what they eat.',
      },
    ],
    caseSlugs: ['rental-inspection-app', 'nutrition-coaching-app'],
    tech: ['Flutter', 'React Native', 'iOS', 'Android', 'Node', 'Python', 'Laravel'],
    faq: [
      { q: 'Do I need separate apps for iPhone and Android?', a: 'Usually not. Flutter or React Native gives you both from one codebase. We suggest native only when a feature really needs it, and we tell you why.' },
      { q: 'Can you take over an app another team started?', a: 'Yes. We review the code first, tell you what is worth keeping and what will cost you later, then agree a plan before changing anything.' },
      { q: 'Who publishes the app to the stores?', a: `We prepare the release and handle App Store and Google Play submission. ${terms.stores}` },
      { q: 'What happens after launch?', a: 'Testing, fixes, updates and marketing, usually on a monthly retainer. It is how we still run the apps in our work today.' },
    ],
  },

  'business-software': {
    headline: 'Software that replaces your spreadsheets and copy-paste',
    cta: 'Talk about your systems',
    buildTitle: 'The systems behind a business that runs smoothly',
    lead: 'ERP and CRM systems, dashboards and internal tools, connected to the payments and accounting you already use, so your team stops moving numbers by hand.',
    capabilities: [
      { title: 'ERP', text: 'Stock, orders, production and finance in one place, custom or on Odoo and ERPNext.' },
      { title: 'CRM', text: 'Your pipeline and customer history where your sales team actually uses them: custom, Salesforce or HubSpot.' },
      { title: 'Process automation', text: 'The manual steps your team repeats every day, done automatically.' },
      { title: 'Integrations', text: 'Payments, accounting, ERP and CRM talking to each other, so data is entered once.' },
      { title: 'Dashboards and reports', text: 'The numbers you check every morning, live, without building a spreadsheet first.' },
      { title: 'Internal tools', text: 'Admin panels and small tools for the jobs your off-the-shelf software doesn\'t cover.' },
    ],
    features: [
      {
        label: 'Where we start',
        title: 'Follow the spreadsheet',
        text: 'The first thing we look for is the file everyone copies numbers into. It usually shows exactly which steps to connect or automate first.',
      },
      {
        label: 'Build or buy',
        title: 'Off the shelf when it fits',
        text: 'If Odoo, ERPNext, Salesforce or HubSpot already does the job, we set it up and connect it. We build custom only where your process really is different.',
      },
    ],
    caseSlugs: [],
    tech: ['Odoo', 'ERPNext', 'Salesforce', 'HubSpot', 'Node', 'Python', '.NET', 'Laravel'],
    faq: [
      { q: 'Should we buy software or build our own?', a: 'Usually both: off-the-shelf where it fits, custom only for the parts that are specific to how you work. We tell you which is which before you spend anything.' },
      { q: 'Can you connect the tools we already use?', a: 'Yes. Payments, accounting, ERP and CRM systems can usually be connected through their APIs, so data only gets entered once.' },
      { q: 'Will our team need training?', a: terms.training },
    ],
  },

  'ai-solutions': {
    headline: 'AI where it saves hours, not where it looks impressive',
    cta: 'Talk about AI for your team',
    buildTitle: 'AI that does real work',
    lead: 'We find the step in your work that eats the most time, then put AI there: an LLM inside your product, an agent that answers customers, or an automation fed by your own data.',
    capabilities: [
      { title: 'Finding the right use', text: 'We look at how your team works and point to where AI would save real time, and where it wouldn\'t.' },
      { title: 'LLMs inside your product', text: 'Search, summaries, writing help and answers built into the software your customers already use.' },
      { title: 'Agents and chatbots', text: 'Support, sales or internal assistants that answer from your own information.' },
      { title: 'Workflow automation', text: 'Sorting, drafting and routing handled by AI, with a person checking where it matters.' },
      { title: 'Data pipelines', text: 'Your data cleaned up and in one place, so AI has something reliable to work from.' },
    ],
    features: [
      {
        label: 'Where we start',
        title: 'Hours first, hype second',
        text: 'We look at where the time actually goes before suggesting anything. If a plain automation does the job better than AI, we say so.',
      },
      {
        label: 'Your information',
        title: 'Answers about your business',
        text: 'Assistants and agents are connected to your own documents and systems, so they answer about your products and customers, not the internet in general.',
      },
    ],
    caseSlugs: [],
    tech: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'LLM integration', 'AI agents', 'Python', 'Node'],
    faq: [
      { q: 'Is our data safe when we use AI?', a: terms.aiData },
      { q: 'Do we need a lot of data to start?', a: 'Not usually. Many useful assistants work from the documents and systems you already have. Where the data is messy, we clean it up first.' },
      { q: 'Can you add AI to software we already run?', a: 'Yes. An LLM or an automation can usually be added to an existing product without rebuilding it.' },
    ],
  },

  'ui-ux-branding': {
    headline: 'Design that gets people to finish signing up',
    cta: 'Talk about your design',
    buildTitle: 'From research to a brand that holds together',
    lead: 'We watch how people use your product, design the screens and the system behind them, and give your brand one look from the logo to the app icon.',
    capabilities: [
      { title: 'UI design', text: 'Web and mobile screens that make the next step obvious.' },
      { title: 'UX research and testing', text: 'Watching real people use your product to find where they get stuck.' },
      { title: 'Design systems', text: 'One set of components and rules, so every new screen looks like it belongs.' },
      { title: 'Brand identity', text: 'Logo, colours and type that work on a business card and as an app icon.' },
      { title: 'Illustration and motion', text: 'Illustrations and animation that explain things faster than text.' },
      { title: 'Product redesign', text: 'A clearer version of what you have, without losing the users you already have.' },
    ],
    features: [
      {
        label: 'Where we start',
        title: 'Watch first, design second',
        text: 'Before we redesign anything, we watch people use what you have. The fixes that matter most are usually small and obvious once you see someone struggle.',
      },
      {
        label: 'One system',
        title: 'Every screen from the same parts',
        text: 'We design a system of components, not one-off pages, so your developers build faster and new screens stay consistent.',
      },
    ],
    caseSlugs: [],
    tech: ['Figma', 'Adobe Illustrator', 'After Effects'],
    faq: [
      { q: 'Can you redesign without starting from scratch?', a: 'Yes. We keep what works, fix where people get stuck, and change the rest step by step.' },
      { q: 'Do you also build what you design?', a: 'Yes. Design and development are the same team, so what we design is what ships.' },
      { q: 'Can you design just our brand?', a: 'Yes. Logo, colours, type and the rules for using them, ready for your site, app and print.' },
    ],
  },

  'cloud-devops': {
    headline: 'Releases that don\'t keep you up at night',
    cta: 'Talk about your infrastructure',
    buildTitle: 'Infrastructure that stays out of the way',
    lead: 'We set up or move your product to AWS, Google Cloud or Azure, and build pipelines that test every change before it reaches your users.',
    capabilities: [
      { title: 'Cloud setup', text: 'A clean, documented setup on AWS, Google Cloud or Azure.' },
      { title: 'Migration', text: 'Moving what you run today to the cloud, planned so your users don\'t notice.' },
      { title: 'CI/CD pipelines', text: 'Every change built and tested automatically before it goes live.' },
      { title: 'Safe releases', text: 'Releases you can roll back quickly if something goes wrong.' },
    ],
    features: [
      {
        label: 'How we ship',
        title: 'Tested before it\'s live',
        text: 'Every change runs through automated checks before release, and if something still slips through, the last good version is one step away.',
      },
      {
        label: 'Moving to the cloud',
        title: 'One step at a time',
        text: 'We plan a migration in small steps with a way back at each one, so your users keep working while it happens.',
      },
    ],
    caseSlugs: [],
    tech: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Docker', 'GitHub Actions'],
    faq: [
      { q: 'Which cloud should we use?', a: 'The one that fits your product and your team. If you are already on one, we usually make the most of it rather than move.' },
      { q: 'Can you take over infrastructure someone else set up?', a: 'Yes. We document what is there first, then fix the riskiest parts before adding anything new.' },
      { q: 'Do you look after it once it is set up?', a: 'Yes, as part of a monthly retainer: monitoring, security updates, backup checks and fixes when something breaks.' },
    ],
  },

  'launch-growth-support': {
    headline: 'Launch is the middle, not the end',
    cta: 'Talk about your product',
    buildTitle: 'Everything that happens after version one',
    lead: 'Testing before every release, fixes and updates after it, and marketing to bring people in. We also take over projects another team left half-finished.',
    capabilities: [
      { title: 'QA and testing', text: 'Manual testing before every release, so your users don\'t find the bugs first.' },
      { title: 'Maintenance and support', text: 'Bug fixes, updates and keeping things running, on a monthly plan.' },
      { title: 'Marketing', text: 'Getting the product in front of the people it was built for.' },
      { title: 'Project rescue', text: 'Taking over a stalled project, finding what\'s broken and getting it shipping again.' },
    ],
    features: [
      {
        label: 'From our work',
        title: 'Still ours to run',
        text: 'We built the rental inspection app and the nutrition app, and we still test, maintain and market them today.',
      },
      {
        label: 'Rescue',
        title: 'Picking up where others stopped',
        text: 'When a project has stalled, we start by reading the code and the backlog, then tell you plainly what is worth keeping and what it will take to ship.',
      },
    ],
    caseSlugs: ['rental-inspection-app', 'nutrition-coaching-app'],
    tech: [],
    faq: [
      { q: 'What does a monthly retainer include?', a: terms.retainer },
      { q: 'Can you support software you didn\'t build?', a: 'Yes. We review it first so we know what we are taking on, then agree what support looks like.' },
      { q: 'How fast do you respond to problems?', a: terms.response },
    ],
  },
};
