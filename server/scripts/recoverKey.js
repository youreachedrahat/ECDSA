const web3 = require('web3');
const { utf8ToBytes } = require("ethereum-cryptography/utils");


async function recoverPublicKey(msg, Signature){
    const message = web3.utils.keccak256(utf8ToBytes(msg))
    const recoveredPublicKey = web3.eth.accounts.recover(message, Signature);
    return recoveredPublicKey
}

module.exports = recoverPublicKey;