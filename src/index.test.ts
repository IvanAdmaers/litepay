import { Litepay } from '.';
import { hasOwn } from './utills';

const vendor = process.env.VENDOR;
const secret = process.env.SECRET;

if (vendor === undefined || secret === undefined) {
  throw new Error('Some envs are undefined');
}

const receivingAddress = '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH';

describe('Litepay', () => {
  beforeEach(() => {
    jest.setTimeout(100_000);
  });

  it('should create an merchant invoce', async () => {
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
    expect(hasOwn(invoice, 'url')).toBe(true);
  });

  it('should not create an merchant invoce', async () => {
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
    expect(hasOwn(invoice, 'url')).toBe(false);
    expect(hasOwn(invoice, 'message')).toBe(true);
  });

  it('should create an invoice', async () => {
    const invoice = await Litepay.create({
      method: 'btc',
      receivingAddress,
    });

    expect(hasOwn(invoice, 'callback_url')).toBe(true);
    expect(hasOwn(invoice, 'address')).toBe(true);
    expect(hasOwn(invoice, 'destination')).toBe(true);
    expect(hasOwn(invoice, 'fee')).toBe(true);
    expect(invoice.status === 'success').toBe(true);
  });

  it('should not create an invoice', async () => {
    const invoice = await Litepay.create({
      method: 'btc',
      receivingAddress: 'error',
    });

    expect(hasOwn(invoice, 'message')).toBe(true);
    expect(invoice.status === 'error').toBe(true);
  });

  it('should not check an invoice', async () => {
    const invoice = await Litepay.check({
      method: 'btc',
      receivingAddress: 'error',
    });

    expect(invoice.status === 'error').toBe(true);
    expect(hasOwn(invoice, 'message')).toBe(true);
  });
});

it('should check an invoice', async () => {
  const invoice = await Litepay.create({
    method: 'btc',
    receivingAddress,
  });

  if (invoice.status === 'error') {
    throw new Error('Invoice creating error');
  }

  const invoiceData = await Litepay.check({
    method: 'btc',
    receivingAddress: invoice.destination,
  });

  expect(hasOwn(invoiceData, 'address')).toBe(true);
  expect(hasOwn(invoiceData, 'amount')).toBe(true);
  expect(hasOwn(invoiceData, 'confirmations')).toBe(true);
  expect(hasOwn(invoiceData, 'txids')).toBe(true);
  expect(invoiceData.status === 'success').toBe(true);
});
