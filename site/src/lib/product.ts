// epox's own restaurant & retail system (/restaurant-system). Owner, 2026-11-23: "our own product like" blinkco.io,
// with plan prices shown on this page only. Reference notes: research/sites/blinkco.md (never copy its wording).
// Owner still to confirm: the product name, the prices + currency, and which modules exist today.

export const product = {
  name: 'epox for restaurants',     // working name until the owner names it
  short: 'Restaurant system',       // menu + footer label
  href: '/restaurant-system',
  promise: 'Tills, online orders, riders and loyalty for restaurants and shops, in one system.',
};

export type Module = { slug: string; title: string; line: string; points: string[] };

export const modules: Module[] = [
  {
    slug: 'pos', title: 'Point of sale', line: 'A till that keeps selling when the internet drops.',
    points: [
      'Runs in the cloud, so owners can check any branch from anywhere',
      'Offline mode: orders keep going and sync when the connection is back',
      'Counter, website, app and delivery-app orders in one queue',
      'Kitchen tickets printed per station',
      'Stock linked to recipes, so every sale updates what is left',
      'End-of-day totals reconciled across every channel',
    ],
  },
  {
    slug: 'ordering', title: 'Online ordering', line: 'Your own website and app, so orders stop paying a commission.',
    points: [
      'A website and an iOS / Android app under your brand',
      'Card and wallet payments, or cash on delivery',
      'Orders sent to the nearest branch automatically',
      'Menus and prices per branch',
      'Live order tracking for your customers',
      'A shop version for large catalogues and product categories',
    ],
  },
  {
    slug: 'riders', title: 'Delivery riders', line: 'Know where every order is, and every rider.',
    points: [
      'Rider app with automatic or manual assignment',
      'Suggested routes and live tracking on a map',
      'Reports on delivery times, attendance and rider performance',
      'No riders of your own? Orders go to a delivery partner instead',
    ],
  },
  {
    slug: 'loyalty', title: 'Loyalty', line: 'Bring people back without printing a single card.',
    points: [
      'Points, wallet credit, promo codes and discounts',
      'Messages sent for you: welcome, birthday, a forgotten cart',
      'SMS, email and app notifications from one place',
    ],
  },
  {
    slug: 'reports', title: 'Reports', line: 'The numbers you check every morning, already done.',
    points: [
      'Sales by branch, city and category',
      'Repeat customers, what they are worth, and who stopped coming',
      'Best sellers, and what gets ordered together',
      'Delivery times, cancelled orders and reviews',
    ],
  },
];

export const forWho = ['Restaurants', 'Cafes and bakeries', 'Chains and franchises', 'Supermarkets and grocery', 'Other shops'];

export const setupSteps = [
  { n: '01', title: 'Demo', text: 'A short call: how many branches you run and where your orders come from today.' },
  { n: '02', title: 'Menu and recipes', text: 'We load your menu, prices and recipes, so stock and food cost work from day one.' },
  { n: '03', title: 'First branch live', text: 'Your staff take real orders on the new till, with us there for the first service.' },
  { n: '04', title: 'Everything on', text: 'Online ordering, riders, loyalty and reports switched on as you are ready for them.' },
];

/** Plan prices, per branch per month (USD). Reference figures until the owner sends epox's own: see the note in this file's header. */
export type Plan = { name: string; price: string; unit: string; for?: string; points: string[] };
export type PriceGroup = { title: string; line: string; plans: Plan[] };

export const pricing: PriceGroup[] = [
  {
    title: 'Point of sale', line: 'Every plan includes offline mode and support 7 days a week.',
    plans: [
      { name: 'Starter', price: '$25', unit: 'per branch / month', points: ['Cloud till and order queue', 'Menu and stock', 'End-of-day reconciliation', 'Reports and shift schedule'] },
      { name: 'Connected', price: '$35', unit: 'per branch / month', points: ['Everything in Starter', 'Tax authority integration', 'Delivery-app orders in the same queue'] },
      { name: 'Pro', price: '$75', unit: 'per branch / month', points: ['Everything in Connected', 'Recipe-based food costing', 'Warehouse and central stock'] },
    ],
  },
  {
    title: 'Online ordering', line: 'Loyalty, discounts, branch routing, live tracking and reports included.',
    plans: [
      { name: 'Website', price: '$50', unit: 'per branch / month', for: 'Restaurants and cafes', points: ['Ordering website under your brand', 'Menus per branch', 'Online payments'] },
      { name: 'Website + app', price: '$100', unit: 'per branch / month', for: 'Restaurants and cafes', points: ['Everything in Website', 'iOS and Android app under your name', 'App notifications'] },
      { name: 'Shop website', price: '$150', unit: 'per branch / month', for: 'Supermarkets and shops', points: ['Large catalogues and categories', 'Filters and search', 'Online payments'] },
      { name: 'Shop website + app', price: '$300', unit: 'per branch / month', for: 'Supermarkets and shops', points: ['Everything in Shop website', 'iOS and Android app under your name'] },
    ],
  },
  {
    title: 'Delivery riders', line: 'Pay only for the deliveries you make.',
    plans: [
      { name: 'Riders', price: '$0.05', unit: 'per delivery', points: ['Rider app and manager map', 'Assignment and routes', 'Delivery reports', 'Hand-off to delivery partners'] },
    ],
  },
];

export const pricingNote = 'Prices in US dollars. Running a chain or many branches? We price the whole group on a call.';

export const productFaq = [
  { q: 'Does the till work if the internet goes down?', a: 'Yes. Orders keep going in offline mode and everything syncs once the connection is back.' },
  { q: 'Can we start with just the till?', a: 'Yes. Each part is priced on its own. Most places start with the till and add online ordering, riders or loyalty later.' },
  { q: 'Are the website and app under our name?', a: 'Yes. Your brand, your domain and your own App Store and Google Play listings. Customers never see ours.' },
  { q: 'We don\'t have our own riders.', a: 'Orders can be handed to a delivery partner instead, and you still see where each one is.' },
  { q: 'We run a supermarket, not a restaurant.', a: 'The shop plans are built for large catalogues, categories and stock across branches.' },
  { q: 'Can you change it for how we work?', a: 'Yes. We are a software house first, so features specific to your business can be built on top.' },
];
