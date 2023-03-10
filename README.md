# Litepay

<div align="center">
  <a href="https://www.npmjs.com/package/litepay">
    <img alt="npm version" src="https://img.shields.io/npm/v/litepay" />
  </a>
  <a href="https://www.npmjs.com/package/litepay">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/litepay" />
  </a>
    <a href="https://www.npmjs.com/package/litepay">
    <img alt="license" src="https://img.shields.io/npm/l/litepay" />
  </a>
</div>

Litepay.ch API wrapper.

<div align="center">
  <a href="https://github.com/IvanAdmaers/litepay">
    <img src="https://litepay.ch/assets/new/img/logo_litepay_2020_white_small.png" alt="Litepay logo" />
  </a>
</div>

## Usage

```js
import { Litepay } from 'litepay';

// Litepay.merchantCreate
(async () => {
  const invoice = await Litepay.merchantCreate({
    vendor: '0X3V5B',
    currency: 'USD',
    secret: '290657b6-2910-391s-vv2c-cbf84fc61f88',
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

// Litepay.create
(async () => {
  const invoice = await Litepay.create({
    method: 'btc',
    receivingAddress: '1FfmbHfnpaZjKFvyi1okTjJJusN455paPH',
  });

  if (invoice.status === 'success') {
    console.log('client gotta pay to this address', invoice.address);
    return;
  }

  console.log('take a look on this error message', invoice.message);
})();

// Litepay.check
(async () => {
  const invoice = await Litepay.check({
    method: 'btc',
    address: 'address from invoice.address that returns the Litepay.create method',
  });

  if (invoice.status === 'error') {
    console.log('take a look on this error message', invoice.message);
    return;
  }

  if (+invoice.amount < 0.15) {
    console.log('invoice is not paid');
    return;
  }

  console.log('invoice is paid successfully');
})();
```

## Available methods:

* Litepay.merchantCreate
* Litepay.create
* Litepay.check

See the doc: https://litepay.ch/docs

## Testing

*Create .env first*

```
npm test
```
