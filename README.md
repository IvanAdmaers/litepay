# Litepay

Litepay.ch API wrapper.

## Usage

```js
import { Litepay } from 'litepay';

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
```

## Testing

*Create .env first*

```
npm test
```
