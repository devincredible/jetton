const TonWeb = require("tonweb");
const { Address, BN } = require("tonweb").utils;
const {
  addr1,
  addr2,
  init,
  deploy,
  mint,
  burn,
  transfer,
  transferToCosmos,
  receivedFromCosmos,
  log_balance,
} = require("../interface/interface");

async function test() {
  const { contract, addr_contract, keyPair } = await init();

  await transferToCosmos(contract, keyPair, {
    receiver: "nuah1m0u823ml4z7acrt0wnugwwvdn67mha4xe0r7et",
    amount: 50,
  });
  await log_balance(contract);
}

test();
