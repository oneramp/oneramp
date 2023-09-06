# OneRamp

OneRamp is a utility package that helps facilitate token offramps and oneramps in various blockchain networks. It provides a set of tools to interact with blockchain tokens in a more accessible and abstracted way, providing a simple interface to approve, offramp and keep track of transactions.

## Installation

To use OneRamp in your project, you will need to install it via npm:

```
npm install oneramp
```

## Usage

Import the OneRamp class from the package and create a new instance by providing the necessary parameters:

```javascript
import OneRamp from 'oneramp';

const ramp = new OneRamp(
  network, // Network type - "bscTestnet" | "bsc" | "celo" | "alfajores" | "mumbai"
  pubKey,  // Public key
  secretKey, // Secret key
  provider, // (Optional) ethers.provider
  signer // (Optional) Signer
);
```

You can then use the `offramp` method to deposit a specific amount of a token to a specific the oneramp address:

```javascript
ramp.offramp(tokenAddress, amount, phoneNumber)
  .then(() => console.log('Deposit successful'))
  .catch(err => console.error('Error during deposit:', err));
```

## API

### `constructor(network: Network, pubKey: string, secretKey: string, provider?: ethers.providers.Provider, signer?: Signer)`

Creates a new instance of OneRamp.

### `setSigner(signer: Signer)`

Sets the signer for the OneRamp instance.

### `setProvider(provider: ethers.providers.Provider)`

Sets the provider for the OneRamp instance.

### `offramp(tokenAddress: string, amount: number, phoneNumber: string)`

Deposits a specific amount of a token to a the oneramp address. 

## Contributing

We welcome contributions from the community. If you wish to contribute, please take a moment to review our contributing guidelines.

## License

OneRamp is [MIT licensed](./LICENSE).