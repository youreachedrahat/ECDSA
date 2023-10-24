import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.css";
import { useEffect, useState } from "react";
import DigitalSignature from "./DigitalSignature";
import Balances from "./Balances";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [digitalSign, setDigitalSign] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
       
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        digitalSign={digitalSign}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        setAddress={setAddress}
      />
      <DigitalSignature
        digitalSign={digitalSign}
        setDigitalSign={setDigitalSign}
        setSendAmount={setSendAmount}
        sendAmount={sendAmount}
      />
      <Balances />
    </div>
  );
}

export default App;
