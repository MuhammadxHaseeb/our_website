// Service detail pages (/services/[slug]). Built only from our-company.md (owner's ticked catalogue + case facts).
// Gaps are marked [PLACEHOLDER: …]; missing visuals [ASSET: …]. Add a slug here to publish its page.

export type ServiceDetail = {
  headline: string;            // h1, specific to the area
  lead: string;
  cta: string;                 // hero primary button
  buildTitle: string;          // "What we build" section title
  capabilities: { title: string; text: string }[];   // "What we build", 4–6
  features: { label: string; title: string; text: string; asset: string }[]; // feature chapters with a full-width visual
  caseSlugs: string[];         // related cases, in order
  tech: string[];
  techNote?: string;           // placeholder note when the stack isn't confirmed
  faq: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'mobile-apps': {
    headline: 'iOS and Android apps people keep opening after week one',
    cta: 'Talk about your app',
    buildTitle: 'Everything an app needs, from one team',
    lead: 'We build for iPhone and Android, cross-platform or native, then stay to keep the app fast, fixed and growing. Both apps in our work are still live and still run by us.',
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
        asset: 'rental app: move-in photo record and side-by-side comparison screens · 16:9',
      },
      {
        label: 'From our work · Health & nutrition',
        title: 'A real person inside the app',
        text: 'Logging meals is easy to build and easy to abandon. We added the part generic diet apps skip: users talk directly to a real nutrition doctor in the same app where they track what they eat.',
        asset: 'nutrition app: meal log and chat with the nutritionist · 16:9',
      },
    ],
    caseSlugs: ['rental-inspection-app', 'nutrition-coaching-app'],
    tech: ['Flutter', 'React Native', 'iOS', 'Android', 'Node', 'Python', 'Laravel'],
    techNote: '[PLACEHOLDER: confirm mobile tech stack]',
    faq: [
      { q: 'Do I need separate apps for iPhone and Android?', a: 'Usually not. Flutter or React Native gives you both from one codebase. We suggest native only when a feature really needs it, and we tell you why.' },
      { q: 'Can you take over an app another team started?', a: 'Yes. We review the code first, tell you what is worth keeping and what will cost you later, then agree a plan before changing anything.' },
      { q: 'Who publishes the app to the stores?', a: 'We prepare the release and handle App Store and Google Play submission. [PLACEHOLDER: confirm it is published under the client\'s own developer accounts]' },
      { q: 'What happens after launch?', a: 'Testing, fixes, updates and marketing, usually on a monthly retainer. It is how we still run both apps in our work today.' },
    ],
  },
};
