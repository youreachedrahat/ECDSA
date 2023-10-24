import Web3 from 'web3';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

function hashMessage(message) {
    return Web3.utils.keccak256(utf8ToBytes(message))
}

export default hashMessage;