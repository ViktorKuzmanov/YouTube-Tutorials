# Hardhat Introduction
Learn everything you need to know to get started with Hardhat

## Technology Stack & Dependencies

- Solidity (Writing Smart Contract)
- Javascript (Testing the Smart Contracts)
- [Alchemy](https://www.alchemy.com/) As a node provider
- [NodeJS](https://nodejs.org/en/) To create hardhat project and install dependencis using npm

### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
$ npm install
```

### 3. Compile Smart Contracts
```
$ npx hardhat compile
```

### 4. Test and Debug(console.log) Smart Contracts
```
$ npx hardhat test
```

### 5. Deploy to hardhat netwrok (local development blockchain)
```
$ npx hardhat node
```
```
$ npx hardhat run --network localhost scripts/deploy.js
```

### 6. Deploy to Ropsten public testnet
- Input your private key in `hardhat.config.js`
- Input your Alchemy key in `hardhat.config.js`
```
$ npx hardhat run --network ropsten scripts/deploy.js
```
