/* Central content. Edit this file to change products, case studies, posts, pricing and FAQ everywhere. */
window.SITE = {
  name: 'Your Name',
  email: 'arfahlicense@gmail.com',
  whatsapp: '8800000000000',            // replace with your number (country code, no +)
  base: 'https://shafin5556.github.io/C_portfolio/',

  products: [
    { id: 'store', g: 'g1', emoji: '🛍️', cat: 'ecommerce', name: 'Shopify-style Store', tag: 'Best Seller', rating: '4.9', metric: '+312% revenue', price: 'From $1,200',
      tagline: 'A blazing-fast online store that turns browsers into buyers.',
      desc: 'Fast storefront with cart, checkout, coupon engine, inventory dashboard and order tracking — built to convert on mobile first.',
      features: ['One-page checkout', 'Inventory & order dashboard', 'Coupons, bundles & upsells', 'Payment gateways (Stripe, PayPal, local)', 'SEO-ready product pages', 'Multi-currency'],
      stack: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'], results: ['+312% revenue in 90 days', '2.4× mobile conversion', '0.8s page load'] },
    { id: 'analytics', g: 'g2', emoji: '📊', cat: 'saas', name: 'Analytics Dashboard', tag: 'New', rating: '5.0', metric: '12k users', price: 'From $2,400',
      tagline: 'Real-time insight your whole team can actually use.',
      desc: 'Multi-tenant SaaS dashboard with live charts, team roles, scheduled reports and a clean API.',
      features: ['Real-time charts', 'Role-based access', 'Scheduled email reports', 'REST & webhook API', 'White-label themes', 'CSV / PDF export'],
      stack: ['React', 'TypeScript', 'Node.js', 'ClickHouse'], results: ['12k active users', '99.9% uptime', '60% faster reporting'] },
    { id: 'marketplace', g: 'g3', emoji: '🏪', cat: 'marketplace', name: 'Multi-vendor Marketplace', tag: '', rating: '4.8', metric: '300+ vendors', price: 'From $3,800',
      tagline: 'Launch a marketplace where vendors and buyers both win.',
      desc: 'Vendor onboarding, split payouts, reviews, disputes and a powerful admin console.',
      features: ['Vendor onboarding & KYC', 'Split payments & payouts', 'Reviews & ratings', 'Dispute management', 'Commission rules', 'Admin analytics'],
      stack: ['Next.js', 'NestJS', 'Stripe Connect', 'Redis'], results: ['300+ vendors in 4 months', '$1.2M GMV', '4.8★ vendor satisfaction'] },
    { id: 'assistant', g: 'g4', emoji: '🤖', cat: 'ai', name: 'AI Support Assistant', tag: 'New', rating: '4.9', metric: '−70% tickets', price: 'From $1,800',
      tagline: 'A chatbot trained on your docs that resolves tickets for you.',
      desc: 'Answers customers 24/7 from your own knowledge base, hands off to humans when needed, and learns from feedback.',
      features: ['Trained on your documents', '24/7 multilingual replies', 'Human hand-off', 'CRM & helpdesk integrations', 'Conversation analytics', 'Guardrails & tone control'],
      stack: ['OpenAI', 'Python', 'Vector DB', 'React'], results: ['70% fewer tickets', '<3s response time', '92% satisfaction'] },
    { id: 'fashion', g: 'g5', emoji: '👗', cat: 'ecommerce', name: 'Fashion Brand Website', tag: '', rating: '4.8', metric: '2.1× conversion', price: 'From $1,500',
      tagline: 'Editorial design that makes your brand unforgettable.',
      desc: 'Immersive lookbooks, quick-view product pages and a frictionless checkout for lifestyle brands.',
      features: ['Lookbooks & campaigns', 'Quick-view & wishlist', 'Size guide & reviews', 'Instagram feed sync', 'Email capture flows', 'Headless CMS'],
      stack: ['Next.js', 'Shopify API', 'Sanity', 'Framer Motion'], results: ['2.1× conversion', '+48% avg. order value', '38% repeat buyers'] },
    { id: 'booking', g: 'g6', emoji: '📅', cat: 'saas', name: 'Booking & Scheduling App', tag: '', rating: '4.9', metric: '8k bookings/mo', price: 'From $2,000',
      tagline: 'Let clients book, pay and get reminded — automatically.',
      desc: 'Calendar sync, online payments, automatic reminders and a branded client portal.',
      features: ['Google / Outlook calendar sync', 'Online payments', 'SMS & email reminders', 'Client portal', 'Team scheduling', 'Reports'],
      stack: ['React', 'Node.js', 'Twilio', 'Stripe'], results: ['8k bookings / month', '−55% no-shows', '5h saved weekly'] }
  ],

  plans: [
    { name: 'Starter', price: '$990', note: 'Perfect for landing pages & small sites', features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup', 'Contact form', '2 weeks delivery', '14 days support'], cta: 'Get Starter' },
    { name: 'Business', price: '$2,900', note: 'Most popular for growing companies', featured: true, features: ['Custom web app or store', 'Admin dashboard', 'Payments & integrations', 'Performance & SEO', '4–8 weeks delivery', '60 days support'], cta: 'Get Business' },
    { name: 'Enterprise', price: 'Custom', note: 'Complex platforms & dedicated teams', features: ['Dedicated team', 'Custom architecture', 'AI & automation', 'Cloud deployment (AWS)', 'SLA & priority support', 'Ongoing roadmap'], cta: 'Talk to us' }
  ],

  faq: [
    ['How much does a project cost?', 'Most projects land between $990 and $10,000 depending on scope. Use the cost calculator for an instant estimate, then book a free call for an exact quote.'],
    ['How long does it take?', 'A landing page takes about 2 weeks, a store or web app 4–8 weeks, and a complex platform 10–16 weeks. You get a milestone plan up front.'],
    ['Do I own the code?', 'Yes. Once the project is paid you own all source code, designs and assets.'],
    ['Do you offer support after launch?', 'Every plan includes free support. After that you can choose a monthly maintenance plan for updates, monitoring and fixes.'],
    ['Can you work with my existing team or product?', 'Absolutely. I can take over an existing codebase, add features, or join your team as a dedicated developer.'],
    ['How do payments work?', 'Usually 40% to start, 30% at the midpoint and 30% on delivery. Larger projects can be split by milestone.']
  ]
};
