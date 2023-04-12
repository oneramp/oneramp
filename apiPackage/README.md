# oneramp

A simple NPM package for interacting with on-chain deposits in various networks using the OneRamp class.

## Installation

To install the package, run the following command:

```bash
npm install oneramp

```

## Usage

First, import the OneRamp class from the oneramp package:

```javascript
const OneRamp = require("oneramp")
```

Then, create a new instance of the OneRamp class by providing a provider and signer:

```javascript
const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR-PROJECT-ID");
const signer = new ethers.Wallet("YOUR-PRIVATE-KEY", provider);

const oneRamp = new OneRamp(provider, signer);
```

Use the deposit method to deposit tokens:

```javascript
(async () => {
  const chainId = 1; // Ethereum Mainnet
  const phoneNumber = "+1234567890";
  const fiatAmount = 100;
  const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI
  const cryptoAmount = ethers.utils.parseUnits("10", 18); // 10 DAI

  await oneRamp.deposit(chainId, phoneNumber, fiatAmount, tokenAddress, cryptoAmount);
})();
```

## Parameters for the deposit method

1. `chainId` (number): The chain ID of the network where the deposit will be made. 
This determines the contract address used for    depositing.
2. `phoneNumber (string)`: The phone number for initiating the payment.
3. `fiatAmount (number)`: The amount of fiat currency to be converted.
4. `tokenAddress (string)`: The address of the token to be deposited.
5. `cryptoAmount (BigNumber)`: The amount of cryptocurrency to be deposited.

## Supported Networks

Ethereum Mainnet (chainId: 1)
Binance Smart Chain (chainId: 56)
Polygon (chainId: 137)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT