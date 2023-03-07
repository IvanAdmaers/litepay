# Litepay

Litepay.ch API wrapper.

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
