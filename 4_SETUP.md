# Bereitstellen Smart Contract

Smart contract for managing colors with restricted access to deployer only.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file from template:

```bash
copy .env.example .env
```

3. Fill `.env` with your data:

```
PRIVATE_KEY=your_private_key_from_metamask
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key
DEPLOYED_CONTRACT_ADDRESS=
```

**How to get RPC URL:**

- Alchemy: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`
- Infura: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
- Or other providers that support Sepolia

**How to get Private Key from MetaMask:**

- Open MetaMask → Account Details → Export Private Key
- ⚠️ NEVER SHARE your private key with anyone!

## Compile Contract

```bash
npx hardhat compile
```

## Deploy to Sepolia

```bash
npm run deploy
```

After successful deployment, copy the contract address and paste it into `.env`:

```
DEPLOYED_CONTRACT_ADDRESS=0x...
```

## Interact with Contract

```bash
npm run interact
```

This script will:

- Display current color
- Change color to "blue"
- Display gas estimation
- Display emitted events
