async function connectWallet() {
    await window.ethereum.request({method: "eth_requestAccounts"}).catch((err) => {
        console.log("thers an err bro ", err.code)
    })
}

async function checkBalance() {
    let balance = await window.ethereum.request({method: "eth_getBalance",
        params: [
            "0x06214f2E1e1896739D92F3526Bd496DC028Bd7F9",
            "latest"
        ]
    }).catch((err) => {
        console.log("thers an err bro ", err.code)
    })

    console.log("balance = ", parseInt(balance) / Math.pow(10,18))
}


// with this function you can:
// 1. send ether to other account
// 2. call function on any smart contract
// 3. send ether to contract
async function callFunction() {

    let params = [
        {
            from: "0x06214f2E1e1896739D92F3526Bd496DC028Bd7F9",
            to: "0xE5a715E04563B9a0f32f2bFED98Bfba413E2a4FD",
            gas: Number(100000).toString(16),
            gasPrice: Number(25000).toString(16),
            value:  Number(20000000000000000).toString(16),
            data: "0xa8619f22000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047364616700000000000000000000000000000000000000000000000000000000",
        },
    ]

    await window.ethereum.request({method: "eth_sendTransaction",params})
    .catch((err) => {
        console.log("thers an err bro ", err.code)
    })
}
