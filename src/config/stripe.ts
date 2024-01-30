export const PLANS = [
  {
    name: 'Free',
    slug: 'free',
    quota: 10,
    pagesPerPdf: 5,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    quota: 50,
    pagesPerPdf: 25,
    price: {
      amount: 14,
      priceIds: {
        test: 'price_1OdfkXGuN8ilXxzG2mbyQ0tz',
        // production: 'price_1OdfoEGuN8ilXxzGG4J8BNSI', // TODO: uncomment once we have staging set up
        production: 'price_1OdfkXGuN8ilXxzG2mbyQ0tz',
      },
    },
  },
];
