import React, { useEffect, useState } from "react";
import signMessage from "./signMessage";

function DigitalSignature({
  digitalSign,
  setDigitalSign,
  setSendAmount,
  sendAmount,
}) {
  const [privateKey, setPrivateKey] = useState();
  const [copied, setCopied] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signature(evt) {
    evt.preventDefault();
    try {
        const sign = await signMessage(sendAmount.toString(), privateKey); // Use 'await' to access the result
        setDigitalSign(sign);
    } catch (error) {
      console.error("Error signing the message:", error);
    }
  }

  const copyToClipboard = () => {
    setCopied(true);
    const textArea = document.createElement("textarea");
    textArea.value = digitalSign;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  useEffect(() => {
        setCopied(false);
  }, [digitalSign]);

  return (
    <form className="container DigitalSignature" onSubmit={signature}>
      <h1 style={{ marginBottom: "0" }}>Digital Signature</h1>
      <p>from private key to your digital Signature</p>

      <label>
        Private Key
        <input
          placeholder="type private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <label>
        Amount
        <input
          placeholder="ETH"
          value={sendAmount}
          onChange={(event) => setSendAmount(event.target.value)}
        ></input>
      </label>

      <input
        type="submit"
        style={{
          background: "#319795",
          border: "1px solid rgb(226, 232, 240)",
          borderRadius: "0.125rem",
          color: "white",
          padding: "10px",
          textTransform: "uppercase",
          fontWeight: 400,
          fontSize: "0.9em",
          cursor:"pointer"
        }}
        value="Get Signature"
      />

      <div style={{ display: "flex" }} className="digitalSignBlock">
        <p style={{ overflowX: "scroll" }}>{digitalSign}</p>
        {digitalSign ? (
          <button onClick={copyToClipboard} className="copybutton">
            {copied ? "copied" : "copy"}
          </button>
        
        ) : null}
        
      </div>
    </form>
  );
}

export default DigitalSignature;
