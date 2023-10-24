import { useState } from "react";
import server from "./server";

function Transfer({ address, setAddress, setBalance, digitalSign, setDigitalSign, sendAmount, setSendAmount }) {
  // const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    // console.log(digitalSign, recipient, sendAmount)
    try {
      const {
        data: { balance, sender },
      } = await server.post(`send`, {
        senderSignature: digitalSign,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      console.log(sender)
      setAddress(sender);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Digital Signature
        <input
          placeholder="0xf123..."
          defaultValue={digitalSign}
          value={digitalSign}
          onChange={setValue(setDigitalSign)}
        ></input>
      </label>


      <label>
        Send Amount
        <input
          placeholder="ETH"
          defaultValue={sendAmount}
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
