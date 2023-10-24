import server from "./server";
import React, { useEffect, useState } from "react";
import randomWallet from "./generate";

function Balances(digitalSign) {
  const [balances, setBalances] = useState({});
  const [wallet, setWallet] = useState();
  async function fetchBalances() {
    try {
      const response = await server.get("balances");
      setBalances(response.data.wallet || {});
      //   console.log("response",response.data.wallet);
    } catch (error) {
      console.error("Error fetching balances", error);
    }
  }
  const copyToClipboard = ({textToCopy}) => {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBalances();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function addWallet() {
    const newWallet = await randomWallet();
    setWallet(newWallet);
  }

  return (
    <div className="container wallet">
      <h1>Wallets</h1>
      <table>
        <tr>
          <th>Address</th>
          <th>Balance</th>
          <th>Private Key</th>
        </tr>
        <tbody>
          {Object.keys(balances).map((key) =>
            balances[key].value !== 0 ? (
              <tr
                className="walletTable"
                style={{ textTransform: "none" }}
                key={key}
              >
                <td>{key}</td>
                <td>{balances[key].value}</td>
                <td>
                  {balances[key].privateKey ? balances[key].privateKey : "---"}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>

      <button onClick={addWallet} style={{background:"#f4f6f8", border:"none", cursor:"pointer", padding:"8px"}}>Random wallet</button>
      {wallet ? (
        <p>
        Public key: <button onClick={() => copyToClipboard({ textToCopy: wallet.publicKey })}>{wallet.publicKey}
          </button> <br/>
          Private Key: <button onClick={() => copyToClipboard({ textToCopy: wallet.privateKey })}>{wallet.privateKey}
          </button>
        </p>
      ) : null}
    </div>
  );
}

export default Balances;
