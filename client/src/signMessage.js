import Web3 from "web3";
import { utf8ToBytes } from "ethereum-cryptography/utils";
const web3 = new Web3(); 
async function signMessage(msg, privateKey) {
  const message =await web3.utils.keccak256(utf8ToBytes(msg));
    const signature =await web3.eth.accounts.sign(message, privateKey);
  return signature.signature;
}

export default signMessage;
