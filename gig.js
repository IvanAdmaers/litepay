const { Litepay } = require('./dist/index.js');

(async () => {
  const invoice = await Litepay.merchantCreate({
    vendor: '5M9C4X',
    currency: 'USD',
    secret: 'c878400c-2834-480c-aa0d-70f0655f5b33',
    price: 99,
    callbackUrl: 'https://google.com',
    returnUrl: 'https://google.com',
    invoice: 1,
  });

  if (invoice.status === 'success') {
    console.log('redirect me to', invoice.url);
    return;
  }

  console.log('take a look on this error message', invoice.message);
})();
