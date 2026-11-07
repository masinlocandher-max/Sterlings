/* Single rate card for the estimator. Proposed rates; not an approved offer. */
(function (root, factory) {
  const pricing = factory();
  if (typeof module === 'object' && module.exports) module.exports = pricing;
  else root.SterlingsPricing = pricing;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  return {
    version: '2026-11-08-proposal-1',
    status: 'proposed',
    currency: 'PHP',
    inbox: 'fmbandco@gmail.com',
    services: {
      build: { label: 'A website built for me', setup: [18000, 28000], monthly: [0, 0] },
      rental: { label: 'Website rental', setup: [5000, 8000], monthly: [2500, 4500] }
    },
    // Both starting prices include one page. Additional pages are charged once.
    additionalPage: [2500, 4000],
    designs: {
      tailored: { label: 'Tailored starting layout', setup: [0, 0] },
      bespoke: { label: 'Bespoke visual direction', setup: [15000, 25000] }
    },
    contents: {
      ready: { label: 'I will supply the words and images', perPage: [0, 0] },
      polish: { label: 'Help polish my existing copy', perPage: [500, 1000] },
      write: { label: 'Write my website copy', perPage: [1500, 2500] }
    },
    care: {
      none: { label: 'No ongoing care requested', monthly: [0, 0] },
      technical: { label: 'Technical care', monthly: [1500, 2500] },
      managed: { label: 'Technical care and content updates', monthly: [3500, 6000] }
    },
    features: {
      form: { label: 'Inquiry form', description: 'Collect inquiries through a form provider.', setup: [3000, 5000] },
      booking: { label: 'Booking tool integration', description: 'Connect an existing appointment service.', setup: [4000, 8000] },
      catalogue: { label: 'Product or service catalogue', description: 'Show up to 20 items, without checkout.', setup: [5000, 10000] },
      blog: { label: 'Blog or updates section', description: 'A publishing setup with up to 3 starter posts.', setup: [6000, 10000] },
      migration: { label: 'Move existing content', description: 'Move up to 10 pages from your current site.', setup: [5000, 10000] },
      language: { label: 'A second language', description: 'Add supplied translations to the selected pages.', perPage: [1500, 2500] },
      checkout: { label: 'Online payments / checkout', description: 'Products, payment provider and order flow need review.', custom: true },
      accounts: { label: 'Customer accounts / custom system', description: 'Logins, dashboards or a workflow built around you.', custom: true }
    },
    types: {
      landing: { label: 'A landing page', description: 'One focused page for an offer or campaign.', pages: 1 },
      portfolio: { label: 'My portfolio', description: 'Your work, story and professional presence.', pages: 5 },
      business: { label: 'My business', description: 'Services, products and ways to get in touch.', pages: 5 },
      organization: { label: 'An organization', description: 'Programs, information and a place for your team.', pages: 8 },
      shop: { label: 'An online shop', description: 'A store with payments and order management.', pages: 5, features: ['checkout'] },
      custom: { label: 'Something more', description: 'A portal, platform or a more complex idea.', pages: 5, features: ['accounts'] }
    },
    domains: {
      existing: 'I already have a domain',
      new: 'I need a new domain',
      unsure: 'Help me choose a domain'
    },
    timelines: {
      flexible: 'My timing is flexible',
      month: 'I would like to launch in 1–2 months',
      urgent: 'I need it within 4 weeks'
    }
  };
});
