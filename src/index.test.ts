import { Litepay } from '.';

const vendor = process.env.VENDOR;
const secret = process.env.SECRET;

if (vendor === undefined || secret === undefined) {
  throw new Error('Some envs are undefined');
}

describe('Litepay', () => {
  it('should create an invoce', async () => {
    const invoice = await Litepay.merchantCreate({
      vendor,
      currency: 'USD',
      secret,
      price: 99,
      callbackUrl: 'https://google.com',
      returnUrl: 'https://google.com',
      invoice: 1,
    });

    expect(invoice.status).toBe('success');
    expect('url' in invoice).toBe(true);
  });

  it('should not create an invoce', async () => {
    const invoice = await Litepay.merchantCreate({
      vendor,
      currency: 'USD',
      secret: `${secret}_ERROR`,
      price: 99,
      callbackUrl: 'https://google.com',
      returnUrl: 'https://google.com',
      invoice: 1,
    });

    expect(invoice.status).toBe('error');
    expect('url' in invoice).toBe(false);
    expect('message' in invoice).toBe(true);
  });
});
