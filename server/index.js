const express = require("express");
const app = express();
const cors = require("cors");

const recoverPublicKey = require("./scripts/recoverKey");

app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;
const balances = {
  babd100ec07cd0af8da41d4e02f560e6530ba2d4: 100,
  da59cdec94f54544ce6ae8f09c33c3c771136b11: 50,
  "869027881b6f32e9d86a3a2da2e35ea37c792827": 75,
};

const wallet = {
  "0xd8622297640EcfFa542A549Cb41f9E8366107942": {
    value: 100,
    privateKey:
      "0x54cc7662d0ccdffdeb04fb283598b50f97573b6c6f52442a24aed947d264a845",
  },
  "0xD3FC38f3aE9182DaBE0B99904495C8f402E57803": {
    value: 50,
    privateKey:
      "0x6e5e3e9ab0cbbf752d778c5a47d8483a41c6af5c27e819d1ff3987e64dd878ca",
  },
  "0x7Ff1b75488c17986E5eF71d81067E48ba96De8eE": {
    value: 75,
    privateKey:
      "0xfe6a211e1b31b0a5eae66fd67a343371e6cb0d9ba03598c49ec445f25131e2ec",
  },
  "0x6583B710Cb2875Dc97f27baF382F104ff6F62871": {
    value: 150,
  }
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = wallet[address].value || 0;
  res.send({ balance });
});

app.get("/balances", (req, res) => {
  res.send({ wallet });
});

app.post("/send", (req, res) => {
  const { senderSignature, recipient, amount } = req.body;
  recoverPublicKey(amount.toString(), senderSignature)
    .then((resolvedSender) => {
      sender = resolvedSender;
      setInitialBalance(sender);
      setInitialBalance(recipient);

      if (wallet[sender].value < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        wallet[sender].value -= amount;
        wallet[recipient].value += amount;
        res.send({ balance: wallet[sender].value, sender });
      }
    })
    .catch((error) => {
      console.error("Error recovering the sender:", error);
    });
});



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}
app.listen(PORT, (Error) => {
  console.log(`Application listening on PORT ${PORT}`);
});

function setInitialBalance(address) {
  if (!wallet[address]) {
    wallet[address] = { value: 0 };
  }
}
