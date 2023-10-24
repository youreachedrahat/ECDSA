import Web3 from "web3";
const web3 = new Web3(); 



async function randomWallet() {
    const privateKey = web3.utils.randomHex(32);
    const publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    return { privateKey, publicKey };
}

export default randomWallet;