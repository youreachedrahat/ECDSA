const { utf8ToBytes } = require("ethereum-cryptography/utils");
const web3 = require('web3');



const privateKey = web3.utils.randomHex(32);
console.log('Private Keys: ', privateKey);


const publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address;
console.log('Public Key:', publicKey);


message = web3.utils.keccak256(utf8ToBytes("50"))
const signature = web3.eth.accounts.sign(message, privateKey).signature;
console.log("signature", signature)


const recoveredPublicKey = web3.eth.accounts.recover(message, signature);
console.log("recovered", recoveredPublicKey)

