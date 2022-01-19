## Truffle Tutorial for Beginners | Get Started with Truffle

### Source code from my [YouTube Video](https://youtu.be/11q7Q_TjkDw)

---

### Technology Stack & Tools

* [Solidity](https://docs.soliditylang.org/en/v0.8.2/) (For writing Smart Contracts)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (For writing tests)
* [Truffle](https://trufflesuite.com/) (Development Framework for our Smart Contracts)
* [Infura](https://infura.io/) as a node provider

---

### Requirements For Initial Setup

* [Node.js](https://nodejs.org/en/) v16.13.1 and [NPM](https://www.npmjs.com/) package manager
* [Truffle](https://trufflesuite.com/) v5.4.28
* [Infura](https://infura.io/) endpoint for the Ethereum mainnet

---

### Setting Up and Usage

1. Clone/Download this Repository  
2. Install Dependencies:  
`npm install`
3. Start Ganache (our local development blockchain)  
`truffle develop`
4. Deploy Smart Contracts   
`truffle migrate --reset`
5. Run tests  
`truffle test test/test.js`
6. Deploy to the Ropsten public testnet   
    * Get Infura key and enter it in truffle.config
    * Put your SeedPhrase in truffle.config
    * `truffle migrate --reset --network ropsten`
7. Interact with deployed Smart Contract on Testnet
    * `truffle console —network ropsten`
    * `contract = await Number.deployed()`
    * `number = await conract.number()`
    * `number.toString()`



