
let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

// 1. Connect Metamask with Dapp
async function connectMetamask() {
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();

    console.log("Account address s:", await signer.getAddress());
}

// 2. Get balance
async function getBalance() {
    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}

// 3. read data from the USDT contract on kovan 
const usdtAddress = "0x13512979ADE267AB5100878E2e0f485B568328a4";

const usdtAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address to, uint amount)"
];

async function readDataFromSmartContract() {

    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    
    const name = await usdtContract.name()
    const symbol = await usdtContract.symbol()
    const decimals = await usdtContract.decimals()
    const totalSupply = await usdtContract.totalSupply()
    const myBalance = await usdtContract.balanceOf("0x06214f2E1e1896739D92F3526Bd496DC028Bd7F9")

    console.log(`name = ${name}`)
    console.log(`symbol = ${symbol}`)
    console.log(`decimals = ${decimals}`)
    console.log(`totalSupply = ${totalSupply / 1e6 }`)
    console.log(`myBalance = ${myBalance / 1e6}`)
}

// 4. Send Usdt to one account to another
async function sendUsdtToAccount() {
    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);
    usdtContract.connect(signer).transfer("0x6CC3dFBec068b7fccfE06d4CD729888997BdA6eb", "500000000")
}

// 5. deploy contract which you created in remix
async function deployContract() {

    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "randomNumber",
                    "type": "uint256"
                }
            ],
            "name": "MyEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "emitAnEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "incrementNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "number",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const numberContractByteCode = "6080604052600160005534801561001557600080fd5b5061023e806100256000396000f3fe60806040526004361061004a5760003560e01c806312065fe01461004f578063273ea3e31461007a5780638381f58a14610091578063910220cf146100bc578063d0e30db0146100d3575b600080fd5b34801561005b57600080fd5b506100646100dd565b604051610071919061015e565b60405180910390f35b34801561008657600080fd5b5061008f6100e5565b005b34801561009d57600080fd5b506100a6610100565b6040516100b3919061015e565b60405180910390f35b3480156100c857600080fd5b506100d1610106565b005b6100db61014d565b005b600047905090565b60016000808282546100f79190610179565b92505081905550565b60005481565b60633373ffffffffffffffffffffffffffffffffffffffff167fdf50c7bb3b25f812aedef81bc334454040e7b27e27de95a79451d663013b7e1760405160405180910390a3565b565b610158816101cf565b82525050565b6000602082019050610173600083018461014f565b92915050565b6000610184826101cf565b915061018f836101cf565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156101c4576101c36101d9565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220c7ea64001588915ed03183343a38064bf99dd1c9e22cb6e3c634f4bd152aa8ba64736f6c63430008070033"

    const factory = new ethers.ContractFactory(abi, numberContractByteCode, signer)

    const numberContract = await factory.deploy();

    const transactionReceipt = await numberContract.deployTransaction.wait();

    console.log(transactionReceipt)    
}

// 6. Call function on smart contract and wait for it to finish (to be mined)
async function incrementNumberOnSmartContract() {
    const numberContractAddress = "0xf1f3298bc741a5801ac08f2be84f822de2312c97";

    const numberContractAbi = [
        "function number() view returns (uint)",
        "function incrementNumber() external"
    ];

    const numberContract = new ethers.Contract(numberContractAddress, numberContractAbi, provider);

    var number = await numberContract.number()
    console.log("initial number ", number.toString())

    const txResponse = await numberContract.connect(signer).incrementNumber()
    await txResponse.wait()
    number = await numberContract.number()
    console.log("updated number = ", number.toString())

}

// 7. Emit event and Print out the event immediately after being emmited
async function emitAnEvent() {
    const numberContractAddress = "0xf1f3298bc741a5801ac08f2be84f822de2312c97";

    const numberContractAbi = [
        "function emitAnEvent() external",
    ];

    const numberContract = new ethers.Contract(numberContractAddress, numberContractAbi, provider);

    const tx = await numberContract.connect(signer).emitAnEvent()
    const txReceipt = await tx.wait()

    console.log("event was emmited")

    console.log(txReceipt.events[0])
}

// 8. Listen for events being emmited in the background
// listening for an event to be emitted, and to do a task based on that.

async function listenToEvents() {
    // Subscribe to event calling listener when the event occurs.
    const numberContractAddress = "0xb2f3ebf53ad585ccaefeb4960ff54329ebf2007a";
    const numberContractAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "randomNumber",
                    "type": "uint256"
                }
            ],
            "name": "MyEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "emitAnEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "incrementNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "number",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    // The Contract object
    const numberContract = new ethers.Contract(numberContractAddress, numberContractAbi, provider);

    numberContract.on("MyEvent", (from, number) => {
        console.log(`address emiting the event = ${from}`)
        console.log(`number from event = ${number}`)
    })
}

async function sendEtherWhenCallingFunction() {
    const numberContractAddress = "0xb2f3ebf53ad585ccaefeb4960ff54329ebf2007a";
    const numberContractAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "randomNumber",
                    "type": "uint256"
                }
            ],
            "name": "MyEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "emitAnEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "incrementNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "number",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    // The Contract object
    const numberContract = new ethers.Contract(numberContractAddress, numberContractAbi, provider);

    const options = {value: ethers.utils.parseEther("0.005")}

    const txResponse = await numberContract.connect(signer).deposit(options)

    await txResponse.wait()

    const balance = await numberContract.getBalance()
    console.log(`balance = ${balance.toString()}`)
}


async function readFromSCOnctractStorage() {
    const storageSlot = 0 // 1 means 2 storage slot because we are starting from 0
    const contractAddress = "0x9d6F5181065e3beD0e29de393165b43B7fF9E33B"
    const data = await provider.getStorageAt(contractAddress, storageSlot);
    console.log(data)
}