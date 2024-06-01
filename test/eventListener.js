const TonWeb = require("tonweb");
const { init } = require("../interface/interface");

const provider = new TonWeb.HttpProvider(
  "https://testnet.toncenter.com/api/v2/jsonRPC",
  { apiKey: "6512cc5abe9b47a0ae7b8999d8c7dd82e3f455ff4acd496282ae45539ef81081" }
);

let hashes = [];

async function getTransactionDetails() {
  const { contract, addr_contract, keyPair } = await init();

  try {
    const txs = await provider.getTransactions(addr_contract);
    for (let i = 0; i < txs.length; i++) {
      if (txs[i].out_msgs.length > 0) {
        if (txs[i].out_msgs[0].source == txs[i].out_msgs[0].destination) {
          if (hashes.indexOf(txs[i].transaction_id.hash) == -1) {
            console.log(txs[i].out_msgs[0].value - 2581600);
            console.log(atob(txs[i].out_msgs[0].message));
            hashes.push(txs[i].transaction_id.hash);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
  }
}

getTransactionDetails();
